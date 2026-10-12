import ScrollProgress from "@/components/ScrollProgress";
import Sidebar from "@/components/Sidebar";
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
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:flex lg:gap-16 lg:px-12">
        <Sidebar />
        <div className="min-w-0 pt-16 lg:flex-1 lg:pt-24">
          <main>
            <About />
            <Experience />
            <Projects />
            <Publications />
            <Robotics />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
