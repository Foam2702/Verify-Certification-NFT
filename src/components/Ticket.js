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
import { hashImage, pinJSONToIPFS, deletePinIPFS, extractEncryptedDataFromJson, decryptData, minifyAddress, imageFileToBase64 } from "../helpers/index"

const JWT = process.env.REACT_APP_JWT; // Make sure to set this in your React app environment variables

import "./BodySection.css";
import "../pages/LisenceView"

const Ticket = ({ ticket }) => {
    const { signer, address, connectWallet, contract, provider } = useSigner()
    const [file, setFile] = useState(null);
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
    const [userTicket, setUserTicket] = useState(null)
    const [imageUrl, setImageUrl] = useState('');
    const [imageMatch, setImageMatch] = useState(false)
    const [isExam, setIsExam] = useState(false)
    const web3 = new Web3(window.ethereum);
    const navigate = useNavigate();
    useEffect(() => {
        const checkIssuer = async () => {
            const { ethereum } = window;
            if (ethereum) {
                console.log("TICKET", ticket)
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
                const tokenIdValue = web3.utils.hexToNumber(logs[0].topics[3]);
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
                setLoading(true)
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
                setLoading(false)
            } catch (err) {
                setLoading(false)
                // setError("Wrong private key"); // No need to set error here since it's already set in handleDecryptTicket
            }
        };

        if (ticket && privateKey) {
            decryptAllFields();
        }
    }, [ticket, privateKey]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios('http://localhost:8080/courses');
                const courses = response.data.courses; // Assuming the API response structure
                if (ticket.certificate_name) {
                    const match = courses.some(course => {

                        if (course.name === ticket.certificate_name) {
                            console.log(course.name)
                            console.log(ticket.certificate_name)
                        }
                        return course.name === ticket.certificate_name
                    });
                    setIsExam(match)
                    setImageMatch(match);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };
        fetchCourses();
    }, [ticket, setImageMatch]);
    const handleReject = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const status = "reject"
            const owner = await axios(`http://localhost:8080/tickets/ticket/${ticket.id}?address=`)
            await deletePinIPFS(owner.data.ticket[0].certificate_cid)
            for (let address of issuer) {
                const issuer_org = await axios(`http://localhost:8080/tickets/ticket/${ticket.id}?address=${address}`);
                if (issuer_org.data.ticket[0].certificate_cid) {
                    await deletePinIPFS(issuer_org.data.ticket[0].certificate_cid)
                }
            }
            const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=`)

            if (response.data.message === "updated successfully") {
                setLoading(false)
                setUpdate(true)
                setAlertSeverity("success")
                setMessageAlert("Rejected Successfully")
                setShowAlert(true);
                await new Promise(resolve => setTimeout(resolve, 3000));
                navigate("/")
            }
            else if (response.data.message === "update failed") {
                setLoading(false)

                setpdate(false)
                setAlertSeverity("error")
                setMessageAlert("Already Rejected")
                setShowAlert(true);
            }

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const userTicket = await axios(`http://localhost:8080/tickets/ticket/${ticket.id}?address=`)
            ticket = userTicket.data.ticket[0];
            ticket.status = "approved"
            const metadata = await pinJSONToIPFS(ticket)
            const ipfsMetadata = `ipfs://${metadata}`
            const { ethereum } = window
            if (ethereum) {
                const result = await contract.mintSBTForAddress(
                    ticket.owner_address,
                    ipfsMetadata
                );
                setAddressContract(result.to)
                for (let address of issuer) {
                    const issuer_org = await axios(`http://localhost:8080/tickets/ticket/${ticket.id}?address=${address}`);
                    if (issuer_org.data.ticket[0].certificate_cid) {

                        await deletePinIPFS(issuer_org.data.ticket[0].certificate_cid)
                    }
                }
                const status = "approved"
                const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=${result.hash}&issuer_address=`)
                if (response.data.message === "updated successfully") {
                    ticket.transaction_hash = result.hash
                    setLoading(false);
                    setAlertSeverity("success")
                    setMessageAlert("Mint Successfully")
                    setShowAlert(true);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    navigate("/")
                }
                else if (response.data.message === "update failed") {
                    setLoading(false);
                    setUpdate(false)
                    setAlertSeverity("error")
                    setMessageAlert("Mint Fail")
                    setShowAlert(true);
                }
            }
        } catch (err) {
            setLoading(false);
            setAlertSeverity("error");
            setMessageAlert("Rejected transaction");
            setShowAlert(true);
            window.location.reload();

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
        setLoading(true)
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
                    setLoading(false);
                    setAlertSeverity("success")
                    setMessageAlert("Added to Wallet")
                    setShowAlert(true);
                }
                else {
                    setUpdate(false)
                    setAlertSeverity("error")
                    setMessageAlert("Add to Wallet failed")
                    setShowAlert(true);
                }
            } catch (error) {
                console.log('Oops! Something went wrong:', error);
            }
        } else {
            console.log('addressContract or tokenID is not defined');
        }
        setLoading(false)
    }
    const handleDecryptTicket = async (prop, privateKey) => {
        if (prop != null && prop != '' && prop != undefined) {
            try {
                const result = await decryptData(JSON.parse(prop), privateKey);
                console.log(JSON.parse(prop), result)
                if (result === "") {

                    setError("Wrong private key"); // Set the error state
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")
                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                    return minifyAddress(prop.toString()); // Return the original prop value in case of error
                }
                return result;
            } catch (error) {
                if (error.message.includes("Cipher key could not be derived")) {

                    setError("Wrong private key"); // Set the error state
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")
                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                } else {

                    setError("Error decrypting data");
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")

                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                }
                return minifyAddress(prop.toString());
            }
        }
        else {
            return " ";
        }
    };
    const handleDecryptImage = async (prop, privateKey) => {
        try {
            const res = await axios(
                `https://coral-able-takin-320.mypinata.cloud/ipfs/${prop}`

            );
            const image = res.data.image
            const decryptedData = await decryptData(image, privateKey);
            return decryptedData
        }
        catch (err) {
            console.log(err)
        }
    }
    const onfileChange = async (event) => {
        setImageMatch(false)
        setFile(event.target.files);
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                const base64ImageString = await imageFileToBase64(file);
                setImageUrl(base64ImageString);
            } catch (error) {
                console.error('Error converting file to base64', error);
            }
        }
    };
    const handleCheckImage = async (event) => {
        event.preventDefault();
        if (decryptedImage == null) {
            setLoading(true);
            setAlertSeverity("warning")
            setMessageAlert("Decrypt image to check")
            setShowAlert(true);
            setLoading(false);
            return;
        }
        if (imageUrl) {
            const hashStudentImg = hashImage(decryptedImage)
            const hashIssuerImg = hashImage(imageUrl)
            if (hashIssuerImg == hashStudentImg) {
                setLoading(true);
                setAlertSeverity("success")
                setMessageAlert("The two images match")
                setShowAlert(true);
                setLoading(false);
                setImageMatch(true)
            }
            else {
                setLoading(true);
                setAlertSeverity("error")
                setMessageAlert("The two images do not match")
                setShowAlert(true);
                setLoading(false);
                setImageMatch(false)

            }

        }
        else {
            setLoading(true);
            setAlertSeverity("warning")
            setMessageAlert("Upload your file")
            setShowAlert(true);
            setLoading(false);
            return;
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

                            maxWidth="md"
                            sx={{
                                '& .MuiDialogContent-root': { fontSize: '1.25rem' },
                                '& .MuiTextField-root': { fontSize: '1.25rem' },
                                '& .MuiButton-root': { fontSize: '1.25rem' },
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
                    {isExam &&
                        <Alert variant="outlined" severity="success" sx={{ fontSize: "2rem" }}>
                            Certificate of passing exam at VSCourses
                        </Alert>}
                    <div className="careers-section-inner">
                        <div className="name-parent">
                            <div className="name">
                                <h3 className="name1">Name *</h3>
                                {(privateKey) ?
                                    <h3 className="input-name" name="name" type="text">{decryptedName}</h3>
                                    :
                                    <h3 className="input-name" name="name" type="text">{minifyAddress(ticket.name)}</h3>
                                }
                            </div>
                            <div className="gender">
                                <h3 className="gender1">Gender *</h3>
                                <h3 className="input-gender" name="gender">
                                    {privateKey ? decryptedGender : minifyAddress(ticket.gender)}
                                </h3>
                            </div>
                            <div className="email">
                                <h3 className="email1">Email *</h3>
                                {privateKey ?
                                    <h3 className="input-email" name="email" type="email">{decryptedEmail}</h3>
                                    :
                                    <h3 className="input-email" name="email" type="email">{minifyAddress(ticket.email)}</h3>

                                }
                            </div>
                        </div>
                    </div>
                    <div className="careers-section-child">
                        <div className="cccd-parent">
                            <div className="cccd">
                                <h3 className="cccd1">Citizen ID *</h3>
                                <h3 className="input-cccd" name="citizenId" type="text">
                                    {privateKey ? decryptedCitizenId : minifyAddress(ticket.citizen_id)}
                                </h3>
                            </div>
                            <div className="date-of-birth">
                                <h3 className="date-of-birth1">Date of birth *</h3>
                                <h3 className="input-date-of-birth" name="dob" type="text">
                                    {privateKey ? decryptedDob : minifyAddress(ticket.dob)}
                                </h3>
                            </div>
                            <div className="home-town">
                                <h3 className="home-town-text">Region *</h3>
                                <h3 className="input-home-town" name="region">
                                    {privateKey ? decryptedRegion : minifyAddress(ticket.region)}
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div className="careers-section-inner1">
                        <div className="working-unit-parent">
                            <div className="working-unit">
                                <h3 className="working-unit-text">Work Unit *</h3>
                                <h3 className="input-working-unit" name="workUnit" type="text">
                                    {privateKey ? decryptedWorkUnit : minifyAddress(ticket.work_unit)}
                                </h3>
                            </div>

                            <div className="score">
                                <h3 className="score-text">Point</h3>
                                <h3 className="input-score" name="point" type="text">
                                    {privateKey ? decryptedPoint : minifyAddress(ticket.point)}
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
                                    {privateKey ? decryptedIssueDate : minifyAddress(ticket.issue_date)}
                                </h3>
                            </div>
                            <div className="expired-date">
                                <h3 className="expired-date-text">Expiry Date</h3>
                                <h3 className="input-expired-date" name="expiryDate" type="text">
                                    {privateKey ? decryptedExpiryDate : minifyAddress(ticket.expiry_date)}
                                </h3>
                            </div>
                            <div className="vertification-unit">
                                <h3 className="vertification-unit-text">Licensing Authority *</h3>
                                <h3 className="input-vertification-unit" name="licensingAuthority" type="text" >{ticket.licensing_authority}</h3>
                            </div>
                        </div>

                    </div>

                    {issuer.includes(address) ?
                        <div className="image-hash-container">
                            <div className="upload-wrapper">
                                <div className="upload">
                                    <h3 className="upload-file-text">Image of Student</h3>
                                    <div className="">
                                        <div className="input-box-background" />

                                        <MultiActionAreaCard image={privateKey ? decryptedImage : ticket.certificate_cid} size={500} />
                                    </div>
                                </div>
                            </div>
                            {!imageMatch && <div className="upload-wrapper">
                                <div className="upload">
                                    <h3 className="upload-file-text">Image of Issuer</h3>

                                    <div className="input-box-background" />
                                    <input
                                        className="example-here"
                                        name="imageCertificate"
                                        type="file"
                                        accept=".jpg"
                                        multiple
                                        onChange={onfileChange}
                                    />
                                    <MultiActionAreaCard image={imageUrl} size={500} sx={{ Margin: 10 }} />

                                </div>
                            </div>}

                        </div>
                        :

                        <div className="upload-wrapper">
                            <div className="upload">
                                <h3 className="upload-file-text">Image of certificate</h3>
                                <div className="">
                                    <div className="input-box-background" />
                                    <div className="image-container">
                                        <MultiActionAreaCard image={privateKey ? decryptedImage : ticket.certificate_cid} size={500} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {issuer.includes(address) ?
                        <>
                            <div className="body-button1">
                                <button className="check-button" onClick={handleCheckImage}>
                                    <div className="check" >Check</div>
                                </button>
                                {imageMatch ?
                                    <button className="submit-button" onClick={handleSubmit}>
                                        <div className="submit">Mint</div>
                                    </button>
                                    :
                                    <></>
                                }

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
