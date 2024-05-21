import { useCallback } from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSigner from "../state/signer";


import "./BodySection.css";

const BodySection = () => {

  {/* Set state */ }
  const [regions, setRegions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [file, setFile] = useState(null);
  const { address, connectWallet } = useSigner()

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
    for (var x = 0; x < file.length; x++) {
      formData.append('imageCertificate', file[x])
    }
    formData.append('owner', address);
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
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
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
      const result = await axios("http://localhost:8080/tickets");
      if (Array.isArray(result.data.certificates)) {
        setCourses(result.data.certificates);
        console.log(result.data.certificates)
      }
      else {
        throw new Error('Unexpected data format');
      }
    }
    fetchDataCourses().catch(error => console.error(error));


  }, []);

  const handleCourseChange = (event) => {
    const selectedCourse = courses.find(course => course.certificate === event.target.value);
    setOrganization(selectedCourse ? selectedCourse.org : '');
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
    <section className="body-section1">
      <div className="body-header">
        <h1 className="body-header-text2">Điền thông tin chứng chỉ của bạn</h1>
      </div>
      <form className="careers-section" encType="multipart/form-data" action="" onSubmit={handleSubmit}>
        <div className="careers-section-inner">
          <div className="name-parent">
            <div className="name">
              <h3 className="name1">{`Họ và tên `}</h3>
              <input className="input-name" name="name" placeholder="Type here..." type="text" />

            </div>
            <div className="gender">
              <h3 className="gender1">Giới tính*</h3>
              <select className="input-gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

            </div>
            <div className="email">
              <h3 className="email1">Email</h3>
              <input className="input-email" name="email" placeholder="abc@abc.com" type="email" />

            </div>
          </div>
        </div>
        <div className="careers-section-child">
          <div className="cccd-parent">
            <div className="cccd">
              <h3 className="cccd1">Số CCCD*</h3>
              <input className="input-cccd" name="citizenId" placeholder="Type here..." type="text" />

            </div>
            <div className="date-of-birth">
              <h3 className="date-of-birth1">Ngày Sinh</h3>
              <input className="input-date-of-birth" name="dob" placeholder="Choose..." type="date" />

            </div>
            <div className="home-town">
              <h3 className="home-town-text">Quê quán</h3>
              <select className="input-home-town" name="region" >
                <option value="">Chọn tỉnh thành ...</option>
                {regions.map((region) => (
                  <option key={region._id} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>
        <div className="careers-section-inner1">
          <div className="working-unit-parent">
            <div className="working-unit">
              <h3 className="working-unit-text">Đơn vị công tác</h3>
              <input className="input-working-unit" name="workUnit" placeholder="Type here..." type="text" />

            </div>
            <div className="name-of-vertification">
              <h3 className="name-of-vertification1">Tên chứng chỉ*</h3>
              <select className="input-name-of-vertification" option={courses} name="certificateName" onChange={handleCourseChange}  >
                <option value="">Chọn chứng chỉ ...</option>
                {courses.map((course, index) => (
                  <option key={index} value={course.certificate}>
                    {course.certificate}
                  </option>
                ))}
              </select>

            </div>
            <div className="score">
              <h3 className="score-text">Điểm</h3>
              <input className="input-score" name="point" placeholder="Type here..." type="text" />

            </div>
            <div className="vertification-unit">
              <h3 className="vertification-unit-text">Đơn vị cấp phép*</h3>
              <input className="input-vertification-unit" name="licensingAuthority" type="text" disabled value={organization} />

            </div>
            <div className="date-vertification">
              <h3 className="date-vertification-text">Ngày cấp*</h3>
              <input className="input-date-vertification" name="issueDate" placeholder="Choose..." type="date" />

            </div>
            <div className="expired-date">
              <h3 className="expired-date-text">Hạn sử dụng chứng chỉ*</h3>
              <input className="input-expired-date" name="expiryDate" placeholder="Choose..." type="date" />

            </div>
          </div>
        </div>
        <div className="upload-wrapper">
          <div className="upload">
            <h3 className="upload-file-text">Tải lên file chứng chỉ gốc*</h3>
            <div className="input-upload-file">
              <div className="input-box-background" />
              <input className="example-here"
                name="imageCertificate"
                type="file"
                accept=".jpg"
                multiple
                onChange={onfileChange} />
            </div>

          </div>
        </div>
        <div className="body-button">
          <button className="submit-button" onClick={handleSubmit}>
            <div className="submit">Submit</div>
          </button>
          <button className="cancel-button" onClick={onCancelBtnClick}>
            <div className="cancel">Cancel</div>
          </button>
        </div>
      </form>
    </section>
  );
};

export default BodySection;
