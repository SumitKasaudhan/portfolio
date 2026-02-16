import ecommerce from "../assets/projects/ecommerce.png";
import restaurant from "../assets/projects/restaurant.png";
import crm from "../assets/projects/crm.png";

export const projects = [
    {
        title: "E-commerce Platform",
        image: ecommerce,
        desc: "Modern shopping UI with responsive design",
        tech: ["React", "Tailwind"],
        live: "https://your-live-link.com",
        github: "https://github.com/yourrepo",
    },

    {
        title: "Restaurant System",
        image: restaurant,
        desc: "Food ordering dashboard UI",
        tech: ["React", "Node"],
        live: "https://your-live-link-2.com",
        github: "https://github.com/yourrepo2",
    },

    {
        title: "CRM Dashboard",
        image: crm,
        desc: "Customer management interface",
        tech: ["React"],
        live: null, // not deployed
        github: "https://github.com/yourrepo3",
    },
];
