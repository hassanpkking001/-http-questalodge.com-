import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory leads store for the demo & pitch demonstration
interface GuestLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  partySize?: number;
  accommodationType?: string;
  notes?: string;
  capturedAt: string;
  source: 'ai_concierge' | 'booking_bar' | 'contact_form';
}

const capturedLeads: GuestLead[] = [
  {
    id: 'lead-101',
    name: 'Marcus & Sarah Vance',
    phone: '(505) 412-8930',
    email: 'm.vance@outdoors.net',
    checkIn: '2026-10-15',
    checkOut: '2026-10-19',
    partySize: 2,
    accommodationType: '50-Amp Pull-Through RV (38ft 5th wheel)',
    notes: 'Asked about riverfront hookup and 2 golden retrievers. Confirmed pet friendly and dog park.',
    capturedAt: '2026-10-02 21:40',
    source: 'ai_concierge',
  },
  {
    id: 'lead-102',
    name: 'Elena Rostova',
    phone: '(720) 889-1402',
    email: 'elena.rostova@gmail.com',
    checkIn: '2026-10-22',
    checkOut: '2026-10-25',
    partySize: 4,
    accommodationType: '2-Bedroom Riverfront Cabin',
    notes: 'Wants to fly fish on the Red River right outside cabin porch.',
    capturedAt: '2026-10-02 18:15',
    source: 'booking_bar',
  },
];

const QUESTA_KNOWLEDGE = `
You are the 24/7 AI Concierge for "Questa Lodge & RV Resort", located right along the Red River at 8 Lower Embargo Road, Questa, NM 87556. Phone: (575) 586-9913.

Key Property Knowledge:
1. Location & Setting:
   - Situated in a tranquil, pine-wooded valley directly on the Red River in northern New Mexico.
   - Elevation ~7,500 ft. Located on the world-famous Enchanted Circle Scenic Byway between Taos (24 miles south) and Red River ski resort (12 miles east).
   - Minutes from the breathtaking Wild Rivers Recreation Area (Río Grande del Norte National Monument), Eagle Rock Lake, and Carson National Forest.

2. RV Park Details:
   - Full hookups with both 30-amp and 50-amp electric service, fresh water, and sewer connections.
   - Both back-in and long pull-through sites (can accommodate big rigs up to 45ft+).
   - Clean gravel pads, green lawn spaces, personal picnic table at each site.
   - Dump station on-site, clean bathhouse with hot showers, guest coin laundry facilities.
   - Discounted weekly and monthly extended stay rates available.

3. Cabins & Lodging:
   - Authentic rustic mountain timber cabins with modern comforts: fast free WiFi, flat screen TV, private bathrooms with hot showers, and heating.
   - Studio Cabins (sleeps 2, kitchenette, romantic for couples or solo anglers).
   - 1-Bedroom Cabins (sleeps 4, queen bed + sleeper sofa, full kitchen, porch).
   - 2-Bedroom Cabins (sleeps up to 6, full kitchen with stove/oven/microwave/fridge, living room, river views).
   - Fresh linens and towels provided.

4. Pet Policy (Super Important - Guests ask this constantly!):
   - Questa Lodge is proudly pet-friendly!
   - Welcomes up to 2 pets of any size for NO extra fee!
   - RV Park: Pets must be leashed outdoors when outside; waste must be picked up. Fenced on-site dog park for off-leash play.
   - Cabins: Most cabins are pet-friendly. Cabins 1 and 7 are specifically kept 100% pet-free / hypoallergenic for allergy-sensitive guests.

5. River Access & Trout Fishing:
   - Direct, private access to the Red River flowing through the property.
   - Excellent fly-fishing for rainbow and German brown trout right outside your door.
   - NM state fishing license required for anyone 12 and older (obtainable online via NM Game & Fish).
   - Riverside walking path, shaded benches, and communal fire pits / BBQ grills.

6. Lodge Policies & Check-In:
   - Check-in: 2:00 PM. Check-out: 11:00 AM. (Early check-in or late checkout upon request depending on availability).
   - Quiet hours: 10:00 PM to 7:00 AM to preserve the peaceful mountain serenity.
   - High-speed WiFi is complimentary across all cabins and RV sites.

Goal & Tone:
- Warm, welcoming, helpful, and concise (concierge style: 2 to 4 concise paragraphs or bullet points).
- If the guest mentions specific dates or asks to reserve or check availability, warmly invite them to provide their phone number or travel dates so the lodge office can immediately reserve their preferred site/cabin.
- When they provide contact details (phone number, name, or dates), acknowledge and confirm that their inquiry has been submitted directly to the Questa Lodge team for priority handling.
`;

