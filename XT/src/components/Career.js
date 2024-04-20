import { useMemo } from "react";
import "./Career.css";

const Career = ({ sCCCD, propPadding, propMinWidth }) => {
  const career8Style = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const sCCCDStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className="career-8" style={career8Style}>
      <div className="bg3" />
      <div className="frame-div">
        <div className="s-cccd-wrapper">
          <h3 className="s-cccd" style={sCCCDStyle}>
            {sCCCD}
          </h3>
        </div>
        <input className="input1" placeholder="Type here..." type="text" />
      </div>
      <div className="apply-now-container">
        <div className="apply-now1">Apply Now</div>
      </div>
    </div>
  );
};

export default Career;
