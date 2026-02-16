import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const HeroParticles = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            className="absolute inset-0 z-0"
            options={{
                fullScreen: false,
                background: { color: "transparent" },
                fpsLimit: 60,
                particles: {
                    number: { value: 80 },
                    color: { value: "#3b82f6" },
                    shape: { type: "circle" },
                    opacity: { value: 0.4 },
                    size: { value: { min: 1, max: 3 } },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: "none",
                        outModes: { default: "out" },
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#3b82f6",
                        opacity: 0.2,
                        width: 1,
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                    },
                    modes: {
                        grab: {
                            distance: 180,
                            links: { opacity: 0.5 },
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default HeroParticles;
