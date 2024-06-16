import "./LisenceView.css";
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
import { pinJSONToIPFS, extractEncryptedDataFromJson, decryptData } from "../helpers/index"

const LisenceView = () => {
  const { signer, address, connectWallet, contract } = useSigner()
  const [certificates, setCertificates] = useState([]);
  const [open, setOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("")
  const [decryptedName, setDecryptedName] = useState('');
  const [decryptedImage, setDecryptedImage] = useState(null)

  const options = { method: 'GET', headers: { accept: 'application/json' } };
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
  const handleDecryptTicket = async (prop, privateKey) => {

    try {
      console.log("NAMEEE", prop.replace(/"/g, ''))
      console.log(privateKey)
      const result = await decryptData(prop.replace(/"/g, ''), "a32dfd5e139b47f608c39a31ab0b528f0d09bedd3197d563aa5f956bc386e328");
      console.log("RESSS", result)
      if (result === "") {
        setError("Wrong private key"); // Set the error state
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setAlertSeverity("error")
        setMessageAlert("Wrong private key")
        setShowAlert(true);
        return prop.toString(); // Return the original prop value in case of error
      }
      return result;
    } catch (error) {
      if (error.message.includes("Cipher key could not be derived")) {

        setError("Wrong private key"); // Set the error state
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setAlertSeverity("error")

        setMessageAlert("Wrong private key")
        setShowAlert(true);
      } else {

        setError("Error decrypting data"); // Set a generic decryption error message
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setAlertSeverity("error")

        setMessageAlert("Wrong private key")
        setShowAlert(true);
      }
      return prop.toString(); // Return the original prop value in case of error

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
  useEffect(() => {
    const getNFTS = async () => {
      if (address) {
        try {
          const result = await axios(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nfts`, options)
          setCertificates(result.data.nfts)
        }
        catch (err) {
          console.log(err)
        }

      }
    }

    getNFTS().catch(error => console.error(error));;
  }, [address]); // Empty dependency array means this effect runs once on mount
  useEffect(() => {
    console.log("HELLO")
    const decryptAllFields = async () => {
      console.log("HELL1")

      try {
        for (const certificate of certificates) {
          console.log("HELL2")
          console.log(certificate.name)
          console.log(certificate.image_url)
          const name = await handleDecryptTicket(certificate.name, privateKey);
          // const imageCertificate = await handleDecryptImage(certificate.certificate_cid, privateKey);
          console.log("NAMEEEE", name)
          // console.log(certificate.image_url)
          setDecryptedName(name);
          // setDecryptedImage(imageCertificate);
        }
      } catch (err) {
        // Error handling already set in handleDecryptTicket
      }
    };

    if (privateKey && certificates.length > 0) {
      decryptAllFields();
    }
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
            {/* <Button variant="contained" onClick={sendNFT}>Import NFT to MetaMask </Button> */}
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

              maxWidth="md" // Adjust this value as needed (sm, md, lg, xl)
              sx={{
                '& .MuiDialogContent-root': { fontSize: '1.25rem' }, // Adjust font size for dialog content
                '& .MuiTextField-root': { fontSize: '1.25rem' }, // Adjust font size for text fields
                '& .MuiButton-root': { fontSize: '1.25rem' }, // Adjust font size for buttons
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
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {certificates.length > 0 && certificates.map((certificate, index) => {
                // const newImageUrl = replaceBaseUrl(certificate.image_url, "https://coral-able-takin-320.mypinata.cloud");
                return (
                  <div key={index} className="upload-wrapper">
                    <div className="upload">
                      <h3 className="lisence-name">Adress: <span style={{ fontWeight: 'bold' }}>{address}</span></h3>
                      <h3 className="lisence-name">Owner: <span style={{ fontWeight: 'bold' }}>{privateKey ? decryptedName : certificate.name}</span></h3>
                      <h3 className="lisence-name">Certificate Name: <span style={{ fontWeight: 'bold' }}>{certificate.description}</span></h3>
                      <MultiActionAreaCard image={privateKey ? decryptedImage : certificate.image_url} />
                      <Link className="link-to-transactions" href={certificate.opensea_url} underline="hover" target="_blank">
                        Opensea
                        <ArrowOutwardIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />
    </div >
  );
};

export default LisenceView;
