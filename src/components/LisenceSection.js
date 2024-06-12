import "./VerifySection.css";

const LisenceSection = ({ className = "" }) => {
    return (
        <div className={`new-header-container  ${className}`}>
            <div className="new-header-content">
                <div className="new-titles">
                    <h1 className="new-title">
                        Your Certificates
                    </h1>
                    <div className="title-22">
                        "These are your verified certificates that have been issued and soulbound tokens have been created on the blockchain!"
                    </div>
                </div>
                <div className="new-approve-image">
                    <img
                        className="new-approve-image-icon"
                        loading="lazy"
                        alt=""
                        src="/blog_header_what_is_a_certificate_0.jpg"
                    />
                </div>
            </div>
        </div>
    );
};


export default LisenceSection;
