import { useCallback } from "react";
import "./CareersSection.css";
import React, { useState, useEffect } from 'react';

import axios from 'axios';

const CareersSection = () => {
  {/* Set state */ }
  const [regions, setRegions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  {/* Handle function */ }
  const onfileChange = (event) => {
    setFile(event.target.files);
    console.log(file)

  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector('form');

    // Get the form data
    const data = Array.from(form.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    const formData = new FormData();
    const fileObj = new File([file], file); // Convert file path to file object
    for (var x = 0; x < file.length; x++) {
      formData.append('imageCertificate', file[x])
    }
    //formData.append('imageCertificate', fileObj);
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

  const onSubmitBtnClick1 = () => {
    // Get the form element
    const form = document.querySelector('form');

    // Get the form data
    const data = Array.from(form.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    // Modify the data to match the desired structure
    const modifiedData = {
      imageCertificate: data.imageCertificate,
      owner: "0xED877A3B3c30ed50e983b7B9a26524C1C4c0eB02",
      citizenId: data.citizenId,
      name: data.name,
      region: data.region,
      dob: formatDate(data.dob),
      licensingAuthority: data.licensingAuthority,
      gender: data.gender,
      email: data.email,
      workUnit: data.workUnit,
      certificateName: data.certificateName,
      point: data.point,
      issueDate: formatDate(data.issueDate),
      expiryDate: formatDate(data.expiryDate),

    };

    // Create a Blob from the JSON string
    const blob = new Blob([JSON.stringify(modifiedData, null, 2)], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the link to the Blob URL
    link.href = url;

    // Set the link's download attribute to the desired file name
    link.download = 'form-data.json';

    // Simulate a click on the link
    link.click();

  };

  const onCancelBtnClick = useCallback(() => {
    // Get the form element
    const form = document.querySelector('form');

    // Reset the form
    form.reset();
  }, []);
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

        <h1 className="in-thng-tin">Điền thông tin chứng chỉ của bạn</h1>

        <div className="career-10">
          <div className="bg" />
          <div className="apply-now">Apply Now</div>
          <h3 className="n-v-cp">Đơn vị cấp phép*</h3>
          <input className="input" name="licensingAuthority" placeholder="Choose.." type="text" />
        </div>

        <div className="career-11">
          <div className="bg" />
          <h3 className="ngy-cp">Ngày cấp*</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input1" name="issueDate" placeholder="Choose..." type="date" />
        </div>

        <div className="career-8">
          <div className="bg" />
          <h3 className="tn-chng-ch">Tên chứng chỉ*</h3>
          <div className="apply-now2">Apply Now</div>
          {/*<input className="input2" name = "certificateName" placeholder="Choose.." type="text" />*/}
          <select className="input2" option={courses} name="certificateName" >
            <option value="">Chọn chứng chỉ ...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Function Date of Birth */}
        <div className="career-5">
          <img className="bg-icon" alt="" src="/bg@2x.png" />
          <div className="apply-now">Apply Now</div>
          <input className="input1" name="dob" placeholder="Choose..." type="date" />
          <h3 className="ngy-sinh">Ngày sinh*</h3>
        </div>

        {/* Function Regions */}
        <div className="career-6">
          <img className="bg-icon" alt="" src="/bg@2x.png" />
          <h3 className="qu-qun">Quê quán*</h3>
          <div className="apply-now1">Apply Now</div>
          <select className="input4" name="region" >
            <option value="">Chọn tỉnh thành ...</option>
            {regions.map((region) => (
              <option key={region._id} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Function WorkUnit */}
        <div className="career-7">
          <div className="bg" />
          <h3 className="n-v-cng">Đơn vị công tác</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input" name="workUnit" placeholder="Type here..." type="text" />
        </div>

        {/* Function ID */}
        <div className="career-2">
          <div className="bg" />
          <h3 className="gii-tnh">Giới tính*</h3>
          <div className="apply-now2">Apply Now</div>
          <select className="input2" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Function Point */}
        <div className="career-9">
          <div className="bg" />
          <h3 className="im">Điểm</h3>
          <div className="apply-now1">Apply Now</div>
          <input className="input4" name="point" placeholder="Type here..." type="text" />
        </div>

        {/* Funtion Expired Date */}
        <div className="career-12">
          <div className="bg" />
          <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ*</h3>
          <div className="apply-now8">Apply Now</div>
          <input className="input8" name="expiryDate" placeholder="Choose..." type="date" />
        </div>
        {/*<div className="career-13">
        <div className="bg7" />
        <h3 className="ti-ln-file">Tải lên file chứng chỉ gốc*</h3>
        <div className="apply-now9">Apply Now</div>
        <div className="input9" onClick={onInputContainerClick}>
          <div className="bg8" />
          <input className="enter" type="file" />
        </div>

  </div>*/}
        <div className="career-3">
          <div className="bg9" />
          <h3 className="email">Email</h3>
          <div className="apply-now10">Apply Now</div>
          <input className="input10" name="email" placeholder="Type here..." type="email" />
        </div>


        <div className="career-1">
          <div className="bg" />
          <h3 className="h-v-tn">{`Họ và tên * `}</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input11" name="name" placeholder="Type here..." type="text" />
        </div>


        <div className="career-14">
          <div className="bg" />
          <h3 className="s-cccd">Số CCCD</h3>
          <div className="apply-now2">Apply Now</div>
          <input className="input11" name="citizenId" placeholder="Type here..." type="text" />
        </div>

        {/* Funtion Upload File */}
        <div className="career-13">
          <div className="bg7" />
          <h3 className="ti-ln-file">Tải lên file chứng chỉ gốc*</h3>
          <div className="apply-now9">Apply Now</div>
          <div className="input9" >
            <div className="bg8" />
            <input className="enter"
              name="imageCertificate"
              type="file"
              accept=".jpg"
              multiple
              onChange={onfileChange} />
          </div>
        </div>

        {/* Function button SUBMIT and CANCEL */}
        <button className="submitbtn" onClick={handleSubmit}>
          <div className="bg11" />
          <div className="submit">Submit</div>
        </button>

        <button className="cancelbtn" type="reset" onClick={onCancelBtnClick}>
          <div className="bg12" />
          <div className="submit">Cancel</div>
        </button>

      </form>

    </main>

  );
};

export default CareersSection;

