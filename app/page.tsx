import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import AboutStatsSection from "@/components/about-stats-section";
import ContactConnectivitySection from "@/components/contact-connectivity-section";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-slate-950">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutStatsSection />
      <ContactConnectivitySection />
    </main>
  );
}
