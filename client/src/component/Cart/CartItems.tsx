import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { js } from "../../data/course-selection-data/data";
import { Link } from 'react-router-dom';
import { useCourses } from '../../context/Course/CourseContext'
import {useUserContext} from "../../context/User/UserContext";
import {useEffect, useState} from "react";
import {CourseCart, fetchCart} from "../../api";
type CartItemsProps = {
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
}
interface ICourses {
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
const CartItems = () => {
  const userContext = useUserContext()
  const data = useCourses()
  const [totalMony, setTotalMony] = React.useState(0)
  const [cart, setCart] = useState<CourseCart[]>([])

  useEffect(() => {
    fetchCart().then(({ data: { cart } }) => {
      console.log(cart);
      setCart(cart);
      userContext?.setCart(cart);
    })
  }, [])

  useEffect(() => {
    setTotalMony(cart.reduce((prev, curr) => prev + curr.price, 0));
  }, [cart])


  return (
    <div>

      <Card sx={{ maxWidth: 345 }}>
        {!(cart?.length == 0) &&
          cart?.map((item) => (

            <CardContent key={item._id}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
                <Box gridColumn="span 4">
                  <CardMedia
                    component="img"
                    height="80"
                    image={item.thumbnail ?? "https://img-c.udemycdn.com/course/240x135/1352468_3d97_7.jpg"}
                    alt="Test"

                  />
                </Box>
                <Box gridColumn="span 8"><Typography gutterBottom sx={{ fontSize: 12, fontStyle: 'revert' }} component="div">
                  {item.title}
                </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>

                </Box>

              </Box>
            </CardContent>))
        }

        <CardActions>
          <div className="flex justify-between w-full">
            <Typography >{totalMony}</Typography>

            <Link to="/shoppingCart">CART</Link>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItems