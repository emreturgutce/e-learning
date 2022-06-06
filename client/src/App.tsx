import FooterContainer from './container/FooterContainer';
import HeaderContainer from './container/HeaderContainer';
import SignInScreen from './screen/SignIn/SignInScreen';
import SignUpScreen from './screen/SignUp/SignUpScreen';
import {Route, Routes, useNavigate} from 'react-router-dom';
import HomeScreen from './screen/Home/HomeScreen';
import Wishlist from './component/wishlist/Wishlist';
import MyCourses from './screen/My-Courses/MyCourses';
import Course from './screen/Course/Course';
import ShoppingCart from './screen/Cart/ShoppingCart';
import {CoursesProvider} from './context/Course/CourseContext';
import CreateCourse from './screen/CreateCourse/CreateCourse';
import ProtectedUserRout from './screen/ProtectedUserRout';
import {useAuth} from './context/Auth/AuthContent';
import {getUser} from './api';
import {CourseDetail} from "./screen/Course/CourseDetail";
import {useEffect, useState} from "react";
import UnapprovedExams from './screen/UnapprovedExams';
import ApproveExam from "./screen/ApproveExam";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchCourses from "./screen/SearchCourses";
import Profile from "./screen/Profile";

function App() {
    const userAuth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUser().then((data) => {
            console.log("App", data);
            userAuth?.login(data.data.data.user)
        }).catch(() => {
            navigate('/SignIn')
        }).finally(() => {
            setIsLoading(false)
        });
    }, [])

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
            {
                !isLoading ? (
                    <div>
                        <CoursesProvider>
                            <HeaderContainer></HeaderContainer>
                            <Routes>
                                <Route path='/' element={<HomeScreen/>}/>

                                <Route path='/SignIn' element={<SignInScreen/>}/>
                                <Route path='/SignUp' element={<SignUpScreen/>}/>

                                <Route path='/unapproved-exams' element={
                                    <ProtectedUserRout user={"INSTRUCTOR"}>
                                        <UnapprovedExams/>
                                    </ProtectedUserRout>
                                }/>
                                <Route path='/approve-exam/:id' element={
                                    <ProtectedUserRout user={"INSTRUCTOR"}>
                                        <ApproveExam/>
                                    </ProtectedUserRout>
                                }/>
                                <Route path='/profile' element={<Profile/>}/>
                                <Route path='/shoppingCart' element={<ShoppingCart/>}/>
                                <Route path='/Course/:id' element={<Course/>}/>
                                <Route path='/course-detail/:id' element={<CourseDetail/>}/>
                                <Route path='/search-courses' element={<SearchCourses/>}></Route>
                                <Route
                                    path='/myCourse'
                                    element={
                                        <MyCourses/>
                                    }
                                />
                                <Route path='/list' element={<Wishlist/>}/>
                                <Route path='/CreateCourse' element={
                                    <ProtectedUserRout user={"INSTRUCTOR"}>
                                        <CreateCourse/>
                                    </ProtectedUserRout>
                                }/>
                                <Route path='/UpdateCourse/:id' element={
                                    <ProtectedUserRout user={"INSTRUCTOR"}>
                                        <CreateCourse/>
                                    </ProtectedUserRout>
                                }/>
                            </Routes>
                        </CoursesProvider>
                        <FooterContainer/>
                    </div>
                ) : <div>Loading</div>
            }
        </>
    );
}

export default App;
