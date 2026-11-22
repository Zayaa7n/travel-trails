/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { PageId } from './config/brand';
import { DestinationCategory } from './data/destinations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { WhatsAppFloatingButton } from './components/WhatsAppButton';
import { AboutPage } from './pages/AboutPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = ['about', 'destinations', 'reviews', 'contact'];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace('#', '').toLowerCase() as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'about';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [destinationFilter, setDestinationFilter] = useState<
    DestinationCategory | 'all'
  >('all');
  const [prefilledDestination, setPrefilledDestination] = useState<string>('');

  // Sync with browser Back / Forward buttons
  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Navigate to any of the 4 main pages
  const handleNavigate = useCallback(
    (page: PageId, category?: DestinationCategory) => {
      if (page === 'destinations') {
        setDestinationFilter(category ?? 'all');
      }
      if (page !== 'contact') {
        setPrefilledDestination('');
      }

      setCurrentPage(page);
      window.location.hash = page === 'about' ? '' : page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Jump from a destination card directly to Contact form with destination pre-filled
  const handlePlanCustomTrip = useCallback((destinationName: string) => {
    setPrefilledDestination(destinationName);
    setCurrentPage('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E3348]">
      <LoadingScreen />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'destinations' && (
          <DestinationsPage
            initialCategory={destinationFilter}
            onPlanCustomTrip={handlePlanCustomTrip}
          />
        )}
        {currentPage === 'reviews' && <ReviewsPage />}
        {currentPage === 'contact' && (
          <ContactPage prefilledDestination={prefilledDestination} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppFloatingButton />
    </div>
  );
}
