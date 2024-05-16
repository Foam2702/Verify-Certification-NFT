import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import "./CareersSection.css";
import axios from "axios";
import useSigner from "../state/signer";


const CareersSection = () => {
  const onInputContainerClick = useCallback(() => {
    //TODO: UPLOAD PDF FILE
  }, []);

  const onSubmitBtnClick = useCallback(() => {
    //TODO: SEND TO API JSON AND PDF
  }, []);

  const onCancelBtnClick = useCallback(() => {
    //TODO: CLEAR ALL FORM
  }, []);

  {/* Set state */ }
  const [regions, setRegions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  {/* Handle function */ }
  const onfileChange = (event) => {
    setFile(event.target.files);
    console.log(file)

  };

  {/*handle file upload*/ }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector('form');

    // Get the form data
    const data = Array.from(form.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    const formData = new FormData();
    for (var x = 0; x < file.length; x++) {
      formData.append('imageCertificate', file[x])
    }
    formData.append('owner', 'abcxyz');
    formData.append('citizenId', data.citizenId);
    formData.append('name', data.name);
    formData.append('region', data.region);
    formData.append('dob', formatDate(data.dob));
    formData.append('licensingAuthority', data.licensingAuthority);
    formData.append('gender', data.gender);
    formData.append('email', data.email);
    formData.append('workUnit', data.workUnit);
    formData.append('certificateName', data.certificateName);
    formData.append('point', data.point);
    formData.append('issueDate', formatDate(data.issueDate));
    formData.append('expiryDate', formatDate(data.expiryDate));

    try {
      const response = await axios.post("http://localhost:8080/tickets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      console.log(response.data);
      console.log(formData)
    } catch (error) {
      console.error(error);
    }

  };

  {/* UseEffect */ }
  useEffect(() => {
    const fetchDataRegions = async () => {
      const result = await axios("http://localhost:8080/tickets");
      if (Array.isArray(result.data.cities)) {
        setRegions(result.data.cities);
        console.log({ regions });
      } else {
        throw new Error('Unexpected data format');
      }
    };

    fetchDataRegions().catch(error => console.error(error));

    const fetchDataCourses = async () => {
      const result = await axios("http://localhost:8080/courses");
      if (Array.isArray(result.data.courses)) {
        setCourses(result.data.courses);
        console.log({ courses })
      }
      else {
        throw new Error('Unexpected data format');
      }
    }
    fetchDataCourses().catch(error => console.error(error));
  }, []);
  {/*Format date to dd/mm/yyyy*/ }
  function formatDate(input) {
    const datePart = input.match(/\d+/g);
    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return day + '/' + month + '/' + year;
  }
  return (
    <main className="careers-section">
      <form encType="multipart/form-data" action="" onSubmit={handleSubmit}>
        <div className="career-10">
          <div className="bg8" />
          <div className="apply-now">Apply Now</div>
          <h3 className="n-v-cp">Đơn vị cấp phép*</h3>
          <input className="input1" name="licensingAuthority" placeholder="Choose.." type="text" />
        </div>
        <div className="career-11">
          <div className="bg8" />
          <h3 className="ngy-cp">Ngày cấp*</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input2" placeholder="Choose..." type="text" />
        </div>
        <div className="career-8">
          <div className="bg8" />
          <h3 className="tn-chng-ch">Tên chứng chỉ*</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input3" placeholder="Choose.." type="text" />
        </div>
        <div className="career-5">
          <img className="bg-icon" alt="" src="/bg@2x.png" />
          <div className="apply-now">Apply Now</div>
          <input className="input2" placeholder="Choose..." type="text" />
          <h3 className="ngy-sinh">Ngày sinh*</h3>
        </div>
        <div className="career-6">
          <img className="bg-icon" alt="" src="/bg@2x.png" />
          <h3 className="qu-qun">Quê quán*</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input5" placeholder="Choose..." type="text" />
        </div>
        <div className="career-7">
          <div className="bg8" />
          <h3 className="n-v-cng">Đơn vị công tác</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input1" placeholder="Type here..." type="text" />
        </div>
        <div className="career-2">
          <div className="bg8" />
          <h3 className="gii-tnh">Giới tính*</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input3" placeholder="Choose..." type="text" />
        </div>
        <div className="career-9">
          <div className="bg8" />
          <h3 className="im">Điểm</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input5" placeholder="Type here..." type="text" />
        </div>
        <div className="career-12">
          <div className="bg8" />
          <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ*</h3>
          <div className="apply-now8">Apply Now</div>
          <input className="input9" placeholder="Choose..." type="text" />
        </div>
        <div className="career-13">
          <div className="bg15" />
          <h3 className="ti-ln-file">Tải lên file chứng chỉ gốc*</h3>
          <div className="apply-now9">Apply Now</div>
          <button className="input10" onClick={onInputContainerClick}>
            <div className="bg16" />
            <div className="enter">Choose...</div>
          </button>
        </div>
        <div className="career-3">
          <div className="bg17" />
          <h3 className="email">Email</h3>
          <div className="apply-now10">Apply Now</div>
          <input className="input11" placeholder="Type here..." type="text" />
        </div>
        <div className="career-1">
          <div className="bg8" />
          <h3 className="h-v-tn">{`Họ và tên * `}</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input12" placeholder="Type here..." type="text" />
        </div>
        <h1 className="in-thng-tin">Điền thông tin chứng chỉ của bạn</h1>
        <button className="submitbtn" onClick={onSubmitBtnClick}>
          <div className="bg19" />
          <div className="submit">Submit</div>
        </button>
        <button className="cancelbtn" onClick={onCancelBtnClick}>
          <div className="bg20" />
          <div className="submit">Cancel</div>
        </button>
        <div className="career-14">
          <div className="bg8" />
          <h3 className="s-cccd">Số CCCD</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input12" placeholder="Choose..." type="text" />
        </div>
      </form>
    </main>
  );
};

export default CareersSection;
