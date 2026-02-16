import Navbar from "../components/NavbarV2";
import Footer from "../components/FooterV2";
import FloatingOrbs from "../components/FloatingOrbs";


const MainLayout = ({ children }) => {
    return (
        <div className="bg-[#0a0a0f] text-white min-h-screen relative overflow-hidden">
            <FloatingOrbs />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;
