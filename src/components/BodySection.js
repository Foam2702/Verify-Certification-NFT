import React, { useState, useEffect } from "react";
import axios from "axios";
import useSigner from "../state/signer";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { encryptData } from "../helpers";

import "./BodySection.css";

const BodySection = () => {
  {
    /* Set state */
  }
  const [errors, setErrors] = useState({});
  const [regions, setRegions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [file, setFile] = useState(null);
  const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3)
  const [alertSeverity, setAlertSeverity] = useState("");
  const navigate = useNavigate();

  {
    /* Handle function */
  }
  const onfileChange = (event) => {
    setFile(event.target.files);
    console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = document.querySelector("form");

    // Get the form data
    const data = Array.from(form.elements)
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {}
      );

    // Check if all fields are filled and add red border to empty fields


    // Email validation
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(data.email)) {
      console.log("Invalid email address.");
      document.querySelector("[name='email']").classList.add('invalid-input');
      return;
    } else {
      console.log("Valid email");
    }

    // Assuming `file` and `address` are available in the scope
    const formData = new FormData();
    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("imageCertificate", file[i]);
      }
    } else {
      console.log("No file selected");
      return;
    }
    const publicKey = await getPublicKey()
    console.log("pub", publicKey)
    formData.append("owner", address);
    formData.append("citizenId", encryptData(data.citizenId, publicKey));
    formData.append("name", encryptData(data.name, publicKey));
    formData.append("region", encryptData(data.region, publicKey));
    formData.append("dob", encryptData(formatDate(data.dob), publicKey));
    formData.append("licensingAuthority", data.licensingAuthority);
    formData.append("gender", encryptData(data.gender, publicKey));
    formData.append("email", encryptData(data.email, publicKey));
    formData.append("workUnit", encryptData(data.workUnit, publicKey));
    formData.append("certificateName", encryptData(data.certificateName, publicKey));
    formData.append("point", encryptData(data.point, publicKey));
    formData.append("issueDate", encryptData(formatDate(data.issueDate), publicKey));
    formData.append("expiryDate", encryptData(formatDate(data.expiryDate), publicKey));

    try {
      // const response = await axios.post("http://localhost:8080/tickets", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // console.log(response.data.message);

      // if (response.data.message === "sent successfully") {
      //   setLoading(true);
      //   await new Promise(resolve => setTimeout(resolve, 1000));
      //   setLoading(false);
      //   setAlertSeverity("success");
      //   setMessageAlert("Send to issuer successfully");
      //   setShowAlert(true);
      // } else if (response.data.message === "ticket already exist") {
      //   setAlertSeverity("error");
      //   setMessageAlert("Certificate already exist");
      //   setShowAlert(true);
      // }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoading(true);
    setShowAlert(false);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    navigate("/")

  };
  {
    /* UseEffect */
  }
  useEffect(() => {
    let timer;
    if (showAlert && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowAlert(false);
    }
    return () => clearTimeout(timer);
  }, [showAlert, countdown]);
  useEffect(() => {
    const fetchDataRegions = async () => {
      const result = await axios("http://localhost:8080/tickets");
      if (Array.isArray(result.data.cities)) {
        setRegions(result.data.cities);
        console.log({ regions });
      } else {
        throw new Error("Unexpected data format");
      }
    };

    fetchDataRegions().catch((error) => console.error(error));

    const fetchDataCourses = async () => {
      const result = await axios("http://localhost:8080/tickets");
      if (Array.isArray(result.data.certificates)) {
        setCourses(result.data.certificates);
        console.log(result.data.certificates);
      } else {
        throw new Error("Unexpected data format");
      }
    };
    fetchDataCourses().catch((error) => console.error(error));
  }, []);

  const handleCourseChange = (event) => {
    const selectedCourse = courses.find(
      (course) => course.certificate === event.target.value
    );
    setOrganization(selectedCourse ? selectedCourse.org : "");
  };

  const onCancelBtnClick = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    navigate("/")
  };
  function formatDate(input) {
    const datePart = input.match(/\d+/g);
    const year = datePart[0];
    const month = datePart[1];
    const day = datePart[2];

    return day + "/" + month + "/" + year;
  }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}

      <section className="body-section1">
        <div className="body-header">
          <h1 className="body-header-text2">Điền thông tin chứng chỉ của bạn</h1>
        </div>
        <form
          className="careers-section"
          encType="multipart/form-data"
          action=""
        >
          <div className="careers-section-inner">
            <div className="name-parent">
              <div className="name">
                <h3 className="name1">Họ và tên</h3>
                <input
                  className="input-name"
                  name="name"
                  placeholder="Type here..."
                  type="text"
                />
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
                <input
                  className="input-email"
                  name="email"
                  placeholder="abc@abc.com"
                  type="email"
                />
              </div>
            </div>
          </div>
          <div className="careers-section-child">
            <div className="cccd-parent">
              <div className="cccd">
                <h3 className="cccd1">Số CCCD*</h3>
                <input
                  className="input-cccd"
                  name="citizenId"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="date-of-birth">
                <h3 className="date-of-birth1">Ngày Sinh</h3>
                <input
                  className="input-date-of-birth"
                  name="dob"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
              <div className="home-town">
                <h3 className="home-town-text">Quê quán</h3>
                <select className="input-home-town" name="region">
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
                <input
                  className="input-working-unit"
                  name="workUnit"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="name-of-vertification">
                <h3 className="name-of-vertification1">Tên chứng chỉ*</h3>
                <select
                  className="input-name-of-vertification"
                  option={courses}
                  name="certificateName"
                  onChange={handleCourseChange}
                >
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
                <input
                  className="input-score"
                  name="point"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="vertification-unit">
                <h3 className="vertification-unit-text">Đơn vị cấp phép*</h3>
                <input
                  className="input-vertification-unit"
                  name="licensingAuthority"
                  type="text"
                  disabled
                  value={organization}
                />
              </div>
              <div className="date-vertification">
                <h3 className="date-vertification-text">Ngày cấp*</h3>
                <input
                  className="input-date-vertification"
                  name="issueDate"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
              <div className="expired-date">
                <h3 className="expired-date-text">Hạn sử dụng chứng chỉ*</h3>
                <input
                  className="input-expired-date"
                  name="expiryDate"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="upload-wrapper">
            <div className="upload">
              <h3 className="upload-file-text">Tải lên file chứng chỉ gốc*</h3>
              <div className="input-upload-file">
                <div className="input-box-background" />
                <input
                  className="example-here"
                  name="imageCertificate"
                  type="file"
                  accept=".jpg"
                  multiple
                  onChange={onfileChange}
                />
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
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {messageAlert}.Back to home at {countdown}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
};

export default BodySection;
