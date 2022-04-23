import React, {createContext, ReactChild, ReactChildren, useContext, useState} from 'react'
import { CourseCart, MyCourse } from '../../api'

interface UserContextProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

interface UserContextInterface {
  cart: CourseCart[];
  wishlist: MyCourse[];
  myCourses: MyCourse[];
  setCart: React.Dispatch<React.SetStateAction<CourseCart[]>>;
  setWishlist: React.Dispatch<React.SetStateAction<MyCourse[]>>;
  setMyCourses: React.Dispatch<React.SetStateAction<MyCourse[]>>;
}

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider = ({ children }: UserContextProps) => {
  const [cart, setCart] = useState<CourseCart[]>([]);
  const [wishlist, setWishlist] = useState<MyCourse[]>([]);
  const [myCourses, setMyCourses] = useState<MyCourse[]>([]);

  const values = {
    cart,
    setCart,
    wishlist,
    setWishlist,
    myCourses,
    setMyCourses,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
