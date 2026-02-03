import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import SpotlightCursor from "@/components/SpotlightCursor";
import SectionIndicator from "@/components/SectionIndicator";

export default function Home() {
  return (
    <>
      <SpotlightCursor />
      <SectionIndicator />
      <main className="min-h-screen">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}
