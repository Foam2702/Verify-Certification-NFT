//import "./Header.css";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import useSigner from "../state/signer";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import AddressAvatar from "../components/AddressAvatar"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import NotificationBell from "./NotificationBell";
import axios from 'axios';
import SOULBOUND from "../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json"
import "./BasicMenu.css"
import "./HeaderSection.css";
const { ethers } = require("ethers");
const settings = [
  { name: 'My Certificates', route: '/lisenceview' },
  { name: 'My Courses', route: '/courseinfornew' },
  { name: 'Issuer Management', route: '/issuer-management' },
  { name: 'Logout', route: '/logout' }
]; const HeaderSection = () => {
  const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
  const { signer, loading, address, connectWallet } = useSigner();
  const [tickets, setTickets] = useState([])
  const [loadingPage, setLoadingPage] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (route) => {
    if (address) {
      setLoadingPage(true); // Start loading
      setTimeout(() => {
        handleCloseUserMenu();
        navigate(route);
        setLoadingPage(false); // Stop loading

      }, 500); // Delay of 2 seconds

    } else {
      connectWallet();
    }

  };
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
            <button className="fickleflight-logo" onClick={() => {
              setLoadingPage(true); // Start loading
              setTimeout(() => {
                navigate("/");
                setLoadingPage(false); // Stop loading
              }, 1000); // Delay of 2 seconds
            }}>
              <img className="abc" src="/VSCourses.svg" />
            </button>
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

              <Box sx={{ flexGrow: 0 }}>
                {address ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        <AddressAvatar address={address} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px', '& .MuiPaper-root': { width: '300px' } }} // Set your desired width here
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => handleMenuItemClick(setting.route)}
                          sx={{ my: 1 }}>
                          <Typography textAlign="center" sx={{ fontSize: '1.3rem' }}>{setting.name}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  "LOG IN"
                )}
              </Box>




              {loadingPage && (
                <div className="loading-overlay">
                  <CircularProgress />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </section >
  );
};

export default HeaderSection;
