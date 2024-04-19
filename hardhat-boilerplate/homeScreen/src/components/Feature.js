import { useMemo } from "react";
import styles from "./Feature.module.css";

const Feature = ({
  tOEIC,
  propPadding,
  propColor,
  propMinWidth,
  propColor1,
}) => {
  const feature2Style = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const tOEICStyle = useMemo(() => {
    return {
      color: propColor,
      minWidth: propMinWidth,
    };
  }, [propColor, propMinWidth]);

  const loremIpsumDolorStyle = useMemo(() => {
    return {
      color: propColor1,
    };
  }, [propColor1]);

  return (
    <a className={styles.feature2} style={feature2Style}>
      <div className={styles.bg} />
      <div
        className={styles.loremIpsumDolor}
        style={loremIpsumDolorStyle}
      >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
      <div className={styles.toeic} style={tOEICStyle}>
        {tOEIC}
      </div>
      <div className={styles.learnMore}>
        <div className={styles.learnMore1}>Learn More</div>
        <img className={styles.icon} alt="" src="/icon.svg" />
      </div>
    </a>
  );
};

export default Feature;
