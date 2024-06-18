import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
export default function MultiActionAreaCard({ image, size }) {
    const encrypt_image = "/encrypted_image.jpg";
    // // Set currentImage to encrypt_image if image is undefined, otherwise use the provided image
    const [currentImage, setCurrentImage] = React.useState(null);
    const handleError = () => {
        setCurrentImage(encrypt_image);
    };
    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                if (image != undefined) {
                    setCurrentImage(image)
                    console.log(image)
                }
                else {
                    setCurrentImage(encrypt_image)
                }

            }
            catch (err) {
                console.log(err)
            }
        }
        fetchImage()
    }, [image])
    return (
        <div>
            <Card sx={{ width: size }}>
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