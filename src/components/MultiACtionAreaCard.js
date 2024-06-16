import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
export default function MultiActionAreaCard({ image }) {
    const encrypt_image = "/encrypted_image.jpg";
    // // Set currentImage to encrypt_image if image is undefined, otherwise use the provided image
    const [currentImage, setCurrentImage] = React.useState(null);
    const handleError = () => {
        setCurrentImage(encrypt_image);
    };
    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                setCurrentImage(image)
                console.log(image)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchImage()
    }, [image])
    console.log("CURRENT", currentImage)
    return (
        <div>


            <Card sx={{ width: 350 }}>
                <Link href={image} target="_blank">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={currentImage}
                            alt="green iguana"
                            onError={handleError}
                        />
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
}