import TopHeader from "../components/TopHeader";
import FrameComponent from "../components/FrameComponent";
import "./LisenceView.css";
import HeaderSection from "../components/HeaderSection";
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

  return (
    <div className="lisenceview">
      <section className="header-section-parent">
        <div className="header-section">
          <HeaderSection />
        </div>

        {certificates.length === 0 ? (
          <div>Chưa có chứng chỉ</div>
        ) : (
          <>
            <div className="body-header-wrapper">
              <div className="body-header">
                <h1 className="body-header-text2">Thông tin chứng chỉ</h1>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {certificates.map((certificate, index) => {
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
