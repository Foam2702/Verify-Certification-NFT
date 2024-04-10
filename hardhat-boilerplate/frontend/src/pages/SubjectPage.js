import Header from "../components/Header";
import HeaderSection from "../components/HeaderSection";
import SubjectsListSection from "../components/SubjectsListSection";
import FooterSection from "../components/FooterSection";
import "./SubjectPage.css";

const SubjectPage = () => {
  return (
    <div className="subjectpage">
      <Header />
      <HeaderSection />
      <SubjectsListSection />
      <FooterSection
        propOverflow="hidden"
        propOverflow1="hidden"
        propOverflow2="hidden"
        propOverflow3="hidden"
      />
    </div>
  );
};

export default SubjectPage;
