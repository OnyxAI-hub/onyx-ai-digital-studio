import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Facebook, Github } from "lucide-react";
import onyxLogo from "@/assets/onyx-logo.png";

const footerLinks = {
  Company: [
    { label: "About", path: "/about" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ],
  Services: [
    { label: "Business Websites", path: "/services" },
    { label: "Web Applications", path: "/services" },
    { label: "AI Chatbots", path: "/services" },
    { label: "Pricing", path: "/pricing" },
  ],
  Support: [
    { label: "Client Portal", path: "/client-portal" },
    { label: "Book a Consultation", path: "/contact" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container-narrow px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img src={onyxLogo} alt="ONYX AI" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium websites, web apps, and AI-powered solutions built to help your business grow.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-lg border border-border/50 p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-display text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ONYX AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with precision by ONYX AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
