import React, { useEffect, useState } from 'react';
import { BRAND_INFO } from '../config/brand';

/*
 * ============================================================================
 * TRAVEL TRAILS — INITIAL LOADING SCREEN
 * Displays once when the website initially loads, animates the official
 * Travel Trails logo, tagline, airplane path, and thin progress line, then
 * fades out smoothly once the page is ready.
 * ============================================================================
 */
export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(18);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let finishTimer: number | undefined;
    let removeTimer: number | undefined;

    // Advance progress bar smoothly toward completion
    const midTimer = window.setTimeout(() => {
      setProgress(76);
    }, 120);

    const completeLoading = () => {
      const minRevealDelay = prefersReducedMotion ? 200 : 850;

      finishTimer = window.setTimeout(() => {
        setProgress(100);
        setIsFadingOut(true);

        removeTimer = window.setTimeout(() => {
          setIsRemoved(true);
        }, prefersReducedMotion ? 150 : 480);
      }, minRevealDelay);
    };

    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      window.addEventListener('load', completeLoading, { once: true });
      // Fallback safety so slow third-party fonts never stall entry
      const safetyTimer = window.setTimeout(completeLoading, 1800);
      return () => {
        window.clearTimeout(midTimer);
        window.clearTimeout(safetyTimer);
        if (finishTimer) window.clearTimeout(finishTimer);
        if (removeTimer) window.clearTimeout(removeTimer);
        window.removeEventListener('load', completeLoading);
      };
    }

    return () => {
      window.clearTimeout(midTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Travel Trails"
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center text-center">
        {/* Official Travel Trails Logo (Original proportions & colours preserved) */}
        <div className="tt-loader-logo mb-5">
          <img
            src={
              BRAND_INFO.customLogoPath ||
              '/assets/aistudio/Firefly_RemoveBackground_3c843c43.png'
            }
            alt={BRAND_INFO.name}
            referrerPolicy="no-referrer"
            className="w-44 sm:w-52 h-auto object-contain mx-auto"
          />
        </div>

        {/* Brand Tagline */}
        <p className="tt-loader-tagline font-display text-lg sm:text-xl font-medium text-[#102F50] tracking-wide mb-8">
          Experience the World Better.
        </p>

        {/* Minimal Travel-Themed Airplane + Progress Line */}
        <div className="w-56 sm:w-64">
          {/* Subtle Horizontal Airplane Flight Track */}
          <div className="relative h-5 mb-1.5 overflow-hidden" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="tt-loader-plane w-4 h-4 text-[#102F50] absolute left-0 top-0.5"
            >
              <path
                d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
                fill="currentColor"
                transform="rotate(90 12 12)"
              />
            </svg>
          </div>

          {/* Thin Travel Blue Progress Line with Teal Accent */}
          <div className="w-full h-[2.5px] bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #347FBF 0%, #087B68 100%)',
              }}
            />
          </div>

          {/* Subtle Loading Label */}
          <p className="tt-loader-subtext mt-3.5 text-xs font-medium tracking-[0.14em] uppercase text-[#102F50]/65">
            Preparing Your Journey...
          </p>
        </div>
      </div>
    </div>
  );
};
