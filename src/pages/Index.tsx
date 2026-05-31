import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import onyxRobot from "@/assets/onyx-robot.png";
import xavierHeadshot from "@/assets/xavier-headshot.jpg";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969";
const SPOTIFY_URL = "https://open.spotify.com/album/3ECiQ7o24hMVDSE4RE3oZa";

const CtaButton = ({ children, size = "lg" }: { children: React.ReactNode; size?: "lg" | "default" }) => (
  <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
    <Button
      size={size}
      className="bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] font-semibold uppercase tracking-wider shadow-[0_0_40px_-10px_hsl(var(--ai-cyan)/0.6)]"
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </a>
);

const chapters = [
  { n: "01", icon: BookOpen, title: "The Basics", desc: "Learn AI models, platforms, credits, prompting, workflows, and how to think like an AI creator." },
  { n: "02", icon: ImageIcon, title: "Image Generation", desc: "Create high-quality AI images using tools like Nano Banana Pro, photorealism techniques, reference images, and character consistency." },
  { n: "03", icon: Video, title: "Video Generation", desc: "Turn images and prompts into cinematic motion using tools like Kling 3.0, Seedance 2.0, camera movement, pacing, and scene direction." },
  { n: "04", icon: Flame, title: "Viral Content", desc: "Break down talking object videos, viral formats, short-form trends, hooks, captions, and social media content styles." },
  { n: "05", icon: DollarSign, title: "Monetization", desc: "Learn how creators can pitch brands, make UGC-style content, use affiliate offers, create product ads, and turn AI skills into income." },
  { n: "06", icon: Music, title: "AI Music with Suno", desc: "Learn how to prompt, create, sample, arrange, and release AI-assisted music using Suno and music distribution platforms." },
];

const community = [
  { icon: Trophy, title: "Weekly Cash Prize Contests", desc: "Enter AI video and creative challenges for a chance to win rewards and sharpen your skills." },
  { icon: BarChart3, title: "Leaderboard Rewards", desc: "Stay active, post your work, improve your craft, and climb the community leaderboard." },
  { icon: Users, title: "Active Creator Community", desc: "Connect with people learning AI video, image generation, music, content creation, and monetization." },
  { icon: KeyRound, title: "Prompt Vault Access", desc: "Get access to prompts, workflows, breakdowns, and creative ideas you can use for your own content." },
];

const tools = ["Higgsfield", "Nano Banana Pro", "Kling 3.0", "Seedance 2.0", "ElevenLabs", "Suno", "ChatGPT", "Claude", "Pixabay", "CapCut"];

const Index = () => {
  return (
    <main id="top" className="pt-[72px] md:pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, hsl(var(--ai-cyan) / 0.18), transparent 60%), radial-gradient(ellipse 70% 60% at 90% 30%, hsl(260 90% 60% / 0.18), transparent 60%), hsl(var(--background))",
          }}
        />
        <div className="container-narrow px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--ai-cyan))]">
                <Sparkles className="h-3 w-3" /> AI Creator School
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Learn to Create
                <br />
                <span className="bg-gradient-to-r from-[hsl(var(--ai-cyan))] via-[hsl(var(--ai-glow))] to-[hsl(260_90%_70%)] bg-clip-text text-transparent">
                  Cinematic AI Videos
                </span>
              </h1>
              <p className="mt-4 text-lg md:text-xl font-medium text-foreground/90">
                Join the Onyx AI Video Skool Community
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                Master AI image generation, video creation, music production, and monetization strategies. New lessons, prompts, and creative breakdowns added constantly.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <CtaButton>Join the Community</CtaButton>
                <span className="text-xs text-muted-foreground">$8/month on Skool</span>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-60"
                style={{ background: "radial-gradient(circle, hsl(var(--ai-cyan) / 0.45), transparent 60%)" }}
              />
              <img
                src={onyxRobot}
                alt="Onyx AI robot mascot"
                width={1024}
                height={1024}
                className="w-full max-w-md drop-shadow-[0_0_60px_hsl(var(--ai-cyan)/0.4)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="learn" className="section-padding border-t border-border/30">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">Curriculum</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">What You'll Learn Inside</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Step-by-step lessons for creators who want to use AI to make better videos, visuals, music, and content.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c) => (
              <div
                key={c.n}
                className="group relative rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:border-[hsl(var(--ai-cyan))]/50 hover:bg-card/70"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 text-[hsl(var(--ai-cyan))]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-muted-foreground/60">CH {c.n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="section-padding border-t border-border/30">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">The Community</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Built for AI Creators Who Want to Improve Fast
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {community.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-border/60 bg-gradient-to-br from-card/70 to-card/30 p-6 transition-colors hover:border-[hsl(var(--ai-cyan))]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--ai-cyan))]/30 bg-[hsl(var(--ai-cyan))]/5 text-[hsl(var(--ai-cyan))]">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CtaButton>Join for $8/month</CtaButton>
            <span className="text-xs text-muted-foreground">Cancel anytime · Active community</span>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section-padding border-t border-border/30">
        <div className="container-narrow px-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">Stack</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">Tools We Break Down</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Learn how to combine AI tools into real creative workflows for videos, visuals, music, and content.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {tools.map((t) => (
              <div
                key={t}
                className="flex items-center justify-center rounded-lg border border-border/60 bg-card/40 px-4 py-5 text-center text-sm font-medium text-foreground/90 transition-all hover:border-[hsl(var(--ai-cyan))]/50 hover:bg-card/70 hover:text-[hsl(var(--ai-cyan))]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT XAVIER */}
      <section id="about" className="section-padding border-t border-border/30">
        <div className="container-narrow px-4">
          <div className="grid gap-10 md:grid-cols-5 items-center">
            <div className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden border border-border/60 aspect-square max-w-sm">
                <div
                  className="absolute inset-0 -z-10 blur-2xl opacity-50"
                  style={{ background: "radial-gradient(circle, hsl(var(--ai-cyan) / 0.4), transparent 60%)" }}
                />
                <img src="/src/assets/xavier-headshot.jpg" alt="Xavier" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="md:col-span-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ai-cyan))]">Founder</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">Built by Xavier</h2>
              <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Xavier is the founder of Onyx AI Video Skool — an AI creator focused on cinematic AI videos, image generation, AI music, and practical monetization strategies. After experimenting with tools like Suno, AI video models, image generation platforms, and short-form content workflows, he built this community to help creators learn faster and start building with AI.
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                He also released a full lo-fi album on Spotify using Suno-assisted music workflows.{" "}
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--ai-cyan))] hover:text-[hsl(var(--ai-glow))] underline-offset-4 hover:underline"
                >
                  Listen on Spotify →
                </a>
              </p>
              <div className="mt-7">
                <CtaButton>Join the Community</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding border-t border-border/30">
        <div className="container-narrow px-4">
          <div
            className="relative overflow-hidden rounded-2xl border border-[hsl(var(--ai-cyan))]/30 px-6 py-14 md:px-14 md:py-20 text-center"
            style={{
              background:
                "radial-gradient(ellipse at top, hsl(var(--ai-cyan) / 0.18), transparent 60%), radial-gradient(ellipse at bottom right, hsl(260 90% 60% / 0.18), transparent 60%), hsl(var(--card) / 0.6)",
            }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Start Creating With AI Today
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
              Join Onyx AI Video Skool and learn how to create cinematic videos, AI images, music, viral content, and monetization-ready projects.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <CtaButton>Enter the Skool</CtaButton>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">New lessons and creative breakdowns added regularly.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
