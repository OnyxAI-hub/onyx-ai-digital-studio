import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/shared/HeroBackground";
import {
  BookOpen,
  Image as ImageIcon,
  Video,
  Flame,
  DollarSign,
  Music,
  Trophy,
  BarChart3,
  Users,
  KeyRound,
  ArrowRight,
  Sparkles,
  Globe,
  Phone,
  Palette,
  Wand2,
  Workflow,
  Megaphone,
  Terminal,
} from "lucide-react";

import xavierHeadshot from "@/assets/xavier-headshot.jpg";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969/about";
const SPOTIFY_URL = "https://open.spotify.com/album/3ECiQ7o24hMVDSE4RE3oZa";

const SkoolBtn = ({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "lg" | "default" | "sm";
}) => (
  <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
    <Button
      size={size}
      className="bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] font-semibold uppercase tracking-wider shadow-[0_0_40px_-10px_hsl(var(--ai-cyan)/0.7)]"
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </a>
);

const chapters = [
  { n: "01", icon: BookOpen, title: "The Basics", desc: "Learn AI models, platforms, credits, prompting, workflows, and how to think like an AI creator." },
  { n: "02", icon: ImageIcon, title: "Image Generation", desc: "Create better AI images using tools like Nano Banana, photorealism techniques, reference images, prompt structure, and character consistency." },
  { n: "03", icon: Video, title: "Video Generation", desc: "Turn prompts and images into cinematic AI videos using tools like Kling, Seedance, Higgsfield, and modern video workflows." },
  { n: "04", icon: Flame, title: "Viral Content", desc: "Break down talking object videos, trending AI formats, hooks, captions, short-form structure, and social media content ideas." },
  { n: "05", icon: DollarSign, title: "Monetization", desc: "Learn ways to turn AI skills into money through brand pitching, UGC-style videos, product ads, affiliate content, and creative services." },
  { n: "06", icon: Music, title: "AI Music with Suno", desc: "Learn AI music workflows with Suno, including prompting, sampling ideas, song concepts, content use, and release strategies." },
];

const community = [
  { icon: Trophy, title: "Weekly Cash Prize Contests", desc: "Compete in AI video and creative challenges for a chance to win rewards." },
  { icon: BarChart3, title: "Leaderboard Rewards", desc: "Stay active, post your work, learn consistently, and climb the leaderboard." },
  { icon: KeyRound, title: "Prompt Vault Access", desc: "Get access to prompts, workflows, examples, and creative breakdowns." },
  { icon: Users, title: "Active Creator Community", desc: "Connect with other creators learning AI video, image generation, music, and monetization." },
];

const tools = [
  "Higgsfield", "Nano Banana", "Kling", "Seedance",
  "ElevenLabs", "Suno", "ChatGPT", "Claude",
  "Pixabay", "CapCut", "MakeUGC", "InVideo",
];

const services = [
  { icon: Globe, title: "Website Builds", price: "Starting at $500", desc: "Modern websites and landing pages for creators, service businesses, salons, brands, and entrepreneurs." },
  { icon: Phone, title: "Voice Agents", desc: "AI voice agents and phone/customer support flows to help businesses answer questions, capture leads, and route customers." },
  { icon: Palette, title: "Branding", desc: "Logo concepts, visual direction, brand colors, social graphics, and AI-assisted brand assets." },
  { icon: Wand2, title: "AI Creative Support", desc: "AI images, promo visuals, short-form content ideas, cover art concepts, and video concepts." },
  { icon: Workflow, title: "Automation Support", desc: "Customer intake, booking/payment flows, follow-up systems, simple business workflows, and more." },
  { icon: Megaphone, title: "Social Media Support", desc: "Content ideas, captions, post concepts, AI visuals, and creator/business content planning." },
];

