import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AddressAvatar from './AddressAvatar';
import CircularProgress from '@mui/material/CircularProgress';
import useSigner from "../state/signer";

import "./BasicMenu.css"

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
    const [loading, setLoading] = useState(false);
    const { address } = useSigner();

    const navigate = useNavigate();
    const handleItemClick = async (newItem) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // wait for 2 seconds
        setLoading(false);
        navigate(`/tickets/ticket/${newItem.id}`);
        handleClose();
    };
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    maxHeight: '700px',  // Adjust this value as needed
                    overflow: 'auto',
                }}
            >
                {menuItems.map((item, index) => (
                    (item.status === "processing") && (
                        <MenuItem key={index}
                            style={{
                                fontSize: '20px',
                                padding: '10px',
                                width: '500px',
                                marginBottom: '10px',

                            }}
                            onClick={() => handleItemClick(item)}
                        >
                            <Typography fontWeight="bold" style={{ marginRight: '10px' }}>
                                <AddressAvatar address={item.owner_address} />
                            </Typography>
                            <Typography style={{ marginRight: '10px' }}>
                                {item.owner_address === address ?
                                    <>
                                        <span className="yellow-text">đang chờ phản hồi từ phía

                                        </span>
                                        <span style={{ "margin": "5px", "fontWeight": "bold" }}>
                                            {item.licensing_authority}
                                        </span>

                                    </>
                                    :
                                    <>
                                        <span className="green-text">yêu cầu xác thực chứng chỉ
                                        </span>
                                        <span style={{ "margin": "5px", "fontWeight": "bold" }}>
                                            {item.certificate_name}
                                        </span>

                                    </>
                                }
                            </Typography>
                            {loading && (
                                <div className="loading-overlay">
                                    <CircularProgress />
                                </div>
                            )}

                        </MenuItem>
                    )

                ))}
            </Menu >
        </>
    );
}
