/*
 * ============================================================================
 * TRAVEL TRAILS — BRAND CONFIGURATION
 * Update contact numbers, email, office locations, or logo path here.
 * ============================================================================
 */

export type PageId = 'about' | 'destinations' | 'reviews' | 'contact';

export const BRAND_INFO = {
  name: 'Travel Trails',
  mantra: 'Experience the world better.',
  email: 'traveltrails.in@gmail.com',

  // Primary WhatsApp number (country code + digits, no '+' or spaces)
  whatsappNumber: '917510261442',

  phones: [
    {
      display: '+91 75102 61442',
      href: 'tel:+917510261442',
    },
    {
      display: '+91 90748 04709',
      href: 'tel:+919074804709',
    },
  ],

  locations: [
    {
      city: 'Bangalore',
      region: 'Karnataka, India',
      full: 'Bangalore, Karnataka, India',
      note: 'Bookings, Customised Itineraries & Group Departures',
      mapQuery: 'https://www.google.com/maps/search/?api=1&query=Bangalore+Karnataka+India',
    },
    {
      city: 'Payangadi',
      region: 'Kerala, India',
      full: 'Payangadi, Kerala, India',
      note: 'Resort Reservations, Kerala Escapes & Travel Advisory',
      mapQuery: 'https://www.google.com/maps/search/?api=1&query=Payangadi+Kerala+India',
    },
  ],

  founders: [
    {
      name: 'Basil Zaman Zakariya',
      role: 'Managing Director & Founder',
    },
    {
      name: 'Afrid Abdulla',
      role: 'General Manager & Co-Founder',
    },
  ],

  /*
   * To replace the brand emblem with your own logo file in Visual Studio Code:
   * 1. Save your logo inside /public/assets/logo.png (or /src/assets/logo.png)
   * 2. Set customLogoPath to '/assets/logo.png'
   */
  customLogoPath: '/assets/aistudio/Firefly_RemoveBackground_3c843c43.png',
} as const;

export const SITE_IMAGES = {
  heroMountains: '/src/assets/images/hero_scenic_mountains_1795256296249.jpg',
  foundersStory: '/assets/aistudio/Stylish_Duo_Outside_a_Sunlit_Cafe__ac2df098.png',
  teaHillsResort: '/src/assets/images/dest_tea_hills_resort_1795256296228.jpg',
  mistyLakeHills: '/src/assets/images/dest_misty_lake_hills_1795256296001.jpg',
  himalayanValley: '/src/assets/images/dest_himalayan_valley_1795256296033.jpg',
  alpineTrekPass: '/src/assets/images/dest_alpine_trek_pass_1795256296833.jpg',
  heritagePalace: '/src/assets/images/dest_heritage_palace_1795256295808.jpg',
  tropicalCoastKerala: '/src/assets/images/dest_tropical_coast_kerala_1795256295453.jpg',
  emeraldIslandsAsia: '/src/assets/images/dest_emerald_islands_asia_1795256297331.jpg',
  silkroadArchAzure: '/src/assets/images/dest_silkroad_arch_azure_1795256296667.jpg',
} as const;

/**
 * Helper to generate a pre-filled WhatsApp URL for any message.
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encoded}`;
}

/**
 * Exact WhatsApp enquiry template for destination cards.
 */
export function buildDestinationEnquiryUrl(destinationName: string): string {
  return buildWhatsAppUrl(
    `Hi Travel Trails! I'm interested in exploring ${destinationName}. Could you please share the available packages and details?`
  );
}

/**
 * Cancellation & Refund Policy terms displayed across Contact and Footer modal.
 */
export const CANCELLATION_POLICY = {
  title: 'Cancellation & Refund Policy',
  subtitle:
    'Please review our booking, rescheduling, and refund terms carefully before confirming your travel plans.',
  items: [
    'Any kind of cancellation is non-refundable.',
    'Date changes and resort changes are permitted, subject to availability.',
    'Any price difference due to date change must be paid by the customer.',
    'Refunds (if applicable) will be processed within 5–7 working days.',
  ],
} as const;
