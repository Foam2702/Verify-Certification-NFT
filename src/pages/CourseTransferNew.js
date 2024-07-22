// import HeaderSection from "../components/HeaderSection2";
import BodyCourses from "../components/BodyCourses";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import CourseSection from "../components/CourseSection"
import { useNavigate, Navigate } from 'react-router-dom';
import useSigner from "../state/signer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from '@mui/material'
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Tooltip, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';// import Header from "../../components/Header";
import CachedIcon from '@mui/icons-material/Cached';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';

import { tokens } from "../theme";

import axios from 'axios'
import "./CourseTransferNew.css";

const CourseTransferNew = () => {
  const [tab, setTab] = useState('coursesTab');
  const [certificateOpen, setCertificateOpen] = useState(false)
  const [org, setOrg] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("");
  const [loading, setLoading] = useState(false)
  const [orgs, setOrgs] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [certificates, setCertificates] = useState([])
  const [certificatesRow, setCertificatesRow] = useState([])
  const [isIssuer, setIsIssuer] = useState(false)
  const navigate = useNavigate()
  const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();
  const adminAddress = process.env.REACT_APP_ADMIN;
  useEffect(() => {
    if (address) {
      if (address == adminAddress) {
        navigate("*")
      }
    }

  }, [address, signer])
  useEffect(() => {
    if (address) {
      if (address === adminAddress) {
        navigate("/");
        // Assuming contract is an object that should have destroy method
        if (contract && typeof contract.destroy === 'function') {
          contract.destroy();
        } else {
          console.error('Contract does not have a destroy method', contract);
        }
      }
      else {
        navigate("/coursetransfernew");

      }
    }
    else if (!address) {
      navigate("/");
    }
  }, [address, signer]);
  useEffect(() => {
    const checkIssuer = async () => {
      if (address) {
        const isIssuer = await contract.isVerifier(address)
        if (isIssuer) setIsIssuer(true)
        else setIsIssuer(false)

      }
    }
    checkIssuer()
  }, [address, signer])
  useEffect(() => {
    const loadCertiDB = async () => {
      try {
        const org = await contract.getOrganizationCode(address);
        setOrgs(org);
        const result = await axios.get("https://verify-certification-nft-production.up.railway.app/tickets");
        if (Array.isArray(result.data.certificates)) {
          setCertificates(result.data.certificates.filter(certi => certi.org == org));
        } else {
          console.error('Fetched certificate data is not an array', result.data.certificates);
        }
      } catch (error) {
        console.error('Error fetching certificate data', error);
      }
    };
    loadCertiDB();
  }, [refresh, address, signer, tab, contract]); // This hook is for loading certificates

  useEffect(() => {
    const convertCertiToRow = async () => {
      if (certificates.length > 0) {
        let idCounter = 1; // initialize counter
        const results = [];
        certificates.forEach(certificate => {
          results.push({
            id: idCounter++, // use the counter as id and increment it
            certificate: certificate.certificate,
            organization: certificate.org
          });
        });

        setCertificatesRow(results);
      }
    };
    convertCertiToRow();
  }, [certificates]); // This hook is for converting certificates to rows whenever certificates state changes

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columnsCertificate = [
    { field: "id", headerName: "ID" },
    {
      field: "certificate",
      headerName: "Certificate",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "organization",
      headerName: "Organization",
      flex: 2,
    },
    {
      field: 'delete',
      headerName: 'Status',
      sortable: false,
      flex: 0.5,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ fontSize: "0.7em " }} onClick={() => handleDeleteCertificate(params.row.certificate, params.row.organization)}>
            DELETE
          </Button>
        );
      }
    },
  ];
  const handleCloseAlert = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);

  };
  const handleChangeOrg = (event) => {
    setOrg(event.target.value);
  };
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleClickOpenCerti = () => {
    setCertificateOpen(true)
  }
  const handleCloseCertificate = () => {
    setCertificateOpen(false)
  }
  const handleDeleteCertificate = async (certificate, org) => {
    try {
      const result = await axios.delete(`https://verify-certification-nft-production.up.railway.app/certificate?certificate=${certificate}&org=${org}`)
      if (result.data.message == "Certificate deleted") {
        setAlertSeverity("success");
        setMessageAlert("Deleted Certificate successfully");
        setShowAlert(true);
        setLoading(false)
        setRefresh(prevFlag => !prevFlag)

      }
      else if (result.data.message == "Certificate not found") {
        setAlertSeverity("warning");
        setMessageAlert("Certificate not found");
        setShowAlert(true);
        setLoading(false)
      }
      else {
        setAlertSeverity("warning");
        setMessageAlert("Something went wrong");
        setShowAlert(true);
        setLoading(false)
      }
    } catch (err) {
      setAlertSeverity("error");
      setMessageAlert("Error");
      setShowAlert(true);
      setLoading(false)
    }
  }
  const handleSubmitCertificate = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const newCertificate = formJson.certificate;
    const certificate = {
      certificate: newCertificate,
      org: orgs
    }
    console.log(certificate)
    try {
      const result = await axios.post(`https://verify-certification-nft-production.up.railway.app/certificate`, certificate)
      console.log(result)
      if (result.data.message == "Certificate inserted") {
        setAlertSeverity("success");
        setMessageAlert("Add Certificate successfully");
        setShowAlert(true);
        setLoading(false)
        setRefresh(prevFlag => !prevFlag)
      }
      else if (result.data.message == "Certificate already exists") {
        setAlertSeverity("warning");
        setMessageAlert("Certificate already exists");
        setShowAlert(true);
        setLoading(false)
      }
      else {
        setAlertSeverity("warning");
        setMessageAlert("Something went wrong");
        setShowAlert(true);
        setLoading(false)
      }
    } catch (err) {
      setAlertSeverity("error");
      setMessageAlert("Error");
      setShowAlert(true);
      setLoading(false)
    }
    handleCloseCertificate();
  }
  return (
    <div>
      <div className="coursetransfernew">
        <div className="header-section">
          <HeaderSection />
        </div>

        <CourseSection />
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {messageAlert}
          </Alert>
        </Snackbar>

      </div>
      {isIssuer && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="coursesTab" label="Courses" sx={{ fontSize: "1em" }} />
                <Tab value="certificatesTab" label="Certificates" sx={{ fontSize: "1em" }} />
              </Tabs>
            </Box>
          </Box>

          {tab === 'coursesTab' && <BodyCourses />}
          {tab === 'certificatesTab' && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="success" sx={{ my: "20px", fontSize: "1em" }} onClick={handleClickOpenCerti}>
                  <AddIcon />
                  NEW CERTIFICATE
                </Button>
                <Tooltip title="Refresh" sx={{ mx: '20px' }}>
                  <IconButton size="large" onClick={() => setRefresh(prevFlag => !prevFlag)}>
                    <CachedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Dialog
                open={certificateOpen}
                onClose={handleCloseCertificate}
                PaperProps={{
                  component: 'form',
                  onSubmit: handleSubmitCertificate
                }}
                maxWidth="md"
                sx={{
                  '& .MuiDialogContent-root': { fontSize: '1.25rem' },
                  '& .MuiTextField-root': { fontSize: '1.25rem' },
                  '& .MuiButton-root': { fontSize: '1.25rem' },
                }}
              >
                <DialogTitle sx={{ fontSize: '1.5rem' }}>New Certificate</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ fontSize: '1.5rem' }}>
                    To add a new certificate, please enter the certificate name and select the organization.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="normal"
                    id="name"
                    name="certificate"
                    label="Certificate name"
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1.25rem',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1.25rem',
                      },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button type="submit">Add</Button>
                  <Button onClick={handleCloseCertificate}>Cancel</Button>
                </DialogActions>
              </Dialog>

              <Box m="20px">
                <Box
                  m="40px 0 0 0"
                  height="75vh"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                      fontSize: "1.5em",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                  }}
                >
                  {tab === 'certificatesTab' && (
                    <DataGrid rows={certificatesRow} columns={columnsCertificate} />
                  )}
                </Box>
              </Box>
            </>
          )}
        </>
      )}
      {!isIssuer && <BodyCourses />
      }




      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />
    </div>
  );
};

export default CourseTransferNew;