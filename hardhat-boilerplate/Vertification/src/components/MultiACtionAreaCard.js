import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from '@mui/material/Link';

export default function MultiActionAreaCard({ image }) {

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
            </CardActionArea>
            <CardActions>
                <Button size="large" color="primary">
                    <Link href={image}>Link</Link>
                </Button>
            </CardActions>
        </Card>
    );
}
