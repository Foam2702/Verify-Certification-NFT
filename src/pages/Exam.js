import HeaderSection from "../components/HeaderSection";
import HelpSection from "../components/HelpSection";
import FeauresSection from "../components/FeauresSection";
import Footer from "../components/Footer";
import RowRadioButtonsGroup from "../components/RowRadioButtonGroup";
import HeaderExam from "../components/HeaderExam";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import ExamSection from "../components/ExamSection";

const Exam = () => {
    const [exams, setExams] = useState([])
    const [course, setCourse] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchExam = async () => {
            const result = await axios(`http://localhost:8080/courses/course/${id}/exam`)
            console.log(result.data.exams)
            setExams(result.data.exams)

        }
        fetchExam()
        const fetchCourse = async () => {
            const result = await axios(`http://localhost:8080/courses/course/${id}`)
            console.log(result.data.course)
            setCourse(result.data.course)
        }
        fetchCourse()
    }, [id])
    console.log("EXAM", course)

    return (
        <>

            {course && exams &&
                <>
                    <HeaderExam />
                    <ExamSection course={course} />
                    <RowRadioButtonsGroup
                        course={course}
                        exam={exams} />
                    <Footer
                        shapeLeft="/shape-left@2x.png"
                        socialIcontwitter="/socialicontwitter@2x.png"
                    />
                </>
            }

        </>
    )
}
export default Exam