import "./Header.css";
import useSigner from "../state/signer";
import AddressAvatar from "../components/AddressAvatar"
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationBell from "./NotificationBell";

const Header = () => {
  const { address, connectMetaMask } = useSigner()

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="button3" >
        <NotificationBell />
      </button>
      <button className="log-in" onClick={connectMetaMask}>{address ? <AddressAvatar address={address} /> : "LOG IN"}</button>
      <div className="team-abc1">Team ABC</div>
    </nav >
  );
};

export default Header;

