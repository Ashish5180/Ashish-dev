"use client";

import React from "react";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { Film, Clapperboard, ArrowUpRight, Clock, Star } from "lucide-react";
import { EssayArticleData } from "./essay-reader-modal";

export interface FilmStudyData {
  id: string;
  title: string;
  director: string;
  year: string;
  category: string;
  readTime: string;
  coverSrc: string;
  ratingNote: string;
  thesis: string;
  colorPalette: string[];
  articleData: EssayArticleData;
}

export const CINEMA_STUDIES: FilmStudyData[] = [
  {
    id: "spider-verse",
    title: "Into the Spider-Verse: Variable Frame Rates in 3D",
    director: "Bob Persichetti & Peter Ramsey",
    year: "2018",
    category: "Animation & Visual Tech",
    readTime: "7 min read",
    coverSrc: "/images/creative/spider-verse.svg",
    ratingNote: "12fps on ones vs 24fps on twos",
    thesis:
      "Miles Morales starts animated on 'twos' (12 unique frames/sec) while Peter B. Parker moves on 'ones' (24 fps), making Miles physically look inexperienced until his leap of faith syncs him to 24fps. Pure technical storytelling.",
    colorPalette: ["#e11d48", "#06b6d4", "#fbbf24", "#0f172a"],
    articleData: {
      id: "spider-verse",
      title: "Into the Spider-Verse: The Engineering of Variable Frame Rates",
      category: "Animation & Visual Tech",
      readTime: "7 min read",
      date: "Film Study · Vol. 01",
      coverSrc: "/images/creative/spider-verse.svg",
      synopsis:
        "How Sony Pictures Imageworks threw away standard 3D interpolation curves to invent a hybrid pipeline combining Ben-Day dots, chromatic offset, and variable frame steps.",
      content: {
        intro:
          "In 3D animation, computers automatically interpolate movement smoothly between keyframes. Into the Spider-Verse is legendary because the creators wrote custom software to turn that smoothing off—deliberately dropping in-between frames to mimic traditional cel animation.",
        sections: [
          {
            heading: "1. The Narrative Frame Rate Step",
            paragraphs: [
              "When Miles first swings with Peter B. Parker, Peter moves at a fluid 24 frames per second. Miles moves at 12 frames per second (holding every drawing for two frames). The visual dissonance is immediate: Miles feels awkward, heavy, and struggling to keep up with the rhythm of the city.",
              "Only during the iconic 'What's Up Danger' leap of faith does Miles finally graduate to 24 frames per second. The technical framerate itself is the character arc.",
            ],
          },
          {
            heading: "2. CMYK Misregistration as Depth of Field",
            paragraphs: [
              "Traditional camera lenses use optical blur (bokeh) to separate foreground from background. Spider-Verse replaced standard lens blur with offset cyan and magenta color printing misregistration, directly mirroring old comic book press misalignments.",
            ],
          },
        ],
        conclusion:
          "Great engineering does not always mean higher frame rates or smoother interpolations. Sometimes, introducing deliberate constraints and discrete steps produces timeless art.",
      },
    },
  },
  {
    id: "interstellar",
    title: "Interstellar: Kip Thorne's Gravitational Raytracer",
    director: "Christopher Nolan",
    year: "2014",
    category: "Cinema & Astrophysics",
    readTime: "6 min read",
    coverSrc: "/images/creative/interstellar.svg",
    ratingNote: "800TB Relativistic Raytracing",
    thesis:
      "Double Negative wrote a custom raytracer (DNGR) grounded in Einstein's field equations. The resulting simulation of Gargantua was so mathematically accurate it led to published peer-reviewed astrophysical papers.",
    colorPalette: ["#f59e0b", "#d97706", "#78350f", "#030712"],
    articleData: {
      id: "interstellar",
      title: "Interstellar: Writing Einstein's Equations for IMAX Cameras",
      category: "Cinema & Astrophysics",
      readTime: "6 min read",
      date: "Film Study · Vol. 02",
      coverSrc: "/images/creative/interstellar.svg",
      synopsis:
        "Why Christopher Nolan and Kip Thorne refused to approximate black hole geometry with generic VFX flares, building a ray-tracing renderer that computed 800 terabytes of curved light beams.",
      content: {
        intro:
          "Before Interstellar, black holes in sci-fi were depicted as simple dark funnels with vortexes. Kip Thorne provided pages of tensor equations to VFX supervisor Paul Franklin, challenging the team to compute light paths warped by extreme gravity.",
        sections: [
          {
            heading: "1. The DNGR Custom Ray-Tracing Engine",
            paragraphs: [
              "Standard raytracers cast straight rays of light from the camera into the scene. To render Gargantua, the team had to calculate curved geodesic light paths passing near a Kerr black hole with a spin parameter of 0.999.",
              "Some single IMAX frames took upwards of 100 hours to render, totaling nearly a petabyte of simulation data across the compute cluster.",
            ],
          },
          {
            heading: "2. The Visual Discovery of Gravitational Lensing",
            paragraphs: [
              "When the first renders came back, the team thought there was a bug in the code because light from the back of the accretion disk was visible both above and below the sphere. Kip Thorne reviewed the output and realized the simulation had correctly revealed gravitational lensing from relativistic deflection.",
            ],
          },
        ],
        conclusion:
          "The intersection of hard scientific computation and cinematic storytelling is where the most awe-inspiring visual monuments are born.",
      },
    },
  },
  {
    id: "ghibli-ma",
    title: "Studio Ghibli: The Art of 'Ma' (Negative Space)",
    director: "Hayao Miyazaki",
    year: "2001",
    category: "Cel Animation & Philosophy",
    readTime: "5 min read",
    coverSrc: "/images/creative/ghibli-ma.svg",
    ratingNote: "The Stillness between Actions",
    thesis:
      "Miyazaki explains that 'Ma' is the pause—the quiet moments where Chihiro simply watches rainwater drip off an eave or sits quietly on a sea train. It is why Ghibli films feel deeply human rather than exhausting.",
    colorPalette: ["#38bdf8", "#0284c7", "#64748b", "#0f172a"],
    articleData: {
      id: "ghibli-ma",
      title: "Studio Ghibli: Why Deliberate Pauses Make Systems Breathe",
      category: "Cel Animation & Philosophy",
      readTime: "5 min read",
      date: "Film Study · Vol. 03",
      coverSrc: "/images/creative/ghibli-ma.svg",
      synopsis:
        "An exploration of Hayao Miyazaki's concept of 'Ma' (negative space and intentional silence) and how it applies to distributed queue architectures and human UX.",
      content: {
        intro:
          "In modern action cinema, every second is filled with sound, cuts, and explosions. Hayao Miyazaki famously stated in an interview with Roger Ebert: 'If you have non-stop action with no breathing room, it becomes numb. What you need is the silence.'",
        sections: [
          {
            heading: "1. The Sea Train Sequence in Spirited Away",
            paragraphs: [
              "The most celebrated sequence in Spirited Away has no dialogue, no villains, and no plot propulsion. Chihiro sits quietly on a submerged train while transparent passengers step on and off at lonely water stations.",
              "The scene lets the viewer digest everything that came before. It mirrors the feeling of traveling alone at dusk—melancholy, gentle, and unforgettable.",
            ],
          },
          {
            heading: "2. 'Ma' in Software Systems",
            paragraphs: [
              "Backend engineers often design systems as continuous, maximum-velocity pipelines. But systems need 'Ma'—deliberate backpressure, quiet quiescence periods, rate-limit cooldowns, and thoughtful UI loading stillness.",
            ],
          },
        ],
        conclusion:
          "A great system, like a great film, knows when to sprint and when to let the water drip from the roof.",
      },
    },
  },
];

