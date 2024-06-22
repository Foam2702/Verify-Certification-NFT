import Course from "./Course";
import "./BodyCourses.css";
import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSigner from "../state/signer";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const BodyCourses = ({ className = "" }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { address, connectWallet } = useSigner();
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [messageAlert, setMessageAlert] = useState("")

    const navigate = useNavigate();

    const handleClickOpen = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAlert = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleAgree = async () => {
        setLoading(true); // Start loading
        const result = await axios.post(`http://localhost:8080/courses/course/${selectedCourse.id}?address=${address}`)
        console.log(result.data)
        if (result.data.code == 200) {
            setTimeout(() => {
                if (!address) {
                    navigate("/");
                } else {
                    navigate(`/courses/course/${selectedCourse.id}/exam`);
                }
                setLoading(false);
            }, 1000);
            handleClose();
        }
        else {
            setLoading(false);
            setAlertSeverity("warning")
            setMessageAlert("You have already take this exam")
            setShowAlert(true);

            handleClose();
        }


    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/courses`);
                if (Array.isArray(result.data.courses)) {
                    setCourses(result.data.courses);
                    console.log(result.data.courses);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses().catch((error) => console.error(error));
    }, []); // Add page as a dependency

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}
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
                    {"Ready for the exam?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.5rem' }}>
                        Once you choose to <span style={{ color: "#1976D2" }}>START</span>, you must complete the test. If you exit midway, you will <span style={{ fontWeight: 'bold', color: "red" }}>FAIL</span>  the test
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Start
                    </Button>
                </DialogActions>
            </Dialog>
            <section className={`body-section2 ${className}`}>
                <div className="body-header3">
                    <h1 className="body-header-text5">List of Exam</h1>
                </div>
                <div className="careers-section1">
                    {courses.map((course) => (
                        <button onClick={() => handleClickOpen(course)} key={course.id}>
                            <Course
                                course1Image={course.image}
                                courseHeader={course.name}
                                courseDescription={course.description}
                                courseOrg={course.licensing_authority}
                                courseOrgImg={course.image_licensing_authority}
                            />
                        </button>
                    ))}
                </div>
            </section>
            <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {messageAlert}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BodyCourses;
