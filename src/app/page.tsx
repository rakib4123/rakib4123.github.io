import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Robotics from "@/components/Robotics";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-bg-main min-h-screen text-slate-800">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Projects />
      <Robotics />
      <Timeline />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
