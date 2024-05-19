import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from '@mui/material/Link';

export default function MultiActionAreaCard({ image }) {
    return (
        <Card sx={{ width: 350 }}>
            <Link href={image} target="_blank">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="green iguana"
                    />
                </CardActionArea>
            </Link>
        </Card>
    );
}