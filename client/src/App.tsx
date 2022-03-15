import React from 'react';
import create from 'zustand'
import FooterContainer from './container/FooterContainer';
import HeaderContainer from './container/HeaderContainer';
import SignInScreen from './screen/SignIn/SignInScreen';
import SignUpScreen from './screen/SignUp/SignUpScreen';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screen/Home/HomeScreen';


function App() {
  return (
    <div>
      <HeaderContainer></HeaderContainer>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="SignIn" element={<SignInScreen />} />
        <Route path="SignUp" element={<SignUpScreen />} />
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
