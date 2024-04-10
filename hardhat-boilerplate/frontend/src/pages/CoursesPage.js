import Header from "../components/Header";
import CoursesSection from "../components/CoursesSection";
import CoursesListSection from "../components/CoursesListSection";
import FooterSection from "../components/FooterSection";
import "./CoursesPage.css";

const CoursesPage = () => {
  return (
    <div className="coursespage">
      <Header />
      <CoursesSection />
      <CoursesListSection />
      <FooterSection />
    </div>
  );
};

export default CoursesPage;
