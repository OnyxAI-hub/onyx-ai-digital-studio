import {
  Image as ImageIcon,
  Video,
  Mic,
  Music2,
  Sparkles,
  Wand2,
  Palette,
  Scissors,
  Users,
  Camera,
  Sun,
  Box,
  Eraser,
  PenTool,
  Bot,
  Globe,
  Shield,
  Layers,
  Film,
  Brush,
  Home,
  FolderOpen,
  Headphones,
  AppWindow,
  Cpu,
  FileText,
  Newspaper,
  Trophy,
  Rss,
  LifeBuoy,
  HelpCircle,
  Mail,
  Megaphone,
  User as UserIcon,
} from "lucide-react";

export type Safety =
  | "Safe"
  | "Teen"
  | "Mature"
  | "Strict"
  | "Moderate"
  | "Unrestricted where allowed"
  | "Business Safe"
  | "Creative"
  | "Experimental";

/* ─── Studio categories (hub) ─── */
export interface StudioCategory {
  title: string;
  description: string;
  icon: typeof ImageIcon;
  items: string[];
  intakeType: string;
  cta: string;
}

export const studioCategories: StudioCategory[] = [
  {
    title: "Image Studio",
    description: "Text→Image and Image→Image creation for covers, products, brand visuals, and concepts.",
    icon: ImageIcon,
    items: ["Text → Image", "Image → Image", "Brand visuals", "Product images"],
    intakeType: "AI Image Creation",
    cta: "Start Creative Request",
  },
  {
    title: "Video Studio",
    description: "Short AI video clips, motion concepts, promo loops, and music visuals.",
    icon: Video,
    items: ["Text → Video", "Image → Video", "Promo clips", "Cinematic loops"],
    intakeType: "AI Video Generation",
    cta: "Submit Request",
  },
  {
    title: "Audio Studio",
    description: "Voiceovers, narration, music visualizers, and creative audio support.",
    icon: Mic,
    items: ["Text → Speech", "Music visualizers", "Voiceovers", "Narration"],
    intakeType: "Custom AI Request",
    cta: "Submit Request",
  },
  {
    title: "Apps",
    description: "Face swap, relight, motion control, and creative AI tools — consent-based use only.",
    icon: Wand2,
    items: ["Face swap", "Relight", "Motion control", "More coming soon"],
    intakeType: "Custom AI Request",
    cta: "Request Access",
  },
  {
    title: "Design Studio",
    description: "AI canvas, brand assets, cover art, product visuals, and social graphics.",
    icon: Palette,
    items: ["AI canvas", "Brand assets", "Cover art", "Social graphics"],
    intakeType: "Cover Art / Brand Visual",
    cta: "Start Creative Request",
  },
  {
    title: "Clip Studio",
    description: "Short-form video clipping for Reels, TikTok, and YouTube Shorts.",
    icon: Scissors,
    items: ["AI video clipping", "Reels concepts", "TikTok concepts", "YT Shorts"],
    intakeType: "AI Promo Video",
    cta: "Submit Request",
  },
  {
    title: "Studio Gallery",
    description: "Explore featured concepts and AI outputs created through ONYX projects.",
    icon: Users,
    items: ["Featured concepts", "Trending outputs", "Categorized", "Brand-safe"],
    intakeType: "Custom AI Request",
    cta: "Browse Gallery",
  },
];

/* ─── Model highlights ─── */
export interface ModelHighlight {
  name: string;
  type: "Video" | "Image" | "Audio" | "Design" | "Multi-Modal";
  description: string;
  safety: Safety;
  generate: string[];
  cost: string;
  status?: "Available" | "Early Access" | "Coming Soon";
  intakeType: string;
}

