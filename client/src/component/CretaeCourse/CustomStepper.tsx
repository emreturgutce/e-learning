import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';
import CreateSection, {Section} from './Section/CreateSection';
import CreateCourse from './Course/CreateCourse';
import {Course, createCourse, CreateCourseRequest, createSection, uploadThumbnail} from "../../api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const steps = ['Kurs Oluşturma', 'Kurs Bölümlerini Oluşturma'];

export default function HorizontalNonLinearStepper() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [thumbnail, setThumbnail] = React.useState("");
    const [sections, setSections] = React.useState<Section[]>([]);
    const [course, setCourse] = React.useState<Course | null>(null);
    const [stepCompleted, setStepCompleted] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);

    useEffect(() => {
        console.log(files);
    }, [files])

    const handleCreateCourse = async () => {
        try {
            const request: CreateCourseRequest = {
                title,
                description,
                price,
                thumbnail: 'https://via.placeholder.com/600x400',
            }


            const data = await createCourse(request)
            if (files.length > 0) {
                const formData = new FormData();
                formData.append('file', files[0])
                await uploadThumbnail(data.data.course._id, formData)
            }
            setCourse(data.data.course)
            toast.success("Kurs oluşturuldu.")
        } catch (e) {
            console.error(e);
            toast.error("Kurs oluştururken hata oluştu.")
        }
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = async () => {
        if (activeStep === 0) {
            await handleCreateCourse()
        } else if (activeStep === 1) {
            await handleCreateSections()
        }
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleCreateSections = async () => {
        try {
            console.log(course)
            if (course && course._id && course.content) {
                await Promise.all(sections.map((s) => createSection(course._id, course.content!, {
                    title: s.title,
                    section_contents: s.section_contents.map((sc) => sc.id!),
                    order: s.order,
                })));
                toast.success("Bölümler eklendi.")
                navigate('/')
            }
        } catch (e) {
            console.error(e);
            toast.error("Bölümler eklenirken hata oluştu.")
        }
    }

    const handleComplete = async () => {
        if (activeStep === 0) {
            await handleCreateCourse()
        } else if (activeStep === 1) {
            await handleCreateSections()
        }
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        navigate("/")
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Container>


            <Box sx={{width: '100%', marginTop: 10}}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit">
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>

                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleReset}>Sıfırla</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {
                                activeStep === 0 && (
                                    <CreateCourse
                                        title={title}
                                        setTitle={setTitle}
                                        description={description}
                                        setDescription={setDescription}
                                        price={price}
                                        setPrice={setPrice}
                                        thumbnail={thumbnail}
                                        setThumbnail={setThumbnail}
                                        files={files}
                                        setFiles={setFiles}
                                    />
                                )
                            }
                            {
                                activeStep === 1 && (
                                    <CreateSection
                                        sections={sections}
                                        setSections={setSections}
                                    />
                                )
                            }
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{display: 'inline-block'}}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                        <>
                                            {completedSteps() === totalSteps() - 1 ? (
                                                <Button onClick={handleComplete}>
                                                    Tamamla
                                                </Button>
                                            ) : (
                                                <Button onClick={handleNext}>
                                                    Sonraki
                                                </Button>
                                            )
                                            }
                                        </>
                                    ))}
                            </Box>
                        </React.Fragment>
                    )}
                </div>
            </Box>
        </Container>
    );
}
