import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AtmosphericCloudBackground from "@/components/ui/cloud-background";
import {
  ExperienceSkeleton,
  ProjectsSkeleton,
  ContactSkeleton,
} from "@/components/ui/section-skeletons";

// Core Web Vitals: Below-the-fold sections dynamically imported with bespoke layout skeletons
const ExperienceSection = dynamic(
  () => import("@/components/experience-section"),
  {
    loading: () => <ExperienceSkeleton />,
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/projects-section"),
  {
    loading: () => <ProjectsSkeleton />,
  }
);

const ContactConnectivitySection = dynamic(
  () => import("@/components/contact-connectivity-section"),
  {
    loading: () => <ContactSkeleton />,
  }
);

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#050814] overflow-x-hidden">
      {/* Global Atmospheric Cloud Shader Fixed Background (Client-side WebGL canvas) */}
      <AtmosphericCloudBackground />

      {/* Main Content Layers (z-10, transparent backgrounds so clouds drift behind all sections) */}
      <main className="relative z-10 min-h-screen w-full bg-transparent">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactConnectivitySection />
      </main>
    </div>
  );
}
