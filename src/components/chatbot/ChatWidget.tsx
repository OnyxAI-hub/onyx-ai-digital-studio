import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import onyxLogo from "@/assets/onyx-logo.png";

interface Message {
  role: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "Hi! I'm the ONYX AI assistant. I can help you find the right service or package, show you relevant portfolio examples, or connect you with Xavier. What can I help you with?",
};

const FAQ_RESPONSES: Record<string, { keywords: string[]; response: string }[]> = {
  pricing: [
    {
      keywords: ["pricing", "price", "cost", "how much", "budget", "afford"],
      response: "We have three packages:\n\n• **Starter** — $100 (up to 3 pages, 5-day delivery)\n• **Business** — Starting at $350 (up to 5 pages, autoresponder, 7-day delivery)\n• **Advanced Website / Web App** — Starting at $650 (up to 8 pages, payments, e-commerce or booking, 14-day delivery)\n\nWant help choosing? Tell me about your business and I'll recommend one. Or [view full pricing](/pricing).",
    },
  ],
  timeline: [
    {
      keywords: ["timeline", "how long", "turnaround", "delivery", "when", "deadline"],
      response: "Most projects are completed in 1–2 weeks:\n\n• Starter: ~5 days\n• Business: ~7 days\n• Advanced: ~14 days\n\nRush delivery is available as a $75 add-on. When do you need your project ready?",
    },
  ],
  revisions: [
    {
      keywords: ["revision", "changes", "edits", "rounds"],
      response: "Every package includes unlimited revisions during the active build phase, so we can keep refining until the design feels right.",
    },
  ],
  support: [
    {
      keywords: ["support", "maintenance", "after launch", "updates"],
      response: "We offer monthly maintenance plans starting at $30/month for ongoing updates, security patches, and content changes.",
    },
  ],
  contact: [
    {
      keywords: ["contact", "reach", "email", "call"],
      response: "You can reach us at hello@onyxai.dev or [book a consultation](/contact) directly. Want me to collect your details now so Xavier can follow up?",
    },
  ],
  about: [
    {
      keywords: ["about", "who are you", "onyx", "xavier", "founder"],
      response: "ONYX AI is a premium digital agency founded by Xavier de Jesus Ruiz. We build modern websites, web apps, and AI-powered solutions for businesses of all sizes. Xavier is fluent in English and Spanish. [Learn more about us](/about).",
    },
  ],
  technology: [
    {
      keywords: ["technology", "tech stack", "react", "what do you use", "tools"],
      response: "We build with React, TypeScript, Tailwind CSS, and Supabase — the same modern stack used by top startups. Your site will be fast, accessible, and scalable.",
    },
  ],
};

