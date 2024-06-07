import "./VerifySection.css";

const AddIssuerSection = ({ className = "" }) => {
    return (
        <div className={`header-container2 ${className}`}>
            <div className="header-content2">
                <div className="titles2">
                    <h1 className="title-12">
                        Admin Dashboard
                    </h1>
                    {/* <div className="title-22">
                        Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
                        chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
                        chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
                        của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
                        nghiệp ngay hôm nay!
                    </div> */}
                </div>
                <div className="approve-image1">
                    <img
                        className="approve-image-icon1"
                        loading="lazy"
                        alt=""
                        src="/admin.png"
                    />
                </div>
            </div>
        </div>
    );
};


export default AddIssuerSection;