export const modelHighlights: ModelHighlight[] = [
  {
    name: "Onyx Motion v1",
    type: "Video",
    description: "Text/image-to-video for cinematic clips, motion concepts, and promo visuals.",
    safety: "Moderate",
    generate: ["Text → Video", "Image → Video"],
    cost: "From 500 credits",
    status: "Available",
    intakeType: "AI Video Generation",
  },
  {
    name: "Onyx Vision Pro",
    type: "Image",
    description: "Premium image model for polished cover art, product visuals, and brand assets.",
    safety: "Strict",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 15 credits",
    status: "Available",
    intakeType: "AI Image Creation",
  },
  {
    name: "Onyx Compose",
    type: "Audio",
    description: "Voiceovers, narration, and music visualizer concepts with creative direction.",
    safety: "Safe",
    generate: ["Text → Speech", "Audio Concepts"],
    cost: "From 10 credits",
    status: "Available",
    intakeType: "Custom AI Request",
  },
  {
    name: "Onyx Canvas",
    type: "Design",
    description: "Brand visuals, social graphics, covers, and creative layouts via AI canvas.",
    safety: "Business Safe",
    generate: ["Text → Design", "Image → Design"],
    cost: "From 8 credits",
    status: "Early Access",
    intakeType: "Cover Art / Brand Visual",
  },
  {
    name: "Onyx Cinematic Ultra",
    type: "Video",
    description: "High-detail premium video workflow for cinematic outputs and polished promos.",
    safety: "Moderate",
    generate: ["Text → Video", "Image → Video"],
    cost: "From 1,000 credits",
    status: "Early Access",
    intakeType: "AI Video Generation",
  },
  {
    name: "Onyx Spark",
    type: "Image",
    description: "Fast iterative image model for quick concepts and ideation passes.",
    safety: "Moderate",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 5 credits",
    status: "Available",
    intakeType: "AI Image Creation",
  },
  {
    name: "Onyx Creative Edge",
    type: "Image",
    description: "Creative image model with broader stylistic range where platform rules permit.",
    safety: "Unrestricted where allowed",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 10 credits",
    status: "Early Access",
    intakeType: "AI Image Creation",
  },
  {
    name: "Onyx Loop",
    type: "Multi-Modal",
    description: "Music visualizer concepts — looping visuals for album promo and short-form music.",
    safety: "Creative",
    generate: ["Audio + Image → Video"],
    cost: "From 75 credits",
    status: "Available",
    intakeType: "Music Visualizer",
  },
];

/* ─── Image models ─── */
export interface ImageModel {
  name: string;
  description: string;
  safety: Safety;
  generate: string[];
  cost: string;
  gradient: string;
  intakeType: string;
}

export const imageModels: ImageModel[] = [
  {
    name: "Fast Image Model",
    description: "Affordable image model for quick ideation, drafts, and concept passes.",
    safety: "Moderate",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 5 credits",
    gradient: "from-zinc-800 via-zinc-700 to-zinc-900",
    intakeType: "AI Image Creation",
  },
  {
    name: "Premium Image Model",
    description: "Polished image generation for covers, brand visuals, and campaign assets.",
    safety: "Strict",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 15 credits",
    gradient: "from-slate-700 via-zinc-600 to-slate-800",
    intakeType: "AI Image Creation",
  },
  {
    name: "Creative Image Model",
    description: "Broader stylistic range for artistic concepts where platform rules permit.",
    safety: "Unrestricted where allowed",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 10 credits",
    gradient: "from-indigo-950 via-slate-800 to-zinc-900",
    intakeType: "AI Image Creation",
  },
  {
    name: "Product Visual Model",
    description: "Clean product mockups and lifestyle visuals optimized for e-commerce.",
    safety: "Safe",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 12 credits",
    gradient: "from-zinc-700 via-stone-700 to-zinc-800",
    intakeType: "AI Image Creation",
  },
  {
    name: "Cover Art Model",
    description: "Stylized covers, album art concepts, and editorial visuals.",
    safety: "Moderate",
    generate: ["Text → Image", "Image → Image"],
    cost: "From 15 credits",
    gradient: "from-slate-900 via-zinc-800 to-cyan-950",
    intakeType: "Cover Art / Brand Visual",
  },
  {
    name: "HD / 4K Upscale",
    description: "Higher-resolution finish for hero visuals, posters, and large prints.",
    safety: "Safe",
    generate: ["Image → Upscale"],
    cost: "From 25 credits",
    gradient: "from-zinc-800 via-slate-700 to-zinc-900",
    intakeType: "AI Image Creation",
  },
];

/* ─── Video models ─── */
export interface VideoModel {
  name: string;
  description: string;
  safety: Safety;
  tiers: { length: string; credits: string }[];
  intakeType: string;
}

