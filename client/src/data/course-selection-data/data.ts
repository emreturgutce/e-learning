export type dataType = {
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
}[];
type dataType2 = {
  id: string;
  preview: string;
  thumbnail: string;
  total_students: number;
  approved: true;
  content: {
    _id: string;
    title: string;
    section: {
      section_contents: {
        _id: string;
        title?: string;
        type: string;
        video_url?: string;
        duration?: number;
        owner: string;
        __v?: number;
      }[];
    }[];
  };
  price: number;
  reviews: {
    id: string;
    name: string;
    desc: string;
  }[];
  instructor: string;
  description: string;
  title: string;
}[];

export const pythonData: dataType = [
  {
    id: 0,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Learning Python for Data Analysis and Visualization",
    desc: "Jose Portilla",
    rateScore: 4.7,
    reviewerNum: "12,345",
    price: 119.99,
    onSale: true,
    onSalePrice: 99.99,
  },
  {
    id: 1,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Python for Beginners - Learn Programming from scratch",
    desc: "Edwin Diaz, Coding Faculty Solutions",
    rateScore: 4.6,
    reviewerNum: "122,345",
    price: 104.99,
    onSale: true,
    onSalePrice: 69.99,
  },
  {
    id: 2,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Learn Python: Python for Beginners",
    desc: "Abrar Hussain",
    rateScore: 4.1,
    reviewerNum: "122,345",
    price: 100.99,
    onSale: false,
  },
  {
    id: 3,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Python for Data Structures, Algorithms, and Interviews!",
    desc: "Jose Portilla",
    rateScore: 4.7,
    reviewerNum: "122,398",
    price: 120.99,
    onSale: true,
    onSalePrice: 79.99,
    mark: "bestseller",
  },
  {
    id: 4,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Automate the Boring Stuff with Python Programming",
    desc: "Al Sweigart",
    rateScore: 4.7,
    reviewerNum: "77,809",
    price: 54.99,
    onSale: true,
    onSalePrice: 12.99,
    mark: "bestseller",
  },
  {
    id: 5,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Python 3 For Offensive PenTest: A Complete Practical Course",
    desc: "Al Sweigart",
    rateScore: 4.6,
    reviewerNum: "199,008",
    price: 119.99,
    onSale: true,
    onSalePrice: 12.99,
    mark: "bestseller",
  },
  {
    id: 6,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Taming Big Data with Apache Spark and Python - Hands On!",
    desc: "Sundog Education",
    rateScore: 2,
    reviewerNum: "199,008",
    price: 149.99,
    onSale: true,
    onSalePrice: 129.99,
    mark: "bestseller",
  },
];
export const js: dataType = [
  {
    id: 0,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    title: "Taming Big Data with Apache Spark and Python - Hands On!",
    desc: "Framework Tech Media ",
    rateScore: 4.7,
    reviewerNum: "12,345",
    price: 119.99,
    onSale: true,
    onSalePrice: 99.99,
  },
  {
    id: 1,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "Taming Big Data with Apache Spark and Python - Hands On!",
    desc: "John Bura",
    rateScore: 4.7,
    reviewerNum: "1,198,709",
    price: 104.99,
    onSale: true,
    onSalePrice: 99.99,
  },
  {
    id: 2,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "1 Hour JavaScript asasas ??ll??l?? lop??op o ??l??l",
    desc: "Anthony Alicea",
    rateScore: 2,
    reviewerNum: "43,598",
    price: 100.999,
    onSale: true,
    onSalePrice: 89.99,
  },
  {
    id: 3,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "Javascript for Beginners Learn by Doing Practical Exercises",
    desc: "Edwin Diaz",
    rateScore: 4.9,
    reviewerNum: "43,598",
    price: 120.99,
    onSale: true,
    onSalePrice: 109.99,
    mark: "bestseller",
  },
  {
    id: 4,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "Automate the Boring Stuff with JS Programming",
    desc: "Al Sweigart",
    rateScore: 4.6,
    reviewerNum: "90,898",
    price: 54.99,
    onSale: true,
    onSalePrice: 29.99,
  },
  {
    id: 5,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "JavaScript from Beginner to Expert",
    desc: "Arkadiusz Wlodarczyk",
    rateScore: 4.4,
    reviewerNum: "21,398",
    price: 119.99,
    onSale: true,
    onSalePrice: 29.99,
    mark: "bestseller",
  },
  {
    id: 6,
    img: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "JavaScript for Kids: Code Your Own Games and Apps at Any Age",
    desc: "Bryson Payne",
    rateScore: 4.3,
    reviewerNum: "337,398",
    price: 69.99,
    onSale: true,
    onSalePrice: 24.99,
  },
];
export const excel: dataType = [
  {
    id: 0,
    img: "images/course-selection/excel/1.jpeg",
    title: "Microsoft Excel - From Beginner to Expert in 6 Hours",
    desc: "Todd McLeod",
    rateScore: 4.5,
    reviewerNum: "20,897",
    price: 69.99,
    onSale: false,
  },
  {
    id: 1,
    img: "images/course-selection/excel/2.jpeg",
    title: "Microsoft Excel 2013 Advanced. Online Excel Training Course",
    desc: "Infinite Skills",
    rateScore: 4.3,
    reviewerNum: "337,398",
    price: 104.99,
    onSale: true,
    onSalePrice: 69.99,
  },
  {
    id: 2,
    img: "images/course-selection/excel/3.jpeg",
    title: "Sharper skills using Microsoft Excel 2010 for business",
    desc: "Ulrika Hedlund",
    rateScore: 4.2,
    reviewerNum: "46,767",
    price: 100.99,
    onSale: true,
    onSalePrice: 69.99,
  },
  {
    id: 3,
    img: "images/course-selection/excel/4.jpeg",
    title: "Excel 2013",
    desc: "Learnit Anytime",
    rateScore: 4.2,
    reviewerNum: "46,767",
    price: 120.99,
    onSale: true,
    onSalePrice: 100.99,
  },
  {
    id: 4,
    img: "images/course-selection/excel/5.jpeg",
    title: "7 Steps To Excel Success - Excel Skills And Power Tips",
    desc: "Billy Wigley, Stephanie Jhoy Tumulak",
    rateScore: 4.8,
    reviewerNum: "46,767",
    price: 84.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 5,
    img: "images/course-selection/excel/6.jpeg",
    title: "Advanced Excel - Bigginner to Ninja level (includes Charts)",
    desc: "Rishabh Pugalia, Yoda Learning",
    rateScore: 4.7,
    reviewerNum: "46,767",
    price: 119.99,
    onSale: true,
    onSalePrice: 94.99,
  },
  {
    id: 6,
    img: "images/course-selection/excel/7.jpeg",
    title: "Use Excel Like A Pro. Fast.",
    desc: "Kieran Luke",
    rateScore: 4.7,
    reviewerNum: "66,732",
    price: 119.99,
    onSale: true,
    onSalePrice: 94.99,
  },
];
export const aws: dataType = [
  {
    id: 0,
    img: "images/course-selection/aws/1.jpeg",
    title: "Amazon Web Services (AWS) Certified 2022 - 4 Certifications!",
    desc: "Paul Coady",
    rateScore: 4.5,
    reviewerNum: "455,665",
    price: 149.99,
    onSale: true,
    onSalePrice: 100.99,
  },
  {
    id: 1,
    img: "images/course-selection/aws/2.jpeg",
    title: "AWS Certified Security Specialty 2022",
    desc: "Zeal Vora",
    rateScore: 4.5,
    reviewerNum: "45,632",
    price: 39.99,
    onSale: false,
    mark: "bestseller",
  },
  {
    id: 2,
    img: "images/course-selection/aws/3.jpeg",
    title: "Part 1: AWS Certified Solutions Architect SAA C02",
    desc: "Lingam",
    rateScore: 4.5,
    reviewerNum: "45,632",
    price: 99.99,
    onSale: true,
    onSalePrice: 59.99,
  },
  {
    id: 3,
    img: "images/course-selection/aws/4.jpeg",
    title: "Practice Test AWS Solutions Architect Associate SAA C02",
    desc: "Lingam",
    rateScore: 4.7,
    reviewerNum: "43,564",
    price: 99.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 4,
    img: "images/course-selection/aws/5.jpeg",
    title: "Part 2: AWS Certified Solutions Architect SAA C02",
    desc: "Lingam",
    rateScore: 4.7,
    reviewerNum: "3,343",
    price: 99.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 5,
    img: "images/course-selection/aws/6.jpeg",
    title: "AWS Certified Solutions Architect - Associate 2022",
    desc: "Alan Rodrigues",
    rateScore: 4.9,
    reviewerNum: "2,134",
    price: 119.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 6,
    img: "images/course-selection/aws/7.jpeg",
    title: "AWS Certified Solutions Architect - Associate 2022",
    desc: "Zeal Vora",
    rateScore: 4.9,
    reviewerNum: "1,234",
    price: 119.99,
    onSale: false,
  },
];
export const dataScience: dataType = [
  {
    id: 0,
    img: "images/course-selection/data-science/1.jpeg",
    title: "Data Science A-Z???: Real-Life Data Science Exercises Included",
    desc: "Kirill Ereme",
    rateScore: 4.5,
    reviewerNum: "455,665",
    price: 149.99,
    onSale: false,
  },
  {
    id: 1,
    img: "images/course-selection/data-science/2.jpeg",
    title: "Python for Data Science and Machine Learning Bootcamp",
    desc: "Frank Kane",
    rateScore: 4.5,
    reviewerNum: "45,632",
    price: 39.99,
    onSale: false,
    mark: "bestseller",
  },
  {
    id: 2,
    img: "images/course-selection/data-science/3.jpeg",
    title: "Machine Learning, Data Science and Deep Learning with Python",
    desc: "Frank Kane",
    rateScore: 4.9,
    reviewerNum: "2,134",
    price: 119.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 3,
    img: "images/course-selection/data-science/4.jpeg",
    title: "Data Science: Deep Learning and Neural Networks in Python",
    desc: "Lazy Programmer Inc.",
    rateScore: 4.5,
    reviewerNum: "45,632",
    price: 99.99,
    onSale: true,
    onSalePrice: 59.99,
  },
  {
    id: 4,
    img: "images/course-selection/data-science/5.jpeg",
    title: "R Programming A-Z???: R For Data Science With Real Exercises!",
    desc: "Kirill Eremet",
    rateScore: 4.8,
    reviewerNum: "46,767",
    price: 84.99,
    onSale: true,
    onSalePrice: 54.99,
  },
  {
    id: 5,
    img: "images/course-selection/data-science/6.jpeg",
    title: "Data Science and Machine Learning Bootcamp with R",
    desc: "Al Sweigart",
    rateScore: 4.1,
    reviewerNum: "46,767",
    price: 119.99,
    onSale: true,
    onSalePrice: 94.99,
  },
  {
    id: 6,
    img: "images/course-selection/data-science/7.jpeg",
    title: "R Programming: Advanced Analytics In R For Data Science",
    desc: "Kirill Ereme",
    rateScore: 4.3,
    reviewerNum: "337,398",
    price: 69.99,
    onSale: true,
    onSalePrice: 24.99,
  },
  {
    id: 7,
    img: "images/course-selection/data-science/8.jpeg",
    title: "Python for Data Science and Machine Learning Bootcamp",
    desc: "Jose Portilla",
    rateScore: 4.9,
    reviewerNum: "1,234",
    price: 119.99,
    onSale: false,
  },
];
const section_contents = [
  {
    _id: "1",
    title: "matematiksel hesap",
    type: "video",
    video_url: "https://www.youtube.com/watch?v=pKMojx5joxs",
    duration: 17,
    owner: "Ali1",
  },
  {
    _id: "2",
    title: "mant??k Module",
    type: "video",
    video_url: "https://www.youtube.com/watch?v=egr98Od0_w8",
    duration: 17,
    owner: "Ali1",
  },
  {
    _id: "3",
    title: "else-if",
    type: "video",
    video_url: "https://www.youtube.com/watch?v=4Gsw3EzATzI",
    duration: 17,
    owner: "Ali1",
  },
];
const section = [
  {
    id: "1",
    title: "python-bolum-1",
    section_contents: [section_contents[0], section_contents[1]],
  },
  {
    id: "2",
    title: "python-bolum-2",
    section_contents: [section_contents[2], section_contents[1]],
  },
];

export const Courses: dataType2 = [
  {
    id: "1",
    preview: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnail: "https://miro.medium.com/max/1400/1*RJMxLdTHqVBSijKmOO5MAg.jpeg",
    total_students: 10,
    content: { _id: "1", title: "test", section },
    approved: true,
    reviews: [{ id: "1", name: "Ali", desc: "Test Deneme " }],
    instructor: "Ali1",
    description: "Python ??al????ma Kursu",
    title: "Python",
    price: 100,
  },
  {
    id: "2",
    preview: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnail: "https://miro.medium.com/max/1400/1*RJMxLdTHqVBSijKmOO5MAg.jpeg",
    total_students: 10,
    content: { _id: "1", title: "test", section },
    approved: true,
    reviews: [
      { id: "1", name: "Ali", desc: "Test Deneme " },
      { id: "2", name: "Ali-2", desc: "Test Deneme-2 " },
    ],
    instructor: "Ali2",
    description: "Python ??al????ma Kursu-2",
    title: "Python-2",
    price: 200,
  },
];
