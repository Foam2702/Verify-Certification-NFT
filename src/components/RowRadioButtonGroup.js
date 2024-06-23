import * as React from 'react';
import { useEffect, useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import useSigner from "../state/signer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
export default function RowRadioButtonsGroup({ course, exam }) {
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [responseData, setResponseData] = React.useState([])
    const [values, setValues] = React.useState(Array(exam.length).fill(''));
    const { address, connectWallet } = useSigner();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCheck, setOpenCheck] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")
    const [passed, setPassed] = useState(false)
    const navigate = useNavigate();

    function reloadForAnotherResponse() {
        window.location.reload(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseCheck = () => {
        setOpenCheck(false)
    }
    const handleOpenCheck = () => {
        setOpen(true)
    }
    const handleRadioChange = (value, i) => {
        // Create a new array and update the value at the index i
        const newValues = [...values];
        newValues[i] = value;
        setValues(newValues);
    };
    const submitResponse = async () => {
        setLoading(true)
        try {
            const combinedData = exam.map((examItem, index) => ({
                ...examItem,
                response: values[index],
            }));
            console.log(combinedData)
            const result = await axios.post(`http://localhost:8080/courses/course/${course[0].id}/exam?address=${address}`, combinedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const org = await axios(`http://localhost:8080/courses/course/${course[0].id}`)
            console.log("ORG", org.data.course[0].org)
            if (result.data.score >= 70) {
                setOpenCheck(false)

                setPassed(true)
                setMessageAlert(`Congratulations! You passed the exam. You will receive notification from ${org.data.course[0].org} soon. Please pay attention to the notification bell`)
                setOpen(true);
            }
            else if (result.data.score < 70) {
                setOpenCheck(false)

                setPassed(false)
                setMessageAlert(" You failed the exam. Good luck next time ")
                setOpen(true);
            }
            setIsSubmitted(true)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialogContent-root': { fontSize: '1.25rem' },
                    '& .MuiTextField-root': { fontSize: '1.25rem' },
                    '& .MuiButton-root': { fontSize: '1.25rem' },
                }}            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1.5rem' }}>
                    {"Exam Results"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.5rem' }}>
                        {passed ? <SentimentSatisfiedAltIcon sx={{ color: 'green', width: 100, height: 100 }} /> : <SentimentVeryDissatisfiedIcon sx={{ color: 'red', width: 100, height: 100 }} />}
                        {messageAlert}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>

                </DialogActions>
            </Dialog>
            <Dialog
                open={openCheck}
                onClose={handleCloseCheck}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialogContent-root': { fontSize: '1.25rem' },
                    '& .MuiTextField-root': { fontSize: '1.25rem' },
                    '& .MuiButton-root': { fontSize: '1.25rem' },
                }}            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1.5rem' }}>
                    {"Exam Results"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.5rem' }}>
                        Are you sure to submit the exam?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCheck}>Cancel</Button>
                    <Button onClick={submitResponse}>Submit</Button>

                </DialogActions>
            </Dialog>
            <div style={{ minHeight: '100vh' }}>
                <div>
                    <AppBar position="static" style={{ backgroundColor: 'teal' }}>
                        <Toolbar>
                            <IconButton edge="start" style={{ marginRight: '10px', marginBottom: '5px' }} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" style={{}}>

                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br></br>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={5} style={{ width: '100%' }}>
                            <Grid style={{ borderTop: '10px solid teal', borderRadius: 10 }}>
                                <div>
                                    <div>
                                        <Paper elevation={2} style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography variant="h4" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>
                                                    EXAM for {course[0].name}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    <p>You must score <span style={{ fontWeight: "bold", color: "red" }}>&gt;=70%</span> to complete the {course[0].name}</p>
                                                </Typography>
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                            </Grid>
                            <div>
                                <Grid>
                                    {exam.map((ques, i) => (
                                        <div key={i}>
                                            <br></br>
                                            <Paper>
                                                <div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        marginLeft: '6px',
                                                        paddingTop: '15px',
                                                        paddingBottom: '15px'
                                                    }}>
                                                        <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>{i + 1}. {ques.question_text}</Typography>
                                                        <div>
                                                            <RadioGroup aria-label="quiz" name="quiz" value={values[i]} onChange={(e) => { handleRadioChange(e.target.value, i) }}>
                                                                <FormControlLabel value={ques.option_a} control={<Radio />} label={ques.option_a} />
                                                                <FormControlLabel value={ques.option_b} control={<Radio />} label={ques.option_b} />
                                                                <FormControlLabel value={ques.option_c} control={<Radio />} label={ques.option_c} />
                                                                <FormControlLabel value={ques.option_d} control={<Radio />} label={ques.option_d} />
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    ))}
                                </Grid>
                                <Grid>
                                    <br></br>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Button variant="contained" color="primary" onClick={() => setOpenCheck(true)} >
                                            Submit
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => navigate('/coursetransfernew')} >
                                            Cancel
                                        </Button>
                                    </div>

                                    <br></br>
                                    <br></br>
                                </Grid>
                            </div>

                        </Grid>
                    </Grid>

                </div>
            </div>
        </>
    )
}