"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "./IntroAnimation";

interface IntroWrapperProps {
    children: React.ReactNode;
}

// Flag to track if intro has been shown in this page load
let introShownThisLoad = false;

export default function IntroWrapper({ children }: IntroWrapperProps) {
    const [showIntro, setShowIntro] = useState(!introShownThisLoad);
    const [introComplete, setIntroComplete] = useState(introShownThisLoad);

    useEffect(() => {
        // If intro was already shown in this load, skip it
        if (introShownThisLoad) {
            setShowIntro(false);
            setIntroComplete(true);
        }
    }, []);

    const handleIntroComplete = () => {
        introShownThisLoad = true;
        setIntroComplete(true);
        // Small delay before hiding to ensure smooth transition
        setTimeout(() => {
            setShowIntro(false);
        }, 100);
    };

    return (
        <>
            {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
            <div
                className={`transition-opacity duration-500 ${introComplete ? "opacity-100" : "opacity-0"
                    }`}
            >
                {children}
            </div>
        </>
    );
}
