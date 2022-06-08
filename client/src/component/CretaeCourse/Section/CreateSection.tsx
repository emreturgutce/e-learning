import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import {createExam, CreateExamRequest, createSectionContent, uploadVideo} from "../../../api";
import {DropzoneArea} from "material-ui-dropzone";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete'


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface Section {
    id: number;
    title: string;
    section_contents: SectionContent[];
    order: number;
}

enum ContentType {
    VIDEO = 'VIDEO',
    QUIZ = 'QUIZ',
    TEXT = 'TEXT',
}

export interface SectionContent {
    id?: string;
    title: string,
    type?: ContentType,
    video_url?: string;
    text?: string;
    duration?: number;
    exam?: string;
}

export enum QuestionType {
    OPEN_ENDED = 'OPEN_ENDED',
    MULTIPLE_CHOICES_SINGLE_ANSWER = 'MULTIPLE_CHOICES_SINGLE_ANSWER',
}

interface Question {
    text: string;
    type: QuestionType;
    options: string[];
    answer: string;
    point: number;
}

export interface Props {
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

export default function CreateSection({
                                          sections,
                                          setSections,
                                      }: Props) {
    const [id, setId] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openContent, setOpenContent] = React.useState(false);
    const [contentTitle, setContentTitle] = React.useState("");
    const [contentType, setContentType] = React.useState<ContentType>(ContentType.VIDEO);
    const [videoUrl, setVideoUrl] = React.useState("");
    const [text, setText] = React.useState("");
    const [duration, setDuration] = React.useState(0);
    const [selectedSection, setSelectedSection] = React.useState(0);
    const [openQuestion, setOpenQuestion] = React.useState(false);
    const [questionType, setQuestionType] = React.useState<QuestionType>(QuestionType.OPEN_ENDED);
    const [questionText, setQuestionText] = React.useState("");
    const [option, setOption] = React.useState<string>("");
    const [options, setOptions] = React.useState<string[]>([]);
    const [answer, setAnswer] = React.useState("");
    const [point, setPoint] = React.useState(0);
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [exam, setExam] = React.useState<string>("");
    const [sectionTitle, setSectionTitle] = React.useState("");
    const [files, setFiles] = React.useState<File[]>([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClickOpenContent = (id: number) => {
        console.log(id)
        setSelectedSection(id);
        setOpenContent(true);
    };

    const handleCloseContent = () => {
        setOpenContent(false);
    };

    const handleAddSection = () => {
        setSections([...sections, {title: sectionTitle, section_contents: [], id: id, order: id}])
        setId(id + 1)
        setSectionTitle("")
        handleClose()
    }

    React.useEffect(() => {
        console.log("test ", sections);
    }, [sections])

    const handleCreateQuestions = async () => {
        try {
            const request: CreateExamRequest = {
                questions,
            };
            const data = await createExam(request);
            console.log(data);
            setExam(data.data.exam._id);
            handleCloseQuestion();
        } catch (e) {
            console.error(e);
        }
    }

    const handleClickOpenQuestion = () => {
        setOpenQuestion(true);
    };

    const handleCloseQuestion = () => {
        setOpenQuestion(false);
    };

    const handleAddSectionContent = async () => {
        try {
            const section = sections.find((s) => s.id === selectedSection);
            if (!section) {
                return;
            }
            const otherSections = sections.filter((s) => s.id !== selectedSection);

            let sectionContent: SectionContent = {
                title: contentTitle,
                type: contentType,
                duration: duration,
            };
            if (contentType === 'QUIZ') {
                sectionContent = {
                    ...sectionContent,
                    exam,
                }
            } else if (contentType === 'VIDEO') {
                sectionContent = {
                    ...sectionContent,
                    video_url: "",
                }
            } else if (contentType === 'TEXT') {
                sectionContent = {
                    ...sectionContent,
                    text,
                }
            }

            console.log(sectionContent);
            const data = await createSectionContent(sectionContent)
            if (contentType === 'VIDEO' && files.length > 0) {
                const formData = new FormData()
                formData.append('file', files[0])
                await uploadVideo(data.data.sectionContent._id, formData)
            }
            sectionContent.id = data.data.sectionContent._id

            const sectionsCopy = [...otherSections, {
                ...section,
                section_contents: [...section.section_contents, sectionContent]
            }];
            setSections(sectionsCopy.sort((a, b) => a.id - b.id))
            handleCloseContent()
            setExam("")
            setVideoUrl("")
            setText("")
            setContentTitle("")
            setContentType(ContentType.TEXT)
            setDuration(0)
            handleCloseContent()
        } catch (e) {
            console.error(e);
        }
    }

    const addNewOption = () => {
        if (options.some((o) => o === option)) {
            return;
        }
        setOptions([...options, option]);
        setOption("")
    }

    const handleCreateQuestion = () => {
        setQuestions([...questions, {
            text: questionText,
            type: questionType,
            answer: answer,
            options: options,
            point: point
        }])
        setQuestionText("")
        setQuestionType(QuestionType.OPEN_ENDED)
        setAnswer("")
        setOptions([])
        setPoint(0)
    };

    const handleRemove = (contentId: string | undefined) => {
        if (contentId === undefined) {
            return
        }
        const section = sections.find((s) => s.id === selectedSection);
        if (!section) {
            return;
        }
        section.section_contents = section.section_contents.filter((sc) => sc.id !== contentId)
        const s = sections.map((s) => {
            if (s.id === selectedSection) {
                return section
            }
            return s
        })
        setSections(s)
    }

    const handleRemoveQuestion = (text: string) => {
        const qs = questions.filter((q) => q.text !== text)
        setQuestions(qs);
    }

    return (
        <>
            <Container sx={{marginTop: 5, justifyItems: "center", justifyContent: "center"}}>
                <Box>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} className="flex align-center justify-between">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {
                                sections.map((s, i) => (
                                    <Tab key={i} label={s.title} {...a11yProps(i)} />
                                ))
                            }
                        </Tabs>
                        <Button onClick={handleClickOpen}>Bölüm Ekle</Button>
                    </Box>
                    {
                        sections.map((s, i) => (
                            <TabPanel key={i} value={value} index={i}>
                                <Button onClick={() => handleClickOpenContent(s.id)}>Bölüm İçeriği Ekle</Button>
                                <div>
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>İçerik Adı</TableCell>
                                                        <TableCell>İçerik Süresi</TableCell>
                                                        <TableCell>İçerik Tipi</TableCell>
                                                        <TableCell align="right">Aksiyonlar</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {s.section_contents.map((sc) => (
                                                        <TableRow
                                                            key={sc.id}
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {sc.title}
                                                            </TableCell>
                                                            <TableCell component="th"
                                                                       scope="row">{sc.duration}dk</TableCell>
                                                            <TableCell component="th"
                                                                       scope="row">{sc.type === ContentType.TEXT ? "Yazı" : (sc.type === ContentType.QUIZ ? "Sınav" : "Video")}</TableCell>
                                                            <TableCell align="right">
                                                                <IconButton
                                                                    onClick={() => handleRemove(sc.id)}
                                                                    size="small"
                                                                    sx={{ml: 2}}
                                                                >
                                                                    <DeleteIcon/>
                                                                </IconButton>

                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                </div>
                            </TabPanel>
                        ))
                    }
                </Box>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bölüm Ekle</DialogTitle>
                <DialogContent style={{width: '500px'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sectionTitle"
                        label="Bölüm Başlığı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={sectionTitle}
                        onChange={(e) => setSectionTitle(e.currentTarget.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal Et</Button>
                    <Button onClick={handleAddSection}>Oluştur</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openContent} onClose={handleCloseContent}>
                <DialogTitle>Bölüm İçeriği Ekle</DialogTitle>
                <DialogContent style={{width: '500px'}}>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="contentTitle"
                        label="İçerik Başlığı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={contentTitle}
                        onChange={(e) => setContentTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="duration"
                        label="İçerik Süresi (dk)"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                    <TextField
                        required
                        id="contentType"
                        select
                        label="İçerik Türü"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as ContentType)}
                        variant="standard"
                        fullWidth
                        sx={{marginTop: '8px'}}
                    >
                        <MenuItem key="VIDEO" value="VIDEO">
                            Video
                        </MenuItem>
                        <MenuItem key="TEXT" value="TEXT">
                            Yazı
                        </MenuItem>
                        <MenuItem key="QUIZ" value="QUIZ">
                            Sınav
                        </MenuItem>
                    </TextField>
                    {
                        contentType === 'VIDEO' && (
                            <>
                                <DropzoneArea
                                    acceptedFiles={['video/*']}
                                    maxFileSize={50_000_000}
                                    initialFiles={files}
                                    filesLimit={1}
                                    onChange={(files) => {
                                        setFiles(files)
                                    }}
                                    showPreviews={false}
                                    showFileNamesInPreview={false}
                                    dropzoneText="İçerik videosunu sürükle ve bırak."
                                />
                            </>
                        )
                    }
                    {
                        contentType === 'TEXT' && (
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="text"
                                label="Yazı İçeriği"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                rows={4}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        )
                    }
                    {
                        contentType === 'QUIZ' && (
                            <Button onClick={handleClickOpenQuestion}>Soruları Oluştur</Button>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContent}>İptal Et</Button>
                    <Button onClick={handleAddSectionContent}>Oluştur</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openQuestion} onClose={handleCloseQuestion} fullScreen>
                <DialogTitle>Soruları Oluştur</DialogTitle>
                <DialogContent style={{width: '100%'}} dividers={true}>
                    <TextField
                        autoFocus
                        margin="dense"
                        select
                        id="questionType"
                        label="Soru Türü"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={questionType}
                        defaultValue="OPEN_ENDED"
                        onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    >
                        <MenuItem key="OPEN_ENDED" value="OPEN_ENDED">
                            Açık Uçlu
                        </MenuItem>
                        <MenuItem key="MULTIPLE_CHOICES_SINGLE_ANSWER" value="MULTIPLE_CHOICES_SINGLE_ANSWER">
                            Çoktan Seçmeli
                        </MenuItem>
                    </TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="questionText"
                        label="Soru İçeriği"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                    {
                        questionType === 'MULTIPLE_CHOICES_SINGLE_ANSWER' && (
                            <>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="option"
                                    label="Soru Seçeneği"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={option}
                                    onChange={(e) => setOption(e.target.value)}
                                />
                                <Button onClick={addNewOption}>Yeni Seçenek Ekle</Button>
                                {
                                    <RadioGroup
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    >
                                        {
                                            options.map((o) => (
                                                <FormControlLabel key={o} value={o} control={<Radio/>} label={o}/>
                                            ))
                                        }
                                    </RadioGroup>
                                }
                            </>
                        )
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="point"
                        label="Soru Puanı"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={point}
                        onChange={(e) => setPoint(Number(e.target.value))}
                    />
                    <Button onClick={handleCreateQuestion}>Soruyu Kaydet</Button>
                    {

                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Soru</TableCell>
                                            <TableCell>Puan</TableCell>
                                            <TableCell align="right">Aksiyonlar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {questions.map((q) => (
                                            <TableRow
                                                key={q.text}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {q.text}
                                                </TableCell>
                                                <TableCell component="th" scope="row">{q.point}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        onClick={() => handleRemoveQuestion(q.text)}
                                                        size="small"
                                                        sx={{ml: 2}}
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseQuestion}>İptal Et</Button>
                    <Button onClick={handleCreateQuestions}>Oluştur</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}