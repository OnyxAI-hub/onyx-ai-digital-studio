const SectionHeading = ({ badge, title, description }: { badge?: string; title: string; description?: string }) => (
  <div className="mb-12 text-center md:mb-16">
    {badge && (
      <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl tracking-tight">{title}</h2>
    {description && (
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{description}</p>
    )}
  </div>
);

export default SectionHeading;
