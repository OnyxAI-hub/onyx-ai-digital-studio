export interface FeedPost {
  id: string;
  author: string;
  handle: string;
  gradient: string;
  caption: string;
  model: string;
  likes: number;
  comments: number;
  views: number;
  challenge?: string;
}

export const feedPosts: FeedPost[] = [
  { id: "p1", author: "Nova Atlas", handle: "@nova.atlas", gradient: "from-slate-900 via-indigo-950 to-cyan-950", caption: "Midnight skyline study — Onyx Vision Pro, brand palette locked.", model: "Onyx Vision Pro", likes: 248, comments: 14, views: 3120 },
  { id: "p2", author: "Echo Reign", handle: "@echo.reign", gradient: "from-zinc-900 via-zinc-700 to-zinc-900", caption: "Promo loop concept for the new chrome line.", model: "Onyx Motion v1", likes: 412, comments: 36, views: 5980, challenge: "Cyber City Night" },
  { id: "p3", author: "Halo Mercer", handle: "@halo.m", gradient: "from-indigo-950 via-violet-950 to-slate-900", caption: "Lo-fi visualizer pass for the upcoming EP.", model: "Onyx Loop", likes: 187, comments: 9, views: 2140 },
  { id: "p4", author: "Studio Onyx", handle: "@onyx.studio", gradient: "from-stone-700 via-zinc-600 to-stone-800", caption: "Chrome brand kit — exploring metallic edges and depth.", model: "Onyx Canvas", likes: 96, comments: 5, views: 1320 },
  { id: "p5", author: "Vela Marsh", handle: "@vela.m", gradient: "from-zinc-900 via-slate-800 to-black", caption: "Album cover concept — high contrast monochrome.", model: "Onyx Vision Pro", likes: 332, comments: 22, views: 4680, challenge: "Luxury Product Shot" },
  { id: "p6", author: "Drift Kaito", handle: "@drift.k", gradient: "from-cyan-950 via-slate-900 to-zinc-900", caption: "Short-form motion test, 5s premium loop.", model: "Premium Video Model", likes: 274, comments: 18, views: 3890 },
];

export interface Challenge {
  id: string;
  title: string;
  theme: string;
  banner: string;
  status: "active" | "upcoming" | "past";
  entries: number;
  votes: number;
  timeLeft: string;
  prize: string;
}

export const challenges: Challenge[] = [
  { id: "c1", title: "Cyber City Night", theme: "Neon-lit cyberpunk streets, atmospheric, cinematic.", banner: "from-indigo-950 via-cyan-950 to-slate-900", status: "active", entries: 248, votes: 1820, timeLeft: "3d 14h", prize: "5,000 credits" },
  { id: "c2", title: "Luxury Product Shot", theme: "Premium, editorial product visuals — chrome, glass, glow.", banner: "from-stone-800 via-zinc-700 to-stone-900", status: "active", entries: 134, votes: 980, timeLeft: "5d 02h", prize: "5,000 credits" },
  { id: "c3", title: "On the Cloud", theme: "Surreal cloudscapes, soft light, dreamlike compositions.", banner: "from-slate-700 via-zinc-600 to-slate-800", status: "active", entries: 86, votes: 612, timeLeft: "6d 22h", prize: "5,000 credits" },
  { id: "c4", title: "Red Carpet Moment", theme: "High-fashion editorial, dramatic lighting, premium feel.", banner: "from-rose-950 via-zinc-900 to-black", status: "upcoming", entries: 0, votes: 0, timeLeft: "Starts in 4d", prize: "5,000 credits" },
  { id: "c5", title: "Alien Invasion", theme: "Otherworldly, cinematic, ominous atmosphere.", banner: "from-emerald-950 via-slate-900 to-zinc-950", status: "upcoming", entries: 0, votes: 0, timeLeft: "Starts in 9d", prize: "5,000 credits" },
  { id: "c6", title: "Hotel Lobby Mystery", theme: "Noir-inspired, art deco, cinematic mood.", banner: "from-amber-950 via-zinc-900 to-zinc-950", status: "past", entries: 412, votes: 3104, timeLeft: "Closed", prize: "5,000 credits" },
];

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  readTime: string;
  claps: number;
  views: number;
  gradient: string;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "Prompting for Cinematic Video — A Studio Guide", author: "ONYX Editorial", category: "Tutorials", readTime: "8 min", claps: 412, views: 5820, gradient: "from-slate-900 via-indigo-950 to-cyan-950", excerpt: "How shot framing, motion cues, and lighting words shape AI video output." },
  { id: "b2", title: "Building a Chrome Brand Kit with AI Canvas", author: "Studio Onyx", category: "AI Images", readTime: "6 min", claps: 268, views: 3940, gradient: "from-stone-700 via-zinc-600 to-stone-800", excerpt: "Lock in palette, typography, and metallic motifs in a single workflow." },
  { id: "b3", title: "Music Visualizer Concepts That Convert", author: "Halo Mercer", category: "Audio", readTime: "5 min", claps: 184, views: 2680, gradient: "from-indigo-950 via-violet-950 to-slate-900", excerpt: "Looping visuals for releases, reels, and promo." },
  { id: "b4", title: "Inside the Creator Program", author: "ONYX Team", category: "Creator Program", readTime: "4 min", claps: 96, views: 1420, gradient: "from-zinc-900 via-zinc-700 to-zinc-900", excerpt: "How rewards, challenges, and feed activity feed back into credits." },
  { id: "b5", title: "AI Agents for Booking & Lead Capture", author: "ONYX Automation", category: "Business Automation", readTime: "7 min", claps: 142, views: 2110, gradient: "from-cyan-950 via-slate-900 to-zinc-900", excerpt: "Practical patterns for chat and voice agents in service businesses." },
  { id: "b6", title: "Landing Page Patterns for AI Products", author: "ONYX Build", category: "Website Creation", readTime: "9 min", claps: 218, views: 3220, gradient: "from-slate-800 via-zinc-700 to-slate-900", excerpt: "Hero, proof, pricing — how AI-native pages convert." },
];

export const blogCategories = [
  "All", "Tutorials", "AI Images", "AI Video", "Audio", "Prompting", "Creator Program", "Platform Updates", "Business Automation", "Website Creation",
] as const;

export const dailyStreak = [
  { day: 1, credits: 20 },
  { day: 2, credits: 30 },
  { day: 3, credits: 40 },
  { day: 4, credits: 50 },
  { day: 5, credits: 60 },
];

export const socialRewards = [
  { label: "Like posts", credits: 30 },
  { label: "Comment on posts", credits: 30 },
  { label: "Create posts", credits: 50 },
  { label: "Receive likes", credits: 150 },
  { label: "Clap blogs", credits: 30 },
  { label: "Enter a challenge", credits: 100 },
];