// Helper: Smart fallback response if API key is absent or network fails
function generateSmartFallback(userMsg: string): string {
  const q = userMsg.toLowerCase();

  if (q.includes('pet') || q.includes('dog') || q.includes('cat') || q.includes('animal')) {
    return `We love four-legged guests! Questa Lodge welcomes up to two pets of any size with **no additional pet fee**. 

In our RV park, pets are welcome on a leash, and we have a fenced dog park on-site for off-leash playtime. For our cabins, most are pet-friendly, though Cabins 1 and 7 are reserved strictly pet-free for guests with allergies. 

Would you like me to note your travel dates and phone number so we can hold a pet-friendly cabin or RV site for you?`;
  }

  if (q.includes('rv') || q.includes('hookup') || q.includes('amp') || q.includes('30') || q.includes('50') || q.includes('pull through') || q.includes('rig') || q.includes('length')) {
    return `Our RV resort offers full hookup sites with both **30-amp and 50-amp** electric service, city water, and sewer connections. 

We feature spacious back-in sites as well as easy pull-through options that comfortably handle rigs up to 45+ feet with slide-outs. Each site includes a picnic table, manicured lawn/gravel pad, and free high-speed WiFi, with access to our clean hot showers, laundry, and on-site dump station.

What size is your rig and when are you planning to visit? Leave your phone number and dates, and we'll confirm the best riverside spot!`;
  }

  if (q.includes('cabin') || q.includes('bedroom') || q.includes('kitchen') || q.includes('sleep') || q.includes('rate') || q.includes('price')) {
    return `We have wonderful rustic mountain cabins ranging from cozy romantic Studios (sleeps 2) to family-sized 1-Bedroom and 2-Bedroom units (sleeps 4–6). 

All cabins feature private bathrooms with hot showers, fully equipped kitchens or kitchenettes (refrigerator, microwave, coffee maker, cookware), flat-screen TVs, fast WiFi, and covered porches facing the pines and river.

What dates do you have in mind? I can take your name and phone number to check exact availability for you right now.`;
  }

  if (q.includes('fish') || q.includes('river') || q.includes('trout') || q.includes('stream')) {
    return `You're in for a treat! The Red River runs directly through Questa Lodge property, giving you private access to premier trout fishing (rainbow and German brown trout) just steps from your cabin or RV door. 

We also have a scenic riverside walking trail and footbridges. A standard New Mexico fishing license is required for ages 12+. 

Are you planning an angling getaway? Let us know your preferred dates!`;
  }

  if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('address') || q.includes('where')) {
    return `You can reach our lodge team directly at **(575) 586-9913**. We are located at **8 Lower Embargo Road, Questa, NM 87556**, right on the Red River along the scenic Enchanted Circle Byway between Taos and Red River. 

Check-in begins at 2:00 PM and check-out is at 11:00 AM. How else can I assist your trip planning today?`;
  }

  return `Welcome to Questa Lodge & RV Resort along the Red River! We offer 30/50 amp full-hookup RV sites, cozy mountain cabins with kitchens, and riverfront tent camping right in the heart of northern New Mexico's Enchanted Circle. 

How can I help you today? Feel free to ask about our RV specs, pet rules, cabin amenities, or river fishing. If you'd like to check dates, just share your travel plans and phone number!`;
}

// Extract any contact info from the text
function extractLeadInfo(text: string): { phone?: string; name?: string; dates?: string } {
  const phoneMatch = text.match(/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const dateMatch = text.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}(st|nd|rd|th)?|\d{1,2}\/\d{1,2}(\/\d{2,4})?/i);
  return {
    phone: phoneMatch ? phoneMatch[0] : undefined,
    dates: dateMatch ? dateMatch[0] : undefined,
  };
}

// Endpoint: AI Concierge Chat
app.post('/api/concierge', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory, leadContext } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Check if user provided lead info in message or payload
    const extracted = extractLeadInfo(message);
    if ((extracted.phone || leadContext?.phone) && (extracted.name || leadContext?.name || message.length > 10)) {
      const newLead: GuestLead = {
        id: `lead-${Date.now()}`,
        name: leadContext?.name || extracted.name || 'Website Guest',
        phone: leadContext?.phone || extracted.phone || 'Provided via Concierge',
        email: leadContext?.email || undefined,
        checkIn: leadContext?.checkIn || extracted.dates || undefined,
        checkOut: leadContext?.checkOut || undefined,
        partySize: leadContext?.partySize || 2,
        accommodationType: leadContext?.accommodationType || 'RV / Cabin Inquiry',
        notes: `Inquiry via AI Concierge: "${message}"`,
        capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        source: 'ai_concierge',
      };
      capturedLeads.unshift(newLead);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return smart fallback if key is not configured
      const reply = generateSmartFallback(message);
      res.json({
        reply,
        leadCaptured: Boolean(extracted.phone || leadContext?.phone),
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format chat history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: QUESTA_KNOWLEDGE,
        temperature: 0.7,
      },
    });

    const reply = response.text || generateSmartFallback(message);
    res.json({
      reply,
      leadCaptured: Boolean(extracted.phone || leadContext?.phone),
    });
  } catch (error) {
    console.error('Error generating concierge response:', error);
    // Graceful fallback on API error
    const fallbackReply = generateSmartFallback(req.body.message || '');
    res.json({
      reply: fallbackReply,
      leadCaptured: false,
    });
  }
});

// Endpoint: Guest Leads API (for Pitch & Management Demo)
app.get('/api/leads', (_req: Request, res: Response) => {
  res.json({ leads: capturedLeads });
});

app.post('/api/leads', (req: Request, res: Response) => {
  const { name, phone, email, checkIn, checkOut, partySize, accommodationType, notes, source } = req.body;
  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone are required.' });
    return;
  }

  const newLead: GuestLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    email: email || '',
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    partySize: partySize ? parseInt(partySize, 10) : 2,
    accommodationType: accommodationType || 'General Inquiry',
    notes: notes || '',
    capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    source: source || 'booking_bar',
  };

  capturedLeads.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead, totalLeads: capturedLeads.length });
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite dev server in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Questa Lodge application running at http://localhost:${PORT}`);
  });
}

startServer();
