import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_INFO, CANCELLATION_POLICY, buildWhatsAppUrl } from '../config/brand';

interface ContactPageProps {
  prefilledDestination?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  travellers: string;
  travelDate: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  destination?: string;
  travellers?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledDestination = '',
}) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    destination: prefilledDestination,
    travellers: '',
    travelDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (prefilledDestination) {
      setForm((prev) => ({ ...prev, destination: prefilledDestination }));
    }
  }, [prefilledDestination]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const cleanedPhone = form.phone.replace(/[\s\-+()]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 7 || !/^\d+$/.test(cleanedPhone)) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.destination.trim()) {
      nextErrors.destination = 'Please enter a destination you are interested in.';
    }

    const travellerCount = Number(form.travellers);
    if (!form.travellers.trim() || Number.isNaN(travellerCount) || travellerCount < 1) {
      nextErrors.travellers = 'Please specify at least 1 traveller.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const compiledMessage = [
      'Hi Travel Trails! I would like to plan a trip.',
      '',
      `Full Name: ${form.fullName.trim()}`,
      `Phone Number: ${form.phone.trim()}`,
      `Email Address: ${form.email.trim()}`,
      `Destination Interested In: ${form.destination.trim()}`,
      `Number of Travellers: ${form.travellers.trim()}`,
      form.travelDate ? `Preferred Travel Date: ${form.travelDate}` : '',
      form.message.trim() ? `Message: ${form.message.trim()}` : '',
    ]
      .filter((line) => line !== '')
      .join('\n');

    const whatsappUrl = buildWhatsAppUrl(compiledMessage);
    setSubmittedWhatsAppUrl(whatsappUrl);

    // Open WhatsApp via a temporary anchor click (avoids window.open blocks)
    const tempLink = document.createElement('a');
    tempLink.href = whatsappUrl;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener noreferrer';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
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
              Plan With Us
            </p>
            <h1
              className="font-display font-semibold text-[#347FBF] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
            >
              Let&apos;s Plan Your Next Journey
            </h1>
            <p className="text-base sm:text-lg text-[#1E3348]/80 leading-relaxed">
              Have a destination in mind? Let&apos;s make it happen.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CONTACT INFO + ENQUIRY FORM SPLIT
      ===================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Direct Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#347FBF] mb-3">
                  {BRAND_INFO.name}
                </h2>
                <p className="text-sm sm:text-base text-[#1E3348]/75 leading-relaxed">
                  Reach out directly by phone, email, or WhatsApp. Our team in
                  Bangalore and Payangadi will respond promptly to shape your trip.
                </p>
              </div>

              {/* Click-to-Call Phone Numbers */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1E3348]/60">
                  Call Us
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {BRAND_INFO.phones.map((phone) => (
                    <a
                      key={phone.display}
                      href={phone.href}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200/90 bg-white hover:border-[#347FBF]/60 hover:bg-[#F5F8FC] transition-colors group"
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="w-10 h-10 rounded-lg bg-[#F5F8FC] group-hover:bg-[#347FBF] text-[#347FBF] group-hover:text-white inline-flex items-center justify-center transition-colors">
                          <Phone className="w-4 h-4" />
                        </span>
                        <span className="font-medium text-[#1E3348] tabular-nums">
                          {phone.display}
                        </span>
                      </span>
                      <span className="text-xs font-medium text-[#087B68]">
                        Tap to call
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Click-to-Email */}
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#1E3348]/60">
                  Email Us
                </p>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200/90 bg-white hover:border-[#347FBF]/60 hover:bg-[#F5F8FC] transition-colors group"
                >
                  <span className="inline-flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-lg bg-[#F5F8FC] group-hover:bg-[#347FBF] text-[#347FBF] group-hover:text-white inline-flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="font-medium text-[#1E3348] truncate">
                      {BRAND_INFO.email}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-[#087B68] shrink-0 ml-2">
                    Send mail
                  </span>
                </a>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl(
                    'Hi Travel Trails! I would like to discuss planning a trip.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#347FBF] hover:bg-[#28689E] rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#EAB52A]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Validated Contact Form */}
            <div className="lg:col-span-7 bg-[#F5F8FC] rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#347FBF] mb-2">
                Send a Travel Enquiry
              </h2>
              <p className="text-sm text-[#1E3348]/75 mb-7">
                Share your travel preferences below. Submitting prepares your details
                directly in WhatsApp for a fast response.
              </p>

              {submittedWhatsAppUrl && (
                <div
                  role="status"
                  className="mb-7 p-5 rounded-xl bg-white border border-[#087B68]/30 shadow-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#087B68] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1E3348] text-sm">
                        Your enquiry is ready in WhatsApp
                      </p>
                      <p className="text-xs text-[#1E3348]/75 mt-1">
                        If WhatsApp did not open automatically, click the button
                        below to send your pre-filled message.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={submittedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedWhatsAppUrl(null)}
                      className="text-xs font-medium text-[#1E3348]/75 hover:text-[#1E3348] cursor-pointer"
                    >
                      Edit details
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-[#1E3348] focus:outline-none focus:ring-2 transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-slate-200 focus:border-[#347FBF] focus:ring-[#347FBF]/15'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-[#1E3348] focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-slate-200 focus:border-[#347FBF] focus:ring-[#347FBF]/15'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-[#1E3348] focus:outline-none focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-slate-200 focus:border-[#347FBF] focus:ring-[#347FBF]/15'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Destination Interested In */}
                  <div>
                    <label
                      htmlFor="contact-destination"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Destination Interested In *
                    </label>
                    <input
                      id="contact-destination"
                      type="text"
                      value={form.destination}
                      onChange={(e) => updateField('destination', e.target.value)}
                      placeholder="e.g., Munnar, Ladakh, Bali"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-[#1E3348] focus:outline-none focus:ring-2 transition-colors ${
                        errors.destination
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-slate-200 focus:border-[#347FBF] focus:ring-[#347FBF]/15'
                      }`}
                    />
                    {errors.destination && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.destination}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Number of Travellers */}
                  <div>
                    <label
                      htmlFor="contact-travellers"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Number of Travellers *
                    </label>
                    <input
                      id="contact-travellers"
                      type="number"
                      min={1}
                      value={form.travellers}
                      onChange={(e) => updateField('travellers', e.target.value)}
                      placeholder="2"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-[#1E3348] tabular-nums focus:outline-none focus:ring-2 transition-colors ${
                        errors.travellers
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15'
                          : 'border-slate-200 focus:border-[#347FBF] focus:ring-[#347FBF]/15'
                      }`}
                    />
                    {errors.travellers && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.travellers}</span>
                      </p>
                    )}
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                    >
                      Travel Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={form.travelDate}
                      onChange={(e) => updateField('travelDate', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg text-[#1E3348] focus:outline-none focus:border-[#347FBF] focus:ring-2 focus:ring-[#347FBF]/15 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#1E3348] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Share any preferences, trip duration, or questions..."
                    className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg text-[#1E3348] focus:outline-none focus:border-[#347FBF] focus:ring-2 focus:ring-[#347FBF]/15 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-medium text-white bg-[#087B68] hover:bg-[#066354] rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087B68] focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CANCELLATION & REFUND POLICY
      ===================================================================== */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/90 bg-[#F5F8FC] p-7 sm:p-10">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68] mb-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Booking Terms</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#347FBF] tracking-tight mb-2">
                {CANCELLATION_POLICY.title}
              </h2>
              <p className="text-sm sm:text-base text-[#1E3348]/75">
                {CANCELLATION_POLICY.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CANCELLATION_POLICY.items.map((rule, index) => (
                <div
                  key={rule}
                  className="bg-white rounded-xl p-5 border border-slate-200/80 flex items-start gap-3.5"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#347FBF]/12 text-[#347FBF] text-xs font-semibold tabular-nums shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <p className="text-sm sm:text-[15px] text-[#1E3348] leading-relaxed font-medium">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LOCATIONS & GOOGLE MAPS INTEGRATION SPACE
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#F5F8FC] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#087B68] mb-3">
              Our Presence
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#347FBF] tracking-tight mb-3">
              Where to Find Us
            </h2>
            <p className="text-sm sm:text-base text-[#1E3348]/75">
              Serving travellers across Karnataka, Kerala, and beyond from our
              two hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAND_INFO.locations.map((loc) => (
              <div
                key={loc.city}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_2px_12px_rgba(52,127,191,0.05)] flex flex-col"
              >
                {/* Google Maps Embed Integration Space */}
                <div className="h-52 bg-gradient-to-br from-[#347FBF]/8 via-[#087B68]/10 to-[#EAB52A]/10 border-b border-slate-200/70 flex flex-col items-center justify-center p-6 text-center relative">
                  <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#087B68] mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="font-display text-xl font-semibold text-[#347FBF]">
                    {loc.city}, {loc.region}
                  </p>
                  <p className="text-xs text-[#1E3348]/65 mt-1 max-w-xs">
                    Space reserved for Google Maps iframe embed
                  </p>
                </div>

                {/* Location Card Footer */}
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1E3348]">
                      {loc.city}
                    </h3>
                    <p className="text-sm text-[#1E3348]/70 mt-0.5">{loc.note}</p>
                  </div>
                  <a
                    href={loc.mapQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#347FBF] bg-[#F5F8FC] hover:bg-[#347FBF]/10 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
