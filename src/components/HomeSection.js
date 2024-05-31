const HomeSection = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <div className="titles">
                    <h1 className="title-1">HỆ THỐNG XÁC THỰC CHỨNG CHỈ ABC</h1>
                    <div className="title-2">
                        Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
                        chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
                        chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
                        của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
                        nghiệp ngay hôm nay!"
                    </div>
                </div>
                <div className="person-image">
                    <img
                        className="person-image-icon"
                        loading="lazy"
                        alt=""
                        src="/person-image@2x.png"
                    />
                </div>
            </div>
        </header>
    )
}

export default HomeSection;