"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Scroll Animations
                            </span>
                        </h1>
                    </>
                }
            >
                <a
                    href="https://github.com/Ashish5180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full"
                >
                    <Image
                        src={`/Github.png`}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-left-top hover:scale-[1.01] transition-transform duration-500"
                        draggable={false}
                    />
                </a>

            </ContainerScroll>
        </div>
    );
}
