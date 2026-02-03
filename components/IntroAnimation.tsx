"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface IntroAnimationProps {
    onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const [displayText, setDisplayText] = useState("");

    const fullText = "Csanchezs";
    const typingSpeed = 120; // ms per character

    useEffect(() => {
        // Typing animation
        let currentIndex = 0;
        const typeInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typeInterval);

                // After typing completes, wait then animate out
                setTimeout(() => {
                    if (containerRef.current) {
                        gsap.to(containerRef.current, {
                            yPercent: -100,
                            duration: 0.8,
                            ease: "power3.inOut",
                            onComplete: onComplete,
                        });
                    }
                }, 600);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [onComplete]);

    // Cursor blink animation
    useEffect(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
        >
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                    <span ref={textRef}>{displayText}</span>
                    <span
                        ref={cursorRef}
                        className="inline-block w-[4px] h-[1em] bg-white ml-1 align-middle"
                    />
                </h1>
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
