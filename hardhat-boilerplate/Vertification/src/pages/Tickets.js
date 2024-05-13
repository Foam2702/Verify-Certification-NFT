import AlignItemsList from "../components/AlignItemsList";
import useSigner from "../state/signer";
import Header from "../components/Header";
import FooterBottom from "../components/FooterBottom";
import FooterTop from "../components/FooterTop";
import "./Vertifications.css";

const Tickets = () => {
    const { address, connectMetaMask } = useSigner()
    return <>
        <Header />
        <AlignItemsList />
        <footer className="footer">
            <FooterBottom />
            <FooterTop />
        </footer>

    </>
}
export default Tickets