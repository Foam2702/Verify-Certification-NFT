import { useMemo } from "react";
import "./FrameComponent2.css";

const FrameComponent2 = ({ email, propPadding, propDisplay, propMinWidth }) => {
  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const emailStyle = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  return (
    <div className="career-3-wrapper" style={frameDivStyle}>
      <div className="career-3">
        <div className="bg2" />
        <div className="frame-container">
          <div className="email-wrapper">
            <h3 className="email" style={emailStyle}>
              {email}
            </h3>
          </div>
          <input className="input" placeholder="Type here..." type="text" />
        </div>
        <div className="apply-now-wrapper">
          <div className="apply-now">Apply Now</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
