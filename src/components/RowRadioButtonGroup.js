import * as React from 'react';
import { styled } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Navigate, useNavigate } from "react-router-dom";

export default function RowRadioButtonsGroup({ course, exam }) {
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [responseData, setResponseData] = React.useState([])
    const [values, setValues] = React.useState(Array(exam.length).fill(''));

    const navigate = useNavigate();

    function reloadForAnotherResponse() {
        window.location.reload(true);
    }

    const handleRadioChange = (value, i) => {
        // Create a new array and update the value at the index i
        const newValues = [...values];
        newValues[i] = value;
        setValues(newValues);
    };
    const submitResponse = () => {
        console.log(values)
    }

    // const handleRadioChange = (option, i) => {
    //     var questionId = exam[i].id
    //     var optionId = option

    //     var data = {
    //         questionId, optionId
    //     }

    //     setValue(option)

    //     var fakeRData = [...responseData];

    //     var indexOfResponse = fakeRData.findIndex(x => x.questionId === questionId);
    //     if (indexOfResponse === -1) {
    //         setResponseData(responseData => [...responseData, data])
    //     } else {
    //         fakeRData[indexOfResponse].questionId = questionId
    //         setResponseData(fakeRData);
    //     }
    // };

    return (
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
                                                <p>You must score <span style={{ fontWeight: "bold" }}>&gt;=70%</span> to complete the {course[0].name}</p>
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
                                    <Button variant="contained" color="primary" onClick={submitResponse} >
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
    )
}