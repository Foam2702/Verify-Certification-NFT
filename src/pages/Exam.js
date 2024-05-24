import HeaderSection from "../components/HeaderSection";
import HelpSection from "../components/HelpSection";
import FeauresSection from "../components/FeauresSection";
import Footer from "../components/Footer";
import RowRadioButtonsGroup from "../components/RowRadioButtonGroup";
import HeaderExam from "../components/HeaderExam";
import { useEffect, useState } from "react";
import axios from "axios";

const Exam = ({ course }) => {
    const [exams, setExams] = useState([])
    useEffect(() => {
        const fetchExam = async () => {
            const result = await axios("http://localhost:8080/courses/course/1/exam")
            console.log(result.data.exams)
            setExams(result.data.exams)

        }
        fetchExam()
    }, [])
    return (
        <>
            <HeaderExam />
            <RowRadioButtonsGroup exam={exams} />
            <Footer
                shapeLeft="/shape-left@2x.png"
                socialIcontwitter="/socialicontwitter@2x.png"
            />
        </>
    )
}
export default Exam