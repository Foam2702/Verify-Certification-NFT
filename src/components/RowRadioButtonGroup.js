import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Paper,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import useSigner from "../state/signer";
import { imageFileToBase64 } from '../helpers/index'

export default function RowRadioButtonsGroup({ course, exam }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [values, setValues] = useState(Array(exam.length).fill(''));
    const { address, connectWallet } = useSigner();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [passed, setPassed] = useState(false);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseCheck = () => {
        setOpenCheck(false);
    };
    const handleRadioChange = (value, i) => {
        const newValues = [...values];
        newValues[i] = value;
        setValues(newValues);
    };
    const submitResponse = async () => {
        try {
            const combinedData = exam.map((examItem, index) => ({
                ...examItem,
                response: values[index],
            }));

            const result = await axios.post(
                `http://localhost:8080/courses/course/${course[0].id}/exam?address=${address}`,
                combinedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const org = await axios(`http://localhost:8080/courses/course/${course[0].id}`);
            const slug = org.data.course[0].slug;
            const image = org.data.course[0].image
            // const imageBse64 = imageFileToBase64(image.data)
            console.log(image)
            if (result.data.score >= 70) {
                setOpenCheck(false);
                setPassed(true);
                setMessageAlert(
                    `Congratulations! You passed the exam. You will receive notification from ${org.data.course[0].licensing_authority} soon. Please pay attention to the notification bell`
                );
                setOpen(true);
                const canvas = canvasRef.current;
                if (!canvas) {
                    setMessageAlert('Canvas not available.');
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    setMessageAlert('Failed to get canvas context.');
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the certificate template
                ctx.fillStyle = '#FFF'; // Background color
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#000'; // Text color
                ctx.font = 'bold 48px Arial';
                ctx.textAlign = 'center'; // Center align text horizontally
                ctx.fillText('Certificate of Achievement', canvas.width / 2, 100);
                const logoImg = new Image();
                logoImg.crossOrigin = 'Anonymous'; // Ensure crossOrigin is set
                logoImg.onload = () => {
                    // Draw the image onto the canvas
                    ctx.drawImage(logoImg, canvas.width / 2 - 100, 350, 200, 200); // Adjust position and size as needed

                    // Generate base64 image
                    const base64Image = canvas.toDataURL('image/png');
                    console.log(base64Image);

                    // Now you can send base64Image to your backend or perform further actions
                };
                logoImg.src = `/${slug}.png`; // Set the image source
                ctx.font = '24px Arial';
                ctx.fillText(`Awarded to ${address}`, canvas.width / 2, 200);

                ctx.font = 'italic 18px Arial';
                ctx.fillText(`For completing ${course[0].name}`, canvas.width / 2, 250);

                ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width / 2, 300);


            } else {
                setOpenCheck(false);
                setPassed(false);
                setMessageAlert("You failed the exam. Good luck next time.");
                setOpen(true);
            }


            // Load the logo image

            // Send Base64 string to backend
            // axios.post('/api/save-certificate', { base64Image })
            //     .then(response => {
            //         setMessageAlert('Certificate saved successfully!');
            //     })
            //     .catch(error => {
            //         console.error('Error saving certificate:', error);
            //         setMessageAlert('Error saving certificate.');
            //     });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Initial canvas setup
        ctx.fillStyle = '#FFF'; // Background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#000'; // Text color
        ctx.textAlign = 'center'; // Center align text horizontally
        ctx.fillText('Certificate of Achievement', canvas.width / 2, 100);

        ctx.font = '24px Arial';
        ctx.fillText(`Awarded to ${address}`, canvas.width / 2, 200);

        ctx.font = 'italic 18px Arial';
        ctx.fillText(`For completing ${course[0].name}`, canvas.width / 2, 250);

        ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width / 2, 300);

    }, []);


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
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1.5rem' }}>
                    {"Exam Results"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.5rem' }}>
                        {passed ? (
                            <SentimentSatisfiedAltIcon sx={{ color: 'green', width: 100, height: 100 }} />
                        ) : (
                            <SentimentVeryDissatisfiedIcon sx={{ color: 'red', width: 100, height: 100 }} />
                        )}
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
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1.5rem' }}>
                    {"Exam Results"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.5rem' }}>
                        Are you sure you want to submit the exam?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCheck}>Cancel</Button>
                    <Button onClick={submitResponse}>Submit</Button>
                </DialogActions>
            </Dialog>
            <div style={{ minHeight: '100vh' }}>
                <AppBar position="static" style={{ backgroundColor: 'teal' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            style={{ marginRight: '10px', marginBottom: '5px' }}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" style={{}}>
                            Exam for {course[0].name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <br />
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12} sm={5} style={{ width: '100%' }}>
                        <Grid style={{ borderTop: '10px solid teal', borderRadius: 10 }}>
                            <div>
                                <Paper elevation={2} style={{ width: '100%' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            marginLeft: '15px',
                                            paddingTop: '20px',
                                            paddingBottom: '20px',
                                        }}
                                    >
                                        <Typography variant="h4" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>
                                            EXAM for {course[0].name}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <p>
                                                You must score <span style={{ fontWeight: 'bold', color: 'red' }}>&gt;=70%</span> to complete the {course[0].name}
                                            </p>
                                        </Typography>
                                    </div>
                                </Paper>
                            </div>
                        </Grid>
                        <div>
                            <Grid>
                                {exam.map((ques, i) => (
                                    <div key={i}>
                                        <br />
                                        <Paper>
                                            <div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        marginLeft: '6px',
                                                        paddingTop: '15px',
                                                        paddingBottom: '15px',
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                                        {i + 1}. {ques.question_text}
                                                    </Typography>
                                                    <div>
                                                        <RadioGroup
                                                            aria-label="quiz"
                                                            name="quiz"
                                                            value={values[i]}
                                                            onChange={(e) => {
                                                                handleRadioChange(e.target.value, i);
                                                            }}
                                                        >
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
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={() => setOpenCheck(true)}>
                                        Submit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => navigate('/coursetransfernew')}>
                                        Cancel
                                    </Button>
                                </div>
                                <br />
                                <br />
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <canvas ref={canvasRef} width="1000" height="800" style={{ display: 'none' }} />
        </>
    );
}
