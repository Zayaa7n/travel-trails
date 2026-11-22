import React from 'react';
import { BRAND_INFO } from '../config/brand';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Travel Trails Brand Logo
 * Renders the official uploaded Travel Trails logo preserving its original
 * proportions and colours. On dark/blue backgrounds (e.g. Footer), it places
 * the logo on a crisp white card so original colours remain intact.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const isLight = variant === 'light';

  if (BRAND_INFO.customLogoPath) {
    if (isLight) {
      return (
        <span
          className={`inline-flex items-center justify-center bg-white rounded-xl px-4 py-2 shadow-2xs shrink-0 ${className}`}
        >
          <img
            src={BRAND_INFO.customLogoPath}
            alt={BRAND_INFO.name}
            referrerPolicy="no-referrer"
            className="h-16 sm:h-20 w-auto object-contain shrink-0"
          />
        </span>
      );
    }

    return (
      <img
        src={BRAND_INFO.customLogoPath}
        alt={BRAND_INFO.name}
        referrerPolicy="no-referrer"
        className={`h-16 sm:h-20 w-auto object-contain shrink-0 ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx="18"
          cy="18"
          r="16.5"
          stroke={isLight ? '#FFFFFF' : '#347FBF'}
          strokeWidth="1.5"
          strokeOpacity={isLight ? '0.9' : '1'}
        />
        <circle cx="24" cy="11.5" r="2.2" fill="#EAB52A" />
        <path
          d="M7.5 23.5L14.5 14L19.5 20.5L23 16.5L28.5 23.5"
          stroke={isLight ? '#FFFFFF' : '#347FBF'}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 26.5C13.5 24 17 26.5 21.5 24.5C24.5 23.2 26.5 24.5 28 25.5"
          stroke="#087B68"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>

      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          isLight ? 'text-white' : 'text-[#347FBF]'
        }`}
      >
        {BRAND_INFO.name}
      </span>
    </span>
  );
};
