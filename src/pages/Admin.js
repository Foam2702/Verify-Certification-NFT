import React from 'react';
import { Navigate } from 'react-router-dom';
import useSigner from "../state/signer";
import HeaderSection from '../components/HeaderSection';
import Footer from '../components/Footer';
import AddIssuer from '../components/AddIssuer';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


import AddIssuerSection from '../components/AddIssuerSection';
const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { address } = useSigner();
    const adminAddress = process.env.REACT_APP_ADMIN;

    // If the address does not match the admin address, redirect to home page
    if (address !== adminAddress) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <HeaderSection />

            <AddIssuerSection />
            <AddIssuer />
            <Footer
                shapeLeft="/shape-left1.svg"
                socialIcontwitter="/socialicontwitter1.svg"
                footerDebugCommit="unset"
                footerMarginTop="unset"
            />
        </>
    );
};

export default Admin;
