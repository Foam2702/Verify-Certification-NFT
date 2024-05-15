import AlignItemsList from "../components/AlignItemsList";
import useSigner from "../state/signer";
import Header from "../components/Header";
import FooterBottom from "../components/FooterBottom";
import FooterTop from "../components/FooterTop";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import "./Vertifications.css";

const Tickets = () => {
    const { address, connectMetaMask } = useSigner()
    return <>
        <Stack spacing={20}>
            <Header />
            <Box display="flex" justifyContent="center">
                <AlignItemsList />
            </Box>
            <footer className="footer">
                <FooterBottom />
                <FooterTop />
            </footer>
        </Stack>



    </>
}
export default Tickets