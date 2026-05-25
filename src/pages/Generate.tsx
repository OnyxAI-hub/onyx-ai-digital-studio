import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Video,
  Mic,
  AppWindow,
  Palette,
  Globe,
  Bot,
  Sparkles,
  Send,
  ArrowRight,
  Info,
  Upload,
} from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Tab = "Image" | "Video" | "Audio" | "Apps" | "Design" | "Website" | "Automation";

const TABS: { id: Tab; label: string; icon: typeof ImageIcon; mode: "creative" | "business"; requestType: string; intakeType?: string }[] = [
  { id: "Image", label: "Image", icon: ImageIcon, mode: "creative", requestType: "AI Image Creation" },
  { id: "Video", label: "Video", icon: Video, mode: "creative", requestType: "AI Video Generation" },
  { id: "Audio", label: "Audio", icon: Mic, mode: "creative", requestType: "Music Visualizer" },
  { id: "Apps", label: "Apps", icon: AppWindow, mode: "creative", requestType: "Custom AI Request" },
  { id: "Design", label: "Design", icon: Palette, mode: "creative", requestType: "Cover Art / Brand Visual" },
  { id: "Website", label: "Website", icon: Globe, mode: "business", requestType: "Website / Landing Page", intakeType: "Website / Landing Page" },
  { id: "Automation", label: "Automation", icon: Bot, mode: "business", requestType: "Automation System", intakeType: "Automation System" },
];

const MODEL_PRESETS: Record<Tab, string[]> = {
  Image: ["Fast Image Model", "Premium Image Model", "Creative Image Model", "Product Visual Model", "Cover Art Model"],
  Video: ["Fast Video Model", "Standard Video Model", "Premium Video Model", "Ultra Video Model"],
  Audio: ["Onyx Compose", "Onyx Loop (Visualizer)"],
  Apps: ["Background Remover", "Relight", "Face Swap (consent)", "Motion Control"],
  Design: ["Onyx Canvas", "Brand Pack", "Social Pack"],
  Website: [],
  Automation: [],
};

const STYLES = ["Cinematic", "Minimal", "Editorial", "Neon", "Brutalist", "Luxe Chrome", "Soft Pastel"];
const SAFETY = ["Family", "Teen+", "Mild Suggestive", "Mature", "Custom"];

// Credit estimates
const IMAGE_COST: Record<string, number> = { "Fast Image Model": 5, "Premium Image Model": 15, "Creative Image Model": 10, "Product Visual Model": 12, "Cover Art Model": 15 };
const VIDEO_COST: Record<string, Record<string, number>> = {
  Fast: { "5": 300, "10": 600, "15": 900 },
  Standard: { "5": 500, "10": 1000, "15": 1500 },
  Premium: { "5": 750, "10": 1500, "15": 2250 },
  Ultra: { "5": 1000, "10": 2000, "15": 3000 },
};

