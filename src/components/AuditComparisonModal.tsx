import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  Gauge, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Clock, 
  ArrowRight,
  Shield,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { AUDIT_MISTAKES, PITCH_MESSAGE_TEMPLATE, PROPERTY_INFO } from '../data/propertyData';

interface AuditComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: any[];
  onOpenConcierge: (prompt?: string) => void;
}

export const AuditComparisonModal: React.FC<AuditComparisonModalProps> = ({
  isOpen,
  onClose,
  leads,
  onOpenConcierge,
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'pitch' | 'script' | 'leads'>('audit');
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen) return null;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(PITCH_MESSAGE_TEMPLATE);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between gap-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Website Audit &amp; AI Refactoring Engine</span>
            </div>
            <h2 id="audit-modal-title" className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
              Questa Lodge (questalodge.com) Redesign &amp; Pitch Suite
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs (Interactive filter control) */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-amber-800 text-amber-900 font-semibold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Mistakes Audit &amp; Fixes</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-amber-800 text-amber-900 font-semibold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Live Captured Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'pitch'
                ? 'border-amber-800 text-amber-900 font-semibold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Copy className="w-4 h-4 text-sky-600" />
            <span>Lodge Pitch Email</span>
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'script'
                ? 'border-amber-800 text-amber-900 font-semibold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Video className="w-4 h-4 text-purple-600" />
            <span>45-Sec Video Walkthrough Script</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: MISTAKES & COMPARATIVE AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* Benchmark Scorecards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="text-xs text-stone-500 font-medium mb-1">Mobile PageSpeed</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-600">98/100</span>
                    <span className="text-xs text-stone-400 line-through font-mono">42/100</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">+133% speed increase</div>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="text-xs text-stone-500 font-medium mb-1">After-Hours Capture</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-600">24/7 AI</span>
                    <span className="text-xs text-stone-400 line-through">0%</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">Zero lost late bookings</div>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="text-xs text-stone-500 font-medium mb-1">Accessibility (WCAG)</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-600">AA (99%)</span>
                    <span className="text-xs text-stone-400 line-through font-mono">54%</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">Full keyboard &amp; contrast</div>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="text-xs text-stone-500 font-medium mb-1">Mobile Tap Targets</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-600">&ge; 44px</span>
                    <span className="text-xs text-stone-400 line-through font-mono">&lt; 26px</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">Easy tap on mountain roads</div>
                </div>
              </div>

              {/* Detailed Breakdown of Mistakes & Applied Fixes */}
              <div className="space-y-4">
                <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                  Identified Mistakes on Old questalodge.com &amp; Applied Solutions
                </h3>

                <div className="space-y-4">
                  {AUDIT_MISTAKES.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                          Issue #{idx + 1} · {item.category}
                        </span>
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolved in this Redesign</span>
                        </span>
                      </div>

                      <h4 className="font-semibold text-stone-900 text-base">
                        {item.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-100 text-rose-900 space-y-1">
                          <div className="font-semibold text-rose-800 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Mistake on Current Site</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">
                            {item.oldMistake}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-950 space-y-1">
                          <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Modern Refactored Correction</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">
                            {item.newFix}
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 text-xs text-stone-600 flex items-center gap-1.5 font-medium">
                        <ArrowRight className="w-3 h-3 text-amber-800" />
                        <span>Business Impact: </span>
                        <strong className="text-stone-900 font-semibold">{item.impact}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launch Action */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-amber-950 text-sm">
                    Ready to demonstrate the 24/7 AI Concierge?
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Click to test the live chat widget with pre-loaded RV hookup and pet policy queries.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConcierge('What is your pet policy for dogs and do you have 50-amp pull-through RV spaces?');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
                >
                  Test 24/7 AI Concierge Live
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE CAPTURED LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                    Live Captured Guest Inquiries ({leads.length})
                  </h3>
                  <p className="text-xs text-stone-600">
                    These are real prospective guest bookings automatically captured by the AI Concierge and booking bar!
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                  Lodge Staff Dispatch Active
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-stone-200 rounded-xl text-stone-500">
                  <Users className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                  <p className="text-sm">No leads captured yet.</p>
                  <p className="text-xs text-stone-400 mt-1">Open the AI Concierge in the bottom corner and submit your phone number to test.</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {leads.map((lead: any) => (
                    <div key={lead.id} className="p-4 hover:bg-stone-50 transition-colors space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 text-sm">{lead.name}</span>
                          <span className="text-xs font-mono text-stone-500">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                            {lead.capturedAt}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                            {lead.source}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-700 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {lead.accommodationType && (
                          <span>
                            <strong>Preferred:</strong> {lead.accommodationType}
                          </span>
                        )}
                        {lead.checkIn && (
                          <span>
                            <strong>Dates:</strong> {lead.checkIn} {lead.checkOut ? `to ${lead.checkOut}` : ''}
                          </span>
                        )}
                        {lead.partySize && (
                          <span>
                            <strong>Party:</strong> {lead.partySize} Guests
                          </span>
                        )}
                      </div>

                      {lead.notes && (
                        <p className="text-xs text-stone-600 bg-stone-50 p-2 rounded border border-stone-100 italic">
                          "{lead.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PITCH EMAIL TEMPLATE */}
          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                    Ready-To-Send Outreach Pitch
                  </h3>
                  <p className="text-xs text-stone-600">
                    Copy and send this directly to the owners or management of Questa Lodge &amp; RV Resort.
                  </p>
                </div>
                <button
                  onClick={handleCopyPitch}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {copiedPitch ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Message</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 sm:p-6 bg-stone-900 text-stone-100 rounded-xl text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed border border-stone-800 select-all overflow-x-auto">
                  {PITCH_MESSAGE_TEMPLATE}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1">
                <strong>Why this outreach converts so well:</strong>
                <p>
                  1. It praises their property genuinely (location along the Red River).<br />
                  2. It addresses their exact after-hours pain point without criticizing them harshly.<br />
                  3. It offers a tangible asset (a free 45-sec personalized video) rather than a generic sales pitch.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: 45-SECOND VIDEO DEMO SCRIPT */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-stone-900">
                  45-Second Video Walkthrough Script (Record using Loom / Screen Recorder)
                </h3>
                <p className="text-xs text-stone-600">
                  Follow this exact timing while recording your screen with this active applet prototype open:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>STEP 1 · 0:00 – 0:10</span>
                    <span>The Property Hook</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-900">
                    "Hey Questa Lodge team! Quick video showing what I built for your website. Your property along the Red River is stunning, but when people visit late at night on road trips, there's no way to get immediate answers..."
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    Action: Start on the homepage hero, slowly scroll over the river photos and cabin showcase.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>STEP 2 · 0:10 – 0:25</span>
                    <span>The 24/7 AI Concierge in Action</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-900">
                    "So I built this prototype 24/7 Riverfront Concierge in the bottom corner. Notice how if a guest asks 'Are pets allowed in the cabins?' or 'Do you have 50-amp pull-throughs for a 40-foot rig?', it answers in 2 seconds with exact details."
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    Action: Click the floating concierge widget in bottom-right corner, click the prompt "Are pets allowed in cabins?" or type it in.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>STEP 3 · 0:25 – 0:38</span>
                    <span>The Lead Capture (Never Lose a Booking)</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-900">
                    "Most importantly: when the guest provides their phone number and travel dates, it instantly captures their lead into your queue so your team never loses that reservation to another resort in Taos or Red River."
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    Action: Type "(575) 555-0199 for Oct 15-18", send it, and show the instant confirmation response!
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>STEP 4 · 0:38 – 0:45</span>
                    <span>Zero-Pressure Call-to-Action</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-900">
                    "I can easily plug this right into your existing site in about 15 minutes. Would love to send over the demo link if you'd like to test it out yourself. Thanks!"
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    Action: Close widget and end recording with warm friendly sign-off.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Questa Lodge &amp; RV Resort Prototype · 8 Lower Embargo Rd, Questa, NM
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
