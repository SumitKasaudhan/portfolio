import NavbarV2 from "../components/NavbarV2";
import HeroV2 from "../sections/HeroV2";
import AboutV2 from "../sections/AboutV2";
import StatsSection from "../sections/StatsSection";
import ProjectsV2 from "../sections/ProjectsV2";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import FooterV2 from "../components/FooterV2";
import EducationExperience from "../sections/EducationExperience";

const Home = () => {
    return (
        <div className="bg-black text-white overflow-x-hidden">

            {/* Always visible navbar */}
            <NavbarV2 />

            {/* Sections */}
            <main>

                <HeroV2 />
                <AboutV2 />
                <StatsSection />
                <ProjectsV2 />
                <Skills />
                <EducationExperience />
                <Contact />

            </main>

            {/* Footer always last */}
            <FooterV2 />

        </div>
    );
};

export default Home;
