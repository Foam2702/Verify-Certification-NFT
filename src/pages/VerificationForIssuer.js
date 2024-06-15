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
                try {
                    const result = await axios(`http://localhost:8080/tickets/ticket/${id}?address=${address}`);
                    console.log("FOR ISSUER", result.data.ticket);
                    if (result.data.message === "ticket doesn't exist") {
                        navigate("/");
                    } else {
                        // Assuming issuer_address is either null (not a string) or a valid address
                        const ticketOwner = result.data.ticket.filter(ticket => ticket.issuer_address === null);
                        console.log("owner", ticketOwner);
                        const ticketIssuer = result.data.ticket.filter(ticket => ticket.issuer_address !== null);
                        console.log("issuer", ticketIssuer);
                        // Adjust logic here based on whether you expect multiple tickets or just one
                        setTicket([...ticketOwner, ...ticketIssuer]);
                    }
                } catch (err) {
                    console.error(err);
                    // Handle error (e.g., show error message to user)
                }
            }
        };
        fetchTicketsById();
    }, [id, address, navigate]); // Added navigate to dependency array as it's used inside useEffect
    return (

        <div >
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