import { ExperienceUI } from "@/components/ExperienceUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience | Ashish Yaduvanshi",
  description: "Explore the professional journey of Ashish Yaduvanshi, a Full Stack Developer specializing in AI platforms, enterprise ERPs, and scalable web solutions.",
  keywords: ["Full Stack Developer", "Experience", "Ashish Yaduvanshi", "Next.js", "AI Developer", "Scalable Products"],
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <ExperienceUI />
    </main>
  );
}
