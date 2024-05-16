import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AddressAvatar from './AddressAvatar';
export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
    const navigate = useNavigate();
    const handleItemClick = (item) => {
        navigate(`/tickets/ticket/${item.id}`)
    }
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
                    item.status === "processing" && (
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
                            <Typography style={{ marginRight: '10px' }}>yêu cầu xác thực chứng chỉ</Typography>
                            <Typography fontWeight="bold">
                                {item.certificate_name}
                            </Typography>
                        </MenuItem>
                    )
                ))}
            </Menu>
        </>
    );
}