// Smart recommendation logic
const SMART_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["business website", "company website", "professional website", "brochure"],
    response: "For a professional business website, I'd recommend our **Business package ($300)**. It includes up to 7 pages, custom UI/UX design, advanced SEO, and 3 rounds of revisions.\n\nHere's an example of a business site we built: [PrimeShine Cleaning Co.](/portfolio/primeshine-cleaning)\n\nWant to get started? [Book a consultation →](/contact?package=Business)",
  },
  {
    keywords: ["e-commerce", "ecommerce", "online store", "sell products", "shop", "supplements", "wellness"],
    response: "For an e-commerce or product-based site, our **Advanced package ($500)** is the best fit. It includes custom features, payment integration, and 30-day post-launch support.\n\nCheck out our NutriFit Wellness project — a premium supplement e-commerce site: [View project →](/portfolio/nutrifit-wellness)\n\nReady to discuss? [Book a consultation →](/contact?service=Web+Applications)",
  },
  {
    keywords: ["cleaning", "service business", "local business", "plumber", "contractor", "landscaping"],
    response: "For a service business, our **Business package ($300)** works great. It includes a professional design with clear CTAs, booking integration, and SEO to help local customers find you.\n\nSee how we built PrimeShine Cleaning Co.'s site: [View project →](/portfolio/primeshine-cleaning)\n\n[Get started →](/contact?service=Business+Websites)",
  },
  {
    keywords: ["dashboard", "admin", "platform", "portal", "saas", "app"],
    response: "For dashboards and web platforms, our **Advanced package ($500)** is ideal. It includes custom web app features, user dashboards, role-based access, and API integrations.\n\nSee our Quality Fitness Club platform: [View project →](/portfolio/quality-fitness-club)\n\n[Book a consultation →](/contact?service=Web+Applications)",
  },
  {
    keywords: ["fitness", "gym", "workout", "training", "health"],
    response: "We've built premium fitness platforms before! Check out Quality Fitness Club — a full member portal with scheduling, profiles, and class management: [View project →](/portfolio/quality-fitness-club)\n\nI'd recommend our **Advanced package** for a fitness platform. [Get started →](/contact?package=Advanced)",
  },
  {
    keywords: ["landing page", "single page", "launch page", "coming soon"],
    response: "For a high-converting landing page, our **Starter package ($100)** is perfect. You'll get a responsive, SEO-optimized page delivered in 5 days.\n\nNeed more pages or features? The **Business package ($350)** gives you up to 5 pages with custom design.\n\n[Get started →](/contact?service=Landing+Pages)",
  },
  {
    keywords: ["booking", "scheduling", "appointment", "calendar"],
    response: "We build online booking systems that let your clients schedule with ease — complete with calendar integration, email reminders, and payment collection.\n\nThis is included in our **Advanced package ($500)** or available as a custom add-on.\n\n[Get started →](/contact?service=Booking+%26+Scheduling+Systems)",
  },
  {
    keywords: ["chatbot", "ai bot", "chat assistant", "automated chat"],
    response: "We build custom AI chatbots that qualify leads, answer FAQs, and engage visitors 24/7. You can add one to any project for $200 as an add-on.\n\n[Get started →](/contact?extra=AI+Chatbot+Integration)",
  },
  {
    keywords: ["logo", "brand", "branding", "identity"],
    response: "We offer logo design ($75) and full brand kits ($120) that include logo concepts, color palettes, typography, and brand guidelines. These can be added to any package.\n\n[Get started →](/contact?extra=Brand+Kit)",
  },
  {
    keywords: ["cheap", "free", "lowest", "discount"],
    response: "Our most affordable option is the **Starter package at $100** — it includes a 1–3 page responsive website with mobile-friendly design, speed optimization, and an opt-in form.\n\nIt's designed to get small businesses online fast and professionally. [View pricing →](/pricing)",
  },
];

const LEAD_FLOW = [
  { key: "name", question: "I'd love to connect you with Xavier. What's your name?" },
  { key: "email", question: "Great! What's the best email to reach you at?" },
  { key: "summary", question: "Perfect. In a few words, what are you looking to build?" },
];

