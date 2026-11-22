import React from 'react';
import {
  ArrowRight,
  ChevronDown,
  Trees,
  Mountain,
  Globe,
  Compass,
} from 'lucide-react';
import { BRAND_INFO, PageId, SITE_IMAGES } from '../config/brand';
import { DestinationCategory } from '../data/destinations';
import { TravelImage } from '../components/TravelImage';

interface AboutPageProps {
  onNavigate: (page: PageId, category?: DestinationCategory) => void;
}

const OFFERINGS: {
  index: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
  targetPage: PageId;
  targetCategory?: DestinationCategory;
}[] = [
  {
    index: '01',
    title: 'Resort Bookings',
    description:
      'Handpicked hillside retreats, plantation stays, and peaceful sanctuaries across South India’s finest valleys.',
    icon: Trees,
    targetPage: 'destinations',
    targetCategory: 'resort',
  },
  {
    index: '02',
    title: 'Domestic Tour Packages',
    description:
      'Seamless journeys spanning Himalayan passes, serene Kashmir valleys, coastal getaways, and royal heritage.',
    icon: Mountain,
    targetPage: 'destinations',
    targetCategory: 'domestic',
  },
  {
    index: '03',
    title: 'International Tour Packages',
    description:
      'Curated overseas holidays from Southeast Asian islands and coral atolls to historic Silk Road cities.',
    icon: Globe,
    targetPage: 'destinations',
    targetCategory: 'international',
  },
  {
    index: '04',
    title: 'Customised Travel Experiences',
    description:
      'Tailor-made itineraries shaped around your pace, group size, and personal travel aspirations.',
    icon: Compass,
    targetPage: 'contact',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const scrollToIntro = () => {
    const el = document.getElementById('brand-intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-enter">
      {/* =====================================================================
          HERO SECTION
      ===================================================================== */}
      <section className="relative min-h-[84vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#347FBF]">
        {/* Full-Width Cinematic Background Photography */}
        <div className="absolute inset-0">
          <TravelImage
            src={SITE_IMAGES.heroMountains}
            alt="Scenic winding mountain pass overlooking sunlit valleys at golden hour"
            className="w-full h-full"
            imgClassName="scale-[1.01]"
            fallbackTitle="Travel Trails"
          />
          {/* Measured Scrim for WCAG AA Contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#133859]/85 via-[#1C4D78]/50 to-[#133859]/30"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#EAB52A] mb-5">
            Bangalore &amp; Payangadi · Curated Travel Experiences
          </p>

          <h1
            className="font-display font-semibold tracking-tight leading-[1.1] text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)' }}
          >
            Experience the World Better.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/95 leading-relaxed mb-10">
            Discover beautiful destinations, unforgettable journeys, and experiences
            worth remembering. Let us turn your travel dreams into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('destinations')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB52A]"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-medium text-white border border-white/65 hover:bg-white/15 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Plan Your Journey
            </button>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToIntro}
          aria-label="Scroll to brand introduction"
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 inline-flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-2 py-1"
        >
          <span className="text-[11px] tracking-[0.18em] uppercase font-medium">
            Discover
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      {/* =====================================================================
          BRAND INTRODUCTION
      ===================================================================== */}
      <section
        id="brand-intro"
        className="py-20 lg:py-28 bg-white border-b border-slate-100"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            aria-hidden="true"
            className="w-12 h-[2px] bg-[#EAB52A] mx-auto mb-6"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#347FBF] tracking-tight mb-8">
            More Than Just a Journey
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#1E3348]/85 leading-[1.75] max-w-3xl mx-auto">
            <p>
              At Travel Trails, we believe every journey has a story waiting to
              unfold. From peaceful hill stations and breathtaking mountain escapes
              to exciting international adventures, we help travellers discover the
              world in a better way.
            </p>
            <p className="font-medium text-[#1E3348]">
              Our goal is simple: to make every trip meaningful, memorable, and
              hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOUNDERS' STORY (Split Layout + Separate Founder Profiles)
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Side: Editorial Photograph */}
            <div className="lg:col-span-5">
              <div className="h-full min-h-[440px] sm:min-h-[540px] rounded-xl overflow-hidden shadow-sm border border-slate-200/70">
                <TravelImage
                  src={SITE_IMAGES.foundersStory}
                  alt="Travel Trails co-founders Basil Zaman Zakariya and Afrid Abdulla standing together outside a sunlit cafe"
                  objectPosition="center 20%"
                  className="w-full h-full"
                  fallbackTitle="Friendship & Discovery"
                />
              </div>
            </div>

            {/* Right Side: Complete Founders' Story */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68] mb-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#347FBF] tracking-tight mb-7">
                From College Friends to Travel Partners
              </h2>

              <div className="space-y-4 text-[15.5px] sm:text-base text-[#1E3348]/85 leading-[1.75]">
                <p className="font-medium text-[#1E3348]">
                  It started with a friendship. It grew into a passion. And
                  eventually, it became a journey worth sharing.
                </p>
                <p>
                  Two college friends who shared countless memories, spontaneous
                  plans, road trips, and a love for discovering new places decided
                  to turn their passion for travelling into something bigger.
                </p>
                <p>
                  What started as conversations about dream destinations and weekend
                  getaways gradually became an idea: to help others experience the
                  same joy, excitement, and unforgettable memories that travel had
                  brought into their lives.
                </p>
                <p>
                  Today, that friendship has grown into a travel agency built on a
                  simple belief: every journey deserves to be special.
                </p>
                <p>
                  We don&apos;t just plan trips. We create experiences, bring people
                  closer, and turn dream destinations into beautiful memories.
                </p>
              </div>

              {/* Founders Displayed Separately */}
              <div className="mt-10 pt-8 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BRAND_INFO.founders.map((founder) => (
                  <div
                    key={founder.name}
                    className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(52,127,191,0.05)]"
                  >
                    <div
                      aria-hidden="true"
                      className="w-8 h-[2px] bg-[#EAB52A] mb-3.5"
                    />
                    <h3 className="font-display text-xl font-semibold text-[#347FBF]">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#087B68] font-medium">
                      {founder.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          WHAT WE OFFER (Four Minimal Service Cards)
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68] mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#347FBF] tracking-tight">
              Journeys Designed Around You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERINGS.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() =>
                    onNavigate(service.targetPage, service.targetCategory)
                  }
                  className="group text-left bg-white rounded-xl p-7 border border-slate-200/90 hover:border-[#347FBF]/50 hover:-translate-y-1 transition-all duration-200 shadow-[0_2px_12px_rgba(52,127,191,0.04)] hover:shadow-[0_10px_28px_rgba(52,127,191,0.1)] flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#F5F8FC] text-[#347FBF] group-hover:bg-[#087B68] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </span>
                      <span className="text-xs font-medium text-[#1E3348]/45 tabular-nums">
                        {service.index}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#1E3348] mb-3 group-hover:text-[#347FBF] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#1E3348]/75 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#087B68]">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CALL TO ACTION
      ===================================================================== */}
      <section className="py-20 lg:py-24 bg-[#F5F8FC] border-t border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#347FBF] tracking-tight mb-4">
            Your Next Adventure Starts Here.
          </h2>
          <p className="text-base sm:text-lg text-[#1E3348]/80 mb-9 max-w-xl mx-auto">
            Tell us where you want to go. We&apos;ll help you get there.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
