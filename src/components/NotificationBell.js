import { IconButton, Tooltip } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BasicMenu from "./BasicMenu"
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import useSigner from "../state/signer";
const { ethers } = require("ethers");
const NotificationBell = ({ tickets }) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const newNotifications = `You have ${tickets.length} new notifications!`
    const noNotifications = 'No new notifications'
    return (
        <>
            <Tooltip title={tickets.length ? newNotifications : noNotifications} >
                {tickets.length ? (
                    <IconButton
                        onClick={tickets.length ? handleOpen : null}
                        anchorEl={anchorEl}>
                        <Badge variant="dot" color="primary">
                            <NotificationsActiveIcon color="action" fontSize="large" />
                        </Badge>
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={tickets.length ? handleOpen : null}
                        anchorEl={anchorEl}>
                        <Badge badgeContent={tickets.length} color="primary">
                            <NotificationsActiveIcon color="action" fontSize="large" />
                        </Badge>
                    </IconButton>
                )}

            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={tickets}
            />

        </>
    )
}

export default NotificationBell