export const videoModels: VideoModel[] = [
  {
    name: "Fast Video Model",
    description: "Affordable short video generation for quick motion concepts.",
    safety: "Moderate",
    tiers: [
      { length: "5 sec", credits: "300 credits" },
      { length: "10 sec", credits: "600 credits" },
      { length: "15 sec", credits: "900 credits" },
    ],
    intakeType: "AI Video Generation",
  },
  {
    name: "Standard Video Model",
    description: "Balanced video generation for social clips, promos, and visual ideas.",
    safety: "Moderate",
    tiers: [
      { length: "5 sec", credits: "500 credits" },
      { length: "10 sec", credits: "1,000 credits" },
      { length: "15 sec", credits: "1,500 credits" },
    ],
    intakeType: "AI Video Generation",
  },
  {
    name: "Premium Video Model",
    description: "Higher-quality video for cinematic or polished promotional visuals.",
    safety: "Strict",
    tiers: [
      { length: "5 sec", credits: "750 credits" },
      { length: "10 sec", credits: "1,500 credits" },
      { length: "15 sec", credits: "2,250 credits" },
    ],
    intakeType: "AI Video Generation",
  },
  {
    name: "Ultra Video Model",
    description: "Advanced workflow for high-detail outputs and premium creative direction.",
    safety: "Strict",
    tiers: [
      { length: "5 sec", credits: "1,000 credits" },
      { length: "10 sec", credits: "2,000 credits" },
      { length: "15 sec", credits: "3,000 credits" },
    ],
    intakeType: "AI Video Generation",
  },
];

/* ─── Creative apps ─── */
export interface CreativeApp {
  title: string;
  description: string;
  safety: Safety;
  icon: typeof Wand2;
  status: "Available" | "Coming Soon" | "Early Access";
  intakeType: string;
}

export const creativeApps: CreativeApp[] = [
  {
    title: "Motion Control",
    description: "Transfer motion, direction, or movement style into creative video concepts.",
    safety: "Moderate",
    icon: Film,
    status: "Early Access",
    intakeType: "AI Video Generation",
  },
  {
    title: "Face Swap",
    description: "Consent-based face swap concepts for approved creative use.",
    safety: "Strict",
    icon: Users,
    status: "Early Access",
    intakeType: "Custom AI Request",
  },
  {
    title: "Relight",
    description: "Adjust lighting direction and mood for images and visual concepts.",
    safety: "Safe",
    icon: Sun,
    status: "Coming Soon",
    intakeType: "Custom AI Request",
  },
  {
    title: "Camera Angles",
    description: "Create new angles or perspective variations from visual references.",
    safety: "Safe",
    icon: Camera,
    status: "Coming Soon",
    intakeType: "Custom AI Request",
  },
  {
    title: "Try-On / Product Preview",
    description: "Fashion, product, or styling previews for brands and creators.",
    safety: "Business Safe",
    icon: Box,
    status: "Early Access",
    intakeType: "AI Image Creation",
  },
  {
    title: "Background Remover",
    description: "Remove or replace backgrounds for products, portraits, and assets.",
    safety: "Safe",
    icon: Eraser,
    status: "Available",
    intakeType: "AI Image Creation",
  },
  {
    title: "Clip Generator",
    description: "Turn longer ideas into short-form video concepts for Reels, TikTok, Shorts.",
    safety: "Moderate",
    icon: Scissors,
    status: "Early Access",
    intakeType: "AI Promo Video",
  },
  {
    title: "Design Canvas",
    description: "Build brand visuals, social graphics, covers, and creative layouts.",
    safety: "Business Safe",
    icon: PenTool,
    status: "Available",
    intakeType: "Cover Art / Brand Visual",
  },
];

/* ─── Gallery placeholders ─── */
export interface GalleryItem {
  title: string;
  category: "Images" | "Videos" | "Music Visuals" | "Brand Assets" | "Websites";
  model: string;
  gradient: string;
  span?: "tall" | "wide" | "default";
}

