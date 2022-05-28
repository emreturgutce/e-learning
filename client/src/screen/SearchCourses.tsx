import React, {useEffect, useState} from "react";
import {Course as CourseType, fetchCourses, fetchPurchasedCourses, searchCourses} from "../api";
import CourseCard from '../component/course/CourseCard';
import {useUserContext} from "../context/User/UserContext";
import {useAuth} from "../context/Auth/AuthContent";
import {Navigate, useSearchParams} from "react-router-dom";

const SearchCourses = () => {
    const userAuth = useAuth();
    const userContext = useUserContext();
    const [search, setSearch] = useSearchParams();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 50;
    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        const val = search.get('search')
        if (val) {
            searchCourses(val).then((d) => {
                console.log(d)
                setCourses(d.data.courses)
            })
        }
    }, [search])

    const filterOutMyCourses = () => {
        return courses.filter((c) => !courses.map((mc) => mc._id).includes(c._id))
    }

    console.log(userAuth)
    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"} />
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto py-8 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4">
                <div>
                    <h2 style={{
                        marginBottom: "1.8rem",
                        fontFamily: "SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol",
                        fontWeight: "600",
                        fontSize: "1.8rem",
                        lineHeight: "1.25",
                        letterSpacing: "-.05rem",
                    }}>"{search.get('search')}" için {courses.length} sonuç</h2>
                </div>
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {courses.map((course) => {
                        return (
                            <CourseCard item={{
                                ...course,
                                thumbnail: course.thumbnail || "https://img-c.udemycdn.com/course/240x135/1352468_3d97_7.jpg",
                                rateScore: 5,
                            }} key={course._id}></CourseCard>
                        )
                    })}
                    {/* <CourseSelectionContainer></CourseSelectionContainer> */}
                </div>
            </div>
        </div>
    )
}

export default SearchCourses