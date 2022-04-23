import React, {useEffect, useState} from 'react';
import { pythonData } from '../../data/course-selection-data/data';
import CourseCard from '../course/CourseCard';
import { useCourses } from '../../context/Course/CourseContext';
import {fetchWishlistCourses, MyCourse} from '../../api';
import { useQuery } from 'react-query';
import {useUserContext} from "../../context/User/UserContext";
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
  const userContext = useUserContext();
  const { isLoading, isError, data, error } = useQuery(
    'user:wishlist',
    fetchWishlistCourses,
  );
  const [wishlist, setWishlist] = useState<MyCourse[]>(data?.data.data.wishlist)

  useEffect(() => {
    setWishlist(data?.data.data.wishlist);
    userContext?.setWishlist(data?.data.data.wishlist);
  }, [data]);

  console.log(data);

  return (
    <div>
      <div className='max-w-2xl mx-auto py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-3/4'>
        <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {wishlist?.map((item: any) => (
            <a
              href='#'
              className='group border-2 border-slate-100 overflow-hidden '
              style={{ borderRadius: 8 }}
              key={item._id}
            >
              <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
                <img
                  src='https://i.haber3.com/files/2018/11/7/4965548/4965548_0.jpg'
                  alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                  className='w-full h-full object-center object-cover group-hover:opacity-75'
                />
              </div>
              <p className='mt-1 text-md font-medium  truncate   text-gray-900'>
                {item.description}{' '}
              </p>
              <h3 className='mt-4 text-sm text-gray-700'>
                {item.title}- teacher:{item.instructor._id}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
