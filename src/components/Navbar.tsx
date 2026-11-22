import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../config/brand';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo (links to About / Home) */}
        <button
          type="button"
          onClick={() => handleLinkClick('about')}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF] rounded-md py-1 cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Travel Trails Home"
        >
          <BrandLogo variant="dark" />
        </button>

        {/* Zone 2: Primary Text Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-2 text-[15px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF] rounded-sm ${
                  isActive
                    ? 'text-[#347FBF]'
                    : 'text-[#1E3348]/80 hover:text-[#347FBF]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition-transform duration-200 origin-left ${
                    isActive
                      ? 'bg-[#347FBF] scale-x-100'
                      : 'bg-[#347FBF]/60 scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action CTA */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
          >
            Plan Your Trip
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#347FBF] hover:bg-[#F5F8FC] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347FBF]"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-2">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F5F8FC] text-[#347FBF]'
                      : 'text-[#1E3348] hover:bg-[#F5F8FC]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 px-5 text-sm font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors cursor-pointer"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
