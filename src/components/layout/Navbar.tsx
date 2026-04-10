import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnyxBrandMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="24" height="24" rx="6" stroke="url(#brand-grad)" strokeWidth="1.5" fill="none" />
    <path d="M9 14L14 9L19 14L14 19Z" stroke="url(#brand-grad)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <circle cx="14" cy="14" r="2.5" fill="url(#brand-grad)" />
    <defs>
      <linearGradient id="brand-grad" x1="0" y1="0" x2="28" y2="28">
        <stop offset="0%" stopColor="hsl(0,0%,90%)" />
        <stop offset="50%" stopColor="hsl(0,0%,70%)" />
        <stop offset="100%" stopColor="hsl(0,0%,50%)" />
      </linearGradient>
    </defs>
  </svg>
);

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/85 backdrop-blur-2xl">
      <div className="container-narrow flex h-[72px] items-center justify-between px-4 md:h-20">
        {/* Brand Lockup */}
        <Link to="/" className="flex items-center gap-3 group">
          <OnyxBrandMark className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.03em] text-foreground">
              ONYX
            </span>
            <span className="font-display text-xl md:text-2xl font-light tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-r from-[hsl(0,0%,80%)] to-[hsl(0,0%,55%)]">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-foreground ${
                location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/client-portal">
            <Button variant="ghost" size="sm" className="text-muted-foreground text-[11px] uppercase tracking-[0.15em]">
              Portal
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="sm" className="uppercase tracking-wider text-[11px]">Book a Consultation</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/98 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.path ? "text-foreground bg-card" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-border/20">
              <Link to="/client-portal" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Client Portal</Button>
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Book a Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
