import axios from "axios";
type userLoginType = {
  email: string | null | undefined
  password: string | null | undefined
}

export const fetchLogin = async (input: userLoginType) => {
  const { data } = await axios.post(
    `http://localhost:8080/api/v1.0/auth/login`,
    input,
    { withCredentials: true }
  );
  return { data };
};

export const fetchWishlist = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/users/getWishlist`,
    { withCredentials: true }
  );
  //console.log(response.data);
  return { data: response.data };
};

export const fetchPurchasedCourses = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/courses/list-purchased-courses`,
    { withCredentials: true }
  );
  return { data: response.data };
};