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
  text: "Hi! I'm the ONYX AI assistant. I can help you learn about our services, find the right package, or connect you with Xavier. What can I help you with?",
};

const FAQ_RESPONSES: Record<string, string> = {
  pricing: "We have three packages: Starter ($250), Business ($550, most popular), and Advanced ($1,100). Want me to help you figure out which one fits your needs?",
  price: "We have three packages: Starter ($250), Business ($550, most popular), and Advanced ($1,100). Want me to help you figure out which one fits your needs?",
  cost: "We have three packages: Starter ($250), Business ($550, most popular), and Advanced ($1,100). Want me to help you figure out which one fits your needs?",
  services: "We build business websites, landing pages, web apps, dashboards, booking systems, and AI chatbots. We also offer add-ons like logo design, copywriting, and maintenance. What does your business need?",
  timeline: "Most projects are completed in 2–4 weeks depending on complexity. Rush delivery is available as an add-on. When do you need your project ready?",
  "how long": "Most projects are completed in 2–4 weeks depending on complexity. Rush delivery is available as an add-on.",
  revision: "Revisions are included with every package — 1 round for Starter, 3 for Business, and 5 for Advanced.",
  support: "Our Advanced package includes 30 days of post-launch support. We also offer monthly maintenance plans starting at $50/month.",
  contact: "You can reach us at hello@onyxai.dev or book a consultation directly on our Contact page. Want me to take your details now?",
  about: "ONYX AI is a premium digital agency founded by Xavier. We build modern websites, web apps, and AI-powered solutions for businesses of all sizes.",
};

const LEAD_FLOW = [
  { key: "name", question: "Great! What's your name?" },
  { key: "email", question: "Thanks! What's the best email to reach you?" },
  { key: "summary", question: "Perfect. In a few words, what are you looking to build?" },
];

const findFAQResponse = (input: string): string | null => {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(keyword)) return response;
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

    // If in lead capture flow
    if (leadStep >= 0 && leadStep < LEAD_FLOW.length) {
      const currentKey = LEAD_FLOW[leadStep].key;
      const newData = { ...leadData, [currentKey]: text };
      setLeadData(newData);

      const nextStep = leadStep + 1;
      if (nextStep < LEAD_FLOW.length) {
        addMessages(text, LEAD_FLOW[nextStep].question);
        setLeadStep(nextStep);
      } else {
        addMessages(text, `Thanks, ${newData.name}! I've noted your details. Xavier will follow up at ${newData.email} soon. In the meantime, feel free to explore our services or pricing.`);
        setLeadStep(-1);
        console.log("Lead captured:", newData);
      }
      return;
    }

    // Check for FAQ match
    const faqResponse = findFAQResponse(text);
    if (faqResponse) {
      addMessages(text, faqResponse);
      return;
    }

    // Check for intent to start lead flow
    const lower = text.toLowerCase();
    if (lower.includes("get started") || lower.includes("consultation") || lower.includes("hire") || lower.includes("quote") || lower.includes("interested")) {
      addMessages(text, LEAD_FLOW[0].question);
      setLeadStep(0);
      return;
    }

    // Default fallback
    addMessages(text, "I can help with information about our services, pricing, and process. If you'd like to get started, just say so and I'll collect your details for Xavier to follow up.");
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-card/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={onyxLogo} alt="ONYX AI" className="h-5" />
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
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border/50 p-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-border/50 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button type="submit" size="icon" className="shrink-0">
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
