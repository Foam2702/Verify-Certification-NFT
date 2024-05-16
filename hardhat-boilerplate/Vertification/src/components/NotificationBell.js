import { IconButton, Tooltip } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BasicMenu from "./BasicMenu"
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import axios from 'axios';

const NotificationBell = () => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [tickets, setTickets] = useState([])

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        const fetchTickets = async () => {
            const result = await axios("http://localhost:8080/tickets/all");
            if (Array.isArray(result.data.tickets)) {
                setTickets(result.data.tickets);
                console.log(result.data.tickets)

            } else {
                throw new Error('Unexpected data format');
            }
        }
        fetchTickets().catch(error => console.error(error));

    }, []);
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