/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AccommodationsShowcase } from './components/AccommodationsShowcase';
import { RVAndPetGuide } from './components/RVAndPetGuide';
import { RiverfrontExperience } from './components/RiverfrontExperience';
import { AmenitiesGrid } from './components/AmenitiesGrid';
import { ConciergeWidget } from './components/ConciergeWidget';
import { AuditComparisonModal } from './components/AuditComparisonModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { Footer } from './components/Footer';
import { Accommodation } from './data/propertyData';

export default function App() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergePrompt, setConciergePrompt] = useState<string | undefined>(undefined);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [bookingQuery, setBookingQuery] = useState<{
    checkIn: string;
    checkOut: string;
    type: string;
    guests: number;
    pets: boolean;
  }>({
    checkIn: '',
    checkOut: '',
    type: 'any',
    guests: 2,
    pets: false,
  });

  const [leads, setLeads] = useState<any[]>([
    {
      id: 'lead-1',
      name: 'Marcus & Sarah Vance',
      phone: '(505) 412-8930',
      checkIn: '2026-10-15',
      checkOut: '2026-10-19',
      partySize: 2,
      accommodationType: '50-Amp Pull-Through RV Site (38ft 5th wheel)',
      notes: 'Inquired about riverfront spot and 2 golden retrievers. Confirmed pet-friendly dog park.',
      capturedAt: '2026-10-02 21:40',
      source: 'ai_concierge',
    },
    {
      id: 'lead-2',
      name: 'Elena Rostova',
      phone: '(720) 889-1402',
      checkIn: '2026-10-22',
      checkOut: '2026-10-25',
      partySize: 4,
      accommodationType: '2-Bedroom Riverfront Cabin',
      notes: 'Wants to fly fish on the Red River right outside cabin deck.',
      capturedAt: '2026-10-02 18:15',
      source: 'booking_bar',
    },
  ]);

  // Fetch leads from backend on mount
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      })
      .catch((err) => console.log('Using local leads state:', err));
  }, []);

  const handleOpenConcierge = (prompt?: string) => {
    setConciergePrompt(prompt);
    setIsConciergeOpen(true);
  };

  const handleCheckAvailability = (query: {
    checkIn: string;
    checkOut: string;
    type: string;
    guests: number;
    pets: boolean;
  }) => {
    setBookingQuery(query);
    setIsBookingOpen(true);
  };

  const handleSelectAccommodation = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsBookingOpen(true);
  };

  const handleLeadCaptured = (newLead: any) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Header with 3-Zone Contract and Pitch Notification Banner */}
      <Header
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenBooking={() => {
          setSelectedAccommodation(null);
          setIsBookingOpen(true);
        }}
        leadCount={leads.length}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero with Mountain & Riverfront Visual and Booking Bar */}
        <Hero
          onCheckAvailability={handleCheckAvailability}
          onOpenConcierge={handleOpenConcierge}
        />

        {/* Accommodations Showcase (Cabins, RV sites, Camping) */}
        <AccommodationsShowcase
          onSelectAccommodation={handleSelectAccommodation}
          onAskConcierge={handleOpenConcierge}
        />

        {/* Detailed RV Hookup & Pet Rules Guide (Solves #1 guest confusion) */}
        <RVAndPetGuide onAskConcierge={handleOpenConcierge} />

        {/* Riverfront Trout Fishing & Location Experience */}
        <RiverfrontExperience onAskConcierge={handleOpenConcierge} />

        {/* Modern Amenities Grid */}
        <AmenitiesGrid />
      </main>

      {/* Clean Footer */}
      <Footer onOpenAudit={() => setIsAuditOpen(true)} />

      {/* The 24/7 AI Concierge Widget in the bottom corner */}
      <ConciergeWidget
        isOpen={isConciergeOpen}
        onToggle={() => setIsConciergeOpen(!isConciergeOpen)}
        externalPrompt={conciergePrompt}
        onLeadCaptured={handleLeadCaptured}
      />

      {/* Website Audit, Comparison & Pitch Video Helper Drawer */}
      <AuditComparisonModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        leads={leads}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Direct Booking & Dates Inquiry Modal */}
      <QuickInquiryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedAccommodation={selectedAccommodation}
        initialQuery={bookingQuery}
        onSuccess={handleLeadCaptured}
      />
    </div>
  );
}
