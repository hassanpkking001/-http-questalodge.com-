import React from 'react';
import riverFishingImg from '../assets/images/lodge_river_fishing_1791008260070.jpg';
import { Waves, Fish, Compass, Mountain, MapPin, Sparkles, Check } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

interface RiverfrontExperienceProps {
  onAskConcierge: (prompt: string) => void;
}

export const RiverfrontExperience: React.FC<RiverfrontExperienceProps> = ({ onAskConcierge }) => {
  return (
    <section id="river-experience" className="py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            <span>The Natural Setting</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Direct Riverfront Access</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4 [text-wrap:balance]">
            Fly Fishing &amp; Mountain Serenity Along the Red River
          </h2>

          <p className="text-base text-stone-600 leading-relaxed font-normal">
            Questa Lodge sits directly along the tranquil banks of the Red River. Step outside with your rod, listen to the tumbling water over river stones, and enjoy genuine northern New Mexico solitude.
          </p>
        </div>

        {/* Riverfront Feature Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg border border-stone-200 relative aspect-16/10">
            <img
              src={riverFishingImg}
              alt="Clear Red River flowing through pine forest near Questa Lodge cabins"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-300 mb-1">
                Private Water Access
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold">
                Rainbow &amp; German Brown Trout Right Outside Your Door
              </h3>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-base">
                <Fish className="w-5 h-5 text-amber-800" />
                <span>Premier Trout Fishing</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Cast your line right from the lodge riverbank or stroll our private wooded footpaths. A standard New Mexico fishing license is required (easily purchased online via NM Game &amp; Fish).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-base">
                <Waves className="w-5 h-5 text-amber-800" />
                <span>Wooded River Walk &amp; Footbridges</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Take quiet morning walks under ponderosa pines, across scenic wooden footbridges, and relax at riverside seating benches with the soothing sound of rushing mountain water.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-base">
                <Mountain className="w-5 h-5 text-amber-800" />
                <span>Enchanted Circle Location</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Convenient basecamp for day trips to Wild Rivers Recreation Area (Rio Grande Gorge confluence), Taos Ski Valley &amp; Pueblo, and Red River ski resort.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Drive Times Strip */}
        <div id="location" className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-white">
          <div className="max-w-3xl mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gateway to Northern New Mexico</span>
            </div>
            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold">
              Centrally Located on the Enchanted Circle Byway
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2">
              Address: <strong>{PROPERTY_INFO.address}</strong> · Minutes from top hiking, skiing, rafting, and historic landmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800 text-xs sm:text-sm">
            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
              <div className="text-stone-400 text-xs">Wild Rivers (Rio Grande)</div>
              <div className="font-bold text-white text-base mt-0.5">15 Minutes</div>
              <div className="text-[11px] text-stone-400">800ft deep river canyon</div>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
              <div className="text-stone-400 text-xs">Red River Ski Area</div>
              <div className="font-bold text-white text-base mt-0.5">12 Miles</div>
              <div className="text-[11px] text-stone-400">Skiing, dining, chairlifts</div>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
              <div className="text-stone-400 text-xs">Taos Historic Plaza</div>
              <div className="font-bold text-white text-base mt-0.5">24 Miles</div>
              <div className="text-[11px] text-stone-400">Art galleries &amp; culture</div>
            </div>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
              <div className="text-stone-400 text-xs">Eagle Rock Lake</div>
              <div className="font-bold text-white text-base mt-0.5">5 Minutes</div>
              <div className="text-[11px] text-stone-400">Family trout pond &amp; picnics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
