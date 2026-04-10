import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import onyxLogo from "@/assets/onyx-logo.png";

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
        <Link to="/" className="flex items-center py-1">
          <img
            src={onyxLogo}
            alt="Onyx AI"
            className="h-14 md:h-16 w-auto object-contain mix-blend-lighten"
          />
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
