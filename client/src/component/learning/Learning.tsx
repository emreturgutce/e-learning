import { useEffect, useState } from 'react';
import { js } from '../../data/course-selection-data/data';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useCourses } from '../../context/Course/CourseContext';
import { useQuery } from 'react-query';
import {fetchPurchasedCourses, MyCourse} from '../../api';
import {Link, useNavigate} from 'react-router-dom';
import {useUserContext} from "../../context/User/UserContext";
import {useAuth} from "../../context/Auth/AuthContent";
const Learning = () => {
  const navigate = useNavigate();
  const auth = useAuth()


  const userContext = useUserContext();

  const { status, isError, data, error } = useQuery(
    'user:courses',
    fetchPurchasedCourses,
    { staleTime: 0,
    refetchOnMount: true,
    }
  );
  const [myCourses, setMyCourses] = useState<MyCourse[]>(data?.data.courses.slice(0, 4) ?? []);
  useEffect(() => {
    setMyCourses(data?.data.courses.slice(0, 8) ?? []);
    userContext?.setMyCourses(data?.data.courses ?? [])
  }, [data])

  if (status === "loading") return <div>"lOADİNG"</div>

  console.log('geldimi', myCourses);


  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setMyCourses(data?.data.courses.slice(value * 8 - 8, value * 8) ?? []);
  };

  return (

    <>

      {data?.data.courses && myCourses && < div >
        <div className='max-w-2xl mx-auto   sm:mt-24 lg:max-w-7xl  w-3/4'>
          <h2 className='sr-only'>Products</h2>
          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6'>
            {myCourses &&
              myCourses.map((item: any) => (
                <Link to={`/${auth?.user?.type === "INSTRUCTOR" ? "UpdateCourse" : "Course"}/${item._id}`} key={item._id + Math.random().toString()} style={{height: 250}}>
                  <div
                      style={{borderRadius: 8}}
                    className='group border-2 marging border-slate-100 h-full' >

                    <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8'
                    style={{
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}>
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

                </Link>

              ))}
          </div>
          {Math.round(data?.data.courses.length / 8) > 0 && (
            <Stack
              spacing={2}
              justifyContent='center'
              alignItems='center'
              mt={10}
            >
              <Pagination
                count={Math.round(data?.data.courses.length / 8)}
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
