import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBackground() {
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 10,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ["#ffffff"],
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        backgroundColor: "#000000",
      }}
    />
  );
}


// import React, { useCallback } from "react";
// import Particles from "@tsparticles/react"; // updated import
// import { loadBasic } from "@tsparticles/basic"; // updated loader
//
// export default function ParticleBackground() {
//   const particlesInit = useCallback(async (engine) => {
//     await loadBasic(engine); // same usage, modern package
//   }, []);
//
//   const particlesLoaded = useCallback(async (container) => {
//     console.log("Particles loaded:", container);
//   }, []);
//
//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         fullScreen: { enable: true, zIndex: -1 },
//         background: {
//           color: "#000000",
//         },
//         particles: {
//           number: { value: 100, density: { enable: true, area: 800 } },
//           color: { value: "#ffffff" },
//           shape: { type: "circle" },
//           opacity: { value: 0.8 },
//           size: { value: { min: 1, max: 5 } },
//           move: { enable: true, speed: 3 },
//           links: {
//             enable: true,
//             distance: 150,
//             color: "#ffffff",
//             opacity: 0.4,
//             width: 1,
//           },
//         },
//       }}
//     />
//   );
// }




// import React, { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
//
// export default function ParticleBackground() {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);
//
//   const particlesLoaded = useCallback(async (container) => {
//     console.log("Particles loaded:", container);
//   }, []);
//
//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         fullScreen: { enable: true, zIndex: -1 },
//         background: {
//           color: "#000000",
//         },
//         particles: {
//           number: { value: 100, density: { enable: true, area: 800 } },
//           color: { value: "#ffffff" },
//           shape: { type: "circle" },
//           opacity: { value: 0.8 },
//           size: { value: { min: 1, max: 5 } },
//           move: { enable: true, speed: 3, direction: "none", random: false, straight: false },
//           links: {
//             enable: true,
//             distance: 150,
//             color: "#ffffff",
//             opacity: 0.4,
//             width: 1,
//           },
//         },
//       }}
//     />
//   );
// }
//
