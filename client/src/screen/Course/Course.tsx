import * as React from 'react';
import CustomizedAccordions from '../../component/Accordion/Accordion';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import ReactPlayer from 'react-player';
import {height} from '@mui/system';
import {Courses} from '../../data/course-selection-data/data';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {addReview, getCourseById} from '../../api';
import {useQuery, UseQueryOptions} from 'react-query';
import {useAuth} from "../../context/Auth/AuthContent";
import Quiz from "../../component/Quiz/Quiz";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import {Star, StarHalf} from "@mui/icons-material";
import {
    CourseRateReviewerNum,
    CourseRateScore,
    CourseRateStars,
    CourseRateWrapper
} from "../../component/course/CourseCard";
import {Button, Divider, Rating, TextField} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: 'black',
    },
});

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AntTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({theme}) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),

    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        color: '#40a9ff',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

interface StyledTabProps {
    label: string;
}


const StarReview = ({ rating }: { rating: number }) => {
    let increment = 0;
    let max = 5;
    return (
        <CourseRateWrapper>
            <CourseRateScore>{rating}</CourseRateScore>
            <CourseRateStars>
                {[...Array(5)].map((star, index) => {
                    while (increment < rating) {
                        if (rating - increment < 1) {
                            increment++;
                            return <StarHalf style={{ color: "#e59819", height: '1.2rem', width: '1rem' }}></StarHalf>;
                        }
                        increment++;
                        return <Star style={{ color: "#e59819", height: '1.2rem', width: '1rem' }}></Star>;
                    }
                    while (max > rating) {
                        max--;
                        return <Star style={{ color: "gray", height: '1.2rem', width: '1rem' }}></Star>;
                    }
                })}
            </CourseRateStars>
        </CourseRateWrapper>
    )
}

const Course = () => {
    const userAuth = useAuth();
    const {id} = useParams();
    const {isLoading, error, data} = useQuery(["course", id], () =>
            getCourseById(id),
        {staleTime: 0, retry: 0}
    );
    const navigate = useNavigate()

    const [value, setValue] = React.useState(0);
    const [course, setCourse] = React.useState(Courses[Number(1)])
    const [content, setContent] = React.useState(data?.data?.course?.content)
    const [section, setSection] = React.useState(content?.sections?.[0]?.section_contents?.[0])
    const [rating, setRating] = React.useState(5);
    const [comment, setComment] = React.useState("");

    console.log("Test ", error, data)
    if (error) {
        navigate(`/course-detail/${id}`, { replace: true })
    }


    if (isLoading) return <div>"lOADİNG"</div>;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"}/>
    }

    console.log("test",data?.data?.course)

    const handleSend = async () => {
        try {
            if (id) {
                await addReview(id, rating, comment);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between w-full'>
                <div className='border-8 flex flex-col basis-3/4'>
                    <div className='w-full text-center' style={{height: '600px'}}>
                        {
                            section?.type === 'VIDEO' && (
                                <ReactPlayer
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    url={section?.video_url}
                                />
                            )
                        }
                        {
                            section?.type === 'TEXT' && (
                                <div style={{padding: '3.2rem 14rem'}}>
                                    <h1 style={{
                                        fontFamily: 'udemy sans,sf pro display,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol',
                                        fontWeight: 500,
                                        lineHeight: 1.2,
                                        letterSpacing: '-.02rem',
                                        fontSize: '2.5rem',
                                        marginBottom: '2rem',
                                    }}>{section.title}</h1>
                                    <p style={{
                                        fontSize: '18px',
                                        textAlign: 'left',
                                        fontWeight: 300,
                                        lineHeight: 1.8
                                    }}>{section?.text}</p>
                                </div>
                            )
                        }
                        {
                            section?.type === 'QUIZ' && section.exam && (
                                <div style={{padding: '3.2rem 14rem'}}>
                                    <h1 className="mt-4 uppercase font-bold text-lg">{section.title}</h1>
                                    <Quiz examId={section?.exam}/>
                                </div>
                            )
                        }
                    </div>
                    <div className=''>
                        <Box
                            sx={{
                                bgcolor: '#fff',
                                height: 400,
                                overflow: 'scroll',
                                scrollbarColor: 'white',
                            }}
                        >
                            <AntTabs
                                value={value}
                                onChange={handleChange}
                                aria-label='ant example'
                            >
                                <AntTab label='Değerlendirmeler'/>
                                <AntTab label='Sohbet'/>
                            </AntTabs>
                            <TabPanel value={value} index={0}>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <Typography>Puan: </Typography>
                                        <Rating
                                            className="ml-2"
                                            name="simple-controlled"
                                            value={rating}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setRating(newValue);
                                                }
                                            }}
                                        />
                                    </div>
                                    <TextField
                                        label="Yorum"
                                        sx={{marginTop: 3, marginBottom: 3}}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <Button variant="text" onClick={handleSend}>Gönder</Button>
                                </div>
                                <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                                <ol className='relative border-l border-gray-200 dark:border-gray-700'>
                                    {data?.data?.course?.reviews?.map((item: any) => (
                                        <>
                                        <li className='mb-10 ml-6' key={item.id}>
                      <span
                          className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white'>
                        <Avatar sx={{ width: 38, height: 38, bgcolor: deepPurple[500] }}>{item.user?.firstname?.substring(0, 1) || 'M'}</Avatar>
                      </span>
                                            <div
                                                className='justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600'>
                                                <div className='text-sm font-normal text-gray-500 dark:text-gray-300'>
                                                    {item.user?.firstname || 'Anonymous'}
                                                    <span
                                                        className='bg-gray-100 text-gray-800 text-xs font-normal mx-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300'>
                            {item.description}
                          </span>
                                                </div>
                                                <StarReview rating={item.rating || 0} />
                                            </div>


                                        </li>

                                        </>

                                        ))}
                                </ol>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <Box sx={{p: 3}}/>
                        </Box>
                    </div>
                </div>

                <div className='basis-1/4 mr-0'>
                    {
                        data?.data?.course?.content && (
                            <CustomizedAccordions
                                content={data?.data?.course?.content}
                                title={data?.data.course.title}
                                setSection={setSection}
                            ></CustomizedAccordions>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Course;
