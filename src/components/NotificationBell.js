import { IconButton, Tooltip } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BasicMenu from "./BasicMenu"
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import useSigner from "../state/signer";

const NotificationBell = ({ tickets }) => {
    const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner()
    const [issuers, setIssuers] = useState([])

    const [open, setOpen] = useState(false)
    const [anchorEl, setanchorEl] = useState(null)
    const [isIssuer, setIsIssuer] = useState(true)
    const handleOpen = (e) => {
        setanchorEl(e.currentTarget)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const newNotifications = `You have ${tickets.length} new notifications!`
    const noNotifications = 'No new notifications'
    useEffect(() => {
        const fetchOrg = async () => {
            if (signer && contract) {
                const orgs = await contract.getOrganizationCodes();
                const results = [];
                for (const org of orgs) {
                    const issuers = await contract.getVerifiersByOrganizationCode(org);
                    issuers.forEach(issuer => {
                        results.push({
                            issuer
                        });
                    });
                }

                setIssuers(results)
            }
        }
        fetchOrg();
        const checkIssuer = async () => {
            if (issuers) {
                const isAddressInIssuers = issuers.some(issuer => issuer === address);
                if (!isAddressInIssuers) setIsIssuer(false)
            }
        }
        checkIssuer();
    }, [])
    const uniqueTickets = tickets.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
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
            {!isIssuer && (
                <BasicMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    menuItems={uniqueTickets}
                />
            )}
            {isIssuer && (
                <BasicMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    menuItems={tickets}
                />
            )}

        </>
    )
}

export default NotificationBell