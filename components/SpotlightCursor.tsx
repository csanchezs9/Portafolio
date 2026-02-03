"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                const x = e.clientX;
                const y = e.clientY;

                // Gradient with primary (coral) and accent (cyan) colors
                spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 120, 85, 0.08), rgba(45, 212, 255, 0.05) 40%, transparent 80%)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: "radial-gradient(600px circle at 50% 50%, rgba(255, 120, 85, 0.08), rgba(45, 212, 255, 0.05) 40%, transparent 80%)",
            }}
        />
    );
}
