import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.bg} />
      <img className={styles.imageIcon} alt="" src="/image3@2x.png" />
      <div className={styles.headerText}>
        <div className={styles.loremIpsumDolor}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique
        </div>
        <div className={styles.hThngXc}>HỆ THỐNG XÁC THỰC CHỨNG CHỈ ABC</div>
      </div>
    </div>
  );
};

export default Header;
