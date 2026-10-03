import React from 'react';
import { 
  Wifi, 
  ShowerHead, 
  Flame, 
  Dog, 
  Fish, 
  Sparkles, 
  Truck, 
  Trees, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const AmenitiesGrid: React.FC = () => {
  const amenities = [
    {
      icon: <Fish className="w-5 h-5 text-amber-800" />,
      title: 'Private Red River Trout Fishing',
      desc: 'Direct riverbank access for German brown and rainbow trout fly fishing just steps from your site.',
    },
    {
      icon: <Wifi className="w-5 h-5 text-amber-800" />,
      title: 'High-Speed Resort Wi-Fi',
      desc: 'Complimentary high-speed wireless internet across all cabins and RV sites for seamless connectivity.',
    },
    {
      icon: <Dog className="w-5 h-5 text-amber-800" />,
      title: 'Fenced Dog Park & Free Pets',
      desc: 'Two pets of any size stay free with dedicated fenced exercise yard for off-leash playtime.',
    },
    {
      icon: <ShowerHead className="w-5 h-5 text-amber-800" />,
      title: 'Clean Hot Showers & Bathhouse',
      desc: 'Spacious, heated private bathhouses with unlimited hot showers and clean flush facilities.',
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-800" />,
      title: 'On-Site RV Dump Station',
      desc: 'Easy-access sanitary dump station with clean rinse hoses for departing RV travelers.',
    },
    {
      icon: <Flame className="w-5 h-5 text-amber-800" />,
      title: 'Riverfront BBQ & Campfire Rings',
      desc: 'Communal charcoal grilling pavilions and dedicated fire pits for evening gatherings under the stars.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-800" />,
      title: 'Guest Laundry Facilities',
      desc: 'Convenient coin-operated commercial washers and dryers open daily for guests.',
    },
    {
      icon: <Trees className="w-5 h-5 text-amber-800" />,
      title: 'Wooded River Walk & Trails',
      desc: 'Shaded walking paths under ponderosa pines along the river with wooden footbridges and benches.',
    },
  ];

  return (
    <section id="amenities" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2">
            <span>Resort Grounds</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Everything You Need</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4 [text-wrap:balance]">
            Comforts of Home in Northern New Mexico Nature
          </h2>

          <p className="text-base text-stone-600 leading-relaxed font-normal">
            Whether you're parking a 45ft 5th wheel or settling into a riverside timber cabin, Questa Lodge provides comprehensive modern resort amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-stone-300 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-800/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif-heading text-base font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
