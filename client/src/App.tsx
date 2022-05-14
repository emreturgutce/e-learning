import FooterContainer from './container/FooterContainer';
import HeaderContainer from './container/HeaderContainer';
import SignInScreen from './screen/SignIn/SignInScreen';
import SignUpScreen from './screen/SignUp/SignUpScreen';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeScreen from './screen/Home/HomeScreen';
import Wishlist from './component/wishlist/Wishlist';
import MyCourses from './screen/My-Courses/MyCourses';
import Course from './screen/Course/Course';
import ShoppingCart from './screen/Cart/ShoppingCart';
import { CoursesProvider } from './context/Course/CourseContext';
import CreateCourse from './screen/CreateCourse/CreateCourse';
import ProtectedUserRout from './screen/ProtectedUserRout';
import { useAuth } from './context/Auth/AuthContent';
import { getUser } from './api';
import { useQuery } from 'react-query';
import {CourseDetail} from "./screen/Course/CourseDetail";

function App() {
  const userAuth = useAuth();

  const { isLoading, isError, data, error } = useQuery('user:me', getUser);

  console.log(data);

  if (data?.data.data.user) {
    userAuth?.login(data?.data.data.user);
  }

  return (
    <div>
      <CoursesProvider>
        <HeaderContainer></HeaderContainer>
        <Routes>
          <Route path='/' element={<HomeScreen />} />

          <Route path='/SignIn' element={<SignInScreen />} />
          <Route path='/SignUp' element={<SignUpScreen />} />

          <Route path='/shoppingCart' element={<ShoppingCart />} />
          <Route path='/Course/:id' element={<Course />} />
          <Route path='/course-detail/:id' element={<CourseDetail />} />
          <Route
            path='/myCourse'
            element={
              <ProtectedUserRout user={true}>
                <MyCourses />
              </ProtectedUserRout>
            }
          />
          <Route path='/list' element={<Wishlist />} />
          <Route path='/CreateCourse' element={<CreateCourse />} />
        </Routes>
      </CoursesProvider>
      <FooterContainer />
    </div>
  );
}

export default App;
