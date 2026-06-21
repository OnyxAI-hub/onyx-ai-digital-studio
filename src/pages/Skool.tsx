import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/shared/HeroBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  ArrowRight,
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
  CheckCircle2,
  Sparkles,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969/about";

const chapters = [
  { n: "01", icon: BookOpen, title: "The Basics", desc: "AI models, platforms, credits, prompting, workflows, and how to think like an AI creator." },
  { n: "02", icon: ImageIcon, title: "Image Generation", desc: "Photorealism, reference images, prompt structure, character consistency, and tools like Nano Banana." },
  { n: "03", icon: Video, title: "Video Generation", desc: "Turn prompts and images into cinematic AI video with Kling, Seedance, Higgsfield, and modern workflows." },
  { n: "04", icon: Flame, title: "Viral Content", desc: "Hooks, captions, talking-object videos, trending formats, and short-form structure that actually performs." },
  { n: "05", icon: DollarSign, title: "Monetization", desc: "Brand pitching, UGC-style videos, product ads, affiliate content, and turning AI skills into income." },
  { n: "06", icon: Music, title: "AI Music with Suno", desc: "Prompting, sampling, song concepts, release strategies, and using AI music in your own content." },
];

const perks = [
  { icon: Trophy, title: "Weekly Cash Prize Contests", desc: "Compete in AI video and creative challenges for real rewards." },
  { icon: BarChart3, title: "Leaderboard Rewards", desc: "Stay active, post your work, and climb the leaderboard." },
  { icon: KeyRound, title: "Prompt Vault Access", desc: "Prompts, workflows, examples, and full creative breakdowns." },
  { icon: Users, title: "Active Creator Community", desc: "Connect with creators learning AI video, image, music, and monetization." },
  { icon: MessageSquare, title: "Direct Feedback", desc: "Share your work, get notes, and sharpen your craft inside the community." },
  { icon: CalendarDays, title: "Always Updated", desc: "New lessons, tools, and workflows added as the AI space evolves." },
];

const included = [
  "Full chapter-by-chapter curriculum",
  "Weekly challenges with cash prizes",
  "Prompt vault and workflow library",
  "Community of active AI creators",
  "Monetization playbooks and templates",
  "New lessons added consistently",
];

const Skool = () => {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <HeroBackground />
        <div className="container-narrow relative z-10 px-4">
          <AnimatedSection className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ai-cyan)/0.3)] bg-[hsl(var(--ai-cyan)/0.08)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--ai-cyan))]">
              <Sparkles className="h-3 w-3" /> ONYX AI Video Skool
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] md:text-6xl lg:text-7xl">
              Learn AI Video, Image &{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--ai-cyan))] to-[hsl(var(--ai-glow))] bg-clip-text text-transparent">
                Monetization
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A community + course for creators who want to actually understand AI tools, build a creative workflow, and turn their skills into income. $9/month — cancel anytime.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] font-semibold uppercase tracking-wider shadow-[0_0_40px_-10px_hsl(var(--ai-cyan)/0.7)]"
                >
                  Join the Skool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/60 bg-background/40 backdrop-blur uppercase tracking-wider font-semibold"
                >
                  Ask a Question
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              $9/month · Cancel anytime · No long-term commitment
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 md:py-28">
        <div className="container-narrow px-4">
          <SectionHeading
            badge="Curriculum"
            title="What You'll Learn Inside"
            description="Six chapters covering everything from your first prompt to monetizing your AI creations."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c, i) => (
              <AnimatedSection key={c.n} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur transition-all hover:border-[hsl(var(--ai-cyan)/0.4)] hover:bg-card/60">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--ai-cyan)/0.1)] text-[hsl(var(--ai-cyan))]">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-sm font-bold text-muted-foreground/60">{c.n}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Community Perks */}
      <section className="border-y border-border/30 bg-card/20 py-20 md:py-28">
        <div className="container-narrow px-4">
          <SectionHeading
            badge="Community"
            title="More Than a Course"
            description="A live community where creators share work, run challenges, and grow together."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border/40 bg-background/40 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--ai-cyan)/0.1)] text-[hsl(var(--ai-cyan))]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Join card */}
      <section className="py-20 md:py-28">
        <div className="container-narrow px-4">
          <AnimatedSection className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--ai-cyan)/0.3)] bg-gradient-to-br from-[hsl(var(--ai-cyan)/0.08)] via-card/60 to-background p-8 md:p-12">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--ai-cyan)/0.15)] blur-3xl" />
              <div className="relative">
                <span className="mb-4 inline-block rounded-full border border-border/40 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Membership
                </span>
                <div className="flex flex-wrap items-end gap-3">
                  <span className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">$9</span>
                  <span className="pb-2 text-muted-foreground">/ month · cancel anytime</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Everything you need to start creating with AI
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--ai-cyan))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className="sm:flex-1">
                    <Button
                      size="lg"
                      className="w-full bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] font-semibold uppercase tracking-wider shadow-[0_0_40px_-10px_hsl(var(--ai-cyan)/0.7)]"
                    >
                      Join the Skool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <Link to="/contact" className="sm:flex-1">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-border/60 bg-background/40 backdrop-blur uppercase tracking-wider font-semibold"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Skool;
