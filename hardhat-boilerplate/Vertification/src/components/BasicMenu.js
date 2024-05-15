import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { minifyAddress } from "../helpers";
import Typography from '@mui/material/Typography';

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
    console.log(menuItems)
    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} style={{ fontSize: '20px', padding: '10px', width: '500px', marginBottom: '10px' }} onClick={handleClose}>
                        <Avatar src={`https://coral-able-takin-320.mypinata.cloud/ipfs/${item.certificate_cid}`} />
                        <Typography fontWeight="bold" style={{ marginRight: '10px' }}>
                            {minifyAddress(item.owner_address)}
                        </Typography>
                        <Typography style={{ marginRight: '10px' }}>yêu cầu xác thực cứng chỉ</Typography>
                        <Typography fontWeight="bold">
                            {item.certificate_name}
                        </Typography>

                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
