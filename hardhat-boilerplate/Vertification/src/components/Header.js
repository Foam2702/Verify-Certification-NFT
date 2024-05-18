import "./Header.css";
import useSigner from "../state/signer";
import AddressAvatar from "../components/AddressAvatar"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import NotificationBell from "./NotificationBell";
import axios from 'axios';
const { ethers } = require("ethers");
import SOULBOUND from "../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json"
const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
import "./BasicMenu.css"

const Header = () => {
  const { signer, loading, address, connectWallet } = useSigner();
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const fetchTickets = async () => {
      const allTickets = await axios("http://localhost:8080/tickets/all");
      const { ethereum } = window;
      if (ethereum) {
        const contract = new ethers.Contract(SOULBOUND_ADDRESS, SOULBOUND.abi, signer);
        if (Array.isArray(allTickets.data.tickets)) {
          let newTickets = [];
          for (const ticket of allTickets.data.tickets) {
            try {
              const result = await contract.getVerifiersByOrganizationCode(ticket.licensing_authority);
              if (result.includes(address)) {
                const ticketFromOrg = await axios(`http://localhost:8080/tickets/${ticket.licensing_authority}`);
                if (Array.isArray(ticketFromOrg.data.tickets)) {
                  newTickets = ticketFromOrg.data.tickets;
                  break;
                } else {
                  throw new Error('Unexpected data format');
                }
              } else if (ticket.owner_address === address) {
                newTickets.push(ticket);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }
          setTickets(newTickets);
        } else {
          throw new Error('Unexpected data format');
        }
      }
    };
    fetchTickets().catch(error => console.error(error));
  }, [signer, address]);
  return (
    <nav className="navbar">
      <button className="button3" >
        <NotificationBell tickets={tickets} />

      </button>
      <button className="log-in" onClick={connectWallet}>{address ? <AddressAvatar address={address} /> : "LOG IN"}</button>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <div className="team-abc1">Team ABC</div>
    </nav >
  );
};

export default Header;

