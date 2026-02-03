"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingMacBook() {
    const macbookRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (macbookRef.current) {
            // Floating animation
            gsap.to(macbookRef.current, {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });

            // Subtle rotation
            gsap.to(macbookRef.current, {
                rotateZ: 2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }
    }, []);

    return (
        <div
            ref={macbookRef}
            className="w-full max-w-xs md:max-w-sm lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-none opacity-90 mx-auto lg:mx-0"
            style={{ width: "auto", maxWidth: "100%", height: "auto" }}
        >
            <svg
                viewBox="0 0 500 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xl"
            >
                {/* MacBook Base */}
                <g>
                    {/* Bottom base */}
                    <path
                        d="M50 320 L450 320 L470 340 L30 340 Z"
                        fill="url(#baseGradient)"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                    />

                    {/* Screen back */}
                    <rect
                        x="80"
                        y="40"
                        width="340"
                        height="240"
                        rx="8"
                        fill="url(#screenGradient)"
                        stroke="#1a1a1a"
                        strokeWidth="3"
                    />

                    {/* Screen bezel */}
                    <rect
                        x="90"
                        y="50"
                        width="320"
                        height="220"
                        rx="4"
                        fill="#0a0a0a"
                    />

                    {/* Terminal window */}
                    <rect
                        x="100"
                        y="60"
                        width="300"
                        height="200"
                        rx="6"
                        fill="#1e1e1e"
                    />

                    {/* Terminal header */}
                    <rect
                        x="100"
                        y="60"
                        width="300"
                        height="30"
                        rx="6"
                        fill="#2d2d2d"
                    />

                    {/* Traffic lights */}
                    <circle cx="115" cy="75" r="5" fill="#ff5f56" />
                    <circle cx="135" cy="75" r="5" fill="#ffbd2e" />
                    <circle cx="155" cy="75" r="5" fill="#27c93f" />

                    {/* Terminal text */}
                    <text
                        x="110"
                        y="115"
                        fontFamily="monospace"
                        fontSize="14"
                        fill="#888"
                    >
                        Last login: Mon Feb 3 01:17
                    </text>

                    <text
                        x="110"
                        y="140"
                        fontFamily="monospace"
                        fontSize="14"
                        fill="#888"
                    >
                        camilo@macbook ~ %
                    </text>

                    <text
                        x="260"
                        y="140"
                        fontFamily="monospace"
                        fontSize="14"
                        fill="#ff8c00"
                        fontWeight="bold"
                    >
                        csanchezs
                    </text>

                    {/* Blinking cursor */}
                    <rect
                        x="350"
                        y="128"
                        width="8"
                        height="16"
                        fill="#ff8c00"
                        className="animate-pulse"
                    />

                    {/* Keyboard base */}
                    <rect
                        x="80"
                        y="280"
                        width="340"
                        height="40"
                        rx="4"
                        fill="url(#keyboardGradient)"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                    />

                    {/* Trackpad */}
                    <rect
                        x="200"
                        y="290"
                        width="100"
                        height="20"
                        rx="3"
                        fill="#2a2a2a"
                        stroke="#1a1a1a"
                        strokeWidth="1"
                    />
                </g>

                {/* Gradients */}
                <defs>
                    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3a3a3a" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                    </linearGradient>

                    <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4a4a4a" />
                        <stop offset="100%" stopColor="#2a2a2a" />
                    </linearGradient>

                    <linearGradient id="keyboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3a3a3a" />
                        <stop offset="100%" stopColor="#2a2a2a" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
