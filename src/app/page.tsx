import NeuralScene from "@/components/NeuralScene";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Robotics from "@/components/Robotics";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NeuralScene />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Publications />
          <Robotics />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
