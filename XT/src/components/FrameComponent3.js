import FrameComponent5 from "./FrameComponent5";
import FrameComponent4 from "./FrameComponent4";
import "./FrameComponent3.css";

const FrameComponent3 = () => {
  return (
    <section className="shape-container">
      <div className="image-holder-parent">
        <FrameComponent5 />
        <FrameComponent4 />
      </div>
    </section>
  );
};

export default FrameComponent3;