export const galleryItems: GalleryItem[] = [
  { title: "Midnight Skyline", category: "Images", model: "Onyx Vision Pro", gradient: "from-slate-900 via-indigo-950 to-cyan-950", span: "tall" },
  { title: "Promo Loop 01", category: "Videos", model: "Onyx Motion v1", gradient: "from-zinc-900 via-zinc-700 to-zinc-900" },
  { title: "Lo-Fi Visualizer", category: "Music Visuals", model: "Onyx Loop", gradient: "from-indigo-950 via-violet-950 to-slate-900", span: "wide" },
  { title: "Brand Identity — Chrome", category: "Brand Assets", model: "Onyx Canvas", gradient: "from-stone-700 via-zinc-600 to-stone-800" },
  { title: "Landing Concept — Studio", category: "Websites", model: "Onyx Build", gradient: "from-slate-800 via-zinc-700 to-slate-900" },
  { title: "Album Cover — Onyx", category: "Brand Assets", model: "Onyx Vision Pro", gradient: "from-zinc-900 via-slate-800 to-black", span: "tall" },
  { title: "Product Hero", category: "Images", model: "Product Visual Model", gradient: "from-zinc-800 via-stone-700 to-zinc-900" },
  { title: "Short-form Concept", category: "Videos", model: "Fast Video Model", gradient: "from-cyan-950 via-slate-900 to-zinc-900" },
];

export const galleryTabs = ["All", "Images", "Videos", "Music Visuals", "Brand Assets", "Websites"] as const;

/* ─── Safety badge style helper ─── */
export const safetyBadgeClass = (s: Safety) => {
  const base = "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider";
  switch (s) {
    case "Safe":
    case "Business Safe":
      return `${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-300/90`;
    case "Strict":
      return `${base} border-cyan-500/30 bg-cyan-500/10 text-cyan-300/90`;
    case "Moderate":
    case "Teen":
      return `${base} border-amber-500/30 bg-amber-500/10 text-amber-300/90`;
    case "Mature":
    case "Unrestricted where allowed":
      return `${base} border-rose-500/30 bg-rose-500/10 text-rose-300/90`;
    case "Creative":
    case "Experimental":
      return `${base} border-violet-500/30 bg-violet-500/10 text-violet-300/90`;
    default:
      return `${base} border-border/60 bg-card/40 text-muted-foreground`;
  }
};

/* ─── Sidebar nav ─── */
export interface SidebarItem {
  label: string;
  href?: string;
  disabled?: boolean;
  icon?: typeof Sparkles;
}
export interface SidebarSection {
  label: string;
  icon: typeof Sparkles;
  items: SidebarItem[];
}

export const safetyOptions = [
  { label: "Family", value: "family" },
  { label: "Teen+", value: "teen" },
  { label: "Mild Suggestive", value: "mild" },
  { label: "Mature", value: "mature" },
  { label: "Custom", value: "custom" },
] as const;

export const platformSidebar: SidebarSection[] = [
  {
    label: "Main",
    icon: Sparkles,
    items: [
      { label: "Dashboard", href: "/dashboard", icon: Home },
      { label: "Asset Manager", href: "/asset-manager", icon: FolderOpen },
      { label: "Generate", href: "/generate", icon: Wand2 },
    ],
  },
  {
    label: "Studio",
    icon: Wand2,
    items: [
      { label: "Image Studio", href: "/studio/images", icon: ImageIcon },
      { label: "Video Studio", href: "/studio/videos", icon: Video },
      { label: "Audio Studio", href: "/studio/audio", icon: Headphones },
      { label: "Apps", href: "/studio/apps", icon: AppWindow },
      { label: "Design Studio", href: "/studio/design", icon: Palette },
      { label: "Clip Studio", href: "/studio/clipping", icon: Scissors },
    ],
  },
  {
    label: "Workspace",
    icon: Layers,
    items: [
      { label: "My Page", href: "/my-page", icon: UserIcon },
      { label: "Projects", href: "/portfolio", icon: FolderOpen },
      { label: "Custom Requests", href: "/project-intake", icon: FileText },
    ],
  },
  {
    label: "Models",
    icon: Brush,
    items: [
      { label: "Models", href: "/#models", icon: Cpu },
      { label: "Model Specs", href: "/coming-soon?title=Model+Specs", icon: FileText },
    ],
  },
  {
    label: "Social",
    icon: Users,
    items: [
      { label: "Feed", href: "/feed", icon: Rss },
      { label: "Gallery", href: "/gallery", icon: ImageIcon },
      { label: "Challenges", href: "/challenges", icon: Trophy },
      { label: "Blog", href: "/blog", icon: Newspaper },
    ],
  },
  {
    label: "Support",
    icon: LifeBuoy,
    items: [
      { label: "What's New", href: "/coming-soon?title=What's+New", icon: Megaphone },
      { label: "Help", href: "/faq", icon: HelpCircle },
      { label: "Contact", href: "/contact", icon: Mail },
    ],
  },
];

