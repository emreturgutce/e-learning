import React, {useEffect, useState} from "react";
import {Course as CourseType, fetchCourses} from "../../api";
import CourseCard from '../../component/course/CourseCard';

const HomeScreen = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 50;

    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        fetchCourses().then(({data: {courses}}) => {
            setCourses(courses)
        });
    }, [])

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
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {courses.map((course) => {
                        return (
                            <CourseCard item={{
                                ...course,
                                thumbnail: "https://img-c.udemycdn.com/course/240x135/1352468_3d97_7.jpg",
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