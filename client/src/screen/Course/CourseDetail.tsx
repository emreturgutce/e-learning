import {Star, StarHalf} from "@mui/icons-material";
import React, {useEffect} from "react";
import {CourseRateReviewerNum, CourseRateScore, CourseRateStars, CourseRateWrapper } from "../../component/course/CourseCard";
import CustomizedAccordions from "../../component/Accordion/Accordion";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {addToCart, addToWishlist, fetchCart, fetchWishlist, getCourseDetailById, removeFromWishlist} from "../../api";
import {Button} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useUserContext} from "../../context/User/UserContext";

export const CourseDetail = () => {
    const userContext = useUserContext()
    let increment = 0;
    let max = 5;
    const { id } = useParams();
    const { isLoading, error, data } = useQuery(["course", id], () =>
        getCourseDetailById(id)
    );
    const [content, setContent] = React.useState(data?.data?.course?.content)
    const [section, setSection] = React.useState(content?.sections[0])
    const [isWishlist, setIsWishlist] = React.useState(false)
    const [wishlist, setWishlist] = React.useState(userContext?.wishlist);

    const isWishlistFn = () => setIsWishlist(!!wishlist?.find((u) => u._id === id));

    useEffect(() => {
        fetchWishlist().then(({data: { data: { wishlist } }}) => {
            userContext?.setWishlist(wishlist);
            setWishlist(wishlist);
            console.log(wishlist, isWishlist, id)
            isWishlistFn()
            console.log(wishlist, isWishlist, id)
        })
    }, [])

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
                    <h1 style={{fontSize: "2.2rem", marginBottom: "0.8rem"}}>NestJS Zero to Hero - Modern TypeScript Back-end Development</h1>
                    <div style={{fontSize: "1.3rem", marginBottom: "1rem"}}>Develop and deploy enterprise back-end applications following best practices using Node.js and TypeScript</div>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "0.8rem"}}>
                        <a>
                            <CourseRateWrapper style={{display: "flex", alignItems: "center", marginBottom: 0}}>
                                <CourseRateScore>4.7</CourseRateScore>
                                <CourseRateStars>
                                    {[...Array(5)].map((star, index) => {
                                        while (increment < 4.7) {
                                            if (4.7 - increment < 1) {
                                                increment++;
                                                return <StarHalf style={{ color: "#e59819" }}></StarHalf>;
                                            }
                                            increment++;
                                            return <Star style={{ color: "#e59819" }}></Star>;
                                        }
                                        while (max > 4.7) {
                                            max--;
                                            return <Star style={{ color: "gray" }}></Star>;
                                        }
                                    })}
                                </CourseRateStars>
                                <CourseRateReviewerNum style={{color: "white"}}>(1.700 puan)</CourseRateReviewerNum>
                            </CourseRateWrapper>

                        </a>
                        <div style={{fontSize: "0.85rem", fontWeight: 200, marginLeft: "7px"}}>105.334 öğrenci</div>
                    </div>
                    <div>
                        Oluşturan Ariel Weinberger
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
                <img src="https://img-c.udemycdn.com/course/240x135/2053219_e620_2.jpg" alt="Nest.js Kursu" width="100%"/>
                <div style={{padding: '2.1rem'}}>
                    <h1 style={{fontSize: "32px", fontWeight: 'bold', }}>₺249.99</h1>
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