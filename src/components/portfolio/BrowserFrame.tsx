import { ReactNode } from "react";

const BrowserFrame = ({ children, url = "https://example.com" }: { children: ReactNode; url?: string }) => (
  <div className="rounded-lg border border-border/60 bg-[hsl(0,0%,8%)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)] overflow-hidden">
    {/* Title bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(0,0%,10%)] border-b border-border/40">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 mx-8">
        <div className="bg-[hsl(0,0%,6%)] rounded-md px-3 py-1 text-[10px] text-muted-foreground text-center truncate border border-border/30">
          {url}
        </div>
      </div>
    </div>
    {/* Content */}
    <div className="overflow-hidden">{children}</div>
  </div>
);

export default BrowserFrame;
