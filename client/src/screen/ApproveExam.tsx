import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {Navigate, useLocation, useParams} from "react-router-dom";
import {approveExam} from "../api";


export default function ApproveExam() {
    const {id,} = useParams();
    const location: any = useLocation();
    const [activeIdx, setActiveIdx] = useState(0);
    const [open, setOpen] = useState(false);
    const [point, setPoint] = useState(0);
    const [points, setPoints] = useState<number[]>(new Array<number>(location.state.exam.questions.length).fill(0));
    const [isTrue, setIsTrue] = useState(false);
    const [type, setType] = useState<string>("OPEN_ENDED");

    console.log(location.state);

    useEffect(() => {
        setType(location.state.exam.questions[activeIdx].type)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (!location.state.exam) {
        return <Navigate to="/"/>
    }

    const handleNext = () => {
        setActiveIdx(activeIdx + 1);
        setType(location.state.exam.questions[activeIdx + 1].type)
        console.log(type);
    }

    const handlePrev = () => {
        setActiveIdx(activeIdx - 1);
        setType(location.state.exam.questions[activeIdx - 1].type)
        console.log(type);
    }

    if (!id) {
        return <Navigate to="/"/>
    }

    const handleFinish = async () => {
        try {
            await approveExam(location.state._id, point);
        } catch (e) {
            console.error(e);
        }
    }

    const handleAddPoint = () => {
        if (type !== 'OPEN_ENDED') {
            const newPoints = points.map((p, i) => {
                if (i === activeIdx) {
                    return location.state.exam.questions[activeIdx].point
                }
                return p
            })
            setPoints(newPoints)
            return
        }
        console.log(point, points, location.state.exam.questions[activeIdx])
        if (location.state.exam.questions[activeIdx].point < point) {
            return
        }

        const newPoints = points.map((p, i) => {
            if (i === activeIdx) {
                return point
            }
            return p
        })
        console.log(newPoints);
        setPoints(newPoints)
    }

    return (
        <div className="p-8 pt-4">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Puanla</DialogTitle>
                <DialogContent style={{width: '500px'}}>
                    {
                        type === 'OPEN_ENDED' ? (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="sectionTitle"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={point}
                                onChange={(e) => setPoint(Number(e.currentTarget.value))}
                            />
                        ) : (
                            <FormControl className="w-full"
                            >
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={isTrue}
                                    onChange={(e) => setIsTrue(Boolean(e.target.value))}
                                >
                                    <FormControlLabel value="true"
                                                      key="true"
                                                      control={<Radio/>}
                                                      label="Doğru"/>
                                    <FormControlLabel value="false"
                                                      key="false"
                                                      control={<Radio/>}
                                                      label="Yanlış"/>
                                </RadioGroup>
                            </FormControl>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal Et</Button>
                    <Button onClick={handleAddPoint}>Puanla</Button>
                </DialogActions>
            </Dialog>
            <h1>{points.reduce((p, c) => p + c, 0)} points</h1>
            {
                location.state.exam?.questions.map((question: any, idx: any) => (
                    activeIdx === idx && (
                        <div className="mt-6">
                            <div className="flex align-left justify-between mb-3 w-full">
                                <div className="flex align-left justify-start">
                                    <h1 className="font-bold">{idx + 1})&nbsp;</h1>
                                    <p>{question.text}</p>
                                </div>
                                <Button onClick={handleClickOpen}>Puanla</Button>
                            </div>
                            <div className="w-full">
                                {
                                    question.type === 'OPEN_ENDED' && (
                                        <TextField
                                            className="w-full"
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            value={location.state.answer[idx]}
                                            disabled
                                        />
                                    )
                                }
                                {
                                    question.type === 'MULTIPLE_CHOICES_SINGLE_ANSWER' && (
                                        <FormControl className="w-full"
                                                     disabled
                                        >
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                value={location.state.answer[idx]}
                                            >
                                                {
                                                    question.options.map((option: any) => (
                                                        <FormControlLabel value={option}
                                                                          key={option}
                                                                          control={<Radio/>}
                                                                          label={option}/>
                                                    ))
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    )
                                }

                            </div>
                            <div className="w-full flex align-self justify-end">
                                <Button
                                    onClick={handlePrev}>Önceki</Button>

                                {
                                    activeIdx === location.state.exam.questions.length - 1 ? (
                                        <Button
                                            onClick={handleFinish}>Bitir</Button>
                                    ) : (
                                        <Button
                                            onClick={handleNext}>Sonraki</Button>
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