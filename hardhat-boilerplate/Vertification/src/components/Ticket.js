import { useCallback } from "react";
import "./Ticket.css";
import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';

import axios from 'axios';
import useSigner from "../state/signer";
import MultiActionAreaCard from "./MultiACtionAreaCard";
const Ticket = ({ ticket }) => {

    const { address, connectMetaMask } = useSigner()
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
            // const response = await axios.post("http://localhost:8080/tickets", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }

    };

    {/* UseEffect */ }



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

        <main className="ticket-section">
            <form encType="multipart/form-data" action="" onSubmit={handleSubmit}>

                <h1 className="printInfo">Thông tin chứng chỉ</h1>

                <div className="career-10">
                    <div className="bg8" />
                    <h3 className="n-v-cp">Đơn vị cấp phép</h3>
                    <h3 className="input1">{ticket.licensing_authority}</h3>
                </div>

                <div className="career-11">
                    <div className="bg8" />
                    <h3 className="ngy-cp">Ngày cấp</h3>
                    <h3 className="input1">{ticket.issue_date}</h3>
                </div>

                <div className="career-8">
                    <div className="bg8" />
                    <h3 className="tn-chng-ch">Tên chứng chỉ</h3>
                    <h3 className="input1">{ticket.certificate_name}</h3>
                </div>

                {/* Function Date of Birth */}
                <div className="career-5">
                    <img className="bg-icon" alt="" src="/bg@2x.png" />
                    <input className="input2" name="dob" placeholder="Choose..." type="date" />
                    <h3 className="ngy-sinh">Ngày sinh</h3>
                    <h3 className="input1">{ticket.dob}</h3>

                </div>

                {/* Function Regions */}
                <div className="career-6">
                    <img className="bg-icon" alt="" src="/bg@2x.png" />
                    <h3 className="qu-qun">Quê quán</h3>
                    <h3 className="input1">{ticket.region}</h3>

                </div>

                {/* Function WorkUnit */}
                <div className="career-7">
                    <div className="bg8" />
                    <h3 className="n-v-cng">Đơn vị công tác</h3>
                    <h3 className="input1">{ticket.work_unit}</h3>
                </div>

                {/* Function ID */}
                <div className="career-2">
                    <div className="bg8" />
                    <h3 className="gii-tnh">Giới tính</h3>
                    <h3 className="input1">{ticket.gender}</h3>

                </div>

                {/* Function Point */}
                <div className="career-9">
                    <div className="bg8" />
                    <h3 className="im">Điểm</h3>
                    <h3 className="input1">{ticket.point}</h3>
                </div>

                {/* Funtion Expired Date */}
                <div className="career-12">
                    <div className="bg8" />
                    <h3 className="hn-s-dng">Hạn sử dụng chứng chỉ</h3>
                    <h3 className="input1">{ticket.expiry_date}</h3>
                </div>

                <div className="career-3">
                    <div className="bg17" />
                    <h3 className="email">Email</h3>
                    <h3 className="input1">{ticket.email}</h3>
                </div>


                <div className="career-1">
                    <div className="bg8" />
                    <h3 className="h-v-tn">Họ và tên</h3>
                    <h3 className="input1">{ticket.name}</h3>
                </div>


                <div className="career-14">
                    <div className="bg8" />
                    <h3 className="s-cccd">Số CCCD</h3>
                    <h3 className="input1">{ticket.citizen_id}</h3>
                </div>

                {/* Funtion Upload File */}
                <div className="imageCertificate">
                    {/* <div className="bg15" /> */}
                    <h3 className="imageCertificateTitle">Hình ảnh chứng chỉ</h3>


                    <MultiActionAreaCard image={ticket.certificateUrl} />


                </div>

                {/* Function button SUBMIT and CANCEL */}
                <button className="submitbtnTicket" onClick={handleSubmit}>
                    <div className="bg19Ticket" />
                    <div className="submit">Submit</div>
                </button>

                <button className="cancelbtnTicket" type="reset" onClick={onCancelBtnClick}>
                    <div className="bg20Ticket" />
                    <div className="submit">Cancel</div>
                </button>

            </form>

        </main >

    );
};

export default Ticket;
