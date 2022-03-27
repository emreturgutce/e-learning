import React, { useEffect, useState } from "react";
import { useCourses } from '../../context/Course/CourseContext'
import { Star, StarHalf } from "@mui/icons-material";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { CardMedia, Container, Typography } from "@mui/material";

const CourseRateStars = styled.div`
  display: flex;
  align-props.items: center;
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
const CourseRateReviewerNum = styled.span`
  color: #6a6f73;
  margin-left: 0.4rem;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1rem;
`;


type scoringType = {
  rateScore: Number;
  reviewerNum: String

}
const Scoring = (props: scoringType) => {
  let increment = 0;
  let max = 5;
  return (
    <CourseRateWrapper>
      <CourseRateScore>{props.rateScore}</CourseRateScore>
      <CourseRateStars>
        {[...Array(5)].map((star, index) => {
          while (increment < props.rateScore) {

            if (Number(props.rateScore) - increment < 1) {
              increment++;
              return <StarHalf style={{ color: "#e59819" }}></StarHalf>;
            }
            increment++;
            return <Star style={{ color: "#e59819" }}></Star>;
          }
          while (max > props.rateScore) {
            max--;
            return <Star style={{ color: "gray" }}></Star>;
          }
        })

        }
      </CourseRateStars>
      <CourseRateReviewerNum>{props.reviewerNum}</CourseRateReviewerNum>
    </CourseRateWrapper>
  )
}


const ShoppingCart = () => {
  const data = useCourses()
  const ShoppingCartItem = data?.courses.slice(0, 3)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    ShoppingCartItem?.map((item) => {
      setTotalPrice((prevState) => prevState + item.price)
    })
  }, [])

  return (
    <div>
      <Container>



        <Box
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginTop: 10 }}
        >
          <Box sx={{ gridColumn: 'span 9', paddingRight: 5 }} >
            <Typography>Sepette {ShoppingCartItem?.length} Kurs Var</Typography>

            {ShoppingCartItem?.map((item) => (
              <Box
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginTop: 1, border: 1, borderColor: 'grey.100', }}
              >
                <Box sx={{ gridColumn: 'span 2' }} >
                  <CardMedia
                    component="img"
                    image={item.img}
                    sx={{ height: 80 }}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 6', paddingLeft: 1 }} >
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 13 }}>Eğitmen:{item.desc}</Typography>
                  <Scoring rateScore={item.rateScore} reviewerNum={item.reviewerNum}></Scoring>
                </Box>
                <Box sx={{ gridColumn: 'span 2', paddingRight: 1 }} >
                  <Typography align="right">Kaldır</Typography>
                  <Typography align="right">istek listesi</Typography>
                </Box>
                <Box sx={{ gridColumn: 'span 2', marginRight: 2 }} >
                  <Typography sx={{ textAlign: "right" }}>{item.price}</Typography>

                </Box>
              </Box>
            ))}

          </Box>
          <Box sx={{ gridColumn: 'span 3', fontWeight: 'bold', color: "black" }} >
            <Typography>
              Toplam:
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }} component="h2">
              {totalPrice.toFixed(2)}
            </Typography>


          </Box>


        </Box>

      </Container>

    </div>
  )
}

export default ShoppingCart