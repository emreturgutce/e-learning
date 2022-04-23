import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
type accordionType = {
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
  title?: string;
  setSection: React.Dispatch<React.SetStateAction<{
    _id: string;
    title?: string;
    type: string;
    video_url?: string;
    duration?: number;
    owner: string;
    __v?: number
  } | undefined>>;
}
export default function CustomizedAccordions(props: accordionType) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const [data, setData] = React.useState(props.content)
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  console.log(props.content)
  return (
    <div>

      {props.content &&
        <React.Fragment>
          <Toolbar >
            <Typography>{props.title}</Typography>
          </Toolbar>

          <Box sx={{ overflow: 'auto', height: 800 }}>
            {
              props.content.sections.map(
                (item, index) => (
                  < Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                      <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item?.section_contents && item.section_contents.map((section, index) => (
                        <div>
                          <Button onClick={() => props.setSection(item.section_contents[index])}>  {section.title}</Button>
                        </div>

                      ))}

                    </AccordionDetails>
                  </Accordion>
                )
              )
            }




          </Box>

        </React.Fragment>
      }
    </div >
  );
}
