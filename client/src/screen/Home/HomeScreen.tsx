import React, {useEffect, useState} from "react";
import {Course as CourseType, fetchCourses, fetchPurchasedCourses} from "../../api";
import CourseCard from '../../component/course/CourseCard';
import {useUserContext} from "../../context/User/UserContext";
import {useAuth} from "../../context/Auth/AuthContent";
import {Navigate} from "react-router-dom";

const HomeScreen = () => {
    const userAuth = useAuth();
    const userContext = useUserContext();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 50;

    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        fetchPurchasedCourses().then((d) => {
            userContext?.setMyCourses(d.data.courses || [])
            fetchCourses().then(({data: {courses}}) => {
                setCourses(courses)
            }).catch(console.error);
        })
    }, [])

    const filterOutMyCourses = () => {
        return courses.filter((c) => !userContext?.myCourses.map((mc) => mc._id).includes(c._id))
    }

    console.log(userAuth)
    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"} />
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto py-8 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4">
                <div className="pb-8 relative">
                    <img src="https://img-c.udemycdn.com/notices/featured_banner/image_udlite/34c63aef-8d1f-483e-b0ea-0ead94879e56.jpg" alt="hero" width="1340px" height="400px"/>
                    <div style={{position: "absolute", boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)', padding: '2.4rem', maxWidth: '44rem', top: '6.4rem', left: '7.2rem', background: '#fff'}}>
                        <h1 style={{fontWeight: '600', fontSize: '24px'}}>BT sertifikanızı almak için hazırlanın</h1>
                        <p>BT alanındaki geleceğinizi keşfedin. AWS sertifikasyonu, CompTIA A+ sertifikasyonu ve daha fazlası için öğrenmeye başlayın.</p>
                    </div>
                </div>
                <div>
                    <h2 style={{
                        marginBottom: "1.8rem",
                        fontFamily: "SuisseWorks,Georgia,Times,times new roman,serif,apple color emoji,segoe ui emoji,segoe ui symbol",
                        fontWeight: "600",
                        fontSize: "1.8rem",
                        lineHeight: "1.25",
                        letterSpacing: "-.05rem",
                    }}>Kaydolmak isteyebileceğiniz diğer kurslar</h2>
                </div>
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filterOutMyCourses().map((course) => {
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

export default HomeScreen