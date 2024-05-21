import TopHeader from "../components/TopHeader";
import HeaderContainer from "../components/HeaderContainer";
import FrameComponent from "../components/FrameComponent";
import "./LisenceView.css";
import HeaderSection from "../components/HeaderSection";
import { useState, useEffect } from "react";
import axios from "axios";
import useSigner from "../state/signer";
import MultiActionAreaCard from "../components/MultiACtionAreaCard";

const LisenceView = () => {
  const { address } = useSigner()
  const [certificates, setCertificates] = useState([]);
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  console.log(certificates)
  useEffect(() => {
    const getNFT = async () => {
      if (address) {
        const result = await axios(`https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${address}/nfts`, options)
        setCertificates(result.data.nfts)
      }

    }

    getNFT().catch(error => console.error(error));;
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
            {certificates.map((certificate, index) => (
              <div key={index} className="upload-wrapper">
                <div className="upload">
                  <h3 className="lisence-name">Owner: {certificate.name}</h3>
                  <h3 className="lisence-name">Certificate Name: {certificate.description}</h3>
                  <MultiActionAreaCard image={certificate.image_url} />
                </div>
              </div>
            ))}
          </>
        )}
      </section>
      <FrameComponent />
    </div>
  );
};

export default LisenceView;
