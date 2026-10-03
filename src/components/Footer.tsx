import React from 'react';
import { Phone, Mail, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

interface FooterProps {
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif-heading text-xl font-bold text-white tracking-tight">
              Questa Lodge &amp; RV Resort
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tranquil mountain retreat and RV resort located directly on the Red River in northern New Mexico. 
              Elevating the Enchanted Circle road-trip experience with modern hospitality and 24/7 guest service.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <Compass className="w-4 h-4" />
              <span>Elevation 7,460 ft · Carson National Forest</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact &amp; Location
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>8 Lower Embargo Road<br />Questa, NM 87556</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white font-mono">
                  {PROPERTY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">info@questalodge.com</span>
              </div>
            </div>
          </div>

          {/* Hours & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Stay Policies
            </h4>
            <ul className="text-xs text-stone-400 space-y-1.5">
              <li>Check-in: <strong>2:00 PM</strong></li>
              <li>Check-out: <strong>11:00 AM</strong></li>
              <li>Quiet Hours: <strong>10:00 PM – 7:00 AM</strong></li>
              <li>Pets: <strong>2 pets of any size stay free</strong></li>
              <li>Wi-Fi: <strong>Complimentary across all sites</strong></li>
            </ul>
          </div>

          {/* Quick Links & Pitch Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Developer &amp; Management
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designed to optimize performance, mobile conversions, and 24/7 guest inquiry resolution for Questa Lodge.
            </p>
            <button
              onClick={onOpenAudit}
              className="mt-2 text-xs font-medium text-amber-400 hover:text-amber-300 underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Website Audit &amp; Video Pitch Tool</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Questa Lodge &amp; RV Resort. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Red River, NM</span>
            <span aria-hidden="true">·</span>
            <span>Enchanted Circle</span>
            <span aria-hidden="true">·</span>
            <span>Río Grande del Norte</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