const findResponse = (input: string): string | null => {
  const lower = input.toLowerCase();

  // Check smart recommendations first (more specific)
  for (const item of SMART_RESPONSES) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.response;
  }

  // Then check FAQ categories
  for (const category of Object.values(FAQ_RESPONSES)) {
    for (const item of category) {
      if (item.keywords.some((kw) => lower.includes(kw))) return item.response;
    }
  }

  return null;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [leadStep, setLeadStep] = useState(-1);
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const addMessages = (userText: string, botText: string) => {
    setMessages((prev) => [...prev, { role: "user", text: userText }, { role: "bot", text: botText }]);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Lead capture flow
    if (leadStep >= 0 && leadStep < LEAD_FLOW.length) {
      const currentKey = LEAD_FLOW[leadStep].key;
      const newData = { ...leadData, [currentKey]: text };
      setLeadData(newData);

      const nextStep = leadStep + 1;
      if (nextStep < LEAD_FLOW.length) {
        addMessages(text, LEAD_FLOW[nextStep].question);
        setLeadStep(nextStep);
      } else {
        addMessages(text, `Thanks, ${newData.name}! Xavier will follow up at ${newData.email} within 24 hours.\n\nIn the meantime, feel free to:\n• [Browse our services](/services)\n• [Check pricing](/pricing)\n• [View our portfolio](/portfolio)`);
        setLeadStep(-1);
        console.log("Lead captured:", newData);
      }
      return;
    }

    // Check for smart/FAQ responses
    const response = findResponse(text);
    if (response) {
      addMessages(text, response);
      return;
    }

    // Check for lead capture intent
    const lower = text.toLowerCase();
    if (lower.includes("get started") || lower.includes("consultation") || lower.includes("hire") || lower.includes("quote") || lower.includes("interested") || lower.includes("ready") || lower.includes("sign up") || lower.includes("begin")) {
      addMessages(text, LEAD_FLOW[0].question);
      setLeadStep(0);
      return;
    }

    // Check for greetings
    if (lower.match(/^(hi|hello|hey|sup|yo|what's up|howdy)/)) {
      addMessages(text, "Hey there! 👋 How can I help you today? I can:\n\n• Help you find the right service or package\n• Show you relevant portfolio examples\n• Answer questions about pricing, timeline, or process\n• Connect you with Xavier for a consultation\n\nWhat are you looking for?");
      return;
    }

    // Check for thanks
    if (lower.match(/(thank|thanks|thx|appreciate)/)) {
      addMessages(text, "You're welcome! Is there anything else I can help with? If you're ready to move forward, just say \"get started\" and I'll collect your details for Xavier.");
      return;
    }

    // Fallback with helpful guidance
    addMessages(text, "I'd be happy to help! Here are some things I can assist with:\n\n• **Services** — what we build and how\n• **Pricing** — packages starting at $100\n• **Portfolio** — real projects we've delivered\n• **Timeline** — typical project turnaround\n\nOr if you're ready, say \"get started\" and I'll connect you with Xavier.");
  };

  // Simple markdown-like link rendering
  const renderText = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\n)/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} className="underline text-foreground/80 hover:text-foreground" onClick={() => setOpen(false)}>
            {linkMatch[1]}
          </a>
        );
      }
      const boldMatch = part.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        return <strong key={i} className="font-semibold text-foreground/90">{boldMatch[1]}</strong>;
      }
      if (part === "\n") return <br key={i} />;
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-lg border border-border/60 bg-background shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/40 bg-card/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <img src={onyxLogo} alt="ONYX AI" className="h-8" />
              <div>
                <p className="text-xs font-semibold">ONYX AI Assistant</p>
                <p className="text-[10px] text-muted-foreground">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {msg.role === "bot" ? renderText(msg.text) : msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {["Pricing", "Services", "Portfolio", "Get Started"].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const fakeInput = q;
                    setInput("");
                    setMessages((prev) => [...prev, { role: "user", text: fakeInput }]);
                    const response = findResponse(fakeInput);
                    if (response) {
                      setTimeout(() => setMessages((prev) => [...prev, { role: "bot", text: response }]), 300);
                    } else if (fakeInput === "Get Started") {
                      setTimeout(() => {
                        setMessages((prev) => [...prev, { role: "bot", text: LEAD_FLOW[0].question }]);
                        setLeadStep(0);
                      }, 300);
                    }
                  }}
                  className="rounded-full border border-border/40 bg-card/60 px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border/40 p-3">
            <form
              id="chatbot-message-form"
              data-testid="chatbot-message-form"
              aria-label="ONYX AI chatbot message"
              className="flex gap-2 chat-form"
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
              <input
                id="chatbot-message-input"
                data-testid="chatbot-message-input"
                name="chatbot_message"
                aria-label="Chatbot message input"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0"
                aria-label="Send chatbot message"
                data-testid="chatbot-send-button"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
