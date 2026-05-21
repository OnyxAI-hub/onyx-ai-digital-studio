import { useSearchParams, Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  const [params] = useSearchParams();
  const title = params.get("title") ?? "This Feature";

  return (
    <PlatformLayout
      badge="Launching Soon"
      title={<><span className="gradient-text">{title}</span></>}
      description="This part of the ONYX AI Studio platform is being built. Check back soon — or submit a creative request in the meantime."
    >
      <div className="silver-card p-10 text-center">
        <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-card/60">
          <Sparkles className="h-5 w-5 text-cyan-300/90" />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight mb-2">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          We're polishing this experience for launch. Want early access or to make a custom request? Reach out below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to Dashboard</Button></Link>
          <Link to="/project-intake"><Button>Submit Creative Request</Button></Link>
        </div>
      </div>
    </PlatformLayout>
  );
};

export default ComingSoon;
