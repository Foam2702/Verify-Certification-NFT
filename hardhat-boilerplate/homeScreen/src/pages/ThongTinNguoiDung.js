import styles from "./ThongTinNguoiDung.module.css";

const ThongTinNguoiDung = () => {
  return (
    <div className={styles.ThongTinNguoiDung}>
      <div className={styles.navbar}>
        <div className={styles.button}>
          <img
            className={styles.thitKChaCTn31}
            alt=""
            src="/thit-k-cha-c-tn-3-1@2x.png"
          />
          <div className={styles.bg} />
        </div>
        <div className={styles.button1}>
          <img
            className={styles.thitKChaCTn41}
            alt=""
            src="/thit-k-cha-c-tn-4-1@2x.png"
          />
          <div className={styles.bg1} />
        </div>
        <div className={styles.teamAbc}>Team ABC</div>
      </div>
      <div className={styles.bg2} />
      <img
        className={styles.thitKChaCTn32}
        alt=""
        src="/thit-k-cha-c-tn-3-2@2x.png"
      />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.tnVIn}>Tên ví điện tử</div>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupChild} />
        <div className={styles.tnVIn}>Đăng xuất</div>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupInner} />
        <div className={styles.ngKLm}>Đăng ký làm issuer</div>
      </div>
      <div className={styles.groupButton}>
        <div className={styles.rectangleDiv} />
        <div className={styles.thngTinC}>Thông tin cá nhân</div>
      </div>
      <div className={styles.rectangleParent1}>
        <div className={styles.rectangleDiv} />
        <div className={styles.ccKhaHc}>Các khóa học đã mua</div>
      </div>
      <div className={styles.rectangleParent2}>
        <div className={styles.groupChild2} />
        <div className={styles.ccKhaHc1}>Các khóa học đã xác thực</div>
      </div>
    </div>
  );
};

export default ThongTinNguoiDung;
