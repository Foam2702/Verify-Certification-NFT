import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Vertifications from "./Vertifications";
import axios from "axios";
import Header from "../components/Header";
import FooterBottom from "../components/FooterBottom";
import FooterTop from "../components/FooterTop";
import "./Vertifications.css";

export default function VerificationForIssuer() {
    const [ticket, setTicket] = useState([])
    const { id } = useParams();
    console.log(ticket)
    useEffect(() => {
        const fetchTicketsById = async () => {
            const result = await axios(`http://localhost:8080/tickets/ticket/${id}`);

            setTicket(result.data.ticket);
            console.log(result.data.ticket)

        }
        fetchTicketsById().catch(error => console.error(error));

    }, [])
    return (
        <>
            <Header />
            <Vertifications />
            <footer className="footer">
                <FooterBottom />
                <FooterTop />
            </footer>
        </>
    );
}