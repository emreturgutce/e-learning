import axios from 'axios';
type userLoginType = {
  email: string | null | undefined;
  password: string | null | undefined;
};

export enum UserType {
  USER = 'USER',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

type SignupRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: UserType;
};
type CourseType = {
  message: string
  data: {
    course: {
      approved?: false,
      total_students?: number,
      reviews?: [],
      categories?: [],
      price?: 100,
      _id?: string,
      title?: string,
      description?: string,
      thumbnail?: string,
      instructor?: string,
      __v?: number;
      content:
      {
        _id: string;
        title?: string;
        __v?: number;
        sections: {
          id: string;
          title?: string;
          section_contents: {
            _id: string;
            title?: string;
            type: string;
            video_url?: string;
            duration?: number;
            owner: string;
            __v?: number
          }[];
        }[]
      },
    }
  }


}
export const getCourseById = async (id: string | undefined): Promise<CourseType> => {
  console.log("sdğsdıs")
  const { data } = await axios.get(`http://localhost:8080/api/v1.0/courses/get-course/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const getUser = async () => {
  const { data } = await axios.get(`http://localhost:8080/api/v1.0/auth/me`, {
    withCredentials: true,
  });
  return { data };
};

export const logoutUser = async () => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1.0/auth/logout`,
    { withCredentials: true },
  );
  return { data };
};

export const signup = async (input: SignupRequest) => {
  const { data } = await axios.post(
    `http://localhost:8080/api/v1.0/auth/signup`,
    input,
  );
  return { data };
};

export const fetchLogin = async (input: userLoginType) => {
  const { data } = await axios.post(
    `http://localhost:8080/api/v1.0/auth/login`,
    input,
    { withCredentials: true },
  );
  return { data };
};

export const fetchWishlist = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/users/getWishlist`,
    { withCredentials: true },
  );
  //console.log(response.data);
  return { data: response.data };
};

export const fetchPurchasedCourses = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/courses/list-purchased-courses`,
    { withCredentials: true },
  );
  return { data: response.data };
};

export const fetchWishlistCourses = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/users/getWishlist`,
    { withCredentials: true },
  );
  return { data: response.data };
};
