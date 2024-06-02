import MultiActionAreaCard from "../components/MultiACtionAreaCard";

const ExamSection = ({ course }) => {
    console.log("COURSE", course[0].name)
    return (
        <>

            <header className="header-container">
                <div className="header-content">
                    <div className="titles">
                        <h1 className="title-1">{course[0].name}</h1>
                        <div className="title-2">
                            {course[0].description}

                        </div>
                    </div>
                    <div className="person-image">
                        {/* <img
                        className="person-image-icon"
                        loading="lazy"
                        alt=""
                        src="/person-image@2x.png"
                    /> */}
                        <MultiActionAreaCard image={course[0].image} />

                    </div>
                </div>
            </header>

        </>

    )
}

export default ExamSection