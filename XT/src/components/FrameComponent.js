import FrameComponent2 from "./FrameComponent2";
import Career from "./Career";
import FrameComponent1 from "./FrameComponent1";
import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <div className="frame-parent1">
      <div className="in-thng-tin-chng-ch-ca-b-wrapper">
        <h1 className="in-thng-tin">Điền thông tin chứng chỉ của bạn</h1>
      </div>
      <div className="star-element">
        <div className="career-1">
          <div className="bg5" />
          <div className="frame-parent2">
            <div className="h-v-tn-wrapper">
              <h3 className="h-v-tn">{`Họ và tên * `}</h3>
            </div>
            <input className="input3" placeholder="Type here..." type="text" />
          </div>
          <div className="apply-now-wrapper1">
            <div className="apply-now3">Apply Now</div>
          </div>
        </div>
        <div className="career-12">
          <div className="bg6" />
          <div className="frame-parent3">
            <div className="gii-tnh-wrapper">
              <h3 className="gii-tnh">Giới tính*</h3>
            </div>
            <div className="input4">
              <div className="bg7" />
              <div className="enter1">Choose...</div>
            </div>
          </div>
          <div className="apply-now-wrapper2">
            <div className="apply-now4">Apply Now</div>
          </div>
        </div>
        <FrameComponent2 email="Email" />
      </div>
      <div className="frame-wrapper1">
        <div className="frame-parent4">
          <div className="frame-parent5">
            <div className="career-8-parent">
              <Career sCCCD="Số CCCD*" />
              <FrameComponent1 ngySinh="Ngày sinh*" />
              <FrameComponent1
                ngySinh="Quê quán*"
                propWidth="389.2px"
                propPadding="0px 0px 13px"
              />
            </div>
            <div className="rule-creator">
              <div className="rule-applier">
                <FrameComponent2
                  email="Đơn vị công tác"
                  propPadding="21px 0px 0px"
                  propDisplay="unset"
                  propMinWidth="unset"
                />
                <div className="model-selector">
                  <div className="career-4">
                    <div className="bg8" />
                    <div className="model-splitter">
                      <div className="hyperparameter-tuner">
                        <h3 className="tn-chng-ch">Tên chứng chỉ*</h3>
                      </div>
                      <div className="input5">
                        <div className="bg9" />
                        <div className="enter2">Choose..</div>
                      </div>
                    </div>
                    <div className="prediction-engine">
                      <div className="apply-now5">Apply Now</div>
                    </div>
                  </div>
                </div>
                <Career
                  sCCCD="Điểm"
                  propPadding="32px 25.2px 18px 26px"
                  propMinWidth="60px"
                />
              </div>
            </div>
          </div>
          <div className="classifier-ensemble">
            <div className="model-ensemble">
              <div className="data-aggregator">
                <div className="input-filter">
                  <div className="career-5">
                    <div className="bg10" />
                    <div className="output-collector">
                      <div className="error-handler">
                        <h3 className="n-v-cp">Đơn vị cấp phép*</h3>
                      </div>
                      <div className="input6">
                        <div className="bg11" />
                        <div className="enter3">Choose..</div>
                      </div>
                    </div>
                    <div className="image-manipulator">
                      <div className="apply-now6">Apply Now</div>
                    </div>
                  </div>
                </div>
                <div className="condition-checker">
                  <div className="career-6">
                    <div className="bg12" />
                    <div className="function-caller">
                      <div className="database-connection">
                        <h3 className="ngy-cp">Ngày cấp*</h3>
                      </div>
                      <div className="input7">
                        <div className="bg13" />
                        <div className="enter4">Choose...</div>
                      </div>
                    </div>
                    <div className="string-operations">
                      <div className="apply-now7">Apply Now</div>
                    </div>
                  </div>
                </div>
                <div className="set-management">
                  <div className="career-9">
                    <div className="bg14" />
                    <div className="queue-handler">
                      <div className="stack-manager">
                        <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ*</h3>
                      </div>
                      <div className="input8">
                        <div className="bg15" />
                        <div className="enter5">Choose...</div>
                      </div>
                    </div>
                    <div className="flow-control">
                      <div className="apply-now8">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="career-16">
                <div className="bg16" />
                <div className="visualization">
                  <div className="feedback-system">
                    <h3 className="ti-ln-file">Tải lên file chứng chỉ gốc*</h3>
                  </div>
                  <div className="input9">
                    <div className="bg17" />
                    <div className="enter6">Choose...</div>
                  </div>
                </div>
                <div className="collaborative-processing">
                  <div className="apply-now9">Apply Now</div>
                </div>
              </div>
            </div>
          </div>
          <div className="validation-checks">
            <div className="authentication-manager">
              <div className="authorization-checker">
                <button className="button2">
                  <div className="bg18" />
                  <div className="submit">Submit</div>
                </button>
              </div>
              <button className="button3">
                <div className="bg19" />
                <div className="cancel">Cancel</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
