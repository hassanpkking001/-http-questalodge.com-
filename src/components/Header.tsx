import React, { useState } from 'react';
import { Phone, Sparkles, Menu, X, CheckCircle } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

interface HeaderProps {
  onOpenAudit: () => void;
  onOpenBooking: () => void;
  leadCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAudit, onOpenBooking, leadCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Pitch & Audit Ribbon Notice for Developer / Lodge demo */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium text-emerald-400">Live Client Pitch Prototype:</span>
            <span className="text-stone-300 truncate">
              Redesigned for Questa Lodge & RV Resort (questalodge.com) with 24/7 AI Concierge
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAudit}
              className="text-amber-400 hover:text-amber-300 underline font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Review Website Audit & Video Script</span>
              {leadCount > 0 && (
                <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded text-[11px] font-mono">
                  {leadCount} leads
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-stone-800 transition-colors shrink-0"
        >
          Questa Lodge &amp; RV Resort
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#accommodations"
            className="hover:text-amber-800 transition-colors py-1"
          >
            Cabins &amp; Chalets
          </a>
          <a
            href="#rv-sites"
            className="hover:text-amber-800 transition-colors py-1"
          >
            RV Sites &amp; Hookups
          </a>
          <a
            href="#pet-policy"
            className="hover:text-amber-800 transition-colors py-1"
          >
            Pet Policy
          </a>
          <a
            href="#river-experience"
            className="hover:text-amber-800 transition-colors py-1"
          >
            Red River &amp; Trout Fishing
          </a>
          <a
            href="#amenities"
            className="hover:text-amber-800 transition-colors py-1"
          >
            Resort Amenities
          </a>
          <a
            href="#location"
            className="hover:text-amber-800 transition-colors py-1"
          >
            Location
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-950 px-3 py-2 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
            title="Call Questa Lodge office"
          >
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span className="font-mono">{PROPERTY_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer active:scale-[0.98]"
          >
            Check Dates / Reserve
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <a
              href="#accommodations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              Cabins &amp; Chalets
            </a>
            <a
              href="#rv-sites"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              RV Sites &amp; Hookups
            </a>
            <a
              href="#pet-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              Pet Policy
            </a>
            <a
              href="#river-experience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              Red River &amp; Trout Fishing
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              Resort Amenities
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-stone-100"
            >
              Location &amp; Directions
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-stone-800 border border-stone-300 rounded-lg hover:bg-stone-50"
            >
              <Phone className="w-4 h-4 text-amber-800" />
              <span>Call Us: {PROPERTY_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Open Website Audit &amp; Pitch Tool</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
