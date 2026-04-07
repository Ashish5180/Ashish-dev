import { ExperienceUI } from "@/components/ExperienceUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Projects | Ashish Yaduvanshi",
  description: "Explore the professional journey and selected projects of Ashish Yaduvanshi — Full Stack Developer specializing in AI platforms, enterprise ERPs, and scalable web solutions.",
  keywords: ["Full Stack Developer", "Experience", "Projects", "Ashish Yaduvanshi", "Next.js", "AI Developer", "Scalable Products"],
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <ExperienceUI />
    </main>
  );
}
