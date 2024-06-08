import "./AddIssuerSection.css";

const AddIssuerSection = ({ className = "" }) => {
    return (
        <div className={`new-header-container ${className}`}>
            <div className="new-header-content">
                <div className="new-titles">
                    <h1 className="new-title">
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
                <div className="new-approve-image">
                    <img
                        className="new-approve-image-icon"
                        loading="lazy"
                        alt=""
                        src="/admin-worker-vector.webp"
                    />
                </div>
            </div>
        </div>
    );
};


export default AddIssuerSection;
