import { useCallback } from "react";
import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import axios from 'axios';
import useSigner from "../state/signer";
import MultiActionAreaCard from "./MultiACtionAreaCard";
import { formatDate } from '../helpers/index'
import { useNavigate } from "react-router-dom";
import AlertTicket from "./AlertTicket"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./BodySection.css";
import "../pages/LisenceView"


const Ticket = ({ ticket }) => {
    const { signer, address, connectWallet, contract } = useSigner()
    const [issuer, setIssuer] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [countdown, setCountdown] = useState(3)

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
    }, [ticket]) // Add ticket as a dependency
    useEffect(() => {
        let timer;
        if (showAlert && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setShowAlert(false);
        }
        return () => clearTimeout(timer);
    }, [showAlert, countdown]);
    const handleReject = async (e) => {
        e.preventDefault()
        const status = "reject"
        const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}/${status}`)
        console.log(response.data.message)
        if (response.data.message === "updated successfully") {
            setUpdate(true)
            setMessageAlert("Rejected Successfully")
            setShowAlert(true);

        }
        else if (response.data.message === "update failed") {
            setUpdate(false)
            setMessageAlert("Already Rejected")
            setShowAlert(true);
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const status = "approved"
        const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}/${status}`)
        console.log(response.data.message)
        // const metadata = await pinJSONToIPFS(ticket)
        // const ipfsMetadata = `ipfs://${metadata}`
        // const { ethereum } = window
        // if (ethereum) {
        //     const result = await contract.mintSBTForAddress(
        //         ticket.owner_address,
        //         ipfsMetadata
        //     );
        // }
        if (response.data.message === "updated successfully") {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
            setMessageAlert("Mint Successfully")
            setShowAlert(true);
        }
        else if (response.data.message === "update failed") {
            setUpdate(false)
            setMessageAlert("Mint Fail")
            setShowAlert(true);
        }
    };
    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(true);
        setShowAlert(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        navigate("/")

    };
    const handleCancle = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        navigate("/")

    }
    function formatDateDB(input) {
        const datePart = input.match(/\d+/g);
        const year = datePart[0];
        const month = datePart[1];
        const day = datePart[2];

        return day + '/' + month + '/' + year;
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
                    {issuer.includes(address) ?
                        <div className="body-header">
                            <h1 className="body-header-text2">Thông tin chứng chỉ</h1>
                        </div>
                        :
                        <AlertTicket severity={ticket.status} />
                    }
                    <div className="careers-section-inner">
                        <div className="name-parent">
                            <div className="name">
                                <h3 className="name1">Họ và tên</h3>
                                <h3 className="input-name" name="name" type="text">{ticket.name}</h3>
                            </div>
                            <div className="gender">
                                <h3 className="gender1">Giới tính*</h3>
                                <h3 className="input-gender" name="gender">
                                    {ticket.gender}
                                </h3>
                            </div>
                            <div className="email">
                                <h3 className="email1">Email</h3>
                                <h3 className="input-email" name="email" type="email">{ticket.email}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="careers-section-child">
                        <div className="cccd-parent">
                            <div className="cccd">
                                <h3 className="cccd1">Số CCCD*</h3>
                                <h3 className="input-cccd" name="citizenId" type="text">{ticket.citizen_id}</h3>
                            </div>
                            <div className="date-of-birth">
                                <h3 className="date-of-birth1">Ngày Sinh</h3>
                                <h3 className="input-date-of-birth" name="dob" type="date">{formatDate(ticket.dob)}</h3>
                            </div>
                            <div className="home-town">
                                <h3 className="home-town-text">Quê quán</h3>
                                <h3 className="input-home-town" name="region" >
                                    {ticket.region}
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div className="careers-section-inner1">
                        <div className="working-unit-parent">
                            <div className="working-unit">
                                <h3 className="working-unit-text">Đơn vị công tác</h3>
                                <h3 className="input-working-unit" name="workUnit" type="text">{ticket.work_unit}</h3>
                            </div>
                            <div className="name-of-vertification">
                                <h3 className="name-of-vertification1">Tên chứng chỉ*</h3>
                                <h3 className="input-name-of-vertification" name="certificateName"  >
                                    {ticket.certificate_name}
                                </h3>
                            </div>
                            <div className="score">
                                <h3 className="score-text">Điểm</h3>
                                <h3 className="input-score" name="point" type="text" >{ticket.point}</h3>
                            </div>
                            <div className="vertification-unit">
                                <h3 className="vertification-unit-text">Đơn vị cấp phép*</h3>
                                <h3 className="input-vertification-unit" name="licensingAuthority" type="text" >{ticket.licensing_authority}</h3>
                            </div>
                            <div className="date-vertification">
                                <h3 className="date-vertification-text">Ngày cấp*</h3>
                                <h3 className="input-date-vertification" name="issueDate" type="date" >{formatDate(ticket.issue_date)}</h3>
                            </div>
                            <div className="expired-date">
                                <h3 className="expired-date-text">Hạn sử dụng chứng chỉ*</h3>
                                <h3 className="input-expired-date" name="expiryDate" type="date">{formatDate(ticket.expiry_date)}</h3>
                            </div>
                        </div>

                    </div>
                    <div className="upload-wrapper">
                        <div className="upload">
                            <h3 className="upload-file-text">Hình ảnh chứng chỉ</h3>
                            <div className="input-upload-file">
                                <div className="input-box-background" />
                                <MultiActionAreaCard image={ticket.certificateUrl} />
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
                            severity={update ? "success" : "error"}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {messageAlert}.Back to home at {countdown}
                        </Alert>
                    </Snackbar>
                </form>

            </main >
        </>

    );
};

export default Ticket;
