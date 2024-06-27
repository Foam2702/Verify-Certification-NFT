import HeaderSection from "../components/HeaderSection";
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios'
import Footer from "../components/Footer";
import { Grid } from '@mui/material';
import { Paper, Typography, Button } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Accordion, AccordionSummary, AccordionDetails, TextField, IconButton, Radio, FormControlLabel, Divider, AccordionActions } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import MultiActionAreaCard from "../components/MultiACtionAreaCard";
import { imageFileToBase64 } from "../helpers";
import Alert from '@mui/material/Alert';
import useSigner from "../state/signer";

import "./UploadExam.css"
const UploadExam = () => {
    const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();
    const [org, setOrg] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("");
    const [messageAlert, setMessageAlert] = React.useState("")
    const [questions, setQuestions] = React.useState([]);
    const [certificateName, setCertificateName] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [file, setFile] = React.useState(null)
    const handleCertificateNameChange = (e) => setCertificateName(e.target.value);
    const handleShortNameChange = (e) => setShortName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const [imageUrl, setImageUrl] = React.useState("");
    React.useEffect(() => {
        const checkIssuer = async () => {
            if (address) {
                try {
                    const { ethereum } = window;
                    if (ethereum) {
                        const result = await contract.getOrganizationCode(address);
                        console.log(result)
                        setOrg(result)
                    }
                } catch (err) {
                    console.log(err)
                }
            }


        }
        checkIssuer()

    }, [address, signer])
    const onfileChange = async (event) => {
        setFile(event.target.files);
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                const base64ImageString = await imageFileToBase64(file);
                setImageUrl(base64ImageString);
            } catch (error) {
                console.error('Error converting file to base64', error);
            }
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    };
    function addOption(i) {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({ optionText: "Option " + (optionsOfQuestion[i].options.length + 1) })
        } else {
            console.log("Max  5 options ");
        }
        //console.log(optionsOfQuestion);
        setQuestions(optionsOfQuestion)
    }

    function removeOption(i, j) {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length > 1) {
            optionsOfQuestion[i].options.splice(j, 1);
            setQuestions(optionsOfQuestion)
            console.log(i + "__" + j);
        }
    }
    function expandCloseAll() {
        let qs = [...questions];
        for (let j = 0; j < qs.length; j++) {
            qs[j].open = false;
        }
        setQuestions(qs);
    }

    function handleExpand(i) {
        let qs = [...questions];
        for (let j = 0; j < qs.length; j++) {
            if (i === j) {
                qs[i].open = true;

            } else {
                qs[j].open = false;
            }
        }
        setQuestions(qs);
    }
    function addMoreQuestionField() {
        expandCloseAll(); //I AM GOD

        setQuestions(questions => [...questions, { questionText: "Question", options: [{ optionText: "Option 1" }], open: true }]);
    }
    function handleQuestionValue(text, i) {
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].questionText = text;
        setQuestions(optionsOfQuestion);
    }
    function handleOptionValue(text, i, j) {
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].options[j].optionText = text;
        //newMembersEmail[i]= email;
        setQuestions(optionsOfQuestion);
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        var itemgg = [...questions];

        const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index
        );

        setQuestions(itemF);
    }
    function showAsQuestion(i) {
        let qs = [...questions];
        qs[i].open = false;
        setQuestions(qs);
    }
    function copyQuestion(i) {
        let qs = [...questions];
        expandCloseAll();
        const myNewOptions = [];
        qs[i].options.forEach(opn => {
            if ((opn.optionImage !== undefined) || (opn.optionImage !== "")) {
                var opn1new = {
                    optionText: opn.optionText,
                    optionImage: opn.optionImage
                }
            } else {
                var opn1new = {
                    optionText: opn.optionText
                }
            }
            myNewOptions.push(opn1new)
        });
        const qImage = qs[i].questionImage || "";
        var newQuestion = { questionText: qs[i].questionText, questionImage: qImage, options: myNewOptions, open: true }
        setQuestions(questions => [...questions, newQuestion]);
    }
    function deleteQuestion(i) {
        let qs = [...questions];
        if (questions.length > 1) {
            qs.splice(i, 1);
        }
        setQuestions(qs)
    }
    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };

    async function saveQuestions() {
        const dataToSave = {
            certificateName,
            shortName,
            description,
            questions,
            imageUrl,
            org
        };
        const fields = [
            'certificateName',
            'shortName',
            'description',
            'questions',
            'imageUrl'
        ];
        for (const field of fields) {
            if (!dataToSave[field]) {
                setMessageAlert(`Please fill out the ${field} field.`);
                setAlertSeverity("warning");
                setShowAlert(true);
                setLoading(false);
                return;
            }
        }
        if (!dataToSave.questions || dataToSave.questions.length === 0) {
            setMessageAlert('Please add at least one question.');
            setAlertSeverity("warning");
            setShowAlert(true);
            setLoading(false);
            return;
        }
        try {
            const result = await axios.post("http://localhost:8080/exam/postexam", dataToSave)
            if (result.data.message == "Insert Exam successfully") {
                setMessageAlert("Exam created successfully");
                setAlertSeverity("success");
                setShowAlert(true);
                setLoading(false);
            }
            else {
                setMessageAlert("Error creating exam");
                setAlertSeverity("error");
                setShowAlert(true);
                setLoading(false);
            }
        }
        catch (err) {
            setMessageAlert("Error creating exam");
            setAlertSeverity("error");
            setShowAlert(true);
            setLoading(false);
            console.log(err)
        }
    }
    function questionsUI() {
        return questions.map((ques, i) => (
            <Draggable key={i} draggableId={i + 'id'} index={i}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div>
                            <div style={{ marginBottom: "15px" }}>
                                <div style={{ width: '100%', marginBottom: '-7px' }}>
                                    <DragIndicatorIcon style={{ transform: "rotate(-90deg)", color: '#DAE0E2' }} fontSize="small" />
                                </div>

                                <Accordion onChange={() => { handleExpand(i) }} expanded={questions[i].open}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        elevation={1} style={{ width: '100%' }}
                                    >
                                        {!questions[i].open ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px' }}>
                                                {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}

                                                <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{i + 1}.  {ques.questionText}</Typography>


                                                {ques.questionImage !== "" ? (
                                                    <div>
                                                        <img src={ques.questionImage} width="400px" height="auto" /><br></br><br></br>
                                                    </div>
                                                ) : ""}

                                                {ques.options.map((op, j) => (

                                                    <div key={j}>
                                                        <div style={{ display: 'flex' }}>
                                                            <FormControlLabel disabled control={<Radio style={{ marginRight: '3px', }} />} label={
                                                                <Typography style={{ color: '#555555' }}>
                                                                    {ques.options[j].optionText}
                                                                </Typography>
                                                            } />
                                                        </div>

                                                        <div>
                                                            {op.optionImage !== "" ? (
                                                                <img src={op.optionImage} width="160px" height="auto" />
                                                            ) : ""}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : ""}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px', marginTop: '-15px' }}>
                                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                                <Typography style={{ marginTop: '20px' }}>{i + 1}.</Typography>
                                                <TextField
                                                    fullWidth={true}
                                                    placeholder="Question"
                                                    style={{ marginBottom: '18px' }}
                                                    rows={2}
                                                    rowsMax={20}
                                                    multiline={true}

                                                    value={ques.questionText}
                                                    variant="filled"
                                                    onChange={(e) => { handleQuestionValue(e.target.value, i) }}
                                                />

                                            </div>
                                            <div style={{ width: '100%' }}>
                                                {ques.options.map((op, j) => (

                                                    <div key={j}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}>

                                                            <Radio disabled />
                                                            <TextField
                                                                fullWidth={true}
                                                                placeholder="Option"
                                                                style={{ marginTop: '5px' }}
                                                                value={ques.options[j].optionText}
                                                                onChange={(e) => { handleOptionValue(e.target.value, i, j) }}
                                                            />
                                                            <IconButton aria-label="delete" onClick={() => { removeOption(i, j) }}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>


                                                    </div>
                                                ))}
                                            </div>


                                            {ques.options.length < 4 ? (
                                                <div>
                                                    <FormControlLabel disabled control={<Radio />} label={
                                                        <Button size="small" onClick={() => { addOption(i) }} style={{ textTransform: 'none', marginLeft: "-5px" }}>
                                                            Add Option
                                                        </Button>
                                                    } />
                                                </div>
                                            ) : ""}

                                            <br></br>
                                            <br></br>

                                            <Typography variant="body2" style={{ color: 'grey' }}>You can add maximum 4 options. If you want to add more then change in settings. Multiple choice single option is availible</Typography>
                                            <TextField
                                                fullWidth={true}
                                                placeholder="Correct Answer"
                                                style={{ marginTop: '20px' }}
                                                value={ques.correctAnswer || ''}
                                                onChange={(e) => {
                                                    let newQuestions = [...questions];
                                                    newQuestions[i].correctAnswer = e.target.value;
                                                    setQuestions(newQuestions);
                                                }}
                                            />
                                        </div>
                                    </AccordionDetails>

                                    <Divider />

                                    <AccordionActions>
                                        <IconButton aria-label="View" onClick={() => { showAsQuestion(i) }}>
                                            <VisibilityIcon />
                                        </IconButton>

                                        <IconButton aria-label="Copy" onClick={() => { copyQuestion(i) }}>
                                            <FilterNoneIcon />
                                        </IconButton>
                                        <Divider orientation="vertical" flexItem />

                                        <IconButton aria-label="delete" onClick={() => { deleteQuestion(i) }}>
                                            <DeleteOutlineIcon />
                                        </IconButton>


                                    </AccordionActions>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

        )
        )
    }
    return (
        <div>
            <HeaderSection />
            <div style={{ marginTop: '15px', marginBottom: '7px', paddingBottom: "30px" }}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {/* {loadingFormData ? (<CircularProgress />) : ""} */}

                    <Grid item xs={12} sm={5} style={{ width: '100%' }}>
                        <Grid style={{ borderTop: '50px solid teal', borderRadius: 10 }}>
                            <div>
                                <div>
                                    <Paper elevation={2} style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                                            {/* <Typography variant="h4" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>
                                                POST EXAM
                                            </Typography>
                                            <Typography variant="subtitle1">Fill in the necessary information to post the exam</Typography> */}
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        </Grid>
                        <h1 className="post-exam">Exam Information</h1>

                        <Grid style={{ paddingTop: '10px' }}>
                            <div >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Name of Exam"
                                    multiline
                                    maxRows={10}
                                    fullWidth
                                    placeholder="Ex: Python Web BootCamp 2024"
                                    sx={{ marginTop: '20px' }}
                                    value={certificateName}
                                    onChange={handleCertificateNameChange}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Short name "
                                    multiline
                                    fullWidth
                                    placeholder="Ex: PythonWebBootCamp"
                                    sx={{ marginTop: '20px' }}
                                    value={shortName}
                                    onChange={handleShortNameChange}
                                    onKeyPress={handleKeyPress}

                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    placeholder="Ex: Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!"
                                    sx={{ marginTop: '20px' }}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />

                                <div className="input-upload-file" style={{ border: '1px solid', width: '30%', marginTop: '20px' }}>
                                    <div className="input-box-background" />
                                    {/* <div classname="input-image"> */}
                                    <input
                                        className="example-here"
                                        name="imageCertificate"
                                        type="file"
                                        accept=".jpg"
                                        multiple
                                        onChange={onfileChange}
                                    />
                                    <MultiActionAreaCard image={imageUrl} size={350} sx={{ Margin: 10 }} />

                                    {/* </div> */}
                                </div>
                            </div>

                            <h1 className="question-exam">Question</h1>

                            <div>

                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {questionsUI()}

                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        variant="contained"

                                        onClick={addMoreQuestionField}
                                        endIcon={<AddCircleIcon />}
                                        style={{ margin: '5px' }}
                                    >Add Question </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={saveQuestions}
                                        style={{ margin: '15px' }}
                                        endIcon={<SaveIcon />}
                                    >Create Exam </Button>

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>            <Footer
                shapeLeft="/shape-left@2x.png"
                socialIcontwitter="/socialicontwitter@2x.png"
            />
            <Snackbar open={showAlert} autoHideDuration={10000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        fontSize: '1.25rem', // Increase font size
                    }}
                >
                    {messageAlert}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default UploadExam