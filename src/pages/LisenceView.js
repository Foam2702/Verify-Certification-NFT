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
import { formatDateV2, minifyAddress, extractCID, pinJSONToIPFS, extractEncryptedDataFromJson, decryptData } from "../helpers/index"

const LisenceView = () => {
  const { signer, address, connectWallet, contract } = useSigner()
  const [certificates, setCertificates] = useState([]);
  const [open, setOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [decryptedCertificates, setDecryptedCertificates] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);
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
    region: "Region",
    status: "Status",
  };

  const handleClickOpen = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleClose = () => setShowAlert(false);

  const handleSubmitPrivateKey = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPrivateKey(formData.get('privatekey'));
  }

  const handleDecryptTicket = async (prop, privateKey) => {
    console.log("PROP", prop)
    if (prop != null && prop != '' && prop != undefined) {
      try {
        const result = await decryptData(prop.replace(/"/g, ''), privateKey);
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

  const handleDecryptImage = async (cid, privateKey) => {

    try {
      const { data } = await axios(`https://coral-able-takin-320.mypinata.cloud/ipfs/${cid}`);
      const decryptedData = await decryptData(data.image, privateKey);
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
        try {
          const { data } = await axios(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nfts`, options);
          setCertificates(data.nfts);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getNFTs();
  }, [address]);

  useEffect(() => {
    const decryptAllFields = async () => {
      try {
        const newDecryptedCertificates = [];
        setLoading(true)
        for (const certificate of certificates) {
          const name = await handleDecryptTicket(certificate.name, privateKey);
          const image = await handleDecryptImage(extractCID(certificate.image_url), privateKey);
          const attributes = await axios(`https://coral-able-takin-320.mypinata.cloud/ipfs/${extractCID(certificate.metadata_url)}`)
          const decryptedAttributes = await Promise.all(attributes.data.attributes.map(async (attribute) => {
            if (attribute.value.startsWith('"') && attribute.value.endsWith('"')) {
              attribute.value = await handleDecryptTicket(attribute.value, privateKey);
            }
            return attribute;
          }));
          newDecryptedCertificates.push({
            ...certificate,
            name,
            image_url: image,
            date: formatDateV2(certificate.updated_at),
            attributes: decryptedAttributes,
          });
        }
        console.log(newDecryptedCertificates)
        setDecryptedCertificates(newDecryptedCertificates);
        setIsPrivateKeyValid(true);
        setLoading(false)

      } catch (error) {
        setIsPrivateKeyValid(false);
        setLoading(false)

      }
    };

    if (privateKey && certificates.length > 0) decryptAllFields();
  }, [privateKey, certificates]);
  console.log(decryptedCertificates)
  return (
    <div className="lisenceview">
      <section className="header-section-parent">
        <div className="header-section">
          <HeaderSection />
        </div>
        <LisenceSection />
        {certificates.length === 0 ? (
          <div>No Certificate Yet</div>
        ) : (
          <>
            <div className="body-header-wrapper">
              <div className="body-header">
                <h1 className="body-header-text2">Certificates</h1>
              </div>
            </div>
            <Button variant="outlined" sx={{ my: "20px", fontSize: "0.5em" }} onClick={handleClickOpen}>
              Click to view
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
              {(isPrivateKeyValid ? decryptedCertificates : certificates).map((certificate, index) => (
                <div key={index} className="upload-wrapper-lisence" style={{ marginBottom: "50px" }}>
                  <div className="upload-lisence">
                    <div className="info_certi">
                      <div className="lisence-name-title" >{certificate.description}< VerifiedIcon sx={{ color: "green", fontSize: 50 }} /> </div>

                      {isPrivateKeyValid && (
                        <>
                          <div className="lisence-name" style={{ fontWeight: "bold" }}>
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
                                    {attribute.trait_type === "owner_address"
                                      ? "Owner Address"
                                      : attributeLabels[attribute.trait_type] || attribute.trait_type}:
                                  </strong>
                                  {attribute.trait_type === "owner_address"
                                    ? minifyAddress(attribute.value)
                                    : attribute.value}
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
                      <MultiActionAreaCard image={certificate.image_url} size={650} />
                      {/* <Link className="link-to-transactions" href={certificate.opensea_url} underline="hover" target="_blank">
                        Opensea
                        <ArrowOutwardIcon />
                      </Link> */}
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
  );
};

export default LisenceView;
