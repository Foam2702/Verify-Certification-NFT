import { useCallback } from "react";
import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import axios from 'axios';
import Web3 from 'web3';
import useSigner from "../state/signer";
import MultiActionAreaCard from "./MultiACtionAreaCard";
import { formatDate } from '../helpers/index'
import { useNavigate } from "react-router-dom";
import AlertTicket from "./AlertTicket"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { pinJSONToIPFS } from "../helpers/index"
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
        const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}`)
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
        // const metadata = await pinJSONToIPFS(ticket)
        // const ipfsMetadata = `ipfs://${metadata}`
        // const { ethereum } = window
        // if (ethereum) {
        //     const result = await contract.mintSBTForAddress(
        //         ticket.owner_address,
        //         ipfsMetadata
        //     );
        //     console.log(result)
        // }

        const result = {
            "hash": "0x15226010cb612b8c4c5804accf76987c064dc062df7d6910b8fa9b9a30955fda",
            "type": 2,
            "accessList": null,
            "blockHash": null,
            "blockNumber": null,
            "transactionIndex": null,
            "confirmations": 0,
            "from": "0x125FA7939E614CBb4a4794bD984d2c4e79375666",
            "gasPrice": {
                "type": "BigNumber",
                "hex": "0x03b2a4fe37"
            },
            "maxPriorityFeePerGas": {
                "type": "BigNumber",
                "hex": "0x59682f00"
            },
            "maxFeePerGas": {
                "type": "BigNumber",
                "hex": "0x03b2a4fe37"
            },
            "gasLimit": {
                "type": "BigNumber",
                "hex": "0x0211c5"
            },
            "to": "0xAd8268226D68c793349A9E287117D8823C2ed0b1",
            "value": {
                "type": "BigNumber",
                "hex": "0x00"
            },
            "nonce": 26,
            "data": "0xfc3949eb00000000000000000000000032de93bb670f3d4ae1181b615954abeee81fc9b300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d57566e7a7779685047764e687a4c594153597279415979694b5a526457596f696838357333356e61797834640000000000000000000000",
            "creates": null,
            "chainId": 0
        }
        const status = "approved"
        const response = await axios.patch(`http://localhost:8080/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=${result.hash}`)
        console.log(response.data.message)

        if (response.data.message === "updated successfully") {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
            setMessageAlert("Mint Successfully")
            setShowAlert(true);
        }
        else if (response.data.message === "update failed") {
            setUpdate(false)
            setMessageAlert("Mint Fail")
            setShowAlert(true);
        }


        // setTransaction(result.hash)
    };
    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(true);
        setShowAlert(false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        navigate("/")

    };
    const handleCancle = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
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
    async function addNFTToWallet() {
        const { ethereum } = window
        web3.eth.getTransactionReceipt(result.hash).then(function (data) {
            let transaction = data;
            let logs = data.logs;
            console.log(logs);
            console.log(web3.utils.hexToNumber(logs[0].topics[3]));
        });
        try {
            // wasAdded is a boolean. Like any RPC method, an error can be thrown.
            const wasAdded = await ethereum // Or window.ethereum if you don't support EIP-6963.
                .request({
                    method: "wallet_watchAsset",
                    params: {
                        type: "ERC721", // Or "ERC1155".
                        options: {
                            // The address of the token.
                            address: "0xad8268226d68c793349a9e287117d8823c2ed0b1",
                            // ERC-721 or ERC-1155 token ID.
                            tokenId: web3.utils.hexToNumber(logs[0].topics[3]),
                        },
                    },
                });

            if (wasAdded) {
                console.log("User successfully added the token!");
            } else {
                console.log("User did not add the token.");
            }
        } catch (error) {
            console.log(error);
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
                    {issuer.includes(address) ?
                        <div className="body-header">
                            <h1 className="body-header-text2">Thông tin chứng chỉ</h1>
                        </div>
                        : <>
                            <AlertTicket severity={ticket.status} />
                            {ticket.status === 'approved' ?
                                <Button variant="contained" onClick={addNFTToWallet}>Import NFT to MetaMask </Button>
                                : <></>
                            }

                        </>
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
                            severity="success"
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
