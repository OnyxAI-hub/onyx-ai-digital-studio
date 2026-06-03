import { Link } from "react-router-dom";
import { Instagram, Music2, Users, Mail, Briefcase } from "lucide-react";
import onyxLogo from "@/assets/onyx-logo.png";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969/about";
const SPOTIFY_URL = "https://open.spotify.com/album/3ECiQ7o24hMVDSE4RE3oZa";
const INSTAGRAM_URL = "#";

const linkClass =
  "flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-[hsl(var(--ai-cyan))]/60 hover:text-foreground";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container-narrow px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={onyxLogo} alt="ONYX AI" className="h-10 w-auto object-contain" />
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.25em] uppercase">ONYX AI</p>
              <p className="mt-1 text-xs text-muted-foreground">Video Skool · AI Agency · Creator Tools</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Users className="h-4 w-4" /> Skool Community
            </a>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Music2 className="h-4 w-4" /> Spotify Album
            </a>
            <a href={INSTAGRAM_URL} className={linkClass}>
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <Link to="/#services" className={linkClass}>
              <Briefcase className="h-4 w-4" /> Services
            </Link>
            <Link to="/contact" className={linkClass}>
              <Mail className="h-4 w-4" /> Contact
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground tracking-wide">© 2026 ONYX AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
