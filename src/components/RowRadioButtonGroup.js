import * as React from 'react';
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
import axios from 'axios'

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
    const submitResponse = async () => {
        // console.log(values)
        // console.log(course[0].id)
        // const result = await axios(`http://localhost:8080/courses/course/${course[0].id}/exam`)
        // console.log(result.data)
        setIsSubmitted(true)
    }

    return (
        <>

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
        </>
    )
}