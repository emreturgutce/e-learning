import React, {useEffect, useState} from "react";

import { Star, StarHalf } from "@mui/icons-material";

import styled from "styled-components";
import tw from 'twin.macro';
import {IconButton} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {addToCart, CourseCart, fetchCart} from "../../api";
import {useUserContext} from "../../context/User/UserContext";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-props.items: flex-start;
  max-width: 37.5rem;
  min-width: 17.3rem;
  
  color: #1c1d1f;
`;

const CourseImgWrapper = styled.div`
  
  ${tw`
  w-full 
  bg-gray-200 
  overflow-hidden 
`}
  

`;
const CourseImg = styled.img`
    ${tw`
    w-full 
    h-full 
    object-center 
    object-cover 
    
  `}
`;

const CourseTextWrapper = styled.div`
  padding: 12px 14px;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  width: 100%;
`;
const CourseTitle = styled.h3`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02rem;
  font-weight: 700;
  line-height: 1.2;
  ${tw`
  truncate 
  `}

`;
const CourseDes = styled.div`
  height: 35  px;
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CourseRateWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 0.4rem;
`;
export const CourseRateScore = styled.span`
  margin-right: 0.4rem;
  color: #b4690e;
  font-weight: 700;
  letter-spacing: -0.02rem;
  font-size: 1rem;
`;
export const CourseRateStars = styled.div`
  display: flex;
  align-props.items: center;
`;
export const CourseRateReviewerNum = styled.span`
  color: #6a6f73;
  margin-left: 0.4rem;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1rem;
`;

// for onsale
const PriceWrapper = styled.div`
  display: flex;
  align-props.items: center;
  margin-bottom: 0.4rem;
`;
const CrossOffPrice = styled.p`
  text-decoration: line-through;
  color: #787878;
  font-weight: 500;
  font-size: 1rem;
`;

const CoursePrice = styled.div`
  letter-spacing: -0.02rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const CourseMark = styled.div`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  white-space: nowrap;
  background-color: #eceb98;
  color: #3d3c0a;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 1.2rem;
`;
type courseType = {
  item: {
    _id: string;
    thumbnail: string;
    title: string;
    description: string;
    rateScore: number;
    reviews: string[];
    price: number;
    approved?: boolean;
  }
}
const CourseCard = (props: courseType) => {
  const navigate = useNavigate();
  const userContext = useUserContext()
  const [cart, setCart] = useState<CourseCart[]>([])
  const [isInCart, setIsInCart] = useState<boolean>(false)
  let increment = 0;
  let max = 5;

  useEffect(() => {
    fetchCart().then(({ data: { cart } }) => {
      setCart(cart);
      userContext?.setCart(cart);
      setIsInCart(isInCartFn(props.item._id))
      console.log(cart, isInCart, props.item._id)
    })
  }, [])

  const handleAddToCart = async (courseId: string) => {
    try {
      await addToCart(courseId)
      fetchCart().then(({ data: { cart } }) => {
        setCart(cart);
        userContext?.setCart(cart);
        setIsInCart(isInCartFn(props.item._id))
      })
    } catch (e) {
      console.error(e);
    }
  }

  const isInCartFn = (courseId: string) => !!cart.find((c) => c._id === courseId);

  return (
    <div className="border-slate-100" style={{boxShadow:'0 0 1px 1px rgb(28 29 31 / 10%), 0 3px 1px 0 rgb(28 29 31 / 10%)'}}>
      <CourseImgWrapper style={{cursor: 'pointer'}} onClick={() => navigate(`/Course/${props.item._id}`)}>
        <CourseImg src={props.item.thumbnail} alt={props.item.title}></CourseImg>
      </CourseImgWrapper>

      <CourseTextWrapper>
        <CourseTitle>{props.item.title}</CourseTitle>
        <CourseDes>{props.item.description}</CourseDes>

        <CourseRateWrapper>
          <CourseRateScore>{props.item.rateScore}</CourseRateScore>
          <CourseRateStars>
            {[...Array(5)].map((star, index) => {
              while (increment < props.item.rateScore) {
                if (props.item.rateScore - increment < 1) {
                  increment++;
                  return <StarHalf style={{ color: "#e59819" }}></StarHalf>;
                }
                increment++;
                return <Star style={{ color: "#e59819" }}></Star>;
              }
              while (max > props.item.rateScore) {
                max--;
                return <Star style={{ color: "gray" }}></Star>;
              }
            })}
          </CourseRateStars>
          <CourseRateReviewerNum>({props.item.reviews.length})</CourseRateReviewerNum>
        </CourseRateWrapper>
        <PriceWrapper>
          <div className="flex justify-between items-center w-full">
            <CoursePrice>₺{props.item.price}</CoursePrice>
            {
              isInCart ? (
                  <IconButton disabled onClick={() => handleAddToCart(props.item._id)}>
                    <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 24, color: 'black' }}
                    />
                  </IconButton>
              ) : (
                  <IconButton onClick={() => handleAddToCart(props.item._id)}>
                    <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 24, color: 'black' }}
                    />
                  </IconButton>
              )
            }
          </div>
        </PriceWrapper>
      </CourseTextWrapper>
    </div>
  );
};

export default CourseCard;
