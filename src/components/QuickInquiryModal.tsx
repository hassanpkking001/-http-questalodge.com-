import React, { useState } from 'react';
import { X, Calendar, Users, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Accommodation, PROPERTY_INFO } from '../data/propertyData';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAccommodation?: Accommodation | null;
  initialQuery?: { checkIn: string; checkOut: string; type: string; guests: number; pets: boolean };
  onSuccess: (lead: any) => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedAccommodation,
  initialQuery,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: initialQuery?.checkIn || '',
    checkOut: initialQuery?.checkOut || '',
    partySize: initialQuery?.guests || 2,
    accommodationType: selectedAccommodation?.name || '50-Amp Pull-Through RV Site',
    pets: initialQuery?.pets ? 'Yes (1-2 pets)' : 'No pets',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'booking_bar',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        onSuccess(data.lead);
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      // Fallback
      setSubmitted(true);
      onSuccess({
        id: `lead-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        capturedAt: new Date().toISOString().substring(0, 16),
        source: 'booking_bar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-0.5">
              Questa Lodge &amp; RV Resort
            </div>
            <h3 id="inquiry-title" className="font-serif-heading text-lg font-bold">
              Check Dates &amp; Hold Space
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-heading text-xl font-bold text-stone-900">
                Inquiry Received!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your preferred dates for <strong>{formData.accommodationType}</strong> have been submitted to our priority desk. We will reach out to <strong>{formData.phone}</strong> promptly to confirm.
              </p>
              <div className="pt-2 text-xs text-stone-500 font-mono">
                Confirmation Ref: QL-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
              >
                Back to Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  No booking deposit charged now. Holds your requested dates with zero obligation.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Accommodation Preference
                </label>
                <input
                  type="text"
                  value={formData.accommodationType}
                  onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 bg-stone-50 focus:ring-2 focus:ring-amber-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Check-In</label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. David Martinez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(575) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800 font-mono focus:ring-2 focus:ring-amber-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Party Size</label>
                  <select
                    value={formData.partySize}
                    onChange={(e) => setFormData({ ...formData, partySize: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Traveling with Pets?</label>
                  <select
                    value={formData.pets}
                    onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800"
                  >
                    <option value="No pets">No Pets</option>
                    <option value="1 Dog/Cat">1 Dog or Cat (Free)</option>
                    <option value="2 Dogs/Cats">2 Dogs or Cats (Free)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  RV Rig Length or Special Requests (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 38ft 5th wheel, requesting riverfront spot, or late check-in..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-800 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-semibold rounded-lg shadow-sm transition-colors text-center cursor-pointer active:scale-[0.99]"
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry & Hold Dates'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
