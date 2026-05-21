import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export const REQUEST_TYPES = [
  { value: "AI Image Creation", credits: 10 },
  { value: "AI Video Generation", credits: 500 },
  { value: "AI Promo Video", credits: 750 },
  { value: "Music Visualizer", credits: 100 },
  { value: "Cover Art / Brand Visual", credits: 25 },
  { value: "Website / Landing Page", credits: 0 },
  { value: "Web App / Business System", credits: 0 },
  { value: "AI Agent Setup", credits: 0 },
  { value: "Automation System", credits: 0 },
  { value: "Social Content Pack", credits: 50 },
  { value: "Custom AI Request", credits: 25 },
];

interface Props {
  onSubmitted?: () => void;
}

const CreativeRequestForm = ({ onSubmitted }: Props) => {
  const { user } = useAuth();
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0].value);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [platformUse, setPlatformUse] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const selected = REQUEST_TYPES.find((r) => r.value === requestType);
  const estimated = selected?.credits ?? 0;
  const isCustomQuote = estimated === 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast({ title: "Sign in required", variant: "destructive" });
    setLoading(true);
    const { error } = await supabase.from("creative_requests").insert({
      user_id: user.id,
      request_type: requestType,
      prompt,
      style: style || null,
      platform_use: platformUse || null,
      reference_url: referenceUrl || null,
      estimated_credits: estimated,
      status: "pending",
    });
    setLoading(false);
    if (error) return toast({ title: "Submit failed", description: error.message, variant: "destructive" });
    toast({ title: "Request submitted", description: "Our team will review it shortly." });
    setPrompt(""); setStyle(""); setPlatformUse(""); setReferenceUrl("");
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label>Request type</Label>
        <Select value={requestType} onValueChange={setRequestType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {REQUEST_TYPES.map((r) => (<SelectItem key={r.value} value={r.value}>{r.value}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Prompt / description</Label>
        <Textarea required value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe what you want to create…" className="min-h-[120px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Style / vibe</Label>
          <Input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Cinematic, minimal, neon…" />
        </div>
        <div>
          <Label>Platform / use case</Label>
          <Input value={platformUse} onChange={(e) => setPlatformUse(e.target.value)} placeholder="Instagram, website hero…" />
        </div>
      </div>
      <div>
        <Label>Reference link (optional)</Label>
        <Input value={referenceUrl} onChange={(e) => setReferenceUrl(e.target.value)} placeholder="https://…" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border/40 bg-card/30 p-3 text-xs">
        <span className="text-muted-foreground">Estimated cost</span>
        <span className="font-medium text-foreground">{isCustomQuote ? "Custom quote" : `${estimated} credits`}</span>
      </div>
      <Button type="submit" className="w-full gap-2" disabled={loading}>
        <Send className="h-4 w-4" /> {loading ? "Submitting…" : "Submit Request"}
      </Button>
      <p className="text-[11px] text-muted-foreground">Requests are reviewed by the ONYX team. Credits are deducted only after delivery is approved.</p>
    </form>
  );
};

export default CreativeRequestForm;
