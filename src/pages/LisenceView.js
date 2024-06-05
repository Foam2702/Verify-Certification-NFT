import TopHeader from "../components/TopHeader";
import FrameComponent from "../components/FrameComponent";
import "./LisenceView.css";
import HeaderSection from "../components/HeaderSection";
import VerifySection from '../components/VerifySection';
import Button from '@mui/material/Button';

import { useState, useEffect } from "react";
import axios from "axios";
import useSigner from "../state/signer";
import MultiActionAreaCard from "../components/MultiACtionAreaCard";
import { replaceBaseUrl } from '../helpers/index'
import Link from '@mui/material/Link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const LisenceView = () => {
  const { signer, address, connectWallet, contract } = useSigner()
  const [certificates, setCertificates] = useState([]);
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  console.log(certificates)
  useEffect(() => {
    const getNFTS = async () => {
      if (address) {
        const result = await axios(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nfts`, options)
        setCertificates(result.data.nfts)
      }
    }

    getNFTS().catch(error => console.error(error));;
  }, [address]); // Empty dependency array means this effect runs once on mount
  const sendNFT = async () => {
    console.log("ON CLICK")
    try {
      await contract.transfer(
        "0xD7B862C9Ed21f292cF9daD0E12C0152C4CB04Ab6",
        1
      );
    } catch (error) {
      if (error.message.includes("reverted: Owner cannot transfer this token.")) {
        console.log("CANT TRANSFER");
      } else {
        console.error(error);
      }
    }
  }
  return (
    <div className="lisenceview">
      <section className="header-section-parent">
        <div className="header-section">
          <HeaderSection />
        </div>
        <VerifySection />
        {certificates.length === 0 ? (
          <div>Chưa có chứng chỉ</div>
        ) : (
          <>
            {/* <Button variant="contained" onClick={sendNFT}>Import NFT to MetaMask </Button> */}
            <div className="body-header-wrapper">
              <div className="body-header">
                <h1 className="body-header-text2">Thông tin chứng chỉ</h1>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {certificates.length > 0 && certificates.map((certificate, index) => {
                console.log(certificate)
                const newImageUrl = replaceBaseUrl(certificate.image_url, "https://coral-able-takin-320.mypinata.cloud");
                return (
                  <div key={index} className="upload-wrapper">
                    <div className="upload">
                      <h3 className="lisence-name">Adress: <span style={{ fontWeight: 'bold' }}>{address}</span></h3>
                      <h3 className="lisence-name">Owner: <span style={{ fontWeight: 'bold' }}>{certificate.name}</span></h3>
                      <h3 className="lisence-name">Certificate Name: <span style={{ fontWeight: 'bold' }}>{certificate.description}</span></h3>
                      <MultiActionAreaCard image={newImageUrl} />
                      <Link className="link-to-transactions" href={certificate.opensea_url} underline="hover" target="_blank">
                        Opensea
                        <ArrowOutwardIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <FrameComponent />
    </div >
  );
};

export default LisenceView;
