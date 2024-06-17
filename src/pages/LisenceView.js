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
import { extractCID, pinJSONToIPFS, extractEncryptedDataFromJson, decryptData } from "../helpers/index"

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

  const options = { method: 'GET', headers: { accept: 'application/json' } };

  const handleClickOpen = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleClose = () => setShowAlert(false);

  const handleSubmitPrivateKey = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPrivateKey(formData.get('privatekey'));
  }

  const handleDecryptTicket = async (prop, privateKey) => {
    try {
      const result = await decryptData(prop.replace(/"/g, ''), privateKey);
      if (!result) throw new Error("Wrong private key");
      return result;
    } catch (error) {
      handleDecryptionError(error);
      return prop.toString();
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
        for (const certificate of certificates) {
          const name = await handleDecryptTicket(certificate.name, privateKey);
          const image = await handleDecryptImage(extractCID(certificate.image_url), privateKey);
          newDecryptedCertificates.push({
            ...certificate,
            name,
            image_url: image
          });
        }
        setDecryptedCertificates(newDecryptedCertificates);
        setIsPrivateKeyValid(true);
      } catch (error) {
        setIsPrivateKeyValid(false);
      }
    };

    if (privateKey && certificates.length > 0) decryptAllFields();
  }, [privateKey, certificates]);

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
                <div key={index} className="upload-wrapper" style={{ marginBottom: "50px" }}>
                  <div className="upload">
                    <h3 className="lisence-name">Address: <span style={{ fontWeight: 'bold' }}>{address}</span></h3>
                    <h3 className="lisence-name">Owner: <span style={{ fontWeight: 'bold' }}>{certificate.name}</span></h3>
                    <h3 className="lisence-name">Certificate Name: <span style={{ fontWeight: 'bold' }}>{certificate.description}</span></h3>
                    <MultiActionAreaCard image={certificate.image_url} />
                    <Link className="link-to-transactions" href={certificate.opensea_url} underline="hover" target="_blank">
                      Opensea
                      <ArrowOutwardIcon />
                    </Link>
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
      </section>
      <Footer shapeLeft="/shape-left@2x.png" socialIcontwitter="/socialicontwitter@2x.png" />
    </div>
  );
};

export default LisenceView;
