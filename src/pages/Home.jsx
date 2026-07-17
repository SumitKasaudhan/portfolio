import { useRef } from "react";
import NavbarV2 from "../components/NavbarV2";
import HeroV2 from "../sections/HeroV2";
import AboutV2 from "../sections/AboutV2";
import ProjectsV2 from "../sections/ProjectsV2";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import FooterV2 from "../components/FooterV2";
import EducationExperience from "../sections/EducationExperience";
import Certifications from "../components/Certifications";
import ParticleCanvas from "../components/ParticleCanvas";
import Cursor from "../components/Cursor";


const Home = () => {
    // Tracks HeroV2's screen position so ParticleCanvas can clip
    // itself to only render from About section onward.
    const heroRef = useRef(null);

    return (
        <div className="bg-black text-white overflow-x-hidden">

            {/* Always visible navbar */}
            <NavbarV2 />

            {/* Fixed background — auto-hides behind HeroV2, appears from About onward */}
            <ParticleCanvas heroRef={heroRef} />

            {/* Sections */}
            <main>

                <HeroV2 ref={heroRef} />
                <AboutV2 />
                <Cursor />
                <ProjectsV2 />
                <Skills />
                <EducationExperience />
                <Certifications />
                <Contact />

            </main>

            {/* Footer always last */}
            <FooterV2 />

        </div>
    );
};

export default Home;