const Generate = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const location = useLocation();
  const pathTabMap: Record<string, Tab> = {
    "/studio/images": "Image", "/studio/videos": "Video", "/studio/audio": "Audio",
    "/studio/apps": "Apps", "/studio/design": "Design", "/studio/clipping": "Video",
  };
  const initialTab = (pathTabMap[location.pathname] || params.get("tab") || params.get("type") || "Image") as Tab;
  const matched = TABS.find((t) => t.id === initialTab) ?? TABS[0];
  const [tab, setTab] = useState<Tab>(matched.id);

  const active = TABS.find((t) => t.id === tab)!;
  const modelOptions = MODEL_PRESETS[tab];

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [platformUse, setPlatformUse] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [model, setModel] = useState(modelOptions[0] ?? "");
  const [safety, setSafety] = useState("Teen+");
  const [submitting, setSubmitting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Video-only
  const [videoTier, setVideoTier] = useState<"Fast" | "Standard" | "Premium" | "Ultra">("Standard");
  const [videoLen, setVideoLen] = useState<"5" | "10" | "15">("5");

  useEffect(() => {
    setModel(MODEL_PRESETS[tab][0] ?? "");
    setParams({ tab }, { replace: true });
  }, [tab]);

  useEffect(() => {
    if (!loading && !user && active.mode === "creative") {
      // require sign-in for in-platform submissions
      navigate(`/auth?redirect=/generate?tab=${tab}`);
    }
  }, [loading, user, active.mode, navigate, tab]);

  const estimated = useMemo(() => {
    if (tab === "Image") return IMAGE_COST[model] ?? 10;
    if (tab === "Video") return VIDEO_COST[videoTier][videoLen] ?? 500;
    if (tab === "Audio") return 75;
    if (tab === "Apps") return 25;
    if (tab === "Design") return 15;
    return 0;
  }, [tab, model, videoTier, videoLen]);

  const submit = async () => {
    if (!user) return navigate("/auth");
    if (!prompt.trim()) return toast({ title: "Add a prompt first", variant: "destructive" });
    setSubmitting(true);

    if (tab === "Image") {
      setGeneratedImage(null);
      try {
        const { data, error } = await supabase.functions.invoke("generate-image", {
          body: { prompt },
        });
        if (error) throw error;
        const imageUrl = (data as any)?.imageUrl;
        if (!imageUrl) throw new Error("No image returned");
        setGeneratedImage(imageUrl);

        // Deduct 10 credits
        const { data: bal } = await supabase
          .from("credit_balances")
          .select("balance")
          .eq("user_id", user.id)
          .maybeSingle();
        if (bal) {
          await supabase
            .from("credit_balances")
            .update({ balance: Math.max(0, (bal.balance ?? 0) - 10) })
            .eq("user_id", user.id);
          await supabase.from("credit_transactions").insert({
            user_id: user.id,
            transaction_type: "usage",
            amount: -10,
            description: "Image generation",
          });
        }
        toast({ title: "Image generated", description: "10 credits deducted." });
      } catch (err: any) {
        toast({ title: "Generation failed", description: err?.message ?? "Unknown error", variant: "destructive" });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const modelLine = tab === "Video" ? `${videoTier} · ${videoLen}s` : model;
    const { error } = await supabase.from("creative_requests").insert({
      user_id: user.id,
      request_type: active.requestType,
      prompt,
      style: [style, modelLine, `safety:${safety}`].filter(Boolean).join(" · "),
      platform_use: platformUse || null,
      reference_url: referenceUrl || null,
      estimated_credits: estimated,
      status: "pending",
    });
    setSubmitting(false);
    if (error) return toast({ title: "Submit failed", description: error.message, variant: "destructive" });
    toast({ title: "Request saved", description: "Track it in your Dashboard and Asset Manager." });
    setPrompt(""); setStyle(""); setPlatformUse(""); setReferenceUrl("");
  };

  return (
    <PlatformLayout
      badge="Generate"
      title={<>Create With <span className="gradient-text">ONYX AI Studio</span></>}
      description="Describe what you want. Creative requests are saved to your workspace and fulfilled by the ONYX team until live model APIs are connected."
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                isActive
                  ? "border-foreground/40 bg-foreground/10 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {active.mode === "business" ? (
        <div className="glass-card p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <active.icon className="h-4 w-4" /> Custom build
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            {tab === "Website" ? "Website / Landing Page" : "Automation System"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Custom business builds are scoped through our project intake. Tell us about your project and we'll send a quote and timeline.
          </p>
          <Link to={`/project-intake?type=${encodeURIComponent(active.intakeType!)}`}>
            <Button className="mt-5 gap-2">Start Project Intake <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass-card p-6">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create…"
              className="mt-2 min-h-[140px] text-sm"
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Style / vibe</Label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {STYLES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s === style ? "" : s)}
                      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider transition ${
                        s === style ? "border-foreground/50 bg-foreground/10 text-foreground" : "border-border/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >{s}</button>
                  ))}
                </div>
                <Input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="or write your own…" className="mt-2 text-xs" />
              </div>
              <div>
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Platform / use case</Label>
                <Input value={platformUse} onChange={(e) => setPlatformUse(e.target.value)} placeholder="Instagram, hero, ad…" className="mt-2 text-xs" />
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Reference link</Label>
              <Input value={referenceUrl} onChange={(e) => setReferenceUrl(e.target.value)} placeholder="https://… (file upload coming soon)" className="mt-2 text-xs" />
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                <Upload className="h-3 w-3" /> File uploads activate once storage is enabled.
              </div>
            </div>

            <Button onClick={submit} disabled={submitting} size="lg" className="mt-6 w-full gap-2">
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> {tab === "Image" ? "Generating…" : "Submitting…"}</>
              ) : (
                <><Send className="h-4 w-4" /> {tab === "Image" ? "Generate Image" : "Submit Creation Request"}</>
              )}
            </Button>
            {tab === "Image" && generatedImage && (
              <div className="mt-6">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Result</Label>
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="mt-2 w-full rounded-lg border border-border/60"
                />
              </div>
            )}
            <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground/80 leading-relaxed">
              <Info className="h-3 w-3 mt-0.5 shrink-0" />
              {tab === "Image"
                ? "Image generation runs live via our AI model. 10 credits are deducted per successful generation."
                : "API generation coming soon. Requests are saved as pending and fulfilled by the ONYX team. Credits are only deducted on delivery."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-display text-sm font-semibold tracking-tight">Model</h3>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {modelOptions.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>

              {tab === "Video" && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Quality</Label>
                    <Select value={videoTier} onValueChange={(v) => setVideoTier(v as typeof videoTier)}>
                      <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Fast", "Standard", "Premium", "Ultra"].map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</Label>
                    <Select value={videoLen} onValueChange={(v) => setVideoLen(v as typeof videoLen)}>
                      <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 sec</SelectItem>
                        <SelectItem value="10">10 sec</SelectItem>
                        <SelectItem value="15">15 sec</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Safety</Label>
                <Select value={safety} onValueChange={setSafety}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SAFETY.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Estimated cost</span>
                <Sparkles className="h-3.5 w-3.5 text-cyan-300/80" />
              </div>
              <div className="mt-2 font-display text-2xl font-bold tabular-nums">
                {estimated.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">credits</span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground/80">Pending status until delivered. Refunded if not fulfilled.</p>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
};

export default Generate;
