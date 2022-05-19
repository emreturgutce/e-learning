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
import {getCourseById} from '../../api';
import {useQuery, UseQueryOptions} from 'react-query';
import {useAuth} from "../../context/Auth/AuthContent";
import Quiz from "../../component/Quiz/Quiz";

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


const Course = () => {
    const userAuth = useAuth();
    const {id} = useParams();
    const {isLoading, error, data} = useQuery(["course", id], () =>
        getCourseById(id)
    );
    const navigate = useNavigate()

    const [value, setValue] = React.useState(0);
    const [course, setCourse] = React.useState(Courses[Number(1)])
    const [content, setContent] = React.useState(data?.data?.course?.content)
    const [section, setSection] = React.useState(content?.sections[0].section_contents?.[0])

    if (error) {
        navigate(`/course-detail/${id}`)
    }


    if (isLoading) return <div>"lOADİNG"</div>;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (!userAuth?.loggedIn) {
        return <Navigate to={"/SignIn"}/>
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
                                    <Quiz examId={section?.exam} />
                                </div>
                            )
                        }
                    </div>
                    <div className=''>
                        <Box
                            sx={{
                                bgcolor: '#fff',
                                height: 400,
                                overflow: 'hiden',
                                scrollbarColor: 'white',
                            }}
                        >
                            <AntTabs
                                value={value}
                                onChange={handleChange}
                                aria-label='ant example'
                            >
                                <AntTab label='Tab 1'/>
                                <AntTab label='Tab 2'/>
                                <AntTab label='Tab 3'/>
                            </AntTabs>
                            <TabPanel value={value} index={0}>
                                <ol className='relative border-l border-gray-200 dark:border-gray-700'>
                                    {course.reviews.map((item: any) => (
                                        <li className='mb-10 ml-6' key={item.id}>
                      <span
                          className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
                        <img
                            className='rounded-full shadow-lg'
                            src='/docs/images/people/profile-picture-3.jpg'
                        />
                      </span>
                                            <div
                                                className='justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600'>
                                                <time
                                                    className='mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0'>
                                                    just now
                                                </time>
                                                <div className='text-sm font-normal text-gray-500 dark:text-gray-300'>
                                                    {item.name}{' '}
                                                    <a
                                                        href='#'
                                                        className='font-semibold text-blue-600 dark:text-blue-500 hover:underline'
                                                    >
                                                        Jese Leos
                                                    </a>{' '}
                                                    to{' '}
                                                    <span
                                                        className='bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300'>
                            {item.desc}
                          </span>
                                                </div>
                                            </div>
                                        </li>
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
