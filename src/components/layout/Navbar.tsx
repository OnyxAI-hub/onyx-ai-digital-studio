import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import onyxLogo from "@/assets/onyx-logo.png";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969/about";

const navLinks = [
  { label: "Video Skool", hash: "top" },
  { label: "What You'll Learn", hash: "learn" },
  { label: "Community", hash: "community" },
  { label: "Services", hash: "services" },
  { label: "About", hash: "about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToSection = (hash: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      navigate(`/#${hash}`);
      return;
    }
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update hash without jumping
      history.replaceState(null, "", `#${hash}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-2xl">
      <div className="container-narrow flex h-[72px] items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={onyxLogo} alt="ONYX AI" className="h-9 md:h-11 w-auto object-contain" />
          <span className="hidden sm:inline font-display text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            Video Skool
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <button
              key={l.hash}
              onClick={() => goToSection(l.hash)}
              className="rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex">
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="uppercase tracking-[0.18em] text-[11px] font-semibold bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] shadow-[0_0_24px_-8px_hsl(var(--ai-cyan)/0.7)]"
            >
              Join the Skool
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/98 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((l) => (
              <button
                key={l.hash}
                onClick={() => goToSection(l.hash)}
                className="text-left rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {l.label}
              </button>
            ))}
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[hsl(var(--ai-cyan))] text-background hover:bg-[hsl(var(--ai-glow))] uppercase tracking-[0.18em] font-semibold">
                Join the Skool
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
