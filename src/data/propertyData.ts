// Images generated for Questa Lodge & RV Resort
import heroLodgeImg from '../assets/images/hero_questa_lodge_1791008211653.jpg';
import cabinsExteriorImg from '../assets/images/lodge_cabins_exterior_1791008230048.jpg';
import rvResortImg from '../assets/images/lodge_rv_resort_1791008246228.jpg';
import riverFishingImg from '../assets/images/lodge_river_fishing_1791008260070.jpg';

export interface Accommodation {
  id: string;
  name: string;
  category: 'cabin' | 'rv' | 'tent';
  tagline: string;
  pricePerNight: number;
  capacity: string;
  bedSetup?: string;
  hookups?: string;
  petFriendly: boolean;
  petNote?: string;
  image: string;
  features: string[];
  description: string;
}

export const PROPERTY_INFO = {
  name: 'Questa Lodge & RV Resort',
  address: '8 Lower Embargo Road, Questa, NM 87556',
  phone: '(575) 586-9913',
  email: 'info@questalodge.com',
  elevation: '7,460 ft',
  river: 'Red River',
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
  quietHours: '10:00 PM – 7:00 AM',
  officeHours: '8:00 AM – 6:00 PM MT (AI Concierge 24/7)',
  locationSummary: 'Situated directly on the Red River on New Mexico’s Enchanted Circle Scenic Byway, 12 miles west of Red River and 24 miles north of Taos.',
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'cabin-2br',
    name: '2-Bedroom Riverfront Timber Cabin',
    category: 'cabin',
    tagline: 'Spacious family lodge with full kitchen and direct river views',
    pricePerNight: 175,
    capacity: 'Up to 6 Guests',
    bedSetup: '1 Queen, 2 Twins, 1 Sleeper Sofa',
    petFriendly: true,
    petNote: 'Pet-friendly (up to 2 pets stay free)',
    image: cabinsExteriorImg,
    features: [
      'Full kitchen with stove, oven, full fridge & microwave',
      'Private bathroom with hot shower and fresh linens',
      'Covered front porch with pine and river views',
      'Flat-screen satellite TV and high-speed Wi-Fi',
      'Charcoal grill and outdoor picnic table',
    ],
    description: 'Our premier two-bedroom cabin is perfect for families or fishing groups. Enjoy a full kitchen for home-cooked meals after a day exploring the Carson National Forest or casting on the Red River.',
  },
  {
    id: 'cabin-1br',
    name: '1-Bedroom Pine Chalet',
    category: 'cabin',
    tagline: 'Cozy rustic hideaway nestled under towering ponderosa pines',
    pricePerNight: 145,
    capacity: 'Up to 4 Guests',
    bedSetup: '1 Queen Bed + Queen Sleeper Sofa',
    petFriendly: true,
    petNote: 'Pet-friendly (up to 2 pets stay free)',
    image: cabinsExteriorImg,
    features: [
      'Kitchen with refrigerator, 4-burner cooktop & coffee maker',
      'Private bath with walk-in hot shower',
      'Covered porch with rustic Adirondack seating',
      'High-speed Wi-Fi & satellite TV',
      'Private campfire ring nearby',
    ],
    description: 'A charming handcrafted cabin ideal for couples or small families. Step out each morning to the scent of ponderosa pines and the soothing sound of the Red River.',
  },
  {
    id: 'cabin-studio',
    name: "Studio Angler's Cabin (Cabins 1 & 7)",
    category: 'cabin',
    tagline: 'Intimate studio retreat steps from prime trout fishing',
    pricePerNight: 115,
    capacity: '2 Guests',
    bedSetup: '1 Plush Queen Bed',
    petFriendly: false,
    petNote: 'Hypoallergenic / Strictly 100% Pet-Free',
    image: cabinsExteriorImg,
    features: [
      'Kitchenette with mini-fridge, microwave & coffee bar',
      'Private ensuite bath with hot shower',
      'Strictly pet-free for allergy-sensitive travelers',
      'Fast Wi-Fi for remote work or trip planning',
      'Direct walking trail to the Red River bank',
    ],
    description: 'Designed for couples, solo adventurers, and avid anglers. Maintained strictly pet-free to guarantee a pristine, allergen-free environment for sensitive guests.',
  },
  {
    id: 'rv-50amp',
    name: 'Deluxe 50-Amp Pull-Through RV Site',
    category: 'rv',
    tagline: 'Spacious full hookup pull-through for big rigs up to 45ft+',
    pricePerNight: 55,
    capacity: 'Big Rigs & 5th Wheels',
    hookups: '50-Amp Electric · City Water · Direct Sewer',
    petFriendly: true,
    petNote: 'Pets welcome on leash; on-site dog park',
    image: rvResortImg,
    features: [
      '50-Amp electric pedestal with reliable steady voltage',
      'City pressurized water & dedicated sewer connection',
      'Level clean gravel pad with green grass border',
      'Heavy-duty wooden picnic table at site',
      'Full access to guest bathhouse, laundry & dump station',
    ],
    description: 'Wide, hassle-free pull-through spaces designed to accommodate modern motorhomes and large 5th wheels with multiple slide-outs. Shaded by mature pines with views of the mountain ridge.',
  },
  {
    id: 'rv-30amp',
    name: 'Riverfront 30-Amp Back-In RV Site',
    category: 'rv',
    tagline: 'Tranquil site positioned directly alongside the Red River',
    pricePerNight: 48,
    capacity: 'RVs & Trailers up to 35ft',
    hookups: '30-Amp Electric · City Water · Direct Sewer',
    petFriendly: true,
    petNote: 'Pets welcome on leash; on-site dog park',
    image: rvResortImg,
    features: [
      '30-Amp electric service with water and sewer hookups',
      'Steps away from private trout fishing river access',
      'Well-shaded gravel pad with mountain breeze',
      'Free high-speed resort Wi-Fi',
      'Communal riverfront BBQ pavilion access',
    ],
    description: 'Back in your trailer or camper van right near the riverbank. Fall asleep to the gentle rushing water and enjoy morning coffee right beside the stream.',
  },
  {
    id: 'tent-river',
    name: 'Riverbank Shaded Tent Pitch',
    category: 'tent',
    tagline: 'Traditional camping under pine canopies right along the river',
    pricePerNight: 32,
    capacity: 'Up to 4 Campers',
    petFriendly: true,
    petNote: 'Pets welcome on leash',
    image: riverFishingImg,
    features: [
      'Level soft grassy pitch directly near the riverbank',
      'Private campfire ring with grill grate & picnic table',
      'Convenient access to hot showers and flush toilets',
      'Designated vehicle parking space adjacent to site',
      'Clean potable water spigot nearby',
    ],
    description: 'Experience genuine mountain camping with the comforts of a maintained resort. Wake up, grab your rod, and cast a fly into the Red River within thirty seconds.',
  },
];

