import styles from "./ThngTinNgiDng.module.css";

const ThngTinNgiDng = () => {
  return (
    <div className={styles.thngTinNgiDng}>
      <div className={styles.navbar}>
        <div className={styles.button}>
          <img
            className={styles.thitKChaCTn31}
            alt=""
            src="/thit-k-cha-c-tn-3-1@2x.png"
          />
          <button className={styles.bg} />
        </div>
        <button className={styles.button1}>
          <img
            className={styles.thitKChaCTn41}
            alt=""
            src="/thit-k-cha-c-tn-4-1@2x.png"
          />
          <div className={styles.bg1} />
        </button>
        <div className={styles.teamAbc}>team ABC</div>
      </div>
      <div className={styles.bg2} />
      <img
        className={styles.thitKChaCTn32}
        alt=""
        src="/thit-k-cha-c-tn-3-2@2x.png"
      />
      <button className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.tnVIn}>Tên ví điện tử</div>
      </button>
      <button className={styles.rectangleGroup}>
        <div className={styles.groupChild} />
        <div className={styles.tnVIn}>Đăng xuất</div>
      </button>
      <button className={styles.rectangleContainer}>
        <div className={styles.groupInner} />
        <div className={styles.ngKLm}>Đăng ký làm issuer</div>
      </button>
      <button className={styles.groupButton}>
        <div className={styles.rectangleDiv} />
        <div className={styles.thngTinC}>Thông tin cá nhân</div>
      </button>
      <button className={styles.rectangleParent1}>
        <div className={styles.rectangleDiv} />
        <div className={styles.ccKhaHc}>Các khóa học đã mua</div>
      </button>
      <button className={styles.rectangleParent2}>
        <div className={styles.groupChild2} />
        <div className={styles.ccKhaHc1}>Các khóa học đã xác thực</div>
      </button>
    </div>
  );
};

export default ThngTinNgiDng;
