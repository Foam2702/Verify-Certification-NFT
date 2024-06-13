//import "./Header.css";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import useSigner from "../state/signer";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Admin from "../pages/Admin";
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
  { name: 'Certificate Examined', route: '/courseinfornew' },
  { name: 'Issuer Management', route: '/admin' },

]; const HeaderSection = () => {
  const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
  const { signer, address, connectWallet, getPublicKey } = useSigner();
  const [tickets, setTickets] = useState([])
  const [loadingPage, setLoadingPage] = useState(false);
  const [anchorElNav, setanchorElNav] = React.useState(null);
  const [anchorElUser, setanchorElUser] = React.useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")

  const [alertSeverity, setAlertSeverity] = useState("");
  const navigate = useNavigate();


  const handleOpenNavMenu = (event) => {
    setanchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setanchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setanchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setanchorElUser(null);
  };
  const handleMenuItemClick = (route) => {

    if (address) {
      setLoadingPage(true); // Start loading
      setTimeout(() => {
        handleCloseUserMenu();
        navigate(route);
        setLoadingPage(false); // Stop loading
      }, 500); // Delay of 0.5 second
    } else {
      connectWallet();
    }

  };
  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setLoading(true);
    setShowAlert(false);
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // setLoading(false);

  };
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const allTickets = await axios("http://localhost:8080/tickets/all");
        if (Array.isArray(allTickets.data.tickets)) {
          let newTickets = [];
          for (const ticket of allTickets.data.tickets) {
            try {
              if (ticket.issuer_address === address || ticket.owner_address === address) {
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
      } catch (err) {
        console.log(err)
      }

    };
    fetchTickets().catch(error => console.error(error));
  }, [signer, address]);
  useEffect(() => {
    const insertPubToDB = async () => {
      if (address) {
        try {
          const checkPublicKeyExisted = await axios.get(`http://localhost:8080/addresses/${address}`);
          if (checkPublicKeyExisted.data.address.length === 0) {
            const publicKey = await getPublicKey(); // Await the result of getPublicKey
            if (publicKey.code === 4001 && publicKey.message === "User rejected the request.") {
              console.log('Error retrieving public key:', publicKey);
              setAlertSeverity("warning");
              setMessageAlert("Reject to sign");
              setShowAlert(true);
              return;
            }
            await axios.post(`http://localhost:8080/addresses/${address}`, {
              address: address, // Include the address in the body
              publicKey: publicKey // Include the public key in the body
            });
            setAlertSeverity("success");
            setMessageAlert("Sign successfully");
            setShowAlert(true);

          }

        }
        catch (err) {
          console.log(err)
        }

      }
    };
    insertPubToDB();
  }, [address, signer])

  const filteredSettings = address === process.env.REACT_APP_ADMIN ? settings : settings.filter(setting => setting.name !== 'Issuer Management');

  return (
    <section className="header-section1">
      <div className="top-header">
        <div className="top-container">
          <div className="fickleflight-logo-wrapper">
            <button className="fickleflight-logo" onClick={() => {
              setLoadingPage(true); // Start loading

              navigate("/");
              // reload the current page
              window.location.reload();

              setLoadingPage(false); // Stop loading

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
                      {filteredSettings.map((setting) => (
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
              <Snackbar open={showAlert} autoHideDuration={10000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity={alertSeverity}
                  variant="filled"
                  sx={{
                    width: '100%',
                    fontSize: '1.25rem', // Increase font size
                  }}
                >
                  {messageAlert}
                </Alert>
              </Snackbar>

            </div>
          </div>
        </div>
      </div>

    </section >
  );
};

export default HeaderSection;
