import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
//import Vertifications from "./Vertifications";
import axios from "axios";
import HeaderSection1 from "../components/HeaderSection1";
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

        <>
            <HeaderSection1 />
            <Ticket
                ticket={ticket}
            />

                <Footer/>

        </>
    );
}