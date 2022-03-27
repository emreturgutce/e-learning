import React from "react";

import { Star, StarHalf } from "@mui/icons-material";

import styled from "styled-components";
import tw from 'twin.macro';

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
  rounded-lg 
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
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  width: 100%;
`;
const CourseTitle = styled.h3`
  font-size: 1rem;
  height: 40px;
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

const CourseRateWrapper = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
`;
const CourseRateScore = styled.span`
  margin-right: 0.4rem;
  color: #b4690e;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 1rem;
`;
const CourseRateStars = styled.div`
  display: flex;
  align-props.items: center;
`;
const CourseRateReviewerNum = styled.span`
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
}
const Course = (props: courseType) => {
  let increment = 0;
  let max = 5;

  return (
    <div className="border-2 border-slate-100" style={{ borderRadius: 8 }}>
      <CourseImgWrapper>
        <CourseImg src={props.item.img} alt={props.item.title}></CourseImg>
      </CourseImgWrapper>

      <CourseTextWrapper>
        <CourseTitle>{props.item.title}</CourseTitle>
        <CourseDes>{props.item.desc}</CourseDes>

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
          <CourseRateReviewerNum>({props.item.reviewerNum})</CourseRateReviewerNum>
        </CourseRateWrapper>
        <PriceWrapper>
          {props.item.onSale ? (
            <>
              <CoursePrice>CA${props.item.onSalePrice}</CoursePrice>&nbsp;&nbsp;

            </>
          ) : (
            <CoursePrice>CA${props.item.price}</CoursePrice>
          )}
        </PriceWrapper>

        {props.item.mark && <CourseMark>{props.item.mark}</CourseMark>}
      </CourseTextWrapper>
    </div>
  );
};

export default Course;
