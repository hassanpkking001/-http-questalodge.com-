import React, { useState } from 'react';
import { ACCOMMODATIONS, Accommodation } from '../data/propertyData';
import { Users, Wifi, Utensils, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface AccommodationsShowcaseProps {
  onSelectAccommodation: (accommodation: Accommodation) => void;
  onAskConcierge: (prompt: string) => void;
}

export const AccommodationsShowcase: React.FC<AccommodationsShowcaseProps> = ({
  onSelectAccommodation,
  onAskConcierge,
}) => {
  const [filter, setFilter] = useState<'all' | 'cabin' | 'rv' | 'tent'>('all');

  const filteredAccommodations = ACCOMMODATIONS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="accommodations" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            <span>Riverfront Accommodations</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Questa, New Mexico</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4 [text-wrap:balance]">
            Rustic Mountain Cabins &amp; Full Hookup RV Sites
          </h2>

          <p className="text-base text-stone-600 leading-relaxed font-normal">
            Choose from fully appointed timber chalets with home kitchens, pull-through and back-in RV sites with steady 30/50-amp power, or shaded riverside camping right along the Red River.
          </p>
        </div>

        {/* Interactive Segmented Filter Control (Allowed functional tab buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl max-w-md mb-10 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Spaces ({ACCOMMODATIONS.length})
          </button>
          <button
            onClick={() => setFilter('cabin')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'cabin'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Cabins &amp; Chalets
          </button>
          <button
            onClick={() => setFilter('rv')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'rv'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            RV Sites (30/50A)
          </button>
          <button
            onClick={() => setFilter('tent')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'tent'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tent Camping
          </button>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Card Image Container with Resilient Fallback */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Price Display */}
                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div>
                    <span className="font-serif-heading text-2xl font-bold font-mono">
                      ${item.pricePerNight}
                    </span>
                    <span className="text-xs text-stone-300 ml-1">/ night</span>
                  </div>
                  <div className="text-xs text-stone-200 font-medium">
                    {item.capacity}
                  </div>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Unboxed Metadata Row (Zero-Pill Rule) */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-amber-800">
                      {item.category === 'cabin' ? 'Timber Cabin' : item.category === 'rv' ? 'RV Hookup' : 'Campsite'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.petFriendly ? 'Pet-Friendly' : 'Strictly Hypoallergenic'}</span>
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    Key Amenities:
                  </div>
                  <ul className="text-xs text-stone-600 space-y-1.5">
                    {item.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pet note banner */}
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{item.petNote || 'Standard resort policies apply'}</span>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectAccommodation(item)}
                    className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors text-center cursor-pointer active:scale-[0.98]"
                  >
                    Check Dates
                  </button>
                  <button
                    onClick={() => onAskConcierge(`Can you tell me more about booking the ${item.name} and what dates are available?`)}
                    className="py-2.5 px-3 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    title="Ask 24/7 AI Concierge about this unit"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
