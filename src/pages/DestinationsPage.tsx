import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import {
  CATEGORY_SECTIONS,
  CategoryMeta,
  DESTINATIONS,
  DestinationCategory,
  DestinationItem,
} from '../data/destinations';
import { buildDestinationEnquiryUrl } from '../config/brand';
import {
  initDestinationSlider,
  SliderController,
} from '../utils/destinationSlider';

interface DestinationsPageProps {
  initialCategory?: DestinationCategory | 'all';
  onPlanCustomTrip?: (destinationName: string) => void;
}

/* ============================================================================
   DESTINATION CARD
   Clean 3:4 photography card with bottom gradient scrim, destination name,
   subtle hover zoom, and direct WhatsApp enquiry click.
   ============================================================================ */
interface DestinationCardProps {
  destination: DestinationItem;
  shouldPreventClick: () => boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  shouldPreventClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldPreventClick()) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={buildDestinationEnquiryUrl(destination.name)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleCardClick}
      draggable={false}
      aria-label={`Explore ${destination.name} on WhatsApp`}
      className="tt-gallery-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
    >
      {imageError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#347FBF] via-[#26659B] to-[#087B68] text-white p-6 text-center">
          <Compass className="w-8 h-8 mb-2 text-[#EAB52A]" strokeWidth={1.5} />
          <span className="font-display text-xl font-medium">
            {destination.name}
          </span>
        </div>
      ) : (
        <img
          src={destination.image}
          alt={destination.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          draggable={false}
          onError={() => setImageError(true)}
          className="tt-gallery-card-img"
        />
      )}

      {/* Subtle Bottom Dark Gradient Overlay */}
      <div aria-hidden="true" className="tt-gallery-overlay" />

      {/* Bottom Destination Name & Enquiry Indicator */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
        <h3 className="font-display text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-white leading-tight">
          {destination.name}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 group-hover:text-[#EAB52A] transition-colors">
          <span>Explore Destination</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
};

/* ============================================================================
   INDEPENDENT HORIZONTAL SLIDING GALLERY SECTION
   ============================================================================ */
interface SlidingGallerySectionProps {
  section: CategoryMeta;
  items: DestinationItem[];
}

const SlidingGallerySection: React.FC<SlidingGallerySectionProps> = ({
  section,
  items,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SliderController | null>(null);

  const [sliderState, setSliderState] = useState({
    canPrev: false,
    canNext: true,
    progress: 0,
  });

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const controller = initDestinationSlider(trackEl, {
      onStateChange: setSliderState,
    });
    controllerRef.current = controller;

    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, [items.length]);

  return (
    <section
      id={`gallery-${section.id}`}
      aria-labelledby={`heading-${section.id}`}
      className="scroll-mt-24"
    >
      {/* Gallery Header with Title, Subtitle & Arrow Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7 sm:mb-9">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68]">
            <span className="tabular-nums">{section.editorialIndex}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#347FBF]">Curated Collection</span>
          </div>
          <h2
            id={`heading-${section.id}`}
            className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] font-semibold text-[#347FBF] tracking-tight"
          >
            {section.title}
          </h2>
          <p className="text-sm sm:text-base text-[#1E3348]/75">
            {section.subtitle}
          </p>
        </div>

        {/* Left & Right Arrow Navigation Controls */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-end">
          <button
            type="button"
            onClick={() => controllerRef.current?.slidePrev()}
            disabled={!sliderState.canPrev}
            aria-label={`Previous ${section.title}`}
            className={`w-11 h-11 rounded-full border inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF] ${
              sliderState.canPrev
                ? 'border-slate-300 text-[#347FBF] bg-white hover:border-[#087B68] hover:text-[#087B68] cursor-pointer shadow-2xs'
                : 'border-slate-200 text-slate-300 bg-slate-50/70 cursor-not-allowed opacity-55'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => controllerRef.current?.slideNext()}
            disabled={!sliderState.canNext}
            aria-label={`Next ${section.title}`}
            className={`w-11 h-11 rounded-full border inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF] ${
              sliderState.canNext
                ? 'border-slate-300 text-[#347FBF] bg-white hover:border-[#087B68] hover:text-[#087B68] cursor-pointer shadow-2xs'
                : 'border-slate-200 text-slate-300 bg-slate-50/70 cursor-not-allowed opacity-55'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Sliding Gallery Track */}
      <div
        ref={trackRef}
        className="tt-gallery-track pb-2"
        role="region"
        aria-label={`${section.title} sliding gallery`}
      >
        {items.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            shouldPreventClick={() =>
              Boolean(controllerRef.current?.wasDragged())
            }
          />
        ))}
      </div>

      {/* Subtle Progress Bar Indicator Below Gallery */}
      <div className="mt-6 flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex-1 h-[3px] bg-slate-200/80 rounded-full overflow-hidden"
        >
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${Math.max(14, sliderState.progress)}%`,
              background: 'linear-gradient(90deg, #347FBF 0%, #087B68 100%)',
            }}
          />
        </div>
        <span className="text-xs font-medium text-[#1E3348]/60 tabular-nums whitespace-nowrap">
          {items.length} Destinations
        </span>
      </div>
    </section>
  );
};

/* ============================================================================
   DESTINATIONS PAGE
   ============================================================================ */
export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  initialCategory = 'all',
}) => {
  useEffect(() => {
    if (initialCategory && initialCategory !== 'all') {
      const target = document.getElementById(`gallery-${initialCategory}`);
      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }
  }, [initialCategory]);

  const scrollToGallery = (categoryId: DestinationCategory) => {
    const target = document.getElementById(`gallery-${categoryId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="page-enter bg-white overflow-x-hidden">
      {/* =====================================================================
          EDITORIAL PAGE HEADER
      ===================================================================== */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16 bg-[#F5F8FC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="w-12 h-[2px] bg-[#EAB52A] mb-5" aria-hidden="true" />
            <h1
              className="font-display font-semibold text-[#347FBF] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)' }}
            >
              Find Your Next Escape
            </h1>
            <p className="text-base sm:text-lg text-[#1E3348]/80 leading-relaxed">
              From peaceful mountain retreats to unforgettable international
              adventures, discover places worth exploring.
            </p>
          </div>

          {/* Quick Jump Links to the Three Galleries */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {CATEGORY_SECTIONS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToGallery(cat.id)}
                className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 bg-white text-[#1E3348] hover:border-[#347FBF] hover:text-[#347FBF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THREE INDEPENDENT HORIZONTAL SLIDING GALLERIES
      ===================================================================== */}
      <div className="py-14 lg:py-20 space-y-20 lg:space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-24">
          {CATEGORY_SECTIONS.map((section) => {
            const sectionItems = DESTINATIONS.filter(
              (dest) => dest.category === section.id
            );
            return (
              <SlidingGallerySection
                key={section.id}
                section={section}
                items={sectionItems}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
