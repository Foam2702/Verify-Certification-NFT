import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import useSigner from "../state/signer";
import { minifyAddress } from "../helpers";
import AddressAvatar from "../components/AddressAvatar"
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const { signer, loading, address, connectWallet } = useSigner();
  console.log("HOME", address)
  return (
    <div className="home1">
      <section className="footer1">
        <div className="footer-bottom">
          <div className="bg" />
          <div className="footer-bottom1">
            <div className="footer-bottom-links">
              <div className="privacy-policy">Privacy Policy</div>
              <div className="terms-conditions">{`Terms & Conditions`}</div>
            </div>
            <div className="all-rights-reserved">
              © All rights reserved – Finsweet
            </div>
          </div>
          <div className="shape-right" />
          <img className="shape-left-icon" alt="" src="/shape-left@2x.png" />
        </div>
        <div className="footer-top">
          <div className="subscribe">
            <button className="button">
              <div className="bg1" />
              <div className="subscribe1">Subscribe</div>
            </button>
            <input
              className="input"
              placeholder="Type email here"
              type="text"
            />
            <div className="join-newsletter">Join Newsletter</div>
          </div>
          <div className="connect">
            <div className="div">+(123) 456-7890</div>
            <div className="hifinsweetcom">hi@finsweet.com</div>
            <div className="connect1">Connect</div>
          </div>
          <div className="company">
            <div className="blog">Blog</div>
            <div className="services">Services</div>
            <div className="careers">Careers</div>
            <div className="about-us">About Us</div>
            <div className="company1">Company</div>
          </div>
          <div className="footer-left">
            <div className="social">
              <img
                className="social-icontwitter"
                alt=""
                src="/socialicontwitter@2x.png"
              />
              <img
                className="social-iconfacebook"
                alt=""
                src="/socialiconfacebook@2x.png"
              />
              <img
                className="social-iconinstagram"
                alt=""
                src="/socialiconinstagram@2x.png"
              />
              <img
                className="social-iconyoutube"
                alt=""
                src="/socialiconyoutube@2x.png"
              />
            </div>
            <h1 className="bespoke-software-solutions">
              Bespoke software solutions
            </h1>
            <img className="logo-icon" alt="" src="/logo1.svg" />
          </div>
        </div>
      </section>
      <section className="feaures-section">
        <div className="bg2" />
        <div className="features">
          <a className="feature-3">
            <div className="bg3" />
            <div className="lorem-ipsum-dolor">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="mos">MOS</h3>
            <div className="learn-more">
              <div className="learn-more1">Learn More</div>
              <img className="icon" alt="" src="/icon.svg" />
            </div>
          </a>
          <a className="feature-2">
            <div className="bg3" />
            <div className="lorem-ipsum-dolor1">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="toeic">TOEIC</h3>
            <div className="learn-more2">
              <div className="learn-more1">Learn More</div>
              <img className="icon1" alt="" src="/icon.svg" />
            </div>
          </a>
          <a className="feature-1">
            <div className="bg3" />
            <div className="lorem-ipsum-dolor2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="ielts">IELTS</h3>
            <div className="learn-more4">
              <div className="learn-more1">Learn More</div>
              <img className="icon1" alt="" src="/icon.svg" />
            </div>
          </a>
        </div>
        <div className="lorem-ipsum-dolor3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
          amet eros blandit, hendrerit elit et, mattis purus. Vivamus commodo
          suscipit tellus et pellentesque.
        </div>
        <h1 className="cc-kha-hc">Các khóa học tiêu biểu</h1>
      </section>
      <section className="help-section">
        <div className="help-posts">
          <a className="help-3">
            <div className="learn-more6">
              <div className="learn-more7">Learn More</div>
              <img className="icon3" alt="" src="/icon1@2x.png" />
            </div>
            <div className="lorem-ipsum-dolor4">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="mua-kha-hc">Mua khóa học</h3>
            <img className="image-icon1" alt="" src="/imageDataset@2x.png" />
          </a>
          <a className="help-2">
            <div className="learn-more8">
              <div className="learn-more7">Learn More</div>
              <img className="icon3" alt="" src="/icon1@2x.png" />
            </div>
            <div className="lorem-ipsum-dolor5">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="ng-kha-hc">Đăng khóa học</h3>
            <img className="image-icon2" alt="" src="/imageUpload@2x.png" />
          </a>
          <a className="help-1">
            <div className="learn-more6">
              <button className="learn-more7" onClick={() => navigate('/verification')}>Learn More</button>
              <img className="icon3" alt="" src="/icon1@2x.png" />
            </div>
            <div className="lorem-ipsum-dolor6">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <h3 className="xc-thc-chng">Xác thực chứng chỉ</h3>
            <img className="image-icon3" alt="" src="/imageFactcheck@2x.png" />
          </a>
        </div>
        <div className="lorem-ipsum-dolor7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
          amet eros blandit, hendrerit elit et, mattis purus. Vivamus commodo
          suscipit tellus et pellentesque.
        </div>
        <h1 className="hn-2000-chng">
          Hơn 2000 chứng chỉ được xác thực tại ABC mỗi năm
        </h1>
      </section>
      <section className="header1" id="1">
        <div className="bg6" />
        <img className="image-icon4" alt="" src="/imageSmile@2x.png" />
        <div className="header-text1">
          <div className="lorem-ipsum-dolor8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique
          </div>
          <h1 className="h-thng-xc" id="2">
            HỆ THỐNG XÁC THỰC CHỨNG CHỈ ABC
          </h1>
        </div>
      </section>

      <Header />
    </div>
  );
};

export default Home;