const Index = () => {
  return (
    <main id="top" className="pt-[72px] md:pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0 -z-10 bg-background">
          <HeroBackground />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 15% 10%, hsl(var(--ai-cyan) / 0.18), transparent 60%), radial-gradient(ellipse 60% 55% at 90% 80%, hsl(265 90% 60% / 0.18), transparent 65%)",
            }}
          />
        </div>

        <div className="container-narrow px-4 py-20 md:py-28 w-full">
          <div className="flex flex-col items-center text-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">
                <Terminal className="h-3 w-3" /> ONYX AI Video Skool
              </span>
              <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.02]">
                Learn AI Video,
                <br />
                Image Creation
                <br />
                <span className="bg-gradient-to-r from-[hsl(var(--ai-cyan))] via-[hsl(var(--ai-glow))] to-[hsl(265_90%_72%)] bg-clip-text text-transparent">
                  & Monetization
                </span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Join ONYX AI Video Skool and learn AI image generation, cinematic video creation, viral content formats, monetization strategies, and AI music workflows with Suno.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <SkoolBtn>Join the Skool</SkoolBtn>
                <a href="#learn">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/60 bg-card/40 backdrop-blur-md uppercase tracking-wider font-semibold hover:bg-card/70 hover:border-[hsl(var(--ai-cyan))]/50"
                  >
                    Explore What You'll Learn
                  </Button>
                </a>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Join for <span className="text-foreground font-semibold">$9/month</span> on Skool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="learn" className="section-padding section-charcoal border-y border-border/40">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">Curriculum</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">
              What You'll Learn Inside <span className="gradient-text">ONYX AI Video Skool</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Step-by-step AI creation lessons for creators, artists, entrepreneurs, and anyone who wants to use AI to make content and income.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c) => (
              <div key={c.n} className="silver-card-hover p-6 group">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 text-[hsl(var(--ai-cyan))] transition-shadow group-hover:shadow-[0_0_24px_-4px_hsl(var(--ai-cyan)/0.5)]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-xs font-semibold tracking-[0.25em] text-muted-foreground/60">CH {c.n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="section-padding">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">The Community</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">
              Built for Creators Who Want to Level Up Fast
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {community.map((b) => (
              <div key={b.title} className="glass-card-hover p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 text-[hsl(var(--ai-cyan))]">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SkoolBtn>Join for $9/month</SkoolBtn>
            <span className="text-xs text-muted-foreground">Cancel anytime · Active community</span>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section-padding section-silver">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">Stack</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">Tools We Break Down</h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Learn how to combine AI tools into real creative workflows for videos, images, music, and content.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {tools.map((t) => (
              <div
                key={t}
                className="flex items-center justify-center rounded-lg border border-border/60 bg-card/60 backdrop-blur-md px-3 py-5 text-center text-sm font-semibold tracking-tight transition-all hover:border-[hsl(var(--ai-cyan))]/60 hover:bg-card/80 hover:text-[hsl(var(--ai-cyan))] hover:shadow-[0_0_24px_-8px_hsl(var(--ai-cyan)/0.5)]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONYX SERVICES */}
      <section id="services" className="section-padding border-t border-border/40">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">ONYX AI Services</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">
              Need ONYX to Build It For You?
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Beyond the Skool, ONYX AI helps businesses and creators build websites, branding, voice agents, AI content systems, and more.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="glass-card-hover p-6 group">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 text-[hsl(var(--ai-cyan))]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  {s.price && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--ai-cyan))]">
                      {s.price}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[hsl(var(--ai-cyan))]/40 bg-card/40 backdrop-blur-md uppercase tracking-wider font-semibold hover:bg-card/70 hover:border-[hsl(var(--ai-cyan))]"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT XAVIER */}
      <section id="about" className="section-padding section-charcoal border-y border-border/40">
        <div className="container-narrow px-4">
          <div className="grid gap-12 md:grid-cols-5 items-center">
            <div className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden border border-border/60 aspect-square max-w-sm">
                <div
                  className="absolute inset-0 -z-10 blur-2xl opacity-60"
                  style={{ background: "radial-gradient(circle, hsl(var(--ai-cyan) / 0.45), transparent 60%)" }}
                />
                <img src={xavierHeadshot} alt="Xavier" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="md:col-span-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">Founder</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">Built by Xavier</h2>
              <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Xavier is the creator behind ONYX AI and ONYX AI Video Skool. He creates with AI video tools, image generation platforms, and Suno music workflows, and built the Skool to help creators learn how to make better AI content and turn their skills into real opportunities.
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                He also released a full lo-fi album using Suno-assisted music workflows.{" "}
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--ai-cyan))] hover:text-[hsl(var(--ai-glow))] underline-offset-4 hover:underline"
                >
                  Listen on Spotify →
                </a>
              </p>
              <div className="mt-8">
                <SkoolBtn>Join the Skool</SkoolBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding">
        <div className="container-narrow px-4">
          <div
            className="relative overflow-hidden rounded-2xl border border-[hsl(var(--ai-cyan))]/30 px-6 py-16 md:px-14 md:py-24 text-center glow-cyan"
            style={{
              background:
                "radial-gradient(ellipse at top, hsl(var(--ai-cyan) / 0.22), transparent 60%), radial-gradient(ellipse at bottom right, hsl(265 90% 60% / 0.18), transparent 60%), hsl(var(--card) / 0.6)",
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ai-cyan))]/40 bg-[hsl(var(--ai-cyan))]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">
              <Sparkles className="h-3 w-3" /> ONYX AI Video Skool
            </span>
            <h2 className="mt-5 font-display text-3xl md:text-5xl font-extrabold tracking-[-0.025em]">
              Start Creating With AI Today
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
              Join ONYX AI Video Skool and learn how to create cinematic AI videos, better images, AI music, viral content, and monetization-ready projects.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <SkoolBtn>Join the Skool</SkoolBtn>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">$9/month</span> on Skool. New lessons and creative breakdowns added regularly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