export interface ScreeningRoomProps {
  onSelectFilm: (article: EssayArticleData) => void;
}

export function ScreeningRoom({ onSelectFilm }: ScreeningRoomProps) {
  return (
    <section className="mt-20 sm:mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Clapperboard className="h-4 w-4 text-amber-700" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-stone-900">
              The Screening Room
            </h2>
          </div>
          <p className="mt-1 text-sm text-stone-600">
            Cinema and animation breakdowns analyzed through a technical, visual, and architectural lens.
          </p>
        </div>

        <span className="font-mono text-xs text-stone-500">
          Films, Cartoons &amp; Storyboard Studies
        </span>
      </div>

      {/* Film Studies Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {CINEMA_STUDIES.map((film) => (
          <article
            key={film.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-stone-400 hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)]"
          >
            <div>
              {/* Cover Artwork with ChromaticImage */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-950 border-b border-stone-100">
                <ChromaticImage
                  src={film.coverSrc}
                  alt={film.title}
                  className="h-full w-full cursor-crosshair"
                  zoom={0.14}
                  displacement={0.045}
                  chromaticShift={0.015}
                  tilt={0.15}
                />
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span className="font-medium text-stone-800 flex items-center gap-1.5">
                    <Film className="h-3 w-3 text-amber-600" />
                    {film.year} · {film.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="h-3 w-3" />
                    {film.readTime}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
                  {film.title}
                </h3>

                <p className="mt-1 text-xs font-mono text-stone-400">
                  Dir. {film.director}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-3">
                  {film.thesis}
                </p>

                {/* Color Palette Swatches */}
                <div className="mt-4 flex items-center gap-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-mono text-stone-400 mr-1">Palette:</span>
                  {film.colorPalette.map((color, i) => (
                    <span
                      key={i}
                      className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`Palette swatch: ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-stone-100 px-6 py-3.5 bg-stone-50/50">
              <span className="font-mono text-[11px] text-amber-800/80 font-medium flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-600 fill-amber-600" />
                {film.ratingNote}
              </span>

              <button
                onClick={() => onSelectFilm(film.articleData)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer"
              >
                <span>Read Study</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

