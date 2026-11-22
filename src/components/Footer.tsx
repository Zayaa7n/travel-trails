import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, X } from 'lucide-react';
import {
  BRAND_INFO,
  CANCELLATION_POLICY,
  PageId,
  buildWhatsAppUrl,
} from '../config/brand';
import { CATEGORY_SECTIONS, DestinationCategory } from '../data/destinations';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppButton';

interface FooterProps {
  onNavigate: (page: PageId, category?: DestinationCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#347FBF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB52A] rounded-md"
                aria-label="Travel Trails Home"
              >
                <BrandLogo variant="light" />
              </button>
              <p className="font-display text-lg text-[#EAB52A] tracking-wide">
                {BRAND_INFO.mantra}
              </p>
              <p className="text-sm text-white/90 leading-relaxed max-w-sm">
                Thoughtfully crafted domestic holidays, hill-station resort stays,
                and international journeys curated with personal care.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-white/80">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('destinations')}
                    className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer"
                  >
                    Destinations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('reviews')}
                    className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer"
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Destination Categories */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-white/80">
                Destination Categories
              </h3>
              <ul className="space-y-3 text-sm">
                {CATEGORY_SECTIONS.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate('destinations', cat.id)}
                      className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer text-left"
                    >
                      {cat.title}
                    </button>
                  </li>
                ))}
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() => setPolicyModalOpen(true)}
                    className="text-white/95 hover:text-[#EAB52A] transition-colors cursor-pointer text-left underline underline-offset-4 decoration-white/40 hover:decoration-[#EAB52A]"
                  >
                    Cancellation &amp; Refund Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contact Details */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-white/80">
                Get in Touch
              </h3>
              <ul className="space-y-3.5 text-sm text-white/95">
                {BRAND_INFO.phones.map((phone) => (
                  <li key={phone.display}>
                    <a
                      href={phone.href}
                      className="inline-flex items-center gap-2.5 hover:text-[#EAB52A] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#EAB52A] shrink-0" />
                      <span>{phone.display}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={buildWhatsAppUrl(
                      "Hi Travel Trails! I'd like to enquire about planning a trip."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-[#EAB52A] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#EAB52A] shrink-0" />
                    <span>WhatsApp Chat</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="inline-flex items-center gap-2.5 hover:text-[#EAB52A] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#EAB52A] shrink-0" />
                    <span>{BRAND_INFO.email}</span>
                  </a>
                </li>
                <li className="pt-1 flex items-start gap-2.5 text-white/90">
                  <MapPin className="w-4 h-4 text-[#EAB52A] shrink-0 mt-0.5" />
                  <span>Bangalore, Karnataka &amp; Payangadi, Kerala</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Policy Divider */}
          <div className="mt-14 pt-8 border-t border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90">
            <p>© 2026 Travel Trails. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setPolicyModalOpen(true)}
                className="hover:text-[#EAB52A] transition-colors cursor-pointer underline underline-offset-4 decoration-white/40"
              >
                Cancellation &amp; Refund Policy
              </button>
              <span aria-hidden="true" className="text-white/50">
                ·
              </span>
              <span>Bangalore · Payangadi</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          CANCELLATION & REFUND POLICY MODAL (Accessible from any page)
      ===================================================================== */}
      {policyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E3348]/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative text-[#1E3348]">
            <button
              type="button"
              onClick={() => setPolicyModalOpen(false)}
              aria-label="Close policy dialog"
              className="absolute right-4 top-4 p-2 rounded-lg text-[#1E3348]/60 hover:text-[#1E3348] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#087B68] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Booking Terms</span>
            </div>

            <h2
              id="policy-modal-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#347FBF] mb-2"
            >
              {CANCELLATION_POLICY.title}
            </h2>
            <p className="text-sm text-[#1E3348]/75 mb-6">
              {CANCELLATION_POLICY.subtitle}
            </p>

            <ul className="space-y-3.5 mb-7">
              {CANCELLATION_POLICY.items.map((rule, index) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F8FC] border border-slate-200/80 text-sm text-[#1E3348] leading-relaxed"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#347FBF]/12 text-[#347FBF] text-xs font-semibold tabular-nums shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPolicyModalOpen(false)}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
