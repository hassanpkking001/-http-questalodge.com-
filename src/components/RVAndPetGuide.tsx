import React from 'react';
import { Zap, Heart, Shield, Check, AlertCircle, Sparkles, Dog, HelpCircle } from 'lucide-react';

interface RVAndPetGuideProps {
  onAskConcierge: (question: string) => void;
}

export const RVAndPetGuide: React.FC<RVAndPetGuideProps> = ({ onAskConcierge }) => {
  return (
    <section id="rv-sites" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            <span>Guest Clarity Center</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>No Guesswork Required</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4 [text-wrap:balance]">
            RV Hookup Specs &amp; Transparent Pet Rules
          </h2>

          <p className="text-base text-stone-600 leading-relaxed font-normal">
            We know finding exact hookup dimensions and pet restrictions after hours can be frustrating. Here is everything you need to know before you roll in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* RV HOOKUP SPECS CARD */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800/10 flex items-center justify-center text-amber-900">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-stone-900">
                    RV Park &amp; Hookup Specifications
                  </h3>
                  <div className="text-xs text-stone-500">
                    30-Amp &amp; 50-Amp Full Service
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>50-Amp &amp; 30-Amp Electric Pedestals</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Both dedicated 50A and 30A electrical posts are available with reliable voltage regulation. Standard 120V household outlets are also included on each pedestal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Big Rig Pull-Throughs &amp; Length Limits</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Our extra-wide pull-through spaces easily accommodate rigs up to 45+ feet with multi-slide-outs, plus towed vehicles. Back-in sites accommodate campers up to 35 feet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Fresh Water, Sewer &amp; Dump Station</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  City-pressurized potable water connections and dedicated threaded sewer drops at every full-hookup site. On-site RV dump station available for departing guests.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAskConcierge('Will my 40-foot motorhome with two slide-outs fit in your 50-amp pull-through RV sites?')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI: Will My Specific Rig Fit?</span>
            </button>
          </div>

          {/* PET POLICY CARD */}
          <div id="pet-policy" className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/10 flex items-center justify-center text-emerald-800">
                  <Dog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-stone-900">
                    Pet Policy &amp; Dog Amenities
                  </h3>
                  <div className="text-xs text-stone-500">
                    Zero Extra Pet Fees · Dog Park On-Site
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>2 Pets of Any Size Stay Completely Free</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  We don't believe in charging you extra to bring your family companions. Up to two dogs or cats of any size are welcomed with zero pet deposits or daily fees.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Fenced Dog Park &amp; River Trails</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Enjoy our fully fenced dog exercise yard where pets can run safely off-leash. On riverfront paths and general resort grounds, please keep pets on a standard 6ft leash.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Pet-Friendly vs. Hypoallergenic Cabins</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Most of our cabins welcome pets! However, <strong>Cabins 1 and 7</strong> are maintained 100% pet-free to protect guests with severe pet dander allergies.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAskConcierge('Can I bring my two dogs to stay in a cabin, and is there an extra charge?')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI: Clarify Pet Rules for Cabins</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
