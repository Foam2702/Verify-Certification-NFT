import "./LisenceView.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTicket from "../components/AlertTicket"
import HeaderSection from "../components/HeaderSection";
import LisenceSection from '../components/LisenceSection';
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import useSigner from "../state/signer";
import MultiActionAreaCard from "../components/MultiACtionAreaCard";
import { replaceBaseUrl } from '../helpers/index'
import Link from '@mui/material/Link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import VerifiedIcon from '@mui/icons-material/Verified';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { formatDateV2, minifyAddress, extractPinataCID, extractCID, remove0x, pinJSONToIPFS, extractEncryptedDataFromJson, decryptData } from "../helpers/index"
import { Remove } from "@mui/icons-material";
import { FaSearch } from 'react-icons/fa';

const LisenceView = () => {
  const { signer, address, connectWallet, contract } = useSigner()
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [open, setOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [decryptedCertificates, setDecryptedCertificates] = useState([]);
  const [filterDecryptedCertificates, setFilterDecryptedCertificates] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);
  const [input, setInput] = useState("")
  const [expandedCertificateIndex, setExpandedCertificateIndex] = useState(null); // Track which certificate is expanded
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const attributeLabels = {
    citizen_id: "Citizen ID",
    owner_address: "Owner Address",
    dob: "Date of Birth",
    licensing_authority: "Licensing Authority",
    gender: "Gender",
    email: "Email",
    work_unit: "Work Unit",
    issue_date: "Issue Date",
    expiry_date: "Expiry Date",
    region: "Region",
    status: "Status",
    expire_date: "Expiry Date",
    name: "Name",
    point: "Point"
  };

  const handleClickOpen = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleClose = () => setShowAlert(false);

  const handleSubmitPrivateKey = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPrivateKey(formData.get('privatekey'));
    setLoading(true); // Set loading to true when the user submits the private key

  }

  const handleDecryptTicket = async (prop, privateKey, publicKeyOwner) => {
    if (prop != null && prop != '' && prop != undefined) {
      try {
        const parseProp = extractEncryptedDataFromJson(prop)

        const result = await decryptData(parseProp.cipher, parseProp.iv, remove0x(publicKeyOwner), privateKey);
        if (!result) throw new Error("Wrong private key");
        return result;
      } catch (error) {
        handleDecryptionError(error);
        return minifyAddress(prop.toString());
      }
    }
    else {
      return " "; // Return the original prop value in case of error
    }
  };

  const handleDecryptImage = async (cid, privateKey, publicKeyOwner) => {

    try {
      const { data } = await axios(`https://coral-able-takin-320.mypinata.cloud/ipfs/${cid}`);

      const parseImg = extractEncryptedDataFromJson(JSON.stringify(data.image))
      const decryptedData = await decryptData(parseImg.cipher, parseImg.iv, remove0x(publicKeyOwner), privateKey);
      if (!decryptedData) throw new Error("Wrong private key");
      return decryptedData;
    } catch (error) {
      handleDecryptionError(error);
      return null;
    }
  };

  const handleDecryptionError = (error) => {
    const errorMessage = error.message.includes("Cipher key could not be derived")
      ? "Wrong private key"
      : "Error decrypting data";
    setAlertSeverity("error");
    setMessageAlert(errorMessage);
    setShowAlert(true);
    setIsPrivateKeyValid(false);
  };
  const handleExpandClick = (index) => {
    setExpandedCertificateIndex(expandedCertificateIndex === index ? null : index);
  };

  useEffect(() => {
    const getNFTs = async () => {
      if (address) {
        setLoading(true)
        try {
          const { data } = await axios(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nfts`, options);
          console.log(data.nfts)
          setCertificates(data.nfts);
          setFilteredCertificates(data.nfts)
        } catch (err) {
          console.error(err);
        }
        setLoading(false)

      }
    };
    getNFTs();
  }, [address]);

  useEffect(() => {
    const decryptAllFields = async () => {

      try {
        const newDecryptedCertificates = [];
        const ownerPublicKeysResponse = await axios.get(`https://verify-certification-nft-production.up.railway.app/addresses/${address}`)
        if (ownerPublicKeysResponse.data.address.length === 0) {
          return;
        }
        const publicKeyOwner = ownerPublicKeysResponse.data.address[0].publickey

        for (const certificate of certificates) {
          const nfts = await axios(`https://coral-able-takin-320.mypinata.cloud/ipfs/${extractCID(certificate.metadata_url)}`)
          const name = nfts.data.name
          const opensea_url = certificate.opensea_url
          const image = await handleDecryptImage(extractPinataCID(nfts.data.image), privateKey, publicKeyOwner);
          const decryptedAttributes = await Promise.all(nfts.data.attributes.map(async (attribute) => {
            // if (attribute.value.startsWith('"') && attribute.value.endsWith('"')) {

            //   attribute.value = await handleDecryptTicket(attribute.value, privateKey, publicKeyOwner);
            // }
            if (attribute.trait_type != "status" && attribute.trait_type != "licensing_authority") {
              attribute.value = await handleDecryptTicket(attribute.value, privateKey, publicKeyOwner);

            }

            return attribute;
          }));
          newDecryptedCertificates.push({
            ...certificate,
            name,
            image_url: image,
            opensea_url,
            date: formatDateV2(certificate.updated_at),
            attributes: decryptedAttributes,
          });
        }
        setDecryptedCertificates(newDecryptedCertificates);
        setFilterDecryptedCertificates(newDecryptedCertificates)
        setIsPrivateKeyValid(true);


      } catch (error) {
        setIsPrivateKeyValid(false);

      }
      finally {
        setLoading(false); // Set loading to false after decryption process
      }
    };

    if (privateKey && certificates.length > 0) decryptAllFields();
  }, [privateKey, certificates]);
  const handleChange = (value) => {
    setInput(value);
    const filterCertificates = certificates.filter((cer) =>
      cer.description.toLowerCase().includes(value.toLowerCase())
    );
    const filterDecryptedCertificates = decryptedCertificates.filter((dec_cer) =>
      dec_cer.description.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCertificates(filterCertificates);
    setFilterDecryptedCertificates(filterDecryptedCertificates)
    console.log(filterDecryptedCertificates)
  };
  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <div className="header-section">
        <HeaderSection />
      </div>
      <LisenceSection />

      <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
      </div>
      <div className="lisenceview">
        <section className="header-section-parent">


          {certificates.length === 0 ? (
            <div>No Certificate Yet</div>
          ) : (
            <>
              <div className="body-header-wrapper">
                <div className="body-header">
                  {/* <h1 className="body-header-text2">List of Certificates</h1> */}
                </div>
              </div>
              <Button variant="contained" sx={{ fontSize: "0.5em" }} onClick={handleClickOpen}>
                <div sx={{ mx: "5px" }}>View</div>
                <RemoveRedEyeIcon sx={{ mx: "5px" }}></RemoveRedEyeIcon>
              </Button>
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
                    type="privatekey"
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-input': { fontSize: '1.25rem' },
                      '& .MuiInputLabel-root': { fontSize: '1.25rem' },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} type="submit">Decrypt</Button>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
              </Dialog>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: "column" }}>
                {(isPrivateKeyValid ? filterDecryptedCertificates : filteredCertificates).map((certificate, index) => (
                  <div key={index} className="upload-wrapper-lisence" style={{ marginBottom: "50px" }}>
                    <div className="upload-lisence">
                      <div className="info_certi">
                        <div className="lisence-name-title" >{certificate.description}< VerifiedIcon sx={{ color: "green", fontSize: 50 }} /> </div>

                        {isPrivateKeyValid && (
                          <>
                            <div className="lisence-owner" style={{ fontWeight: "bold" }}>
                              Completed by {certificate.name}
                            </div>
                            <div className="lisence-name" style={{ fontWeight: "bold" }}>
                              {certificate.date}
                            </div>
                            {expandedCertificateIndex === index && (
                              <div className="lisence-attributes">
                                {certificate.attributes && certificate.attributes.map((attribute, attrIndex) => (
                                  <div key={attrIndex} className="lisence-name">
                                    <strong>
                                      {attributeLabels[attribute.trait_type] || attribute.trait_type}:
                                    </strong>
                                    {attribute.value !== null ? attribute.value : ''}
                                  </div>
                                ))}
                              </div>
                            )}
                            <Button
                              onClick={() => handleExpandClick(index)}
                              sx={{

                                fontSize: '1.5rem',
                              }}
                            >
                              {expandedCertificateIndex === index ? "Show Less" : "Show More"}
                            </Button>
                          </>
                        )}
                      </div>
                      <div className="img_certi">
                        <MultiActionAreaCard image={certificate.image_url} size={500} />
                        <Link className="link-to-transactions" href={certificate.opensea_url} underline="hover" target="_blank">
                          Opensea
                          <ArrowOutwardIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
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
              </div>
            </>
          )}
        </section >
        <Footer shapeLeft="/shape-left@2x.png" socialIcontwitter="/socialicontwitter@2x.png" />
      </div >
    </div>
  );
};

export default LisenceView;
