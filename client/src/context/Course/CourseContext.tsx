import { createContext, useState, useEffect, useContext, ReactChildren, ReactChild } from "react";
import { js, dataType } from '../../data/course-selection-data/data'

interface CoursesContextProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
interface CourseContextInterface {
  courses: dataType
  setCourses: React.Dispatch<React.SetStateAction<dataType>>
}
const CoursesContext = createContext<CourseContextInterface | null>(null);
const CoursesProvider = ({ children }: CoursesContextProps) => {
  const [courses, setCourses] = useState(js);

  const values = {
    courses,
    setCourses,
  };
  return (
    <CoursesContext.Provider value={values}>{children}</CoursesContext.Provider>
  );
};
const useCourses = () => useContext(CoursesContext);
export { useCourses, CoursesProvider };
