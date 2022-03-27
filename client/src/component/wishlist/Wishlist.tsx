import React from 'react'
import { pythonData } from "../../data/course-selection-data/data";
import Course from '../course/Course'
import { useCourses } from '../../context/Course/CourseContext'
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
}

const Wishlist = () => {
  const data = useCourses()
  return (
    <div>

      <div className="max-w-2xl mx-auto py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.courses.map((item: datatype) => (
            <Course item={item} key={item.id} />
          ))}
        </div>
      </div >
    </div>

  )
}

export default Wishlist