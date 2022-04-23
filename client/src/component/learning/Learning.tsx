import { useEffect, useState } from 'react';
import { js } from '../../data/course-selection-data/data';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useCourses } from '../../context/Course/CourseContext';
import { useQuery } from 'react-query';
import {fetchPurchasedCourses, MyCourse} from '../../api';
import { Link } from 'react-router-dom';
import {useUserContext} from "../../context/User/UserContext";
const Learning = () => {


  const userContext = useUserContext();

  const { status, isError, data, error } = useQuery(
    'user:courses',
    fetchPurchasedCourses,
  );
  const [myCourses, setMyCourses] = useState<MyCourse[]>(data?.data.courses.slice(0, 4) ?? []);
  useEffect(() => {
    setMyCourses(data?.data.courses.slice(0, 4) ?? []);
    userContext?.setMyCourses(data?.data.courses ?? [])
  }, [data])

  if (status === "loading") return <div>"lOADİNG"</div>

  console.log('geldimi', myCourses);


  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setMyCourses(data?.data.courses.slice(value * 4 - 4, value * 4) ?? []);
  };

  return (

    <>

      {data?.data.courses && myCourses && < div >
        <div className='max-w-2xl mx-auto   sm:mt-24 lg:max-w-7xl  w-3/4'>
          <h2 className='sr-only'>Products</h2>
          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6'>
            {myCourses &&
              myCourses.map((item: any) => (
                <Link to={`/Course/${item._id}`} key={item._id + Math.random().toString()}>
                  <div

                    className='group rounded-t-lg border-2 marging p-1 border-slate-100 ' >

                    <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
                      <img
                        src={item.thumbnail}
                        alt='Tall slender porcelain bottle with natural clay textured body and cork stopper.'
                        className='w-full h-full object-center object-cover group-hover:opacity-75'
                      />
                    </div>
                    <p className='mt-1 text-md font-medium  truncate   text-gray-900'>
                      {item.description}{' '}
                    </p>
                    <h3 className='mt-4 text-sm text-gray-700'>
                      {item.title}- teacher:{item.instructor.firstname}
                    </h3>


                  </div>

                </Link>

              ))}
          </div>

          {Math.round(data?.data.courses.length / 4) > 0 && (
            <Stack
              spacing={2}
              justifyContent='center'
              alignItems='center'
              mt={10}
            >
              <Pagination
                count={Math.round(data?.data.courses.length / 4)}
                onChange={handlePageChange}
              />
            </Stack>
          )}
        </div>
      </div >
      }</>



  );
};

export default Learning;
