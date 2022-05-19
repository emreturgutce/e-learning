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

export type Course = {
  approved: boolean,
  total_students: number,
  reviews: string[],
  categories: string[],
  price: number,
  _id: string,
  title: string,
  description: string,
  thumbnail: string,
  instructor: string,
  content?: string,
  __v: number;
}

export type CourseCart = {
  total_students: number,
  reviews: {
    _id: string,
    rating: number,
  }[],
  price: number,
  _id: string,
  title: string,
  description: string,
  thumbnail?: string,
  instructor: {
    _id: string,
    firstname?: string,
    lastname?: string,
  }
}

export type FetchCartResponse = {
  message: string;
  data: {
    cart: CourseCart[],
  },
}

type FetchCoursesResponse = {
  message: string;
  data: {
    courses: Course[],
  }
}

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
            text?: string;
            exam?: string;
            __v?: number
          }[];
          order: number;
        }[]
      },
    }
  }


}


type CourseDetailType = {
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
              order: number;
            }[]
          },
    }
  }
}

export type MyCourse = {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  instructor: {
    firstname: string;
    lastname: string;
  }
}

type MyCoursesType = {
  message: string
  data: {
    courses: MyCourse[]
  }
}
export const getCourseById = async (id: string | undefined): Promise<CourseType> => {
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
  //console.log(response);
  return { data: response.data };
};

export const fetchPurchasedCourses = async (): Promise<MyCoursesType> => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1.0/courses/list-purchased-courses`,
    { withCredentials: true },
  );
  return data;
};

export const fetchWishlistCourses = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1.0/users/getWishlist`,
    { withCredentials: true },
  );
  return { data: response.data };
};

export const fetchCourses = async (): Promise<FetchCoursesResponse> => {
  const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/courses`,
      { withCredentials: true },
  );
  return data;
}

export const fetchCart = async (): Promise<FetchCartResponse> => {
  const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/users/getCart`,
      { withCredentials: true },
  );
  return data;
}

export const removeFromCart = async (id: string): Promise<FetchCartResponse> => {
  const { data } = await axios.delete(
      `http://localhost:8080/api/v1.0/users/removeFromCart/${id}`,
      { withCredentials: true },
  );
  return data;
}

export const addToCart = async (courseId: string): Promise<void> => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/users/addCourseToCart/${courseId}`,
      null,
      { withCredentials: true },
  );
  return data;
}

export const purchaseCourses = async (courseIds: string[]): Promise<void> => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses/purchase-course`,
      { ids: courseIds },
      { withCredentials: true },
  );
  return data;
}
export const getCourseDetailById = async (id: string | undefined): Promise<CourseDetailType> => {
  const { data } = await axios.get(`http://localhost:8080/api/v1.0/courses/get-course-detail/${id}`, {
    withCredentials: true,
  });
  return data;
};
export const addToWishlist = async (courseId: string): Promise<void> => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/users/addCourseToWishlist/${courseId}`,
      null,
      { withCredentials: true },
  );
  return data;
}
export const removeFromWishlist = async (courseId: string): Promise<void> => {
  const { data } = await axios.delete(
      `http://localhost:8080/api/v1.0/users/removeFromWishlist/${courseId}`,
      { withCredentials: true },
  );
  return data;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const createCourse = async (request: CreateCourseRequest) => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses`,
      request,
      { withCredentials: true },
  );
  return data;
}

export interface CreateExamRequest {
  questions: {
    text: string;
    type: 'OPEN_ENDED' | 'MULTIPLE_CHOICES_SINGLE_ANSWER';
    options: string[];
    answer: string;
    point: number;
  }[];
}

export const createExam = async (request: CreateExamRequest) => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses/exams/create-exam/v2`,
      request,
      { withCredentials: true },
  );
  return data;
}

export interface CreateSectionContentRequest {
  title: string;
  type?: string;
  video_url?: string;
  text?: string;
  duration?: number;
  exam?: string;
}

export const createSectionContent = async (request: CreateSectionContentRequest) => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses/section-contents`,
      request,
      { withCredentials: true },
  );
  return data;
}

export interface CreateSectionRequest {
  title: string;
  section_contents: string[];
  order: number;
}

export const createSection = async (courseId: string, courseContentId: string, request: CreateSectionRequest) => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses/${courseId}/${courseContentId}/sections`,
      request,
      { withCredentials: true },
  );
  return data;
}

export interface Exam {
  questions: {
    options: string[],
    type: "OPEN_ENDED" | "MULTIPLE_CHOICES_SINGLE_ANSWER",
    _id: string,
    text: string,
    answer: string,
    point: number,
    owner: string,
  }[];
  isCompleted: boolean;
}

export interface GetExamByIdResponse {
  data: Exam
}

export const getExamById = async (examId: string): Promise<GetExamByIdResponse> => {
  const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/courses/get-exam-by-id/${examId}`,
      { withCredentials: true },
  );
  return data;
}

export const completeExam = async (examId: string, answers: string[]) => {
  const { data } = await axios.put(
      `http://localhost:8080/api/v1.0/courses/exams/complete-exam/${examId}`,
      answers,
      { withCredentials: true },
  );
  return data;
}

export const getCompletedExams = async () => {
  const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/courses/exams/completed-exam`,
      { withCredentials: true },
  );
  return data;
}

export const getUnapprovedExams = async () => {
  const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/courses/exams/unapproved-exams`,
      { withCredentials: true },
  );
  return data;
}

export const approveExam = async (examId: string, point: number) => {
  const { data } = await axios.post(
      `http://localhost:8080/api/v1.0/courses/exams/approve-exam/${examId}`,
      { point },
      { withCredentials: true },
  );
  return data;
}
