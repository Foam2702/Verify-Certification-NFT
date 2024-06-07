import React from 'react';
import { Navigate } from 'react-router-dom';
import useSigner from "../state/signer";

const Admin = () => {
    const { address } = useSigner();
    const adminAddress = '0xED877A7B3c30ed50e983b7B9a26524C1C4c0eB02';

    // If the address does not match the admin address, redirect to home page
    if (address !== adminAddress) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            {/* Add more admin-specific content here */}
        </div>
    );
};

export default Admin;
