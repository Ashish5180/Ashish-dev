import { TracingBeamDemo } from "@/components/TracingLine";

export default function ExperiencePage() {
  return (
    <main className="pt-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 tracking-tight">
          Work Experience
        </h1>
        <p className="mt-4 text-neutral-600 max-w-2xl text-lg">
          My professional journey and some of the key milestones I&apos;ve hit along the way.
        </p>
      </div>
      <TracingBeamDemo />
    </main>
  );
}
