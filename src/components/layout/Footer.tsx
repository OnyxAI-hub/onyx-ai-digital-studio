import { Instagram, Music2, Users } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/onyx-ai-video-skool-6969";
const SPOTIFY_URL = "https://open.spotify.com/album/3ECiQ7o24hMVDSE4RE3oZa";
const INSTAGRAM_URL = "#";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container-narrow px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-base font-bold tracking-tight">
              <span className="text-foreground">ONYX AI</span>
              <span className="text-[hsl(var(--ai-cyan))]"> VIDEO SKOOL</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Learn AI video, image, and music creation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-[hsl(var(--ai-cyan))]/60 hover:text-foreground"
            >
              <Users className="h-4 w-4" /> Skool Community
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-[hsl(var(--ai-cyan))]/60 hover:text-foreground"
            >
              <Music2 className="h-4 w-4" /> Spotify Album
            </a>
            <a
              href={INSTAGRAM_URL}
              className="flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-[hsl(var(--ai-cyan))]/60 hover:text-foreground"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Onyx AI Video Skool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
