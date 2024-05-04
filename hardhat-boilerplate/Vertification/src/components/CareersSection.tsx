import { FunctionComponent, useCallback } from "react";
import "./CareersSection.css";

const CareersSection: FunctionComponent = () => {
  const onInputContainerClick = useCallback(() => {
    //TODO: UPLOAD PDF FILE
  }, []);

  const onSubmitBtnClick = useCallback(() => {
    //TODO: SEND TO API JSON AND PDF
  }, []);

  const onCancelBtnClick = useCallback(() => {
    //TODO: CLEAR ALL FORM
  }, []);

  return (
    <main className="careers-section">
      <div className="career-10">
        <div className="bg" />
        <div className="apply-now">Apply Now</div>
        <h3 className="n-v-cp">Đơn vị cấp phép*</h3>
        <input className="input" placeholder="Choose.." type="text" />
      </div>
      <div className="career-11">
        <div className="bg" />
        <h3 className="ngy-cp">Ngày cấp*</h3>
        <div className="apply-now1">Apply Now</div>
        <input className="input1" placeholder="Choose..." type="text" />
      </div>
      <div className="career-8">
        <div className="bg" />
        <h3 className="tn-chng-ch">Tên chứng chỉ*</h3>
        <div className="apply-now2">Apply Now</div>
        <input className="input2" placeholder="Choose.." type="text" />
      </div>
      <div className="career-5">
        <img className="bg-icon" alt="" src="/bg@2x.png" />
        <div className="apply-now">Apply Now</div>
        <input className="input1" placeholder="Choose..." type="text" />
        <h3 className="ngy-sinh">Ngày sinh*</h3>
      </div>
      <div className="career-6">
        <img className="bg-icon" alt="" src="/bg@2x.png" />
        <h3 className="qu-qun">Quê quán*</h3>
        <div className="apply-now1">Apply Now</div>
        <input className="input4" placeholder="Choose..." type="text" />
      </div>
      <div className="career-7">
        <div className="bg" />
        <h3 className="n-v-cng">Đơn vị công tác</h3>
        <div className="apply-now1">Apply Now</div>
        <input className="input" placeholder="Type here..." type="text" />
      </div>
      <div className="career-2">
        <div className="bg" />
        <h3 className="gii-tnh">Giới tính*</h3>
        <div className="apply-now2">Apply Now</div>
        <input className="input2" placeholder="Choose..." type="text" />
      </div>
      <div className="career-9">
        <div className="bg" />
        <h3 className="im">Điểm</h3>
        <div className="apply-now1">Apply Now</div>
        <input className="input4" placeholder="Type here..." type="text" />
      </div>
      <div className="career-12">
        <div className="bg" />
        <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ*</h3>
        <div className="apply-now8">Apply Now</div>
        <input className="input8" placeholder="Choose..." type="text" />
      </div>
      <div className="career-13">
        <div className="bg7" />
        <h3 className="ti-ln-file">Tải lên file chứng chỉ gốc*</h3>
        <div className="apply-now9">Apply Now</div>
        <div className="input9" onClick={onInputContainerClick}>
          <div className="bg8" />
          <div className="enter">Choose...</div>
        </div>
      </div>
      <div className="career-3">
        <div className="bg9" />
        <h3 className="email">Email</h3>
        <div className="apply-now10">Apply Now</div>
        <input className="input10" placeholder="Type here..." type="text" />
      </div>
      <div className="career-1">
        <div className="bg" />
        <h3 className="h-v-tn">{`Họ và tên * `}</h3>
        <div className="apply-now2">Apply Now</div>
        <input className="input11" placeholder="Type here..." type="text" />
      </div>
      <h1 className="in-thng-tin">Điền thông tin chứng chỉ của bạn</h1>
      <button className="submitbtn" onClick={onSubmitBtnClick}>
        <div className="bg11" />
        <div className="submit">Submit</div>
      </button>
      <button className="cancelbtn" onClick={onCancelBtnClick}>
        <div className="bg12" />
        <div className="submit">Cancel</div>
      </button>
      <div className="career-14">
        <div className="bg" />
        <h3 className="s-cccd">Số CCCD</h3>
        <div className="apply-now2">Apply Now</div>
        <input className="input11" placeholder="Choose..." type="text" />
      </div>
    </main>
  );
};

export default CareersSection;
