import React, { useEffect, useState } from "react";
import { useCourses } from '../../context/Course/CourseContext'
import { Star, StarHalf } from "@mui/icons-material";
import styled from "styled-components";
import Box from '@mui/material/Box';
import {Button, CardMedia, Container, Typography } from "@mui/material";
import {CourseCart, fetchCart, purchaseCourses, removeFromCart} from "../../api";
import {useUserContext} from "../../context/User/UserContext";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/Auth/AuthContent";

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
  const userAuth = useAuth();
  const userContext = useUserContext()
  const [totalPrice, setTotalPrice] = useState(0)
  const [cart, setCart] = useState<CourseCart[]>([])

  useEffect(() => {
    fetchCart().then(({ data: { cart } }) => {
      console.log(cart);
      setCart(cart);
      userContext?.setCart(cart);
    })
  }, [])

  useEffect(() => {
    setTotalPrice(cart.reduce((prev, curr) => prev + curr.price, 0));
  }, [cart])

  if (!userAuth?.loggedIn) {
    return <Navigate to={"/SignIn"} />
  }

  const removeItem = async (id: string) => {
    try {
      await removeFromCart(id)
      const c = cart.filter((c) => c._id !== id)
      setCart(c);
      userContext?.setCart(c)
    } catch (e) {
      console.error(e);
    }
  }

  const purchaseCourse = async () => {
    try {
      const ids = cart.map((c) => c._id)
      await purchaseCourses(ids)
      fetchCart().then(({ data: { cart } }) => {
        console.log(cart);
        setCart(cart);
        userContext?.setCart(cart);
      })
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Container>



        <Box
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginTop: 10 }}
        >
          <Box sx={{ gridColumn: 'span 9', paddingRight: 5 }} >
            <Typography>Sepette {cart?.length} Kurs Var</Typography>

            {cart?.map((item) => (
              <Box
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginTop: 1, border: 1, borderColor: 'grey.100', }}
              >
                <Box sx={{ gridColumn: 'span 2' }} >
                  <CardMedia
                    component="img"
                    image={item.thumbnail ?? "https://img-c.udemycdn.com/course/240x135/1352468_3d97_7.jpg"}
                    sx={{ height: 80 }}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 6', paddingLeft: 1 }} >
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 13 }}>Eğitmen:{item.description}</Typography>
                  <Scoring rateScore={5} reviewerNum={item.reviews.length.toString()}></Scoring>
                </Box>
                <Box sx={{ gridColumn: 'span 2', paddingRight: 1 }} >
                  <Typography align="right" onClick={() => removeItem(item._id)}>Kaldır</Typography>
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

            {
              cart.length > 0 && (
                    <Button onClick={() => purchaseCourse()}>Satın Al</Button>
                )
            }

          </Box>



        </Box>

      </Container>

    </div>
  )
}

export default ShoppingCart