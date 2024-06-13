import React, { useState, useEffect } from "react";
import axios from "axios";
import useSigner from "../state/signer";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { encryptData, remove0x } from "../helpers";
import { v4 as uuidv4 } from 'uuid'
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
  const [checkSent, setCheckSend] = useState(true)
  const navigate = useNavigate();

  {
    /* Handle function */
  }
  const onfileChange = (event) => {
    setFile(event.target.files);
    console.log(file);
  };
  const checkIssuer = async (licensing_authority) => {
    const { ethereum } = window;
    if (ethereum) {
      const result = await contract.getVerifiersByOrganizationCode(licensing_authority);
      return result
    }
  }


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
    const insertPubToDB = async () => {
      if (address) {
        try {
          const checkPublicKeyExisted = await axios.get(`http://localhost:8080/addresses/${address}`);
          if (checkPublicKeyExisted.data.address.length === 0) {
            const publicKey = await getPublicKey(); // Await the result of getPublicKey
            if (publicKey.code === 4001 && publicKey.message === "User rejected the request.") {
              console.log('Error retrieving public key:', publicKey);
              setAlertSeverity("warning");
              setMessageAlert("You must sign to submit");
              setShowAlert(true);
              return;
            }
            await axios.post(`http://localhost:8080/addresses/${address}`, {
              address: address, // Include the address in the body
              publicKey: publicKey // Include the public key in the body
            });

          }
        }
        catch (err) {
          console.log(err)
        }


      }
    };
    insertPubToDB();


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

    const issuers = await checkIssuer(data.licensingAuthority);
    const fieldsToEncrypt = ['citizenId', 'name', 'region', 'dob', 'gender', 'email', 'workUnit', 'point', 'issueDate', 'expiryDate'];

    if (issuers.length === 0) {
      setAlertSeverity("warning");
      setMessageAlert(`No issuer found for ${data.licensingAuthority}`);
      setShowAlert(true);
      return;
    }
    else {
      const id = uuidv4();
      for (const issuer of issuers) {
        const formData = new FormData();
        if (file && file.length > 0) {
          for (let i = 0; i < file.length; i++) {
            formData.append("imageCertificate", file[i]);
          }
        } else {
          console.log("No file selected");
          return;
        }
        try {
          const publicKeysResponse = await axios.get(`http://localhost:8080/addresses/${issuer}`);

          if (publicKeysResponse.data.address.length === 0) {
            setAlertSeverity("warning");
            setMessageAlert(`${data.licensingAuthority} is busy. Please comeback later`);
            setShowAlert(true);
            return;
          }
          const publicKeyIssuer = publicKeysResponse.data.address[0].publickey
          for (const field of fieldsToEncrypt) {
            const encryptedData = await encryptData(data[field], remove0x(publicKeyIssuer));
            formData.append(field, JSON.stringify(encryptedData));
          }
          // Append non-encrypted fields directly
          formData.append("certificateName", data.certificateName)
          formData.append("owner", address);
          formData.append("licensingAuthority", data.licensingAuthority);
          formData.append("issuerAddress", publicKeysResponse.data.address[0].address)
          formData.append("id", id)
          for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }
          setLoading(true); // Start loading before sending the request
          const response = await axios.post("http://localhost:8080/tickets", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log(response.data.message);

          if (response.data.message === "ticket already exist") {
            setCheckSend(false)
          }

          for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading regardless of the request outcome
        }
      }
    }
    console.log("CHECK", checkSent)
    if (checkSent === true) {

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading/waiting time
      setAlertSeverity("success");
      setMessageAlert(`Submitted successfully. Please wait for confirmation from the ${data.licensingAuthority}`);
      setShowAlert(true);
    } else if (checkSent === false) {
      setAlertSeverity("warning");
      setMessageAlert("Cannot sent to some issuer");
      setShowAlert(true);
    }

  };


  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setLoading(true);
    setShowAlert(false);
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // setLoading(false);

  };
  {
    /* UseEffect */
  }
  // useEffect(() => {
  //   let timer;
  //   if (showAlert && countdown > 0) {
  //     timer = setTimeout(() => {
  //       setCountdown(countdown - 1);
  //     }, 1000);
  //   } else if (countdown === 0) {
  //     setShowAlert(false);
  //   }
  //   return () => clearTimeout(timer);
  // }, [showAlert, countdown]);
  useEffect(() => {
    const fetchDataRegions = async () => {
      try {
        const result = await axios("http://localhost:8080/tickets");
        if (Array.isArray(result.data.cities)) {
          setRegions(result.data.cities);
          console.log({ regions });
        } else {
          throw new Error("Unexpected data format");
        }
      }
      catch (err) {
        console.log(err)
      }

    };

    fetchDataRegions().catch((error) => console.error(error));

    const fetchDataCourses = async () => {
      try {
        const result = await axios("http://localhost:8080/tickets");
        if (Array.isArray(result.data.certificates)) {
          setCourses(result.data.certificates);
          console.log(result.data.certificates);
        } else {
          throw new Error("Unexpected data format");
        }
      }
      catch (err) {
        console.log(err)
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
                <h3 className="name1">Name *</h3>
                <input
                  className="input-name"
                  name="name"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="gender">
                <h3 className="gender1">Gender *</h3>
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
                <h3 className="cccd1">Citizen ID *</h3>
                <input
                  className="input-cccd"
                  name="citizenId"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="date-of-birth">
                <h3 className="date-of-birth1">Date of birth *</h3>
                <input
                  className="input-date-of-birth"
                  name="dob"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
              <div className="home-town">
                <h3 className="home-town-text">Region *</h3>
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
                <h3 className="working-unit-text">Work unit *</h3>
                <input
                  className="input-working-unit"
                  name="workUnit"
                  placeholder="Type here..."
                  type="text"
                />
              </div>
              <div className="name-of-vertification">
                <h3 className="name-of-vertification1">Certificate name *</h3>
                <select
                  className="input-name-of-vertification"
                  option={courses}
                  name="certificateName"
                  onChange={handleCourseChange}
                >
                  <option value="">Select Certificate ...</option>
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

              <div className="date-vertification">
                <h3 className="date-vertification-text">Issue Date *</h3>
                <input
                  className="input-date-vertification"
                  name="issueDate"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
              <div className="expired-date">
                <h3 className="expired-date-text">Expiry Date </h3>
                <input
                  className="input-expired-date"
                  name="expiryDate"
                  placeholder="Choose..."
                  type="date"
                />
              </div>
              <div className="vertification-unit">
                <h3 className="vertification-unit-text">Licensing Authority *</h3>
                <input
                  className="input-vertification-unit"
                  name="licensingAuthority"
                  type="text"
                  disabled
                  value={organization}
                />
              </div>
            </div>
          </div>
          <div className="upload-wrapper">
            <div className="upload">
              <h3 className="upload-file-text">Image of certificate *</h3>
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
        <Snackbar open={showAlert} autoHideDuration={10000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{
              width: '100%',
              fontSize: '1.25rem', // Increase font size
            }}
          >
            {messageAlert}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
};

export default BodySection;
