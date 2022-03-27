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
  const data = useCourses()
  const courses = (data?.courses.slice(0, 3))
  const [totalMony, setTotalMony] = React.useState(0)
  React.useEffect(() => {
    let count = 0;
    let mony = 0;
    courses?.map((item) => {
      mony += item.price;
      count++;
    })
    setTotalMony(mony)

  }, [])

  return (
    <div>

      <Card sx={{ maxWidth: 345 }}>
        {!(courses?.length == 0) &&
          courses?.map((item) => (

            <CardContent key={item.id}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} >
                <Box gridColumn="span 4">
                  <CardMedia
                    component="img"
                    height="80"
                    image={item.img}
                    alt="Test"

                  />
                </Box>
                <Box gridColumn="span 8"><Typography gutterBottom sx={{ fontSize: 12, fontStyle: 'revert' }} component="div">
                  {item.title}
                </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>

                </Box>

              </Box>
            </CardContent>))
        }

        <CardActions>
          <Typography >{totalMony}</Typography>

          <Link to="/shoppingCart">CART</Link>

        </CardActions>
      </Card>
    </div>
  )
}

export default CartItems