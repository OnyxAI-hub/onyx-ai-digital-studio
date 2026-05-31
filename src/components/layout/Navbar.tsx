import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import onyxLogo from "@/assets/onyx-logo.png";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969";

const navLinks = [
  { label: "What You'll Learn", href: "#learn" },
  { label: "Community", href: "#community" },
  { label: "Tools", href: "#tools" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/85 backdrop-blur-2xl">
      <div className="container-narrow flex h-[72px] items-center justify-between px-4 md:h-20">
        <a href="#top" className="flex items-center gap-3">
          <img src={onyxLogo} alt="Onyx AI Video Skool" className="h-9 md:h-11 w-auto object-contain" />
          <span className="hidden sm:inline font-display text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Video Skool
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="uppercase tracking-wider text-[11px] bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))]"
            >
              Join
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/98 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))]">Join the Community</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
