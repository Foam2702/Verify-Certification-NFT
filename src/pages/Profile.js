import HeaderSection from "../components/HeaderSection";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSigner from "../state/signer";
import { hashImage, pinJSONToIPFS, deletePinIPFS, extractEncryptedDataFromJson, decryptData, minifyAddress, imageFileToBase64 } from "../helpers/index"

export const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("");
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null);
    const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);

    const [open, setOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState("")
    const [decryptedName, setDecryptedName] = useState('');
    const [decryptedGender, setDecryptedGender] = useState('');
    const [decryptedEmail, setDecryptedEmail] = useState('');
    const [decryptedCitizenId, setDecryptedCitizenId] = useState('');
    const [decryptedDob, setDecryptedDob] = useState('');
    const [decryptedRegion, setDecryptedRegion] = useState('');
    const [decryptedWorkUnit, setDecryptedWorkUnit] = useState('');
    const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();

    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const onCancelBtnClick = async () => {

        navigate("/")
    };
    const handleUpdateInfo = async (event) => {
        event.preventDefault();

        const form = document.querySelector("form");

        setLoading(true); // Start loading before sending the request
        // Get the form data
        const data = Array.from(form.elements)
            .filter((input) => input.name)
            .reduce(
                (obj, input) => Object.assign(obj, { [input.name]: input.value }),
                {}
            );
        const formData = new FormData();
        //Email
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(data.email)) {
            console.log("Invalid email address.");
            document.querySelector("[name='email']").classList.add('invalid-input');
            return;
        } else {
            console.log("Valid email");
        }
        const fields = [
            'citizenId', 'name', 'region', 'dob', 'gender', 'email',
            'workUnit'
        ];
        for (const field of fields) {
            formData.append(field, data[field]);
        }
        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }
        const response = await axios.patch(`http://localhost:8080/addresses/profile/${address}`, {
            citizenId: data.citizenId,
            name: data.name,
            region: data.region,
            dob: data.dob,
            gender: data.gender,
            email: data.email,
            workUnit: data.workUnit

        });
        console.log(response)
        if (response.data.message == "Updated successfully") {
            setMessageAlert("Updated successfully");
            setAlertSeverity("success");
            setShowAlert(true);
            setLoading(false)
            return
        }
        else {
            setMessageAlert("Updated fail");
            setAlertSeverity("error");
            setShowAlert(true);
            setLoading(false)
            return
        }

    }
    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setLoading(true);
        setShowAlert(false);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // setLoading(false);

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
    const handleDecryptInfo = async (prop, privateKey) => {
        console.log(prop)
        if (prop != null && prop != '' && prop != undefined) {
            try {
                const result = await decryptData(JSON.parse(prop), privateKey);
                if (result === "") {
                    console.log("IM HERE")
                    setError("Wrong private key"); // Set the error state
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")
                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                    setIsPrivateKeyValid(false);

                    return minifyAddress(prop.toString()); // Return the original prop value in case of error
                }
                setIsPrivateKeyValid(true);

                return result;
            } catch (error) {
                if (error.message.includes("Cipher key could not be derived")) {
                    console.log("IM HERE2")

                    setError("Wrong private key"); // Set the error state
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")
                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                    setIsPrivateKeyValid(false);

                } else {
                    console.log("IM HERE3")

                    console.log(error)
                    setError("Error decrypting data");
                    setLoading(true);
                    setLoading(false);
                    setAlertSeverity("error")

                    setMessageAlert("Wrong private key")
                    setShowAlert(true);
                    setIsPrivateKeyValid(false);

                }
                console.log(minifyAddress(prop.toString()))
                return minifyAddress(prop.toString());
            }
        }
        else {
            return " ";
        }
    };
    useEffect(() => {
        const fetchDataRegions = async () => {
            try {
                const result = await axios("http://localhost:8080/tickets");
                if (Array.isArray(result.data.cities)) {
                    setRegions(result.data.cities);
                    console.log({ regions });
                } else {
                    throw new Error("Unexpected data format");
                }
            }
            catch (err) {
                console.log(err)
            }

        };

        fetchDataRegions().catch((error) => console.error(error));
    }, [])
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/addresses/${address}`);
                const data = response.data.address[0];
                console.log(data)
                setUser(data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchUserInfo().catch(err => console.log(err))
    }, [address, signer])
    useEffect(() => {
        const decryptAllFields = async () => {
            try {
                setLoading(true)
                const name = await handleDecryptInfo(user.name, privateKey);
                const gender = await handleDecryptInfo(user.gender, privateKey);
                const email = await handleDecryptInfo(user.email, privateKey);
                const citizenId = await handleDecryptInfo(user.citizen_id, privateKey);
                const dob = await handleDecryptInfo(user.dob, privateKey);
                const region = await handleDecryptInfo(user.region, privateKey);
                const workUnit = await handleDecryptInfo(user.work_unit, privateKey);
                console.log("REGION", region)
                setDecryptedName(name);
                setDecryptedGender(gender);
                setDecryptedEmail(email);
                setDecryptedCitizenId(citizenId);
                setDecryptedDob(dob);
                setDecryptedRegion(region);
                setDecryptedWorkUnit(workUnit);
                setError(null); // Clear any previous errors
                setLoading(false)
                console.log("IM HERE4")


            } catch (err) {
                console.log("IM HERE5")

                setLoading(false)
                setIsPrivateKeyValid(false);

            }
        };

        if (user && privateKey) {
            decryptAllFields();
        }
    }, [user, privateKey]);
    return (
        <div>
            <HeaderSection />
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}


            <section className="body-section1">
                <div className="body-header">
                    <h1 className="body-header-text2">Your information</h1>
                </div>

                {user && user.name && user.gender && user.email && user.dob && user.citizen_id && user.region && user.work_unit ?
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Button variant="outlined" sx={{ my: "20px", fontSize: "0.5em" }} onClick={handleClickOpen}>
                            Click to view
                        </Button>
                    </Box>
                    : <></>}
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
                <form className="careers-section" encType="multipart/form-data" onSubmit={handleUpdateInfo}>
                    <div className="careers-section-inner">
                        <div className="name-parent">
                            <div className="name">
                                <h3 className="name1">Name *</h3>
                                <input
                                    className="input-name"
                                    name="name"
                                    placeholder="Type here..."
                                    type="text"
                                    defaultValue={
                                        (user && user.name) ?

                                            (privateKey ?
                                                decryptedName
                                                :
                                                minifyAddress(user.name)
                                            )
                                            : ''
                                    }
                                    readOnly={!isPrivateKeyValid} // Make the input read-only when isPrivateKeyValid is false
                                    disabled={!isPrivateKeyValid} // Disable the input when isPrivateKeyValid is false

                                />
                            </div>
                            <div className="gender">
                                <h3 className="gender1">Gender *</h3>
                                <select
                                    className="input-gender"
                                    name="gender"
                                    defaultValue={(user && user.gender) ? (privateKey ? decryptedGender : minifyAddress(user.gender)) : ''}
                                    disabled={!isPrivateKeyValid} // Disable the select when isPrivateKeyValid is false
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="email">
                                <h3 className="email1">Email *</h3>
                                <input
                                    className="input-email"
                                    name="email"
                                    placeholder="abc@abc.com"
                                    type="email"
                                    readOnly={!isPrivateKeyValid} // Make the input read-only when isPrivateKeyValid is false
                                    disabled={!isPrivateKeyValid} // Disable the input when isPrivateKeyValid is false

                                    defaultValue={(user && user.email) ? (privateKey ? decryptedEmail : minifyAddress(user.email)) : ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="careers-section-child">
                        <div className="cccd-parent">
                            <div className="cccd">
                                <h3 className="cccd1">Citizen ID *</h3>
                                <input
                                    className="input-cccd"
                                    name="citizenId"
                                    placeholder="Type here..."
                                    type="text"
                                    readOnly={!isPrivateKeyValid} // Make the input read-only when isPrivateKeyValid is false
                                    disabled={!isPrivateKeyValid}
                                    defaultValue={(user && user.citizen_id) ? (privateKey ? decryptedCitizenId : minifyAddress(user.citizen_id)) : ''}
                                />
                            </div>
                            <div className="date-of-birth">
                                <h3 className="date-of-birth1">Date of birth *</h3>
                                <input
                                    className="input-date-of-birth"
                                    name="dob"
                                    placeholder="Choose..."
                                    type="date"
                                    readOnly={!isPrivateKeyValid} // Make the input read-only when isPrivateKeyValid is false
                                    disabled={!isPrivateKeyValid}
                                    defaultValue={(user && user.dob) ? (privateKey ? decryptedDob : minifyAddress(user.dob)) : ''}
                                />
                            </div>



                            <div className="home-town">
                                <h3 className="home-town-text">Region *</h3>
                                {user && user.region ? (
                                    <select
                                        className="input-home-town"
                                        name="region"
                                        defaultValue={privateKey ? decryptedRegion : ''}
                                        disabled={!isPrivateKeyValid} // Disable the select when isPrivateKeyValid is false
                                    >
                                        <option value={privateKey ? decryptedRegion : minifyAddress(user.region)}>
                                            {privateKey ? decryptedRegion : minifyAddress(user.region)}
                                        </option>
                                        {regions.map((region) => (
                                            <option key={region._id} value={region.name}>
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className="input-home-town" name="region">
                                        <option value="">Select region ...</option>
                                        {regions.map((region) => (
                                            <option key={region._id} value={region.name}>
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>


                        </div>
                    </div>
                    <div className="working-unit-parent">
                        <div className="working-unit">
                            <h3 className="working-unit-text">Work unit *</h3>
                            <input
                                className="input-working-unit"
                                name="workUnit"
                                placeholder="Type here..."
                                type="text"
                                readOnly={!isPrivateKeyValid} // Make the input read-only when isPrivateKeyValid is false
                                disabled={!isPrivateKeyValid}
                                defaultValue={(user && user.work_unit) ? (privateKey ? decryptedWorkUnit : minifyAddress(user.work_unit)) : ''}
                            />
                        </div>
                    </div>
                    {isPrivateKeyValid &&
                        <div className="body-button">
                            <button className="submit-button" type="submit">
                                <div className="submit">Update</div>
                            </button>
                            <button className="cancel-button" type="button" onClick={onCancelBtnClick}>
                                <div className="cancel">Cancel</div>
                            </button>
                        </div>
                    }

                </form>
                <Snackbar open={showAlert} autoHideDuration={10000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={alertSeverity}
                        variant="filled"
                        sx={{ width: '100%', fontSize: '1.25rem' }}
                    >
                        {messageAlert}
                    </Alert>
                </Snackbar>
            </section>

        </div>
    );
}