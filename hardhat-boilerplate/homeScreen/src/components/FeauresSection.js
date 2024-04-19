import Feature from "./Feature";
import styles from "./FeauresSection.module.css";

const FeauresSection = () => {
  return (
    <div className={styles.feauresSection}>
      <div className={styles.bg} />
      <div className={styles.features}>
        <Feature
          tOEIC="MOS"
          propPadding="unset"
          propColor="#1d3444"
          propMinWidth="unset"
          propColor1="#1d3444"
        />
        <Feature tOEIC="TOEIC" />
        <a className={styles.feature1}>
          <div className={styles.bg1} />
          <div
            className={styles.loremIpsumDolor}
          >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className={styles.ielts}>IELTS</div>
          <div className={styles.learnMore}>
            <div className={styles.learnMore1}>Learn More</div>
            <img className={styles.icon} alt="" src="/icon.svg" />
          </div>
        </a>
      </div>
      <div className={styles.loremIpsumDolor1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
        amet eros blandit, hendrerit elit et, mattis purus. Vivamus commodo
        suscipit tellus et pellentesque.
      </div>
      <div className={styles.ccKhaHc}>Các khóa học tiêu biểu</div>
    </div>
  );
};

export default FeauresSection;
