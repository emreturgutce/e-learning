
import { useState } from "react";
import { js } from "../../data/course-selection-data/data";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useCourses } from '../../context/Course/CourseContext'
const Learning = () => {
  const data = useCourses()
  const [myCourses, setMyCourses] = useState(data?.courses.slice(0, 4))

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setMyCourses(data?.courses.slice(value * 4 - 4, value * 4))
  };
  return (
    <div>

      <div className="max-w-2xl mx-auto   sm:mt-24 lg:max-w-7xl  w-3/4">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {!(myCourses?.length == 0) &&
            myCourses?.map((item) => (
              <a href="#" className="group border-2 border-slate-100 " style={{ borderRadius: 8 }} key={item.id}>
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img src={item.img} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" />
                </div>
                <p className="mt-1 text-md font-medium  truncate   text-gray-900">{item.desc} </p>
                <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
              </a>
            ))}

        </div>
        <Stack spacing={2} justifyContent="center"
          alignItems="center" mt={10}>
          <Pagination count={Math.round(js.length / 4)} onChange={handlePageChange} />
        </Stack>
      </div>

    </div>

  )
}

export default Learning