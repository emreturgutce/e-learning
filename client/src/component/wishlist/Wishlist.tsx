import React, {useEffect, useState} from 'react';
import {pythonData} from '../../data/course-selection-data/data';
import CourseCard from '../course/CourseCard';
import {useCourses} from '../../context/Course/CourseContext';
import {fetchWishlist, fetchWishlistCourses, MyCourse, removeFromWishlist} from '../../api';
import {useQuery} from 'react-query';
import {useUserContext} from "../../context/User/UserContext";
import {Button} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/Auth/AuthContent";

type datatype = {
    id: number;
    img: string;
    title: string;
    desc: string;
    rateScore: number;
    reviewerNum: string;
    price: number;
    onSale?: boolean;
    onSalePrice?: number;
    mark?: string | undefined;
};

const Wishlist = () => {
    const userAuth = useAuth();
    const navigate = useNavigate();
    const userContext = useUserContext();
    const {isLoading, isError, data, error} = useQuery(
        'user:wishlist',
        fetchWishlistCourses,
        {staleTime: 0}
    );
    const [wishlist, setWishlist] = useState<MyCourse[]>(data?.data.data.wishlist)

    useEffect(() => {
        setWishlist(data?.data.data.wishlist);
        userContext?.setWishlist(data?.data.data.wishlist);
    }, [data]);

    console.log(data);


    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"} />
    }


    const handleRemoveFavorite = async (id: string) => {
        try {
            if (id) {
                await removeFromWishlist(id)
                fetchWishlist().then(({data: {data: {wishlist}}}) => {
                    userContext?.setWishlist(wishlist);
                    setWishlist(wishlist);
                })
            }
        } catch (e) {
            console.error(e);
        }

    }

    return (
        <div>
            <div className='max-w-2xl mx-auto py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4'>
                <div
                    className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                    {wishlist?.map((item: any) => (
                        <div
                            className='group border-2 border-slate-100 overflow-hidden relative'
                            style={{borderRadius: 8}}
                            key={item._id}
                        >
                            <div
                                className='w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8' style={{
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}>
                                <Button onClick={() => handleRemoveFavorite(item._id)} style={{
                                    minWidth: "48px",
                                    borderRadius: 0,
                                    height: '48px',
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    zIndex: 1000
                                }}>
                                    <FavoriteIcon
                                        sx={{fontSize: 24, color: 'white'}}
                                    />
                                </Button>
                                <img
                                    src={item.thumbnail || "https://img-c.udemycdn.com/course/240x135/1352468_3d97_7.jpg"}
                                    alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                                    className='object-center object-cover group-hover:opacity-75'
                                    style={{
                                        height: "150px",
                                        width: "100%",
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                    }}
                                />
                            </div>
                            <div style={{
                                padding: "12px 14px",
                                fontSize: "1.4rem",
                                fontWeight: 400,
                                lineHeight: 1.4,
                                width: "100%",
                            }}>
                                <h1 style={{
                                    fontSize: "1rem",
                                    marginTop: "0.8rem",
                                    marginBottom: "0.4rem",
                                    fontWeight: 700,
                                    letterSpacing: "-.02rem",
                                    lineHeight: 1.2,
                                }}>{item.title}</h1>
                                <p style={{
                                    fontSize: "1rem",
                                    lineHeight: "1.4rem",
                                    margin: 0,
                                    marginBottom: "0.4rem",
                                }} className='mt-1 truncate text-gray-900'>
                                    {item.description}
                                </p>
                                <h3 className='mt-4 text-sm text-gray-700'>
                                    {item.instructor.firstname}
                                </h3>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
