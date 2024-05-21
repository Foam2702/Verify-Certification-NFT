import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
//import Vertifications from "./Vertifications";
import axios from "axios";
import HeaderSection from "../components/HeaderSection";
import Footer from "../components/Footer";
//import FooterTop from "../components/FooterTop";
//import "./Vertifications.css";
import Ticket from '../components/Ticket';

export default function VerificationForIssuer() {

    const [ticket, setTicket] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchTicketsById = async () => {
            const result = await axios(`http://localhost:8080/tickets/ticket/${id}`);
            setTicket(result.data.ticket);

        };

        fetchTicketsById();
    }, [id]); // Dependency array
    return (

        <div className="vertificationnew">
            <HeaderSection />
            <Ticket
                ticket={ticket}
            />

            <Footer
                shapeLeft="/shape-left1.svg"
                socialIcontwitter="/socialicontwitter1.svg"
                footerDebugCommit="unset"
                footerMarginTop="unset"
            />

        </div>
    );
}