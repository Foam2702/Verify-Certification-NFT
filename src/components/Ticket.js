import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Web3 from 'web3';
import useSigner from "../state/signer";
import MultiActionAreaCard from "./MultiACtionAreaCard";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';// import Header from "../../components/Header";
import { Tooltip, IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { formatDate } from '../helpers/index'
import { useNavigate } from "react-router-dom";
import AlertTicket from "./AlertTicket"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { pinJSONToIPFS, extractEncryptedDataFromJson, decryptData } from "../helpers/index"
const JWT = process.env.REACT_APP_JWT; // Make sure to set this in your React app environment variables

import "./BodySection.css";
import "../pages/LisenceView"

const Ticket = ({ ticket }) => {
    const { signer, address, connectWallet, contract, provider } = useSigner()
    const [issuer, setIssuer] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [countdown, setCountdown] = useState(3)
    const [transaction, setTransaction] = useState("")
    const [addressContract, setAddressContract] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("");
    const [correctPriv, setCorrectPriv] = useState(false)
    const [tokenID, setTokenID] = useState("")
    const [open, setOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState("")
    const [error, setError] = useState(null);
    const [decryptedName, setDecryptedName] = useState('');
    const [decryptedGender, setDecryptedGender] = useState('');
    const [decryptedEmail, setDecryptedEmail] = useState('');
    const [decryptedCitizenId, setDecryptedCitizenId] = useState('');
    const [decryptedDob, setDecryptedDob] = useState('');
    const [decryptedRegion, setDecryptedRegion] = useState('');
    const [decryptedWorkUnit, setDecryptedWorkUnit] = useState('');
    const [decryptedPoint, setDecryptedPoint] = useState('');
    const [decryptedIssueDate, setDecryptedIssueDate] = useState('');
    const [decryptedExpiryDate, setDecryptedExpiryDate] = useState('');
    const [decryptedImage, setDecryptedImage] = useState(null)
    const web3 = new Web3(window.ethereum);
    const navigate = useNavigate();
    useEffect(() => {
        const checkIssuer = async () => {
            const { ethereum } = window;
            if (ethereum) {
                const result = await contract.getVerifiersByOrganizationCode(ticket.licensing_authority);
                setIssuer(result)
            }
        }
        if (ticket) { // Only run if ticket is defined
            checkIssuer().catch(error => console.error(error));
        }
    }, [ticket, address, signer]) // Add ticket as a dependency

    useEffect(() => {
        const getAddContractAndTokenID = async () => {
            try {
                const data = await web3.eth.getTransactionReceipt(ticket.transaction_hash);
                let transaction = data;
                let logs = data.logs;
                console.log('logs:', logs);
                const tokenIdValue = web3.utils.hexToNumber(logs[0].topics[3]);
                console.log('tokenIdValue:', tokenIdValue);
                setTokenID(tokenIdValue.toString());
                setAddressContract(logs[0].address)
            } catch (err) {
                console.log(err)
            }
        }
        getAddContractAndTokenID()
    }, [ticket])
    useEffect(() => {
        const decryptAllFields = async () => {
            try {
                const name = await handleDecryptTicket(ticket.name, privateKey);
                const gender = await handleDecryptTicket(ticket.gender, privateKey);
                const email = await handleDecryptTicket(ticket.email, privateKey);
                const citizenId = await handleDecryptTicket(ticket.citizen_id, privateKey);
                const dob = await handleDecryptTicket(ticket.dob, privateKey);
                const region = await handleDecryptTicket(ticket.region, privateKey);
                const workUnit = await handleDecryptTicket(ticket.work_unit, privateKey);
                const point = await handleDecryptTicket(ticket.point, privateKey);
                const issueDate = await handleDecryptTicket(ticket.issue_date, privateKey);
                const expiryDate = await handleDecryptTicket(ticket.expiry_date, privateKey);
                const imageCertificate = await handleDecryptImage(ticket.certificate_cid, privateKey)
                setDecryptedName(name);
                setDecryptedGender(gender);
                setDecryptedEmail(email);
                setDecryptedCitizenId(citizenId);
                setDecryptedDob(dob);
                setDecryptedRegion(region);
                setDecryptedWorkUnit(workUnit);
                setDecryptedPoint(point);
                setDecryptedIssueDate(issueDate);
                setDecryptedExpiryDate(expiryDate);
                setDecryptedImage(imageCertificate)
                setError(null); // Clear any previous errors
            } catch (err) {
                // setError("Wrong private key"); // No need to set error here since it's already set in handleDecryptTicket
            }
        };

        if (ticket && privateKey) {
            decryptAllFields();
        }
    }, [ticket, privateKey]);


    const handleReject = async (e) => {
        e.preventDefault()
        try {
            const status = "reject"
            const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}`)
            console.log(response.data.message)
            if (response.data.message === "updated successfully") {
                setUpdate(true)
                setAlertSeverity("success")
                setMessageAlert("Rejected Successfully")
                setShowAlert(true);
            }
            else if (response.data.message === "update failed") {
                setUpdate(false)
                setAlertSeverity("error")

                setMessageAlert("Already Rejected")
                setShowAlert(true);
            }

        }
        catch (err) {
            console.log(err)
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(ticket)
        setLoading(true);

        const metadata = await pinJSONToIPFS(ticket)
        const ipfsMetadata = `ipfs://${metadata}`
        const { ethereum } = window
        if (ethereum) {
            try {
                const result = await contract.mintSBTForAddress(
                    ticket.owner_address,
                    ipfsMetadata
                );
                setAddressContract(result.to)
                console.log(result)
                const status = "approved"
                const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=${result.hash}&issuer_address=${ticket.issuer_address}`)

                console.log(response.data.message)


                if (response.data.message === "updated successfully") {

                    ticket.transaction_hash = result.hash

                    setLoading(false);
                    setAlertSeverity("success")

                    setMessageAlert("Mint Successfully")
                    setShowAlert(true);
                }
                else if (response.data.message === "update failed") {
                    setLoading(false);

                    setUpdate(false)
                    setAlertSeverity("error")

                    setMessageAlert("Mint Fail")
                    setShowAlert(true);
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    };
    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        await new Promise(resolve => setTimeout(resolve, 1000));


    };
    const handleCancle = async () => {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        navigate("/")

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSubmitPrivateKey = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const privatekey = formJson.privatekey;
        setPrivateKey(privatekey)
    }
    function formatDateDB(input) {
        const datePart = input.match(/\d+/g);
        const year = datePart[0];
        const month = datePart[1];
        const day = datePart[2];

        return day + '/' + month + '/' + year;
    }
    async function addNFTToWallet() {
        console.log("ADD", addressContract)
        console.log("TOKEN", tokenID)
        if (addressContract && tokenID) {
            try {
                const wasAdded = await ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC721',
                        options: {
                            address: addressContract,
                            tokenId: tokenID,
                        }
                    },
                });
                if (wasAdded) {
                    const result = await axios.delete(`http://localhost:8080/tickets/ticket/${ticket.id}`)
                    console.log(result)
                    if (result.data.code == "200") {
                        setLoading(true);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        setLoading(false);
                        setAlertSeverity("success")

                        setMessageAlert("Added to Wallet")
                        setShowAlert(true);
                    }
                    else if (result.data.code == "404") {
                        setUpdate(false)
                        setAlertSeverity("error")

                        setMessageAlert("Add to Wallet failed")
                        setShowAlert(true);
                    }
                } else {
                    console.log('Your loss!');
                }
            } catch (error) {
                console.log('Oops! Something went wrong:', error);
            }
        } else {
            console.log('addressContract or tokenID is not defined');
        }

    }
    const handleDecryptTicket = async (prop, privateKey) => {
        try {
            const result = await decryptData(JSON.parse(prop), privateKey);
            if (result === "") {
                setError("Wrong private key"); // Set the error state
                setLoading(true);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
                setAlertSeverity("error")
                setMessageAlert("Wrong private key")
                setShowAlert(true);
                return prop.toString(); // Return the original prop value in case of error
            }
            return result;
        } catch (error) {
            if (error.message.includes("Cipher key could not be derived")) {

                setError("Wrong private key"); // Set the error state
                setLoading(true);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
                setAlertSeverity("error")

                setMessageAlert("Wrong private key")
                setShowAlert(true);
            } else {

                setError("Error decrypting data"); // Set a generic decryption error message
                setLoading(true);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
                setAlertSeverity("error")

                setMessageAlert("Wrong private key")
                setShowAlert(true);
            }
            return prop.toString(); // Return the original prop value in case of error

        }
    };
    const handleDecryptImage = async (prop, privateKey) => {
        console.log("PROPssss", prop)
        try {
            const res = await axios(
                `https://coral-able-takin-320.mypinata.cloud/ipfs/${prop}`

            );
            const image = res.data.image

            const decryptedData = await decryptData(image, privateKey);
            // console.log(decryptedData)
            // return decryptedData
            const str = "abc"
            console.log("IMGGGG", decryptedData)
            return decryptedData
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}

            <main className="body-section1">
                <form className="careers-section" encType="multipart/form-data" action="" >
                    <div>
                        {issuer.includes(address) ? (
                            <>
                                <div className="body-header">
                                    <h1 className="body-header-text2">Certificate Information</h1>
                                </div>

                            </>
                        ) : (
                            <>
                                <AlertTicket severity={ticket.status} />
                            </>
                        )}
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            {ticket.status === 'approved' ? (
                                <Button variant="outlined" sx={{ my: "20px", fontSize: "0.5em" }} onClick={addNFTToWallet}>Import NFT to MetaMask</Button>
                            ) : (
                                <></>
                            )}
                            <Button variant="outlined" sx={{ my: "20px", fontSize: "0.5em" }} onClick={handleClickOpen}>
                                Click to view
                            </Button>
                        </Box>
                        <Dialog
                            open={open}
                            onClose={handleCloseDialog}
                            PaperProps={{
                                component: 'form',
                                onSubmit: handleSubmitPrivateKey

                            }}

                            maxWidth="md" // Adjust this value as needed (sm, md, lg, xl)
                            sx={{
                                '& .MuiDialogContent-root': { fontSize: '1.25rem' }, // Adjust font size for dialog content
                                '& .MuiTextField-root': { fontSize: '1.25rem' }, // Adjust font size for text fields
                                '& .MuiButton-root': { fontSize: '1.25rem' }, // Adjust font size for buttons
                            }}
                        >
                            <DialogTitle sx={{ fontSize: '1.5rem' }}>Private Key</DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ fontSize: '1.5rem' }}>
                                    Please enter private key from your MetaMask
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="normal"

                                    name="privatekey"
                                    label="Private Key"
                                    type="privatekey"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontSize: '1.25rem', // Increase font size
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '1.25rem', // Increase label font size
                                        },

                                    }}
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} type="submit">Decrypt</Button>

                                <Button onClick={handleCloseDialog}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className="careers-section-inner">
                        <div className="name-parent">
                            <div className="name">
                                <h3 className="name1">Name *</h3>
                                {(privateKey) ?
                                    <h3 className="input-name" name="name" type="text">{decryptedName}</h3>
                                    :
                                    <h3 className="input-name" name="name" type="text">{ticket.name}</h3>
                                }
                            </div>
                            <div className="gender">
                                <h3 className="gender1">Gender *</h3>
                                <h3 className="input-gender" name="gender">
                                    {privateKey ? decryptedGender : ticket.gender}
                                </h3>
                            </div>
                            <div className="email">
                                <h3 className="email1">Email *</h3>
                                {privateKey ?
                                    <h3 className="input-email" name="email" type="email">{decryptedEmail}</h3>
                                    :
                                    <h3 className="input-email" name="email" type="email">{ticket.email}</h3>

                                }
                            </div>
                        </div>
                    </div>
                    <div className="careers-section-child">
                        <div className="cccd-parent">
                            <div className="cccd">
                                <h3 className="cccd1">Citizen ID *</h3>
                                <h3 className="input-cccd" name="citizenId" type="text">
                                    {privateKey ? decryptedCitizenId : ticket.citizen_id}
                                </h3>
                            </div>
                            <div className="date-of-birth">
                                <h3 className="date-of-birth1">Date of birth *</h3>
                                <h3 className="input-date-of-birth" name="dob" type="text">
                                    {privateKey ? decryptedDob : ticket.dob}
                                </h3>
                            </div>
                            <div className="home-town">
                                <h3 className="home-town-text">Region *</h3>
                                <h3 className="input-home-town" name="region">
                                    {privateKey ? decryptedRegion : ticket.region}
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div className="careers-section-inner1">
                        <div className="working-unit-parent">
                            <div className="working-unit">
                                <h3 className="working-unit-text">Work Unit *</h3>
                                <h3 className="input-working-unit" name="workUnit" type="text">
                                    {privateKey ? decryptedWorkUnit : ticket.work_unit}
                                </h3>
                            </div>

                            <div className="score">
                                <h3 className="score-text">Point</h3>
                                <h3 className="input-score" name="point" type="text">
                                    {privateKey ? decryptedPoint : ticket.point}
                                </h3>
                            </div>
                            <div className="name-of-vertification">
                                <h3 className="name-of-vertification1">Certificate name *</h3>
                                <h3 className="input-name-of-vertification" name="certificateName"  >
                                    {ticket.certificate_name}
                                </h3>
                            </div>

                            <div className="date-vertification">
                                <h3 className="date-vertification-text">Issue Date *</h3>
                                <h3 className="input-date-vertification" name="issueDate" type="text">
                                    {privateKey ? decryptedIssueDate : ticket.issue_date}
                                </h3>
                            </div>
                            <div className="expired-date">
                                <h3 className="expired-date-text">Expiry Date</h3>
                                <h3 className="input-expired-date" name="expiryDate" type="text">
                                    {privateKey ? decryptedExpiryDate : ticket.expiry_date}
                                </h3>
                            </div>
                            <div className="vertification-unit">
                                <h3 className="vertification-unit-text">Licensing Authority *</h3>
                                <h3 className="input-vertification-unit" name="licensingAuthority" type="text" >{ticket.licensing_authority}</h3>
                            </div>
                        </div>

                    </div>
                    <div className="upload-wrapper">
                        <div className="upload">
                            <h3 className="upload-file-text">Image of certificate</h3>
                            <div className="">
                                <div className="input-box-background" />
                                <MultiActionAreaCard image={privateKey ? decryptedImage : ticket.certificate_cid} />
                            </div>
                        </div>
                    </div>
                    {issuer.includes(address) ?
                        <>
                            <div className="body-button1">
                                <button className="submit-button" onClick={handleSubmit}>
                                    <div className="submit">Mint</div>
                                </button>
                                <button className="reject-button" onClick={handleReject}>
                                    <div className="reject">Reject</div>
                                </button>
                                <button className="cancel-button" onClick={handleCancle}>
                                    <div className="cancel">Cancel</div>
                                </button>
                            </div>
                        </>
                        :
                        <></>
                    }
                    <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={alertSeverity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {messageAlert}
                        </Alert>
                    </Snackbar>

                </form>

            </main >
        </>

    );
};

export default Ticket;