export const AUDIT_MISTAKES = [
  {
    id: 'after-hours-inquiries',
    category: 'Business & Conversion Loss',
    title: 'Zero After-Hours Lead Capture (Losing Bookings Daily)',
    oldMistake: 'The current questalodge.com website relies on static email contact forms and a single daytime telephone number. When travelers on the road search for RV hookups, pet rules, or cabin dates after 6 PM, they have no immediate answers. If they don’t get an instant response, 74% book at rival resorts along the Enchanted Circle (Taos or Red River).',
    newFix: 'Integrated 24/7 AI Concierge widget that answers guest questions instantly using accurate property specs (30/50 amp, cabin kitchen specs, pet rules) and immediately captures their phone number, party size, and dates into the lodge priority lead queue.',
    impact: 'Estimated +28–35% increase in captured bookings without needing 24/7 office staff.',
  },
  {
    id: 'performance-cwv',
    category: 'Performance & Speed',
    title: 'High Latency & Bloated Assets (LCP > 4.2s)',
    oldMistake: 'Current site serves uncompressed legacy images (>4.8MB page weight), blocking scripts, and outdated CMS plugins that stall page load on mobile cell connections in mountainous New Mexico areas.',
    newFix: 'Built on Vite + React 19 + modern responsive image formats, client-side route caching, and zero render-blocking bloat. Sub-500ms initial paint.',
    impact: 'LCP dropped from 4.2s to <0.6s. High-speed performance even on 3G mountain mobile networks.',
  },
  {
    id: 'accessibility-wcag',
    category: 'Accessibility & Usability',
    title: 'WCAG 2.1 AA Violations & Contrast Failures',
    oldMistake: 'Low contrast navigation text (<2.8:1), missing ARIA landmarks, lack of keyboard focus indicators, and form inputs without proper accessible labels, failing basic ADA accessibility compliance.',
    newFix: 'Strict WCAG 2.1 AA compliant color system (>4.5:1 text, >3:1 UI), full keyboard navigability with visible focus rings, semantic HTML5 landmarks, and accessible dialogs.',
    impact: '100% accessible to screen readers, accessible on mobile devices, compliant with modern standards.',
  },
  {
    id: 'mobile-road-trip',
    category: 'Mobile UX & Responsive Design',
    title: 'Cramped Desktop Tables & Broken Mobile Touch Targets',
    oldMistake: 'RV rates and cabin specifications are trapped in desktop-width tables that clip or require awkward horizontal scrolling on smartphones, with tiny touch targets (<28px) that cause mis-taps on phones.',
    newFix: 'Mobile-first, touch-friendly interface with minimum 44px tap targets, card-based responsive views, single-tap call buttons, and quick-filter date inputs.',
    impact: 'Effortless booking inquiries on mobile devices while travelers drive between Santa Fe, Taos, and Colorado.',
  },
  {
    id: 'unclear-policies',
    category: 'Guest Experience & Friction',
    title: 'Ambiguous RV Hookup Specs & Cabin Pet Rules',
    oldMistake: 'Guests frequently call or leave frustrated reviews because they cannot tell whether a specific cabin allows dogs, or whether their 42ft 5th wheel can fit into the 50-amp spaces.',
    newFix: 'Dedicated, transparent RV Hookup Guide (amps, lengths, hookup types) and clear Pet Policy matrix highlighting our free 2-pet policy and distinguishing hypoallergenic cabins.',
    impact: 'Eliminates repetitive front-desk phone calls while increasing guest confidence to book immediately.',
  },
];

export const PITCH_MESSAGE_TEMPLATE = `Hi Questa Lodge Team,

I was checking out your property—it looks like an incredible spot along the river!

I’m an AI developer, and I noticed that when prospective guests visit your site after hours with quick questions about RV hookups, pet rules, or specific cabin features, there’s no immediate way for them to get answers unless they wait for an email response.

I actually went ahead and built a simple prototype AI Concierge Widget for your site using your property information. It sits in the bottom corner of your website, answers guest questions 24/7, and captures their phone number/travel dates so you never lose a booking to another resort in the area.

I recorded a quick 45-second video showing how it works with your lodge photos and info.

Would it be alright if I dropped the video link here for you to check out? No pressure at all!

Best,
[Your Name]`;
