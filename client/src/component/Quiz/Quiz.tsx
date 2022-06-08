import React, {useEffect, useState} from 'react';
import {completeExam, Exam, getCompletedExams, getExamById, GetExamByIdResponse} from "../../api";
import {Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";

interface Props {
    examId: string;
}

export default function Quiz(props: Props) {
    const [exam, setExam] = useState<Exam | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeIdx, setActiveIdx] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        getExamById(props.examId)
            .then((data: any) => {
                console.log("Sada", data)
                setExam({questions: data.data.exam.questions, isCompleted: data.data.exam.isCompleted});
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })
    }, [props.examId])

    const handleNext = () => {
        setActiveIdx(activeIdx + 1);
        setAnswers([...answers, answer])
        setAnswer("");
    }

    const handleFinish = async () => {
        try {
            const newAnswers = [...answers, answer];
            setAnswers(newAnswers)
            setAnswer("");
            console.log("Asd", newAnswers)
            await completeExam(props.examId, newAnswers)
            getExamById(props.examId)
                .then((data: any) => {
                    console.log(data)
                    setExam({questions: data.data.exam.questions, isCompleted: data.data.exam.isCompleted});
                })
                .catch(console.error)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <div>Loading</div>
                ) : (
                    <>
                    {
                        exam?.isCompleted ? (
                            <div>Zaten sınavı tamamladın.</div>
                        ) : (
                            <div className="p-8 pt-4">
                                {
                                    exam?.questions.map((question, idx) => (
                                        activeIdx === idx && (
                                            <div className="mt-6">
                                                <div className="flex align-left justify-start mb-3">
                                                    <h1 className="font-bold">{idx + 1})&nbsp;</h1>
                                                    <p>{question.text}</p>
                                                </div>
                                                <div className="w-full">
                                                    {
                                                        question.type === 'OPEN_ENDED' && (
                                                            <TextField
                                                                className="w-full"
                                                                id="outlined-multiline-static"
                                                                multiline
                                                                rows={4}
                                                                value={answer}
                                                                onChange={(e) => setAnswer(e.target.value)}
                                                            />
                                                        )
                                                    }
                                                    {
                                                        question.type === 'MULTIPLE_CHOICES_SINGLE_ANSWER' && (
                                                            <FormControl className="w-full"
                                                            >
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    defaultValue="female"
                                                                    name="radio-buttons-group"
                                                                    value={answer}
                                                                    onChange={(e) => setAnswer(e.target.value)}
                                                                >
                                                                    {
                                                                        question.options.map((option) => (
                                                                            <FormControlLabel value={option} key={option}
                                                                                              control={<Radio/>} label={option}/>
                                                                        ))
                                                                    }
                                                                </RadioGroup>
                                                            </FormControl>
                                                        )
                                                    }

                                                </div>
                                                <div className="w-full flex align-self justify-end">
                                                    {
                                                        activeIdx === exam?.questions.length - 1 ? (
                                                            <Button disabled={answer.length === 0} onClick={handleFinish}>Bitir</Button>
                                                        ) : (
                                                            <Button disabled={answer.length === 0} onClick={handleNext}>Sonraki</Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    ))

                                }
                            </div>

                        )
                    }
                    </>
                )
            }
        </>
    )
}