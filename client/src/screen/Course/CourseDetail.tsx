import {Star, StarHalf} from "@mui/icons-material";
import React, {useEffect} from "react";
import {CourseRateReviewerNum, CourseRateScore, CourseRateStars, CourseRateWrapper } from "../../component/course/CourseCard";
import CustomizedAccordions from "../../component/Accordion/Accordion";
import {Navigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {addToCart, addToWishlist, fetchCart, fetchWishlist, getCourseDetailById, removeFromWishlist} from "../../api";
import {Button} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useUserContext} from "../../context/User/UserContext";
import {useAuth} from "../../context/Auth/AuthContent";

export const CourseDetail = () => {
    const userAuth = useAuth();
    const userContext = useUserContext()
    let increment = 0;
    let max = 5;
    const { id } = useParams();
    const { isLoading, error, data } = useQuery(["course-detail", id], () =>
        getCourseDetailById(id) , {
            staleTime: 0,
        retry: 0,
        }
    );
    const [content, setContent] = React.useState(data?.data?.course?.content)
    const [section, setSection] = React.useState(content?.sections[0])
    const [isWishlist, setIsWishlist] = React.useState(false)
    const [wishlist, setWishlist] = React.useState(userContext?.wishlist);
    const [rating, setRating] = React.useState(0);
    const [reviews, setReviews] = React.useState(data?.data?.course?.reviews);

    const isWishlistFn = () => setIsWishlist(!!wishlist?.find((u) => u._id === id));


    console.log(data);

    useEffect(() => {
        fetchWishlist().then(({data: { data: { wishlist } }}) => {
            userContext?.setWishlist(wishlist);
            setWishlist(wishlist);
            console.log(wishlist, isWishlist, id)
            isWishlistFn()
            console.log(wishlist, isWishlist, id)
        })
    }, [])

    useEffect(() => {
        isWishlistFn()
    }, [wishlist])

    useEffect(() => {
        if (reviews) {
            console.log("Test2 ", reviews)
            calculateRatingAvg(reviews);
        }
    }, [reviews])


    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"} />
    }

    const calculateRatingAvg = (ratings: any[])  => {
        if (ratings) {
            const rat = ratings.reduce((prev, curr) => prev + curr.rating, 0);
            console.log(rat, ratings.length)
            setRating(rat / ratings.length);
        }
    }

    const handleFavorite = async () => {
        try {
            if (id) {
                await addToWishlist(id)
                fetchWishlist().then(({ data: { data: { wishlist } } }) => {
                    userContext?.setWishlist(wishlist);
                    setWishlist(wishlist);
                    console.log(wishlist)
                    isWishlistFn()
                })
            }
        } catch (e) {
            console.error(e);
        }

    }

    const handleRemoveFavorite = async () => {
        try {
            if (id) {
                await removeFromWishlist(id)
                fetchWishlist().then(({ data: { data: { wishlist } } }) => {
                    userContext?.setWishlist(wishlist);
                    setWishlist(wishlist);
                    console.log(userContext?.wishlist)
                    isWishlistFn()
                })
            }
        } catch (e) {
            console.error(e);
        }

    }

    const handleAddToCart = async () => {
        try {
            if (id) {
                await addToCart(id)
                fetchCart().then(({ data: { cart } }) => {
                    userContext?.setCart(cart);
                })
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="text-white" style={{backgroundColor: "#1c1d1f", width: "100%"}}>
                <div style={{padding: "2rem 12rem", maxWidth: "85rem"}}>
                    <h1 style={{fontSize: "2.2rem", marginBottom: "0.8rem"}}>{data?.data.course.title}</h1>
                    <div style={{fontSize: "1.3rem", marginBottom: "1rem"}}>{data?.data.course.description?.substring(0, 200)}{data?.data.course.description && data?.data.course.description.length > 200 && <span>...</span>}</div>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "0.8rem"}}>
                        <a>
                            <CourseRateWrapper style={{display: "flex", alignItems: "center", marginBottom: 0}}>
                                <CourseRateScore>{rating}</CourseRateScore>
                                <CourseRateStars>
                                    {[...Array(5)].map((star, index) => {
                                        while (increment < rating) {
                                            if (rating - increment < 1) {
                                                increment++;
                                                return <StarHalf style={{ color: "#e59819" }}></StarHalf>;
                                            }
                                            increment++;
                                            return <Star style={{ color: "#e59819" }}></Star>;
                                        }
                                        while (max > rating) {
                                            max--;
                                            return <Star style={{ color: "gray" }}></Star>;
                                        }
                                    })}
                                </CourseRateStars>
                                <CourseRateReviewerNum style={{color: "white"}}>({data?.data.course.reviews && data?.data.course.reviews.length} puan)</CourseRateReviewerNum>
                            </CourseRateWrapper>

                        </a>
                        <div style={{fontSize: "0.85rem", fontWeight: 200, marginLeft: "7px"}}>{data?.data.course.total_students} öğrenci</div>
                    </div>
                    <div>
                        Oluşturan {(data?.data?.course?.instructor as any)?.firstname || "Arial"} {(data?.data?.course?.instructor as any)?.lastname || "Weinberger"}
                    </div>
                </div>
            </div>
            <div style={{maxWidth: "61rem", marginLeft: "12rem"}}>
                <div className='basis-1/4 mr-0'>
                    {
                        data?.data?.course?.content && (
                            <CustomizedAccordions
                                content={data?.data?.course?.content}
                                title={"React Kursu 1"}
                                isDetail={true}
                            ></CustomizedAccordions>
                        )
                    }

                </div>
            </div>
            <div style={{width: '20rem', backgroundColor: '#fff', boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)', zIndex: 1, position: 'absolute', top: '6.2rem', right: '12.2rem'}}>
                <img src={data?.data.course.thumbnail} alt={data?.data.course.title} width="100%"/>
                <div style={{padding: '2.1rem'}}>
                    <h1 style={{fontSize: "32px", fontWeight: 'bold', }}>₺{data?.data.course.price}</h1>
                    <div style={{display:'flex', alignItems: 'center', justifyItems: 'space-between'}}>
                        <Button onClick={() => handleAddToCart()} style={{fontSize: "18px", backgroundColor: '#a435f0', height: '48px', color: '#fff', marginRight: '8px', width: '100%', borderRadius: '0'}}>Sepete ekle</Button>
                            {
                                isWishlist ? (
                                    <Button onClick={() => handleRemoveFavorite()} style={{minWidth: "48px", border: "1px solid #000", borderRadius: 0, height: '48px'}}>
                                        <FavoriteIcon
                                            sx={{ fontSize: 24, color: 'black' }}
                                        />
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleFavorite()} style={{minWidth: "48px", border: "1px solid #000", borderRadius: 0, height: '48px'}}>
                                        <FavoriteBorderIcon
                                            sx={{ fontSize: 24, color: 'black' }}
                                        />
                                    </Button>
                                )
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}