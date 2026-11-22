import React, { useState } from 'react';
import { Star, Quote, MessageSquarePlus, X, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO, buildWhatsAppUrl } from '../config/brand';

interface PlaceholderSlot {
  id: string;
  label: string;
  category: string;
  promptNote: string;
}

/*
 * ============================================================================
 * TRAVELLER REVIEWS PLACEHOLDERS
 * Replace these placeholder slots with verified guest testimonials as they
 * arrive. No fabricated reviews or invented customer names are used here.
 * ============================================================================
 */
const PLACEHOLDER_SLOTS: PlaceholderSlot[] = [
  {
    id: 'slot-01',
    label: 'Traveller Story · Slot 01',
    category: 'Resort Stays · Western Ghats',
    promptNote:
      'Reserved for verified guest feedback from our Wayanad, Munnar, Kodaikanal, and Vagamon resort escapes.',
  },
  {
    id: 'slot-02',
    label: 'Traveller Story · Slot 02',
    category: 'Domestic Packages · India',
    promptNote:
      'Reserved for authentic stories from travellers exploring Kashmir, Manali, Spiti Valley, Ladakh, Kerala, and Rajasthan.',
  },
  {
    id: 'slot-03',
    label: 'Traveller Story · Slot 03',
    category: 'International Journeys',
    promptNote:
      'Reserved for genuine reflections from our international holidays across Bali, Vietnam, Maldives, Azerbaijan, and Uzbekistan.',
  },
];

export const ReviewsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [story, setStory] = useState('');
  const [error, setError] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !story.trim()) {
      setError('Please enter your name and share a few words about your journey.');
      return;
    }

    setError('');
    const message = [
      'Hi Travel Trails! Here is my travel review:',
      `Name: ${guestName.trim()}`,
      destination.trim() ? `Destination Visited: ${destination.trim()}` : '',
      `Rating: ${rating} / 5 Stars`,
      `Experience: ${story.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = buildWhatsAppUrl(message);
    setSubmittedUrl(url);
  };

  const resetModal = () => {
    setModalOpen(false);
    setSubmittedUrl(null);
    setError('');
  };

  return (
    <div className="page-enter bg-white">
      {/* =====================================================================
          PAGE HEADER
      ===================================================================== */}
      <section className="pt-16 pb-14 lg:pt-24 lg:pb-18 bg-[#F5F8FC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68] mb-3">
              Guest Reflections
            </p>
            <h1
              className="font-display font-semibold text-[#347FBF] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
            >
              Stories from Our Travellers
            </h1>
            <p className="text-base sm:text-lg text-[#1E3348]/80 leading-relaxed">
              Every journey leaves a memory. Here&apos;s where those memories live.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PLACEHOLDER REVIEW CARDS (No Fabricated Testimonials)
      ===================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#347FBF] mb-2">
                Verified Stories Coming Soon
              </h2>
              <p className="text-sm sm:text-base text-[#1E3348]/75 max-w-2xl">
                We only publish real experiences shared directly by our guests. As
                travellers return and submit their reflections, their stories will
                be featured in the spaces below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {PLACEHOLDER_SLOTS.map((slot) => (
              <article
                key={slot.id}
                className="rounded-xl border border-dashed border-slate-300 bg-[#F5F8FC]/80 p-7 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#347FBF]/60"
              >
                <div>
                  {/* 5-Star Visual Display */}
                  <div
                    className="flex items-center gap-1 mb-5"
                    aria-label="5 star rating display"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-[#EAB52A]"
                        strokeWidth={1.75}
                      />
                    ))}
                  </div>

                  <Quote
                    className="w-7 h-7 text-[#347FBF]/20 mb-4"
                    aria-hidden="true"
                  />

                  <p className="text-[15px] text-[#1E3348]/80 leading-relaxed italic">
                    &ldquo;{slot.promptNote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/80">
                  <p className="font-display text-lg font-medium text-[#347FBF]">
                    {slot.label}
                  </p>
                  <p className="text-xs font-medium text-[#087B68] mt-1">
                    {slot.category}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SHARE YOUR EXPERIENCE SECTION
      ===================================================================== */}
      <section className="py-18 lg:py-24 bg-[#F5F8FC] border-t border-slate-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            aria-hidden="true"
            className="w-12 h-[2px] bg-[#EAB52A] mx-auto mb-6"
          />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#347FBF] tracking-tight mb-4">
            Have You Travelled With Us?
          </h2>
          <p className="text-base sm:text-lg text-[#1E3348]/80 leading-relaxed mb-8">
            Your experience means everything to us. Share your journey and help
            others discover Travel Trails.
          </p>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>
      </section>

      {/* =====================================================================
          SHARE EXPERIENCE MODAL
      ===================================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E3348]/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-experience-title"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative">
            <button
              type="button"
              onClick={resetModal}
              aria-label="Close review form"
              className="absolute right-4 top-4 p-2 rounded-lg text-[#1E3348]/60 hover:text-[#1E3348] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              id="share-experience-title"
              className="font-display text-2xl font-semibold text-[#347FBF] mb-2"
            >
              Share Your Journey
            </h3>
            <p className="text-sm text-[#1E3348]/75 mb-6">
              Send your story directly to our team so we can feature your genuine
              travel experience.
            </p>

            {submittedUrl ? (
              <div className="py-4 space-y-5">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#087B68]/10 text-[#1E3348]">
                  <CheckCircle2 className="w-5 h-5 text-[#087B68] shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Thank you for sharing!</p>
                    <p className="text-[#1E3348]/80">
                      Click below to send your review directly via WhatsApp or email
                      us at {BRAND_INFO.email}.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 px-5 text-sm font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors"
                  >
                    Send via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="py-3 px-5 text-sm font-medium text-[#1E3348] border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="space-y-4">
                <div>
                  <label
                    htmlFor="review-name"
                    className="block text-xs font-medium text-[#1E3348] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg text-[#1E3348] focus:outline-none focus:border-[#347FBF] focus:ring-2 focus:ring-[#347FBF]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-destination"
                    className="block text-xs font-medium text-[#1E3348] mb-1.5"
                  >
                    Destination Visited
                  </label>
                  <input
                    id="review-destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Munnar, Ladakh, Vietnam"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg text-[#1E3348] focus:outline-none focus:border-[#347FBF] focus:ring-2 focus:ring-[#347FBF]/15"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#1E3348] mb-1.5">
                    Rating
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        aria-label={`Rate ${num} out of 5 stars`}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            num <= rating
                              ? 'text-[#EAB52A] fill-[#EAB52A]'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review-story"
                    className="block text-xs font-medium text-[#1E3348] mb-1.5"
                  >
                    Your Experience *
                  </label>
                  <textarea
                    id="review-story"
                    rows={4}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Tell us about your favourite moments from the trip..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg text-[#1E3348] focus:outline-none focus:border-[#347FBF] focus:ring-2 focus:ring-[#347FBF]/15"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-red-600">
                    {error}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2.5 text-sm font-medium text-[#1E3348]/75 hover:text-[#1E3348] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors cursor-pointer"
                  >
                    Prepare Story
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
