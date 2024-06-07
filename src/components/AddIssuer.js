import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';// import Header from "../../components/Header";
import useSigner from "../state/signer";
const AddIssuer = () => {
    const { signer, address, connectWallet, contract, provider } = useSigner()
    const [issuers, setIssuers] = useState([])
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
                console.log(results);

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
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ fontSize: "0.7em " }} >
                        Delete
                    </Button>
                );
            }
        },
    ];

    return (
        <>
            <Button variant="contained" color="success" sx={{ my: "20px", fontSize: "1.3em " }} >
                <AddIcon></AddIcon>
                NEW ISSUER
            </Button>
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

        </>
    );
};

export default AddIssuer;
