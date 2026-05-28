import Navbar from "@/components/Navbar";
import AmbientOrbs from "@/components/AmbientOrbs";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Certifications from "@/sections/Certifications";
import Resume from "@/sections/Resume";
import FAQ from "@/sections/FAQ";
import Social from "@/sections/Social";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030014] overflow-x-hidden">
      {/* Ambient background orbs */}
      <AmbientOrbs />

      {/* Fixed navigation */}
      <Navbar />

      {/* All sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Resume />
      <FAQ />
      <Social />
      <Contact />
      <Footer />
    </main>
  );
}
