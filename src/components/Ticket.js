import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import ExcelJS from 'exceljs'
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WalletIcon from '@mui/icons-material/Wallet';
import { hashImage, pinJSONToIPFS, add0x, excelDateToJSDate, bufferToBase64, getImageDimensionsFromBase64, formatDateToISO, deletePinIPFS, remove0x, extractEncryptedDataFromJson, decryptData, minifyAddress, imageFileToBase64 } from "../helpers/index"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from "xlsx";
const JWT = process.env.REACT_APP_JWT; // Make sure to set this in your React app environment variables
import { styled } from '@mui/material/styles';
const { ethers } = require("ethers");

import "./BodySection.css";
import "../pages/LisenceView"
const Ticket = ({ ticket }) => {
    const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner()
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
    const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);
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
    const [infoMatch, setInfoMatch] = useState(false)
    const [isExam, setIsExam] = useState(false)
    const [mint, setMint] = useState("")
    const web3 = new Web3(window.ethereum);
    const navigate = useNavigate();
    useEffect(() => {
        const checkIssuer = async () => {
            const { ethereum } = window;
            if (ethereum) {
                if (ticket.licensing_authority != null) {
                    try {
                        const result = await contract.getVerifiersByOrganizationCode(ticket.licensing_authority);
                        setIssuer(result)
                    }
                    catch (err) {
                        console.log(err)

                        setAlertSeverity("warning")
                        setMessageAlert("Your rights have been revoked by the admin. Return to the home page within 5 seconds")
                        setShowAlert(true);
                        setTimeout(() => {
                            navigate("/")
                        }, 5000)
                        return
                    }
                }
                else {
                    return;
                }
            }
        }
        if (ticket != null) { // Only run if ticket is defined
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
                setMint(transaction.from)
                setTokenID(tokenIdValue.toString());
                setAddressContract(logs[0].address)
            } catch (err) {
                console.log(err)
            }
        }
        getAddContractAndTokenID()
    }, [ticket])
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios('https://soulbound-token-nft-api.vercel.app/courses');
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
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const handleReject = async (e) => {
        e.preventDefault()
        try {
            const checkIssuer = await contract.getOrganizationCode(address)
            if (!checkIssuer) {
                setAlertSeverity("warning")
                setMessageAlert("Your rights have been revoked by the admin. Return to the home page within 10 seconds")
                setShowAlert(true);
                setTimeout(() => {
                    navigate("/")
                }, 10000)
                return
            }
            console.log(checkIssuer)
        } catch (err) {
            console.log(err)

            setAlertSeverity("warning")
            setMessageAlert("Your rights have been revoked by the admin. Return to the home page within 10 seconds")
            setShowAlert(true);
            setTimeout(() => {
                navigate("/")
            }, 10000)
            return
        }
        setLoading(true)
        try {
            const status = "reject"
            const empty = ' '
            const encodedEmpty = encodeURIComponent(empty);
            const owner = await axios(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${encodedEmpty}`)
            await deletePinIPFS(owner.data.ticket[0].certificate_cid)
            for (let address of issuer) {
                const issuer_org = await axios(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${address}`);
                if (issuer_org.data.ticket[0].certificate_cid) {
                    await deletePinIPFS(issuer_org.data.ticket[0].certificate_cid)
                }
                await axios.delete(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${address}`)
            }
            const response = await axios.patch(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=`)
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
        try {
            const checkIssuer = await contract.getOrganizationCode(address)
            if (!checkIssuer) {
                setAlertSeverity("warning")
                setMessageAlert("Your rights have been revoked by the admin. Return to the home page within 10 seconds")
                setShowAlert(true);
                setTimeout(() => {
                    navigate("/")
                }, 10000)
                return
            }
            console.log(checkIssuer)
        } catch (err) {
            console.log(err)

            setAlertSeverity("warning")
            setMessageAlert("Your rights have been revoked by the admin. Return to the home page within 10 seconds")
            setShowAlert(true);
            setTimeout(() => {
                navigate("/")
            }, 10000)
            return
        }
        setLoading(true);
        const empty = ' '
        const encodedEmpty = encodeURIComponent(empty);
        try {
            const userTicket = await axios(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${encodedEmpty}`)
            ticket = userTicket.data.ticket[0];
            ticket.status = "approved"
        }
        catch (err) {
            console.log(err)
        }
        const metadata = await pinJSONToIPFS(ticket)
        const ipfsMetadata = `ipfs://${metadata}`
        try {
            const { ethereum } = window
            if (ethereum) {
                const result = await contract.mintSBTForAddress(
                    ticket.owner_address,
                    ipfsMetadata
                );
                setAddressContract(result.to)
                for (let address of issuer) {
                    const issuer_org = await axios(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${address}`);
                    if (issuer_org.data.ticket[0].certificate_cid) {

                        await deletePinIPFS(issuer_org.data.ticket[0].certificate_cid)
                    }
                    await axios.delete(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?address=${address}`)
                }
                setLoading(false)
                setAlertSeverity("success")
                setMessageAlert("Create transaction successfully.Waiting to confirm")
                setShowAlert(true);
                await result.wait();
                const status = "approved"
                const response = await axios.patch(`https://soulbound-token-nft-api.vercel.app/tickets/ticket/${ticket.id}?status=${status}&transaction_hash=${result.hash}&issuer_address=`)
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
            await deletePinIPFS(metadata)
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
    const insertPubToDB = async () => {
        if (address) {
            try {
                const checkPublicKeyExisted = await axios.get(`https://soulbound-token-nft-api.vercel.app/addresses/${address}`);
                if (checkPublicKeyExisted.data.address.length === 0) {
                    const publicKey = await getPublicKey(); // Await the result of getPublicKey
                    if (publicKey.code === 4001 && publicKey.message === "User rejected the request.") {
                        console.log('Error retrieving public key:', publicKey);
                        setAlertSeverity("warning");
                        setMessageAlert("You must sign to submit");
                        setShowAlert(true);
                        return false;
                    }
                    await axios.post(`https://soulbound-token-nft-api.vercel.app/addresses/${address}`, {
                        address: address, // Include the address in the body
                        publicKey: publicKey // Include the public key in the body
                    });
                    return true
                }
                else if (checkPublicKeyExisted.data.address.length !== 0) {
                    if (checkPublicKeyExisted.data.address[0].publickey == null) {
                        const publicKey = await getPublicKey(); // Await the result of getPublicKey
                        if (publicKey.code === 4001 && publicKey.message === "User rejected the request.") {
                            setAlertSeverity("warning");
                            setMessageAlert("You must sign to submit");
                            setShowAlert(true);
                            return false
                        }
                        await axios.post(`https://soulbound-token-nft-api.vercel.app/addresses/${address}`, {
                            address: address, // Include the address in the body
                            publicKey: publicKey // Include the public key in the body
                        });

                        return true
                    }
                }
                return true
            }
            catch (err) {
                console.log(err)
                return false
            }
        }
    };
    const decryptAllFields = async (privateKey) => {
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
    const handleSubmitPrivateKey = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const privatekey = formJson.privatekey;
        try {
            const check = await insertPubToDB();
            if (check) {
                const privateKeyBytes = ethers.utils.arrayify(add0x(privatekey));
                const publicKeyFromPrivateKey = ethers.utils.computePublicKey(privateKeyBytes);
                const ownerPublicKeysResponse = await axios.get(`https://soulbound-token-nft-api.vercel.app/addresses/${address}`);

                if (ownerPublicKeysResponse.data.address.length === 0) {
                    setIsPrivateKeyValid(false); // Set isPrivateKeyValid to false if no address is found
                    return;
                }
                const publicKeyOwner = ownerPublicKeysResponse.data.address[0].publickey;
                if (publicKeyFromPrivateKey === publicKeyOwner) {
                    setAlertSeverity("success");
                    setMessageAlert("Correct private key");
                    setShowAlert(true);
                    setError(null); // Clear any previous errors
                    setIsPrivateKeyValid(true); // Set isPrivateKeyValid to true if keys match
                    await decryptAllFields(privatekey)
                    // setLoading(false)
                } else {
                    setAlertSeverity("error");
                    setMessageAlert("Wrong private key");
                    setShowAlert(true);
                    setIsPrivateKeyValid(false);
                    setLoading(false)// Set isPrivateKeyValid to false if keys do not match
                }
            } else {
                setIsPrivateKeyValid(false);
                setLoading(false)// Consider setting isPrivateKeyValid to false if check fails
                return;
            }
        } catch (err) {
            setAlertSeverity("error");
            setMessageAlert("Wrong private key");
            setShowAlert(true);
            setIsPrivateKeyValid(false);
            setLoading(false)// Set isPrivateKeyValid to false on error
            console.log(err);
        }
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
                const ownerPublicKeysResponse = await axios.get(`https://soulbound-token-nft-api.vercel.app/addresses/${ticket.owner_address}`)
                if (ownerPublicKeysResponse.data.address.length === 0) {
                    return;
                }
                const publicKeyOwner = ownerPublicKeysResponse.data.address[0].publickey
                const parseProp = extractEncryptedDataFromJson(prop)

                const result = await decryptData(parseProp.cipher, parseProp.iv, remove0x(publicKeyOwner), privateKey);

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
            const ownerPublicKeysResponse = await axios.get(`https://soulbound-token-nft-api.vercel.app/addresses/${ticket.owner_address}`)
            if (ownerPublicKeysResponse.data.address.length === 0) {
                return;
            }
            const publicKeyOwner = ownerPublicKeysResponse.data.address[0].publickey
            const parseImg = extractEncryptedDataFromJson(JSON.stringify(image))
            const decryptedData = await decryptData(parseImg.cipher, parseImg.iv, remove0x(publicKeyOwner), privateKey);
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
                if (infoMatch) {
                    setLoading(true);
                    setAlertSeverity("success")
                    setMessageAlert("All info and image match")
                    setShowAlert(true);
                    setLoading(false);
                    setImageMatch(true)
                }
                else if (!infoMatch) {
                    setLoading(true);
                    setAlertSeverity("warning")
                    setMessageAlert("Import file excel to check info")
                    setShowAlert(true);
                    setLoading(false);

                }
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
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (decryptedImage == null) {
            setLoading(true);
            setAlertSeverity("warning");
            setMessageAlert("Decrypt to upload");
            setShowAlert(true);
            setLoading(false);
            return;
        }

        try {
            setLoading(true)
            const file = event.target.files[0];
            const fileExtension = file.name.split('.').pop();
            if (fileExtension !== 'xlsx') {
                setAlertSeverity("warning");
                setMessageAlert("Please upload a valid .xlsx file");
                setShowAlert(true);
                setLoading(false);
                return;
            }
            const reader = new FileReader();
            reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(arrayBuffer);
                const worksheet = workbook.getWorksheet(1);
                const headers = worksheet.getRow(1).values.slice(1); // Get headers from the first row
                const jsonData = [];
                const images = workbook.model.media;
                images.sort((a, b) => {
                    const numA = parseInt(a.name.replace('image', ''), 10);
                    const numB = parseInt(b.name.replace('image', ''), 10);
                    return numA - numB;
                });

                // Get dimensions of the decrypted image
                const decryptedImageDimensions = await getImageDimensionsFromBase64(decryptedImage);
                const decryptedImageWidth = decryptedImageDimensions.width;
                const decryptedImageHeight = decryptedImageDimensions.height;
                let imageIndex = 0;
                const imageMap = {};
                for (const [index, image] of images.entries()) {
                    const mimeType = `image/${image.extension}`;

                    image.width = decryptedImageWidth;
                    image.height = decryptedImageHeight;

                    try {
                        const base64 = await bufferToBase64(image.buffer, mimeType);
                        imageMap[`image${index}`] = base64; // Lưu trữ hình ảnh với chỉ số
                    } catch (error) {
                        console.error('Error converting image to Base64:', error);
                    }
                }
                worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                    if (rowNumber === 1) return; // Skip the header row
                    const rowData = {};
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowData[headers[colNumber - 1]] = cell.value; // Use header as key
                    });

                    // Associate image with this row if available
                    if (imageMap[`image${rowNumber - 2}`]) { // Adjust index to match row
                        rowData.images = imageMap[`image${rowNumber - 2}`];
                    } else {
                        rowData.images = null;
                    }

                    jsonData.push(rowData);
                });

                console.log(jsonData)
                // Ensure all rows are processed before checking for matches
                await new Promise((resolve) => setTimeout(resolve, 100)); // Give some time for processing
                let isMatchFound = false;
                jsonData.forEach(item => {

                    let name = item.name || '';
                    let gender = item.gender || '';
                    let email = item.email ? item.email.text : '';
                    let citizenId = item.citizen_id ? item.citizen_id.toString() : '';
                    let point = item.point ? item.point.toString() : '';
                    let region = item.region || '';
                    let workUnit = item.work_unit || '';
                    let certificateName = item.certificate_name || '';
                    let licensingAuthority = item.licensing_authority || ''; let issueDate = item.issue_date ? item.issue_date : '';
                    let expiryDate = item.expiry_date ? item.expiry_date : '';
                    let dob = item.dob ? item.dob : '';
                    let image = item.images ? item.images : ''

                    if (issueDate !== '') {
                        issueDate = formatDateToISO(item.issue_date);
                    }

                    if (expiryDate !== '') {
                        expiryDate = formatDateToISO(item.expiry_date);
                    }
                    if (dob !== '') {
                        dob = formatDateToISO(item.dob);
                    }

                    // issueDate = typeof issueDate === 'string' ? issueDate : '';
                    // expiryDate = typeof expiryDate === 'string' ? expiryDate : '';
                    // dob = typeof dob === 'string' ? dob : '';
                    console.log('Comparing values:');
                    console.log('Name:', name, 'Decrypted Name:', decryptedName, name === decryptedName);
                    console.log('Gender:', gender, 'Decrypted Gender:', decryptedGender, gender === decryptedGender);
                    console.log('Email:', email, 'Decrypted Email:', decryptedEmail, email === decryptedEmail);
                    console.log('Citizen ID:', citizenId, 'Decrypted Citizen ID:', decryptedCitizenId, citizenId === decryptedCitizenId);
                    console.log('Date of Birth:', dob, 'Decrypted Date of Birth:', decryptedDob, dob === decryptedDob);
                    console.log('Region:', region, 'Decrypted Region:', decryptedRegion, region === decryptedRegion);
                    console.log('Work Unit:', workUnit, 'Decrypted Work Unit:', decryptedWorkUnit, workUnit === decryptedWorkUnit);
                    console.log('Point:', point.trim(), 'Decrypted Point:', decryptedPoint.trim(), point.trim() === decryptedPoint.trim());
                    console.log('Certificate Name:', certificateName, 'Ticket Certificate Name:', ticket.certificate_name, certificateName === ticket.certificate_name);
                    console.log('Issue Date:', issueDate, 'Decrypted Issue Date:', decryptedIssueDate, issueDate === decryptedIssueDate);
                    console.log('Expiry Date:', expiryDate.trim(), 'Decrypted Expiry Date:', decryptedExpiryDate.trim(), expiryDate.trim() === decryptedExpiryDate.trim());
                    console.log('Licensing Authority:', licensingAuthority, 'Ticket Licensing Authority:', ticket.licensing_authority, licensingAuthority === ticket.licensing_authority);
                    console.log('Image:', hashImage(image), 'Decrypted Image:', hashImage(decryptedImage), hashImage(decryptedImage) === hashImage(image));
                    console.log("EX", expiryDate != '' ? expiryDate : expiryDate.trim())
                    if (
                        name === decryptedName &&
                        gender === decryptedGender &&
                        email === decryptedEmail &&
                        citizenId === decryptedCitizenId &&
                        dob === decryptedDob &&
                        region === decryptedRegion &&
                        workUnit === decryptedWorkUnit &&
                        point.trim() === decryptedPoint.trim() &&
                        certificateName === ticket.certificate_name &&
                        issueDate === decryptedIssueDate &&
                        expiryDate.trim() === decryptedExpiryDate.trim() &&
                        licensingAuthority === ticket.licensing_authority &&
                        hashImage(image) === hashImage(decryptedImage) // Compare images
                    ) {
                        setImageUrl(image)
                        isMatchFound = true;

                    }
                });

                if (isMatchFound) {
                    setLoading(false)
                    setInfoMatch(true);
                    setAlertSeverity("success");
                    setMessageAlert("Matching information found in the file");
                    setShowAlert(true);

                    return
                } else {
                    setLoading(false)

                    setInfoMatch(false);
                    setAlertSeverity("warning");
                    setMessageAlert("No matching info found in the file");
                    setShowAlert(true);

                }
                setLoading(false);
            };

            reader.readAsArrayBuffer(file);
        } catch (err) {
            console.error(err);
            setAlertSeverity("warning");
            setMessageAlert("Wrong excel format");
            setShowAlert(true);
            setLoading(false);
        }
    };


    // Helper function to convert Excel date to JS date
    const excelDateToJSDate = (excelDate) => {
        const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
        const utcDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
        return utcDate;
    };

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
                                <AlertTicket severity={ticket.status} minter={mint} />
                            </>
                        )}
                        {isExam &&
                            <Alert variant="outlined" severity="info" sx={{ fontSize: "1.5rem", my: "20px" }}>
                                Certificate of passing exam at VSCourses
                            </Alert>}
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            {ticket.status === 'approved' ? (
                                <Button variant="contained" sx={{ my: "20px", mx: "30px", fontSize: "1.5rem" }} onClick={addNFTToWallet}>
                                    <div sx={{ mx: "5px" }}>MetaMask</div>

                                    < WalletIcon sx={{ mx: "5px" }} />
                                </Button>
                            ) : (
                                <></>
                            )}
                            <Button variant="contained" sx={{ my: "20px", mx: "30px", fontSize: "0.5em" }} onClick={handleClickOpen}>
                                <div sx={{ mx: "5px" }}>View</div>
                                <RemoveRedEyeIcon sx={{ mx: "5px" }}></RemoveRedEyeIcon>
                            </Button>
                            {(issuer.includes(address) && !isExam) ?
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ backgroundColor: 'purple', my: "20px", mx: "30px", fontSize: "0.5em" }}
                                    onChange={handleFileUpload}

                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" accept=".xlsx" />
                                </Button>
                                : <></>
                            }

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
                                <div className="private-key-image-container">
                                    <img loading="lazy" className="private-key-image" src="/MetaMask_find_account_details_extension-6df8f1e43a432c53fdaa0353753b1ca8.gif" alt="MetaMask find account details extension"></img>
                                    <img loading="lazy" className="private-key-image" src="/MetaMask_find_export_account_private_key_extension_1-e67f48ba55b839654514e39e186400fb.gif" alt="MetaMask find account details extension"></img>

                                    <img loading="lazy" className="private-key-image" src="/MetaMask_find_export_account_private_key_extension_2-6c913141ad005ec35a3248944b1a25dd.gif" alt="MetaMask find account details extension"></img>

                                </div>
                                <TextField
                                    autoFocus
                                    required
                                    margin="normal"

                                    name="privatekey"
                                    label="Private Key"
                                    type="password"
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
                                {(isPrivateKeyValid) ?
                                    <h3 className="input-name" name="name" type="text">{decryptedName}</h3>
                                    :
                                    <h3 className="input-name" name="name" type="text">{minifyAddress(ticket.name)}</h3>
                                }
                            </div>
                            <div className="gender">
                                <h3 className="gender1">Gender *</h3>
                                <h3 className="input-gender" name="gender">
                                    {isPrivateKeyValid ? decryptedGender : minifyAddress(ticket.gender)}
                                </h3>
                            </div>
                            <div className="email">
                                <h3 className="email1">Email *</h3>
                                {isPrivateKeyValid ?
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
                                    {isPrivateKeyValid ? decryptedCitizenId : minifyAddress(ticket.citizen_id)}
                                </h3>
                            </div>
                            <div className="date-of-birth">
                                <h3 className="date-of-birth1">Date of birth *</h3>
                                <h3 className="input-date-of-birth" name="dob" type="text">
                                    {isPrivateKeyValid ? decryptedDob : minifyAddress(ticket.dob)}
                                </h3>
                            </div>
                            <div className="home-town">
                                <h3 className="home-town-text">Region *</h3>
                                <h3 className="input-home-town" name="region">
                                    {isPrivateKeyValid ? decryptedRegion : minifyAddress(ticket.region)}
                                </h3>

                            </div>
                        </div>
                    </div>
                    <div className="careers-section-inner1">
                        <div className="working-unit-parent">
                            <div className="working-unit">
                                <h3 className="working-unit-text">Work Unit *</h3>
                                <h3 className="input-working-unit" name="workUnit" type="text">
                                    {isPrivateKeyValid ? decryptedWorkUnit : minifyAddress(ticket.work_unit)}
                                </h3>
                            </div>

                            <div className="score">
                                <h3 className="score-text">Point</h3>
                                <h3 className="input-score" name="point" type="text">
                                    {isPrivateKeyValid ? decryptedPoint : minifyAddress(ticket.point)}
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
                                    {isPrivateKeyValid ? decryptedIssueDate : minifyAddress(ticket.issue_date)}
                                </h3>
                            </div>
                            <div className="expired-date">
                                <h3 className="expired-date-text">Expiry Date</h3>
                                <h3 className="input-expired-date" name="expiryDate" type="text">
                                    {isPrivateKeyValid ? decryptedExpiryDate : minifyAddress(ticket.expiry_date)}
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

                                        <MultiActionAreaCard image={isPrivateKeyValid ? decryptedImage : ticket.certificate_cid} size={500} />
                                    </div>
                                </div>
                            </div>
                            {!imageMatch && <div className="upload-wrapper">
                                <div className="upload">
                                    <h3 className="upload-file-text">Image of Issuer</h3>

                                    {/* <div className="input-box-background" />
                                    <input
                                        className="example-here"
                                        name="imageCertificate"
                                        type="file"
                                        accept=".jpg"
                                        multiple
                                        onChange={onfileChange}
                                    /> */}
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
                                        <MultiActionAreaCard image={isPrivateKeyValid ? decryptedImage : ticket.certificate_cid} size={500} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {issuer.includes(address) ?
                        <>
                            {isExam ?
                                <div className="body-button1">
                                    {imageMatch ?
                                        <button className="submit-button" onClick={handleSubmit}>
                                            <div className="submit">Mint</div>
                                        </button>
                                        :
                                        <></>
                                    }
                                    <button className="cancel-button" onClick={handleCancle}>
                                        <div className="cancel">Cancel</div>
                                    </button>
                                </div>
                                :
                                <div className="body-button1">
                                    <button className="check-button" onClick={handleCheckImage}>
                                        <div className="check" >Check</div>
                                    </button>
                                    {imageMatch && infoMatch ?
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
                            }

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
