import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import useSigner from "../state/signer";
import MultiActionAreaCard from "./MultiACtionAreaCard";
import { formatDate } from '../helpers/index'
import { useNavigate } from "react-router-dom";
import AlertTicket from "./AlertTicket"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { pinJSONToIPFS } from "../helpers/index";

const Ticket = ({ ticket }) => {
    const { signer, address, connectWallet, contract } = useSigner()
    const [issuer, setIssuer] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [loading, setLoading] = useState(false);

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
    const handleReject = async (e) => {
        e.preventDefault()
        const status = "reject"
        const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}/${status}`)
        console.log(response.data.message)
        if (response.data.message === "updated successfully") {
            setMessageAlert("Rejected Successfully")
            setShowAlert(true);
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // const status = "approved"
        // const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}/${status}`)
        // console.log(response)
        console.log("TICKET", ticket)
        const metadata = await pinJSONToIPFS(ticket)
        //const metadata = "QmZPzoF532e2eECRtAY8UwPD6nkk6jFE9jVLye2ZRM99pa"
        const ipfsMetadata = `ipfs://${metadata}`
        const { ethereum } = window
        if (ethereum) {
            // const date = new Date(ticket.dob)

            const result = await contract.mintSBTForAddress(
                ticket.owner_address,
                ipfsMetadata
            );
            console.log("RESULT", result)
            const sbt = await contract.getMySBTs()
            console.log(sbt)
        }
        const message = "updated successfully"
        if (message === "updated successfully") {
            setMessageAlert("Mint Successfully")
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
            <main className="ticket-section">
                <form encType="multipart/form-data" action="" >
                    {issuer.includes(address) ?
                        <h1 className="printInfo">THÔNG TIN CHỨNG CHỈ</h1>
                        :
                        <AlertTicket severity={ticket.status} />
                    }
                    <div className="career-10">
                        <div className="bg8" />
                        <h3 className="n-v-cp">Đơn vị cấp phép</h3>
                        <h3 className="viewinput1">{ticket.licensing_authority}</h3>
                    </div>

                    <div className="career-11">
                        <div className="bg8" />
                        <h3 className="ngy-cp">Ngày cấp</h3>
                        <h3 className="viewinput1">{formatDate(ticket.issue_date)}</h3>
                    </div>

                    <div className="career-8">
                        <div className="bg8" />
                        <h3 className="tn-chng-ch">Tên chứng chỉ</h3>
                        <h3 className="viewinput1">{ticket.certificate_name}</h3>
                    </div>

                    {/* Function Date of Birth */}
                    <div className="career-5">
                        <div className="bg8" />

                        <h3 className="ngy-sinh">Ngày sinh</h3>
                        <h3 className="viewinput1">{formatDate(ticket.dob)}</h3>

                    </div>

                    {/* Function Regions */}
                    <div className="career-6">
                        <div className="bg8" />

                        <h3 className="qu-qun">Quê quán</h3>
                        <h3 className="viewinput1">{ticket.region}</h3>

                    </div>

                    {/* Function WorkUnit */}
                    <div className="career-7">
                        <div className="bg8" />
                        <h3 className="n-v-cng">Đơn vị công tác</h3>
                        <h3 className="viewinput1">{ticket.work_unit}</h3>
                    </div>

                    {/* Function ID */}
                    <div className="career-2">
                        <div className="bg8" />
                        <h3 className="gii-tnh">Giới tính</h3>
                        <h3 className="viewinput1">{ticket.gender}</h3>

                    </div>

                    {/* Function Point */}
                    <div className="career-9">
                        <div className="bg8" />
                        <h3 className="im">Điểm</h3>
                        <h3 className="viewinput1">{ticket.point}</h3>
                    </div>

                    {/* Funtion Expired Date */}
                    <div className="career-12">
                        <div className="bg8" />
                        <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ</h3>
                        <h3 className="viewinput1">{formatDate(ticket.expiry_date)}</h3>
                    </div>

                    <div className="career-3">
                        <div className="bg17" />
                        <h3 className="email">Email</h3>
                        <h3 className="viewinput1">{ticket.email}</h3>
                    </div>


                    <div className="career-1">
                        <div className="bg8" />
                        <h3 className="h-v-tn">Họ và tên</h3>
                        <h3 className="viewinput1">{ticket.name}</h3>
                    </div>


                    <div className="career-14">
                        <div className="bg8" />
                        <h3 className="s-cccd">Số CCCD</h3>
                        <h3 className="viewinput1">{ticket.citizen_id}</h3>
                    </div>

                    {/* Funtion Upload File */}
                    <div className="imageCertificate">
                        {/* <div className="bg15" /> */}
                        <h3 className="imageCertificateTitle">Hình ảnh chứng chỉ</h3>
                        <MultiActionAreaCard image={ticket.certificateUrl} />
                    </div>
                    {issuer.includes(address) ?
                        <>
                            <button className="submitbtnTicket" onClick={handleSubmit}>
                                <div className="bg19Ticket" />
                                <div className="submit">Mint</div>
                            </button>
                            <button className="rejectbtnTicket" onClick={handleReject}>
                                <div className="bgRejectTicket" />
                                <div className=" submit">Reject</div>
                            </button>

                            <button className="cancelbtnTicket" type="reset" onClick={handleCancle}>
                                <div className="bg20Ticket" />
                                <div className="submit">Cancel</div>
                            </button>
                        </>
                        :
                        <></>
                    }



                    <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
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
