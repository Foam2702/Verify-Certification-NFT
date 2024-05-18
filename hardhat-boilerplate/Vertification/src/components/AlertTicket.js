import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react'

export default function AlertTicket({ severity }) {
    const [alert, setAlert] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (severity === "processing") {
            setAlert("warning");
            setMessage("In Processing");
        } else if (severity === "reject") {
            setAlert("error");
            setMessage("Rejected from Issuer");
        } else if (severity === "approved") {
            setAlert("success");
            setMessage("Mint SoulBound Token.Check your wallet");
        }
    }, [severity]);

    return (
        <Alert variant="filled" severity={alert}>
            {message}
        </Alert>
    );
}