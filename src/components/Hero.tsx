import React, { useState } from 'react';
import { Calendar, Users, MapPin, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/images/hero_questa_lodge_1791008211653.jpg';
import { PROPERTY_INFO } from '../data/propertyData';

interface HeroProps {
  onCheckAvailability: (query: { checkIn: string; checkOut: string; type: string; guests: number; pets: boolean }) => void;
  onOpenConcierge: (initialPrompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability, onOpenConcierge }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [type, setType] = useState('any');
  const [guests, setGuests] = useState(2);
  const [pets, setPets] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      type,
      guests,
      pets,
    });
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Questa Lodge timber cabins and RV resort nestled along the Red River beneath pine-covered mountains"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-amber-200/90 mb-4">
            <span>Questa, New Mexico</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Elev. {PROPERTY_INFO.elevation}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Enchanted Circle Scenic Byway</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Direct Red River Trout Access</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 [text-wrap:balance]">
            Where the Red River Meets the Sangre de Cristo Pines.
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl font-normal">
            Escape to an authentic mountain retreat along Northern New Mexico’s premier trout waters. 
            Featuring rustic timber cabins with fully equipped kitchens, spacious 30 &amp; 50-amp full hookup RV sites, and true riverfront serenity between Taos and Red River.
          </p>

          {/* Quick Value Proof Strip (Unboxed metadata) */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-300 mb-10 pb-6 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free Pet Policy (2 Pets Stay Free)</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Pull-Throughs Up to 45ft+</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <span>High-Speed Wi-Fi &amp; Bathhouse</span>
            </div>
          </div>
        </div>

        {/* Real Interactive Booking & Availability Search Bar */}
        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 text-stone-900 max-w-4xl border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check-In Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Check-In
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-sm font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800 bg-stone-50"
                  />
                </div>
              </div>

              {/* Check-Out Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Check-Out
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800 bg-stone-50"
                  />
                </div>
              </div>

              {/* Stay Type */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Accommodation
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full text-sm font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800 bg-stone-50"
                >
                  <option value="any">All Accommodations</option>
                  <option value="rv-50">50-Amp Full Hookup RV Site</option>
                  <option value="rv-30">30-Amp Full Hookup RV Site</option>
                  <option value="cabin-2br">2-Bedroom Riverfront Cabin</option>
                  <option value="cabin-1br">1-Bedroom Pine Cabin</option>
                  <option value="cabin-studio">Studio Angler Cabin (No Pets)</option>
                  <option value="tent">Riverbank Tent Camping</option>
                </select>
              </div>

              {/* Guests & Pets */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                  Guests &amp; Pets
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-1/2 text-sm font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800 bg-stone-50"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6+ Guests</option>
                  </select>

                  <label className="w-1/2 flex items-center justify-center gap-1.5 text-xs font-medium text-stone-700 py-2.5 px-2 bg-stone-100 rounded-lg border border-stone-200 cursor-pointer select-none hover:bg-stone-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={pets}
                      onChange={(e) => setPets(e.target.checked)}
                      className="rounded text-amber-800 focus:ring-amber-800"
                    />
                    <span>Bringing Pets</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-100">
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                <span>24/7 Instant Confirmation &amp; Priority Hold Available</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenConcierge('I have specific travel dates and want to verify availability for an RV or cabin.')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Ask 24/7 AI Concierge
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors cursor-pointer active:scale-[0.98]"
                >
                  Check Availability &amp; Rates
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
