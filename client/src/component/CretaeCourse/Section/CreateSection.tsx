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
    DialogContentText,
    DialogTitle, FormControlLabel, MenuItem, Radio,
    RadioGroup,
    TextField
} from '@mui/material';

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

interface Section {
    id: number;
    title: string;
    section_contents: SectionContent[];
}

enum ContentType {
    VIDEO = 'VIDEO',
    EXAM = 'EXAM',
    TEXT = 'TEXT',
}

interface SectionContent {
    title: string,
    type: ContentType,
    video_url: string | undefined;
    text: string | undefined;
    duration: number | undefined;
    exam: string | undefined;
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

export default function CreateSection() {
    const [id, setId] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [sections, setSections] = React.useState<Section[]>([]);
    const [open, setOpen] = React.useState(false);
    const [sectionTitle, setSectionTitle] = React.useState("");
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
    const [exam, setExam] = React.useState();

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
        setSections([...sections, {title: sectionTitle, section_contents: [], id: id}])
        setId(id + 1)
        handleClose()
    }

    const handleCreateQuestions = () => {
    }

    const handleClickOpenQuestion = () => {
        setOpenQuestion(true);
    };

    const handleCloseQuestion = () => {
        setOpenQuestion(false);
    };

    const handleAddSectionContent = () => {
        console.log(contentTitle, duration, contentType, id, selectedSection)
        const section = sections.find((s) => s.id === selectedSection);
        if (!section) {
            return;
        }
        const otherSections = sections.filter((s) => s.id !== selectedSection);

        const sectionsCopy = [...otherSections, {
            ...section,
            section_contents: [...section.section_contents, {
                title: contentTitle,
                type: contentType,
                duration: duration,
                video_url: videoUrl,
                exam: undefined,
                text: text
            }]
        }];
        setSections(sectionsCopy.sort((a, b) => a.id - b.id))
    }

    const addNewOption = () => {
        if (options.some((o) => o === option)) {
            return;
        }
        setOptions([...options, option]);
    }

    const handleCreateQuestion = () => {
        setQuestions([...questions, {text: questionText, type: questionType, answer: answer, options: options, point: point}])
        setQuestionText("")
        setQuestionType(QuestionType.OPEN_ENDED)
        setAnswer("")
        setOptions([])
        setPoint(0)
    };

    return (
        <>
            <Container sx={{marginTop: 5, width: "80%", justifyItems: "center", justifyContent: "center"}}>
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
                                    {s.section_contents.map((sc) => (
                                        <div>{sc.title}</div>
                                    ))}
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
                <DialogTitle>Bölüm Ekle</DialogTitle>
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
                        label="İçerik Süresi"
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
                        <MenuItem key="EXAM" value="EXAM">
                            Sınav
                        </MenuItem>
                    </TextField>
                    {
                        contentType === 'VIDEO' && (
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="videoUrl"
                                label="Video Linki"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                        )
                    }
                    {
                        contentType === 'TEXT' && (
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="text"
                                label="Yazı"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        )
                    }
                    {
                        contentType === 'EXAM' && (
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
                        questions.map((q) => (
                            <div key={q.text}>{q.text}</div>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal Et</Button>
                    <Button onClick={handleCreateQuestions}>Oluştur</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}