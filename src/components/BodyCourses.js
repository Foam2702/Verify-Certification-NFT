import Course from "./Course";
import "./BodyCourses.css";
import { useEffect, useState } from 'react'
import axios from "axios";

const BodyCourses = ({ className = "" }) => {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1) // Add a page state variable

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await axios.get(`http://localhost:8080/courses?page=${page}`) // Modify the URL to include the page query parameter
            setCourses(result.data.courses)
        }
        fetchCourses()
    }, [page]) // Add page as a dependency

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    return (
        <section className={`body-section2 ${className}`}>
            <div className="body-header3">
                <h1 className="body-header-text5">Danh mục khóa học</h1>
            </div>
            <div className="careers-section1">
                {courses.map((course) => (
                    <Course
                        key={course.id}
                        course1Image={course.image}
                        courseHeader={course.name}
                        courseDescription={course.description}
                    />
                ))}
            </div>
            <button onClick={() => handlePageChange(page - 1)}>Previous</button> {/* Add Previous button */}
            <button onClick={() => handlePageChange(page + 1)}>Next</button> {/* Add Next button */}
        </section>
    );
};

export default BodyCourses;