import { useMemo } from "react";
import "./FrameComponent1.css";

const FrameComponent1 = ({ ngySinh, propWidth, propPadding }) => {
  const conditionSplitterStyle = useMemo(() => {
    return {
      width: propWidth,
      padding: propPadding,
    };
  }, [propWidth, propPadding]);

  return (
    <div className="condition-splitter" style={conditionSplitterStyle}>
      <div className="career-10">
        <img className="bg-icon" alt="" src="/bg.svg" />
        <img className="bg-icon1" loading="lazy" alt="" src="/bg.svg" />
        <div className="feature-extractor">
          <div className="result-comparator">
            <h3 className="ngy-sinh">{ngySinh}</h3>
          </div>
          <div className="input2">
            <div className="bg4" />
            <div className="enter">Choose...</div>
          </div>
        </div>
        <div className="apply-now-frame">
          <div className="apply-now2">Apply Now</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
