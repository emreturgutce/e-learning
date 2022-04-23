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
            <div className="max-w-2xl mx-auto py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4">
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