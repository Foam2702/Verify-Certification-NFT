import { useState, useEffect } from 'react';
import * as React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Card, CardActionArea, CardContent, CardMedia, Grid } from '@mui/material';
import { minifyAddress } from "../helpers";
import { orange } from '@mui/material/colors';
import { SvgIcon } from '@mui/material';


export default function AlignItemsList() {
    const [tickets, setTickets] = useState([])
    const navigate = useNavigate();
    const handleTicketClick = (owner_address, certificate_cid) => {
        navigate(`/tickets/ticket?owner_address=${owner_address}&certificate_cid=${certificate_cid}`)
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

    return (
        <>

            <List sx={{ width: '100%', maxWidth: 1000, mx: "auto", mt: "50" }}>
                <Typography variant="h4">PENDING :</Typography>
                {tickets.map((ticket, index) => (
                    <ListItem key={index}
                        alignItems="flex-start"
                        sx={{ border: '1px solid grey', bgcolor: '#ffe0b2' }}
                        onClick={() => handleTicketClick(ticket.owner_address, ticket.certificate_cid)} >
                        <ListItemAvatar>
                            <Avatar src={`https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket.certificate_cid}`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={ticket.owner_address}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {ticket.certificate_name}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>

                ))}
            </List>
        </>

        // <Grid container spacing={2} justify="center" >
        //     {tickets.map((ticket, index) => (
        //         <Grid item xs={12} sm={6} md={4} key={index} container justifyContent="center">
        //             <Card sx={{ maxWidth: 300 }}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                         component="img"
        //                         height="140"
        //                         image={`https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket.certificate_cid}`}
        //                         alt={ticket.name}
        //                     />
        //                     <CardContent>
        //                         <Typography gutterBottom variant="h5" component="div">
        //                             {ticket.name}
        //                         </Typography>
        //                         <Typography variant="h5" color="text.secondary">
        //                             {ticket.certificate_name}
        //                         </Typography>
        //                         <Typography variant="body2" color="text.secondary">
        //                             Status:{ticket.status}
        //                         </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         </Grid>
        //     ))}
        // </Grid>

    );
}
