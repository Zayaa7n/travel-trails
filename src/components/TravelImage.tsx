import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface TravelImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  fallbackTitle?: string;
}

/**
 * Resilient travel image component with zero-broken-image fallback.
 */
export const TravelImage: React.FC<TravelImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  objectPosition = 'center center',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#347FBF] via-[#26659B] to-[#087B68] text-white/95 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 mb-2 text-[#EAB52A]" strokeWidth={1.5} />
        <span className="font-display text-base font-medium tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setHasError(true)}
        style={{ objectPosition }}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
