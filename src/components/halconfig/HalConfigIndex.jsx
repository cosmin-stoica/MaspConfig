import styled from "styled-components";
import ItodoImage from "../../elements/itodo-img";
import HalReviewer from "./HalReviewer/HalReviewerIntro";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect, useMemo } from "react";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(5,5,5);
  display: flex;
  justify-content: center;
  align-items:center;
  position: relative;
`;

const ImgContainer = styled.div`
  filter: opacity(1);
  width: 15%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;




const HalConfigIndex = () => {

    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#000000",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: false,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 0,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 2,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 270,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );


    return (
        <>
            <MainContainer>
                {init && (
                <ParticlesWrapper>
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                    />
                </ParticlesWrapper>
      )}
                <ImgContainer>
                    <ItodoImage src="/images/masp_white.png"></ItodoImage>
                </ImgContainer>
                <HalReviewer></HalReviewer>
            </MainContainer>
        </>
    );
};

export default HalConfigIndex;
