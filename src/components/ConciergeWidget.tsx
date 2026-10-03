import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  Calendar, 
  CheckCircle, 
  HelpCircle,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  leadCaptured?: boolean;
}

interface ConciergeWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  externalPrompt?: string;
  onLeadCaptured: (lead: any) => void;
}

export const ConciergeWidget: React.FC<ConciergeWidgetProps> = ({
  isOpen,
  onToggle,
  externalPrompt,
  onLeadCaptured,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: `Hello! Welcome to Questa Lodge & RV Resort along the Red River. 

I'm your 24/7 Concierge. Ask me anything about our **30 & 50-amp RV hookups**, **pet rules**, **cabin kitchens**, or **riverfront trout fishing**. 

If you'd like to check availability or hold a spot, feel free to share your travel dates and phone number!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadPrompt, setShowLeadPrompt] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', dates: '', guests: 2 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external prompts triggered from other buttons
  useEffect(() => {
    if (externalPrompt && isOpen) {
      handleSendMessage(externalPrompt);
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "I'm here to help with your Questa Lodge stay! Please call our front desk at (575) 586-9913 if you have an urgent inquiry.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        leadCaptured: data.leadCaptured,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.leadCaptured) {
        onLeadCaptured({
          id: `lead-${Date.now()}`,
          name: 'Chat Guest',
          phone: text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || 'Provided in chat',
          notes: `Inquiry: "${text}"`,
          capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          source: 'ai_concierge',
        });
      }
    } catch (err) {
      console.error('Chat error:', err);
      // Resilient fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Thank you for your question! We are located at 8 Lower Embargo Rd in Questa, NM, right on the Red River. We offer 30/50 amp full hookup RV sites, pet-friendly cabins, and direct trout fishing. If you'd like to reach our office directly, call (575) 586-9913.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone) return;

    const leadSummaryText = `My name is ${leadForm.name || 'Guest'}. Phone: ${leadForm.phone}. Interested dates: ${leadForm.dates || 'Upcoming'}. Party size: ${leadForm.guests}. Please hold a spot or call me with availability!`;
    setShowLeadPrompt(false);
    handleSendMessage(leadSummaryText);
  };

  return (
    <aside aria-label="Questa Lodge 24/7 AI Concierge" className="fixed bottom-4 right-4 z-40">
      {/* Floating Launcher Button when closed */}
      {!isOpen && (
        <div className="flex flex-col items-end gap-2 group">
          <div className="hidden sm:block bg-stone-900 text-white text-xs py-1.5 px-3 rounded-full shadow-lg border border-stone-700 animate-bounce duration-1000">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask about 50-Amp RV hookups &amp; pet rules</span>
            </span>
          </div>

          <button
            onClick={onToggle}
            className="flex items-center gap-2.5 px-4 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open 24/7 AI Concierge chat"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">24/7 AI Concierge</span>
          </button>
        </div>
      )}

      {/* Expanded Chat Widget Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-800 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="font-serif-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Questa Lodge Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="text-[11px] text-stone-300">
                  24/7 Riverfront Assistant · Live
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLeadPrompt(!showLeadPrompt)}
                className="text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 px-2 py-1 rounded transition-colors"
                title="Hold dates"
              >
                Hold Dates
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Lead Capture Panel Drawer */}
          {showLeadPrompt && (
            <div className="bg-amber-50/90 border-b border-amber-200 p-3 text-xs space-y-2 animate-in slide-in-from-top duration-200">
              <div className="font-semibold text-amber-950 flex items-center justify-between">
                <span>Hold My Dates / Request Callback:</span>
                <button
                  onClick={() => setShowLeadPrompt(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <form onSubmit={handleQuickLeadSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="p-1.5 bg-white border border-stone-300 rounded text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (required)"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="p-1.5 bg-white border border-stone-300 rounded text-xs font-mono"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Target Dates (e.g. Oct 15-18)"
                    value={leadForm.dates}
                    onChange={(e) => setLeadForm({ ...leadForm, dates: e.target.value })}
                    className="flex-1 p-1.5 bg-white border border-stone-300 rounded text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-amber-800 text-white rounded font-medium text-xs hover:bg-amber-900 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-amber-800 text-white rounded-br-none'
                      : 'bg-white text-stone-900 border border-stone-200 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {msg.leadCaptured && (
                    <div className="mt-2 pt-2 border-t border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1.5 bg-emerald-50 -mx-2 -mb-1 px-2 py-1 rounded">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Inquiry registered in Lodge Priority Queue!</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-stone-200 max-w-[70%]">
                <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce delay-150" />
                <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce delay-300" />
                <span className="text-xs text-stone-500 ml-1">Checking property knowledge...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="p-2 bg-stone-100/90 border-t border-stone-200 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSendMessage('Are pets allowed in the cabins?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full border border-stone-200 transition-colors cursor-pointer"
            >
              🐕 Pet Rules in Cabins?
            </button>
            <button
              onClick={() => handleSendMessage('Do you have 50-amp pull-throughs for big rig RVs?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full border border-stone-200 transition-colors cursor-pointer"
            >
              ⚡ 50-Amp Big Rig RVs?
            </button>
            <button
              onClick={() => handleSendMessage('How is the trout fishing on the Red River?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full border border-stone-200 transition-colors cursor-pointer"
            >
              🎣 Trout Fishing Info?
            </button>
            <button
              onClick={() => handleSendMessage('What are your check-in and quiet hours?')}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-full border border-stone-200 transition-colors cursor-pointer"
            >
              🕒 Check-in Hours?
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about RVs, pets, dates, or leave your phone..."
              className="flex-1 text-xs sm:text-sm px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-stone-800"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
