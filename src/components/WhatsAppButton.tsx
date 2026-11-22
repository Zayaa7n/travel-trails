import React from 'react';
import { buildWhatsAppUrl } from '../config/brand';

interface WhatsAppIconProps {
  className?: string;
}

/**
 * Authentic WhatsApp vector mark
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path d="M16.004 3.2C8.947 3.2 3.2 8.947 3.2 16.004c0 2.256.592 4.46 1.716 6.404L3.092 29l6.758-1.773a12.75 12.75 0 0 0 6.154 1.577h.005c7.057 0 12.804-5.747 12.804-12.804C28.813 8.947 23.061 3.2 16.004 3.2Zm7.46 18.188c-.315.887-1.842 1.696-2.548 1.8-.651.097-1.475.138-2.382-.15-.548-.174-1.253-.407-2.154-.796-3.79-1.636-6.265-5.448-6.455-5.7-.19-.253-1.54-2.049-1.54-3.908 0-1.858.972-2.771 1.318-3.149.346-.378.755-.472 1.007-.472.252 0 .504.003.724.014.233.012.544-.088.851.649.315.755 1.07 2.613 1.164 2.802.095.189.158.41.032.662-.126.252-.189.41-.378.63-.189.22-.398.491-.567.66-.189.189-.386.394-.166.772.22.378.979 1.615 2.103 2.616 1.445 1.289 2.663 1.688 3.041 1.877.378.189.598.158.819-.095.22-.252.944-1.102 1.196-1.48.252-.378.504-.315.85-.189.346.126 2.203 1.039 2.581 1.228.378.189.63.284.724.441.095.158.095.913-.22 1.8Z" />
  </svg>
);

/**
 * Floating WhatsApp Quick-Contact Button
 * Always accessible across the website without interfering with page content.
 */
export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href={buildWhatsAppUrl(
        "Hi Travel Trails! I'd like to enquire about planning a trip."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Travel Trails on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1EB856] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
    </a>
  );
};
