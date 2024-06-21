import HeaderSection from "../components/HeaderSection";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSigner from "../state/signer";

export const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("");
    const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();

    const navigate = useNavigate();

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
    console.log(regions)
    return (
        <div>
            <HeaderSection />
            <>
                {loading && (
                    <div className="loading-overlay">
                        <CircularProgress />
                    </div>
                )}

                <section className="body-section1">
                    <div className="body-header">
                        <h1 className="body-header-text2">Your information</h1>
                    </div>
                    <form
                        className="careers-section"
                        encType="multipart/form-data"
                        action=""
                    >
                        <div className="careers-section-inner">
                            <div className="name-parent">
                                <div className="name">
                                    <h3 className="name1">Name *</h3>
                                    <input
                                        className="input-name"
                                        name="name"
                                        placeholder="Type here..."
                                        type="text"
                                    />
                                </div>
                                <div className="gender">
                                    <h3 className="gender1">Gender *</h3>
                                    <select className="input-gender" name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="email">
                                    <h3 className="email1">Email</h3>
                                    <input
                                        className="input-email"
                                        name="email"
                                        placeholder="abc@abc.com"
                                        type="email"
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
                                    />
                                </div>
                                <div className="date-of-birth">
                                    <h3 className="date-of-birth1">Date of birth *</h3>
                                    <input
                                        className="input-date-of-birth"
                                        name="dob"
                                        placeholder="Choose..."
                                        type="date"
                                    />
                                </div>
                                <div className="home-town">
                                    <h3 className="home-town-text">Region *</h3>
                                    <select className="input-home-town" name="region">
                                        <option value="">Select region ...</option>
                                        {regions.map((region) => (
                                            <option key={region._id} value={region.name}>
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>
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
                                />
                            </div>
                        </div>
                        <div className="body-button">
                            <button className="submit-button" onClick={handleUpdateInfo}>
                                <div className="submit">Update</div>
                            </button>
                            <button className="cancel-button" onClick={onCancelBtnClick}>
                                <div className="cancel">Cancel</div>
                            </button>
                        </div>
                    </form>
                    <Snackbar open={showAlert} autoHideDuration={10000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={alertSeverity}
                            variant="filled"
                            sx={{
                                width: '100%',
                                fontSize: '1.25rem', // Increase font size
                            }}
                        >
                            {messageAlert}
                        </Alert>
                    </Snackbar>
                </section>
            </>


        </div>
    );
}