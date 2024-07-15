import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import HeaderSection from "../components/HeaderSection";
import axios from "axios";
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Link from '@mui/material/Link';
import MultiActionAreaCard from "../components/MultiACtionAreaCard";
import Footer from "../components/Footer";
import { formatDateV2 } from "../helpers/index"

const Share = () => {
    const [certificate, setCertificate] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const address = queryParams.get('address');

    useEffect(() => {
        fetchCerti();
    }, []);

    const fetchCerti = async () => {
        console.log("HELLO");

        try {
            const result = await axios(`http://localhost:8080/share/${id}?address=${address}`);
            console.log(result);
            if (result.data.message === "ticket doesn't exist" || result.data.data.length === 0) {
                navigate("/");
            } else {
                setCertificate(result.data.data[0]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (!certificate) {
        return <div>Loading...</div>; // Render a loading state or nothing while fetching
    }

    return (
        <div>
            <HeaderSection></HeaderSection>
            <div className="upload-wrapper-lisence" style={{ marginBottom: "50px" }}>
                <div className="upload-lisence">
                    <div className="info_certi">
                        <div className="lisence-name-title">{certificate.certificate_name}<VerifiedIcon sx={{ color: "green", fontSize: 50 }} /></div>
                        <div className="lisence-owner" style={{ fontWeight: "bold" }}>
                            Completed by {certificate.owner_address}
                        </div>
                        <div className="lisence-owner" style={{}}>
                            <strong>Name: </strong>{certificate.name}
                        </div>
                        <div className="lisence-name" style={{ width: '400px', }}>
                            <strong>Issue Date: </strong>{formatDateV2(certificate.issue_date)}
                        </div>
                        <div className="lisence-name" style={{ width: '400px', }}>
                            <strong>Expiry Date: </strong> {formatDateV2(certificate.expiry_date)}
                        </div>
                    </div>
                    <div className="img_certi">
                        <MultiActionAreaCard image={certificate.certificate_image} size={500} />
                    </div>
                </div>

            </div>
            <Footer shapeLeft="/shape-left@2x.png" socialIcontwitter="/socialicontwitter@2x.png" />
        </div>
    );
}

export default Share;
