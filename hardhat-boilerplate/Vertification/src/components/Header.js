import "./Header.css";
import useSigner from "../state/signer";
import AddressAvatar from "../components/AddressAvatar"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const Header = () => {
  const { address, connectMetaMask } = useSigner()
  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <button className="button3" onClick={() => navigate('/ticket')}>
        <Badge badgeContent={3} color="primary" >
          <NotificationsActiveIcon color="action" fontSize="large" />
        </Badge>
      </button>


      <button className="log-in" onClick={connectMetaMask}>{address ? <AddressAvatar address={address} /> : "LOG IN"}</button>

      <div className="team-abc1">Team ABC</div>
    </nav >
  );
};

export default Header;

