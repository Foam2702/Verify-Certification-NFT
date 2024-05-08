import FeauresSection from "../components/FeauresSection";
import Header from "../components/Header";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.footer}>
        <div className={styles.footerBottom}>
          <div className={styles.bg} />
          <div className={styles.footerBottom1}>
            <div className={styles.footerBottomLinks}>
              <div className={styles.privacyPolicy}>Privacy Policy</div>
              <div
                className={styles.termsConditions}
              >{`Terms & Conditions`}</div>
            </div>
            <div className={styles.allRightsReserved}>
              © All rights reserved – Finsweet
            </div>
          </div>
          <div className={styles.shapeRight} />
          <img className={styles.shapeLeftIcon} alt="" src="/shape-left.svg" />
        </div>
        <div className={styles.footerTop}>
          <div className={styles.subscribe}>
            <button className={styles.button}>
              <div className={styles.bg1} />
              <div className={styles.subscribe1}>Subscribe</div>
            </button>
            <input
              className={styles.input}
              placeholder="Type email here"
              type="text"
            />
            <div className={styles.joinNewsletter}>Join Newsletter</div>
          </div>
          <div className={styles.connect}>
            <div className={styles.div}>+(123) 456-7890</div>
            <div className={styles.hifinsweetcom}>hi@finsweet.com</div>
            <div className={styles.connect1}>Connect</div>
          </div>
          <div className={styles.company}>
            <div className={styles.blog}>Blog</div>
            <div className={styles.services}>Services</div>
            <div className={styles.careers}>Careers</div>
            <div className={styles.aboutUs}>About Us</div>
            <div className={styles.company1}>Company</div>
          </div>
          <div className={styles.footerLeft}>
            <div className={styles.social}>
              <img
                className={styles.socialIcontwitter}
                alt=""
                src="/socialicontwitter.svg"
              />
              <img
                className={styles.socialIconfacebook}
                alt=""
                src="/socialiconfacebook.svg"
              />
              <img
                className={styles.socialIconinstagram}
                alt=""
                src="/socialiconinstagram.svg"
              />
              <img
                className={styles.socialIconyoutube}
                alt=""
                src="/socialiconyoutube@2x.png"
              />
            </div>
            <div className={styles.bespokeSoftwareSolutions}>
              Bespoke software solutions
            </div>
            <img className={styles.logoIcon} alt="" src="/logo.svg" />
          </div>
        </div>
      </div>
      <FeauresSection />
      <div className={styles.helpSection}>
        <div className={styles.helpPosts}>
          <a className={styles.help3}>
            <div className={styles.learnMore}>
              <div className={styles.learnMore1}>Learn More</div>
              <img className={styles.icon} alt="" src="/icon1.svg" />
            </div>
            <div
              className={styles.loremIpsumDolor}
            >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className={styles.muaKhaHc}>Mua khóa học</div>
            <img className={styles.imageIcon} alt="" src="/image@2x.png" />
          </a>
          <a className={styles.help2}>
            <div className={styles.learnMore2}>
              <div className={styles.learnMore1}>Learn More</div>
              <img className={styles.icon} alt="" src="/icon1.svg" />
            </div>
            <div
              className={styles.loremIpsumDolor1}
            >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className={styles.ngKhaHc}>Đăng khóa học</div>
            <img className={styles.imageIcon1} alt="" src="/image1@2x.png" />
          </a>
          <a className={styles.help1}>
            <div className={styles.learnMore}>
              <div className={styles.learnMore1}>Learn More</div>
              <img className={styles.icon} alt="" src="/icon1.svg" />
            </div>
            <div
              className={styles.loremIpsumDolor2}
            >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className={styles.xcThcChng}>Xác thực chứng chỉ</div>
            <img className={styles.imageIcon2} alt="" src="/image2@2x.png" />
          </a>
        </div>
        <div className={styles.loremIpsumDolor3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
          amet eros blandit, hendrerit elit et, mattis purus. Vivamus commodo
          suscipit tellus et pellentesque.
        </div>
        <b className={styles.hn2000Chng}>
          Hơn 2000 chứng chỉ được xác thực tại ABC mỗi năm
        </b>
      </div>
      <Header />
      <div className={styles.button1}>
        <button className={styles.bg2} />
        <img
          className={styles.thitKChaCTn21}
          alt=""
          src="/thit-k-cha-c-tn-2-1@2x.png"
        />
        <button className={styles.bg3} />
        <div className={styles.logIn}>LOG IN</div>
        <button className={styles.bg4} />
        <div className={styles.signUp}>SIGN UP</div>
      </div>
      <div className={styles.teamAbc}>Team ABC</div>
      <div className={styles.homeChild} />
    </div>
  );
};

export default Home;
