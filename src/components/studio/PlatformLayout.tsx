import { ReactNode } from "react";
import StudioSidebar from "./StudioSidebar";
import PlatformTopBar from "./PlatformTopBar";

interface Props {
  badge?: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const PlatformLayout = ({ badge, title, description, actions, children }: Props) => (
  <main className="pt-[72px] md:pt-20">
    <PlatformTopBar />
    <section className="section-padding pt-8">
      <div className="container-narrow flex gap-6">
        <StudioSidebar />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              {badge && (
                <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {badge}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
              {description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </section>
  </main>
);

export default PlatformLayout;
