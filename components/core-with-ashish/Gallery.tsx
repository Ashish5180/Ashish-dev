'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Coffee, Mountain, Music, Heart, Zap, MapPin } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  size: 'large' | 'medium' | 'small';
  icon: React.ReactNode;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "The Quiet Peaks",
    category: "Adventure",
    description: "Beyond the screen, I find my rhythm in the wild. Hiking isn't just about the view; it's about the climb.",
    size: 'large',
    icon: <Mountain className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Vinyl & Vibes",
    category: "Music",
    description: "Analog soul in a digital world. My collection is my sanctuary.",
    size: 'medium',
    icon: <Music className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Dark Roast",
    category: "Coffee",
    description: "6:00 AM. The smell of freshly ground beans. My morning meditation.",
    size: 'small',
    icon: <Coffee className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Moment Captured",
    category: "Photography",
    description: "Seeing the world through a 35mm lens. Raw, unedited life.",
    size: 'small',
    icon: <Camera className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Wanderlust",
    category: "Travel",
    description: "Getting lost in cities where I don't speak the language. That's where I find myself.",
    size: 'medium',
    icon: <MapPin className="w-5 h-5" />
  },
  {
    id: 6,
    title: "Iron & Grit",
    category: "Fitness",
    description: "The gym is where I debug my mind. Pushing weights, finding focus.",
    size: 'large',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 7,
    title: "Late Night Code",
    category: "Real Talk",
    description: "Sometimes the best ideas come when the world is asleep. Just me and the terminal.",
    size: 'medium',
    icon: <Heart className="w-5 h-5" />
  }
];

export const Gallery: React.FC = () => {
  return (
    <section className="bg-[#ffffff] pt-12 pb-24 px-[5%] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#ff3b3b] font-bold uppercase tracking-[0.4em] text-[0.75rem] block mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-[#ff3b3b]"></span>
              The Human Side
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#050505] text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase"
            >
              Life <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(5,5,5,0.2)' }}>Beyond</span> <br />
              The Screen.
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:text-right"
          >
            <p className="text-gray-400 font-medium max-w-xs leading-relaxed italic">
              &quot;Building software is my profession, but exploring existence is my passion.&quot;
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[240px] md:auto-rows-[300px] grid-flow-dense">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`
                group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] cursor-pointer bg-[#f8f8f8] border border-black/5
                ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}
                ${item.size === 'medium' ? 'col-span-2 row-span-1' : ''}
                ${item.size === 'small' ? 'col-span-1 row-span-1' : ''}
              `}
            >
              {/* Image Reveal Layer */}
               <div className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110">
                {/* Real Image Content */}
                <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                    <Image 
                       src={`/my/image${item.id === 1 ? "" : item.id}.jpeg`} 
                       alt={item.title}
                       fill
                       className="object-cover"
                    />
                   
                   {/* Gentle Dark Gradient for Text Visibility (Replaces Blur) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-20 group-hover:from-black/80 transition-all duration-500" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-30 p-5 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2 md:mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="p-2 md:p-2.5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-white group-hover:bg-[#ff3b3b] group-hover:text-white group-hover:border-[#ff3b3b] transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-[0.6rem] md:text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/80">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-white text-xl md:text-3xl font-black mb-1 md:mb-2 tracking-tight transition-all duration-500 group-hover:text-white">
                  {item.title}
                </h3>
                
                <p className="text-white/70 text-[0.75rem] md:text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {item.description}
                </p>
              </div>

              {/* Finishing Touch: Corner Glow (Subtle Red in Light mode) */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ff3b3b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Closing Real Talk Quote */}
        <div className="mt-20 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 font-medium text-lg italic"
          >
            &quot;Code is what I do. This is who I am.&quot;
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
