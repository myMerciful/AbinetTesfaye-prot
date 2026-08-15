import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./context/ProfileContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CompetitiveProgramming from "./components/CompetitiveProgramming";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";
import { useEffect, useState } from "react";

function PortfolioLayout() {
  return (
    <ProfileProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CompetitiveProgramming />
        <Contact />
      </main>
      <Footer />
    </ProfileProvider>
  );
}

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadTextShape(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-bg text-slate-200">
        {init && (
          <Particles
            id="tsparticles-app"
            className="fixed inset-0 z-0 pointer-events-none"
            options={{
              fullScreen: { enable: false },
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              particles: {
                color: { value: ["#38bdf8", "#8b5cf6", "#10b981"] },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "bottom",
                  random: false,
                  straight: false,
                  outModes: { default: "out" },
                },
                number: { density: { enable: true, area: 800 }, value: 30 },
                opacity: { value: { min: 0.1, max: 0.4 } },
                shape: {
                  type: "char",
                  options: {
                    char: [
                      { value: ["< />", "{ }", "[ ]", "0", "1", "=>", "&&"], font: "monospace", weight: "600" }
                    ]
                  }
                },
                size: { value: { min: 10, max: 18 } },
              },
              detectRetina: true,
            }}
          />
        )}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<PortfolioLayout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </div>
    </Router>
  );
}
