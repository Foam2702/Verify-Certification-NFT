import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';// import Header from "../../components/Header";
import useSigner from "../state/signer";
import CircularProgress from '@mui/material/CircularProgress';

const AddIssuer = () => {
    const { signer, address, connectWallet, contract, provider } = useSigner()
    const [issuers, setIssuers] = useState([])
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [loading, setLoading] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAlert = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);

    };
    useEffect(() => {
        const fetchOrg = async () => {
            if (signer && contract) {
                const orgs = await contract.getOrganizationCodes();
                let idCounter = 1; // initialize counter
                const results = [];
                for (const org of orgs) {
                    const issuers = await contract.getVerifiersByOrganizationCode(org);
                    issuers.forEach(issuer => {
                        results.push({
                            id: idCounter++, // use the counter as id and increment it
                            org: org,
                            address: issuer
                        });
                    });
                }

                setIssuers(results)
            }
        }
        fetchOrg();
    }, [])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "address",
            headerName: "Address",
            flex: 2,
            cellClassName: "name-column--cell",
        },

        {
            field: "org",
            headerName: "Organization",
            flex: 1,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            flex: 0.5,

            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                // const onClick = () => {
                //     const id = params.row.id;
                //     // perform delete operation
                // };

                return (
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ fontSize: "0.7em " }} >
                        Delete
                    </Button>
                );
            }
        },
    ];

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="success" sx={{ my: "20px", fontSize: "1em" }} onClick={handleClickOpen}>
                    <AddIcon />
                    NEW ISSUER
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const newAddress = formJson.address;
                        console.log(newAddress);
                        const newOrganization = formJson.organization;
                        console.log(newOrganization);
                        if (issuers.some(issuer => issuer.address === newAddress)) {
                            console.log("Issuer with this address already exists.");
                            // Optionally, you can set an alert message here to inform the user.
                            setAlertSeverity("error");

                            setMessageAlert("Issuer with this address already exists.");
                            setShowAlert(true);
                        } else {
                            // Your code to add a new issuer
                            console.log(newAddress);
                            console.log(newOrganization);
                            try {
                                const tx = await contract.addVerifier(newAddress, newOrganization);
                                setLoading(true)
                                await tx.wait();
                                setLoading(false)

                                console.log(tx);
                                setAlertSeverity("success");
                                setMessageAlert("Add Issuer successfully");
                                setShowAlert(true);
                                window.location.reload();
                            } catch (err) {
                                console.log("ERR", err);
                                setAlertSeverity("error");
                                // Check if the error code indicates the user rejected the transaction
                                if (err.code === "ACTION_REJECTED") {
                                    setMessageAlert("Rejected transaction");
                                } else {
                                    setMessageAlert("Failed to add new issuer");
                                }
                                setShowAlert(true);
                            }
                        }
                        handleClose();
                    },
                }}

                maxWidth="md" // Adjust this value as needed (sm, md, lg, xl)
                sx={{
                    '& .MuiDialogContent-root': { fontSize: '1.25rem' }, // Adjust font size for dialog content
                    '& .MuiTextField-root': { fontSize: '1.25rem' }, // Adjust font size for text fields
                    '& .MuiButton-root': { fontSize: '1.25rem' }, // Adjust font size for buttons
                }}
            >
                <DialogTitle sx={{ fontSize: '1.5rem' }}>New Issuer</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1.5rem' }}>
                        To add new issuer to organization, please enter wallet address and organization here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="name"
                        name="address"
                        label="Wallet Address"
                        type="address"
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
                    <TextField

                        required
                        margin="normal"
                        id="org"
                        name="organization"
                        label="Organization"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '1.25rem', // Increase font size
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1.25rem', // Increase label font size
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Add</Button>

                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Box m="20px">
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            fontSize: "1.5em", // Increase font size here
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
                    <DataGrid rows={issuers} columns={columns} />

                </Box>

            </Box>
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
        </>
    );
};

export default AddIssuer;
