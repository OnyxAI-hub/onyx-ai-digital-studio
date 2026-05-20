import { Link, useLocation } from "react-router-dom";
import { platformSidebar } from "@/data/studio";
import { Lock } from "lucide-react";

const StudioSidebar = () => {
  const { pathname, search, hash } = useLocation();
  const current = pathname + search + hash;

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24 silver-card p-4 max-h-[calc(100vh-7rem)] overflow-y-auto [scrollbar-width:thin]">
        {platformSidebar.map((section) => (
          <div key={section.label} className="mb-5 last:mb-0">
            <div className="mb-2 flex items-center gap-2 px-1">
              <section.icon className="h-3 w-3 text-foreground/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {section.label}
              </span>
            </div>
            <ul className="space-y-0.5">
              {section.items.map((it) => {
                if (it.disabled || !it.href) {
                  return (
                    <li
                      key={it.label}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] text-muted-foreground/60 cursor-not-allowed"
                    >
                      <span>{it.label}</span>
                      <Lock className="h-2.5 w-2.5" />
                    </li>
                  );
                }
                const active = it.href === current;
                return (
                  <li key={it.label}>
                    <Link
                      to={it.href}
                      className={`block rounded-md px-2 py-1.5 text-[12px] transition-colors ${
                        active
                          ? "bg-foreground/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                      }`}
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="mt-2 px-1 text-[10px] text-muted-foreground/60 leading-relaxed">
          Some sections are placeholders for upcoming platform features.
        </p>
      </div>
    </aside>
  );
};

export default StudioSidebar;
