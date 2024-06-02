import Course from "./Course";
import "./BodyCourses.css";
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import useSigner from "../state/signer";
import CircularProgress from '@mui/material/CircularProgress';

const BodyCourses = ({ className = "" }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const { address, connectWallet } = useSigner()
    const navigate = useNavigate();

    const handleExam = (course) => {
        setLoading(true); // Start loading
        setTimeout(() => {
            if (!address) {
                navigate("/");
            } else {
                navigate(`/courses/course/${course}/exam`);
            }
            setLoading(false);
        }, 1000);
    }
    useEffect(() => {
        const fetchCourses = async () => {
            const result = await axios.get(`http://localhost:8080/courses`)
            if (Array.isArray(result.data.courses)) {
                setCourses(result.data.courses)
                console.log(result.data.courses)
            }// Modify the URL to include the page query parameter
        }
        fetchCourses().catch(error => console.error(error));
    }, []) // Add page as a dependency


    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}

            <section className={`body-section2 ${className}`}>
                <div className="body-header3">
                    <h1 className="body-header-text5">Danh mục khóa học</h1>
                </div>
                <div className="careers-section1">
                    {courses.map((course) => (
                        <button onClick={() => handleExam(course.id)} key={course.id}>
                            <Course
                                course1Image={course.image}
                                courseHeader={course.name}
                                courseDescription={course.description}
                            />
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
};

export default BodyCourses;