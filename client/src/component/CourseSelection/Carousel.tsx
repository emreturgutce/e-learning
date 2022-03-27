import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Course from "../course/Course";
type arrowProps = {
  direction: string;
}
const Container = styled.div`
  margin-top: 6.4rem;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`;
const CoursesList = styled.div`
  margin-top: 4.8rem;
  :hover {
    cursor: pointer;
  }
`;

const StudentsViewingTitle = styled.h2`
  margin-bottom: 1.6rem;

  max-width: 20rem;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.02rem;
  line-height: 1.2;
`;
const CourseWrapper = styled.div`
  position: relative;
`;
const Arrow = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  background-color: black;
  border: 1px solid #6a6f73;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 15%;
  right: ${(props: arrowProps) => props.direction === "right" && "-1.6rem"};
left: ${(props: arrowProps) => props.direction === "left" && "-1.6rem"};

margin: auto;
cursor: pointer;

z - index: 2;

  :hover {
  box - shadow: 0 2px 4px rgb(0 0 0 / 8 %), 0 4px 12px rgb(0 0 0 / 8 %);
}
`;
type datatype = {
  data: {
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
  }[]
}

const Carousel = (data: datatype) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;

  return (
    <CourseWrapper>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={15}
        leftChevron={
          <Arrow direction="left">
            {
              <FontAwesomeIcon
                style={{ color: "white", fontSize: "1rem" }}
                icon={faAngleLeft}
              />
            }
          </Arrow>
        }
        rightChevron={
          <Arrow direction="right">
            {
              <FontAwesomeIcon
                style={{ color: "white", fontSize: "1rem" }}
                icon={faAngleRight}
              />
            }
          </Arrow>
        }
        outsideChevron={false}
        chevronWidth={chevronWidth}
      >
        {data.data.map((item) => (
          <Course item={item} key={item.id} />
        ))}
      </ItemsCarousel>
    </CourseWrapper>
  );
};

const ArrowBtn = styled.button`
border-radius: 50 %;
background-color: black;
color: #fff;
height: 5rem;
width: 5rem;
font-size: 1rem;
  &:hover {
  opacity: 0.7;
}
`;

const Title = styled.div`
font-weight: bold;
font-size: 10px;
cursor: pointer;
  &:hover {
  opacity: 0.7;
}
`;

const AuthorAndRev = styled.p`
font-size: 10px;
color: #787878;
`;

const Rate = styled.p`
font-weight: bold;
color: #e59819;
font-size: 14px;
`;

const OriginalPrice = styled.p`
font-size: 14px;
font-weight: bold;
`;

const BestSeller = styled.img`
width: 5rem;
`;

const Flex = styled.div`
display: flex;
align - items: center;
`;

const RegularPrice = styled.p`
text - decoration: line - through;
color: #787878;
`;

const OnSalePrice = styled.p`
font-weight: bold;
font-size: 12px;
`;

const ImgFrame = styled.img`
width: 20rem;
height: auto;
border: 1px solid #c4c4c4;
cursor: pointer;
  &:hover {
  opacity: 0.7;
}
`;

const Rating = styled.img`
width: 6.5rem;
`;

const RateAndRev = styled.div`
display: flex;
align - items: center;
`;

export default Carousel;
