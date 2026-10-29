import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Robotics from "@/components/Robotics";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Publications />
        <Robotics />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
