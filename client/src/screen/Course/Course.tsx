import * as React from 'react';
import CustomizedAccordions from "../../component/Accordion/Accordion"
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player'
import { height } from '@mui/system';
import { Courses } from '../../data/course-selection-data/data';
import { useParams } from 'react-router-dom';

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
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
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


  }),
);




interface StyledTabProps {
  label: string;
}



const Course = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [course, setCourse] = React.useState(Courses[Number(id)])
  const [content, setContent] = React.useState(course.content[0])
  const [section, setSection] = React.useState(content.section_contents[0])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="border-8 flex flex-col basis-3/4">
          <div className="w-ful text-center" ><ReactPlayer width='100%'
            height='400px' controls={true} url={`https://media.w3.org/2010/05/sintel/trailer_hd.mp4`} /></div>
          <div className="">
            <Box
              sx={{
                bgcolor: '#fff', height: 400, overflow: 'hiden',
                scrollbarColor: "white"
              }}>
              <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                <AntTab label="Tab 1" />
                <AntTab label="Tab 2" />
                <AntTab label="Tab 3" />
              </AntTabs>
              <TabPanel value={value} index={0}  >
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {course.reviews.map((item) => (
                    <li className="mb-10 ml-6" key={item.id}>
                      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img className="rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" />
                      </span>
                      <div className="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">{item.name} <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">{item.desc}</span></div>
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
              <Box sx={{ p: 3 }} />
            </Box>
          </div>
        </div>


        <div className="basis-1/4 mr-0" >
          <CustomizedAccordions content={course.content} title={course.title} setSection={setSection}></CustomizedAccordions>
        </div>
      </div>



    </div >
  )
}

export default Course