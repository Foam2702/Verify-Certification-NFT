import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
//import Vertifications from "./Vertifications";
import axios from "axios";
import HeaderSection from "../components/HeaderSection";
import Footer from "../components/Footer";
import VerifySection from '../components/VerifySection';
import useSigner from "../state/signer";

//import FooterTop from "../components/FooterTop";
//import "./Vertifications.css";
import Ticket from '../components/Ticket';
import { useNavigate } from "react-router-dom";

export default function VerificationForIssuer() {
    const { signer, loading, address, connectWallet, getPublicKey } = useSigner();

    const [ticket, setTicket] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketsById = async () => {
            if (address) {
                const result = await axios(`http://localhost:8080/tickets/ticket/${id}`);

                if (result.data.ticket.issuer_address === address || result.data.ticket.owner_address === address) {
                    setTicket(result.data.ticket);
                }
                else {
                    navigate("/")
                }
            }
        }
        fetchTicketsById();
    }, [id, address]); // Dependency array
    return (

        <div className="vertificationnew">
            <HeaderSection />
            <VerifySection />
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