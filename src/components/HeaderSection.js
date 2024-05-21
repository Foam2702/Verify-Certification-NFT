//import "./Header.css";
import { Navigate, useNavigate } from "react-router-dom";

import useSigner from "../state/signer";
import AddressAvatar from "../components/AddressAvatar"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import NotificationBell from "./NotificationBell";
import axios from 'axios';
import SOULBOUND from "../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json"
import "./BasicMenu.css"
import "./HeaderSection.css";
const { ethers } = require("ethers");

const HeaderSection = () => {
  const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
  const { signer, loading, address, connectWallet } = useSigner();
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate();

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
    <section className="header-section1">
      <div className="top-header">
        <div className="top-container">
          <div className="fickleflight-logo-wrapper">
            <div className="fickleflight-logo">
              <h3 className="abc">ABC</h3>
            </div>
          </div>
          <div className="navigation-right">

            <div className="account-section">
              <img
                className="hamburger-menu-icon"
                alt=""
                src="/hamburgermenu@2x.png"
              />
              <button>
                <NotificationBell tickets={tickets} />

              </button>
              <button className="button" onClick={() => {
                if (address) {
                  navigate("/lisenceview");
                } else {
                  connectWallet();
                }
              }}>
                {address ? <AddressAvatar address={address} /> : "LOG IN"}
              </button>
              {loading && (
                <div className="profile">
                  <img
                    className="profile-picture-icon"
                    loading="lazy"
                    alt=""
                    src="/profile-picture@2x.png"
                  />
                  <div className="profile-background" />
                  <CircularProgress />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <header className="header-container">
        <div className="header-content">
          <div className="titles">
            <h1 className="title-1">HỆ THỐNG XÁC THỰC CHỨNG CHỈ ABC</h1>
            <div className="title-2">
              Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
              chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
              chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
              của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
              nghiệp ngay hôm nay!"
            </div>
          </div>
          <div className="person-image">
            <img
              className="person-image-icon"
              loading="lazy"
              alt=""
              src="/person-image@2x.png"
            />
          </div>
        </div>
      </header>
    </section>
  );
};

export default HeaderSection;
