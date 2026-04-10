const SectionHeading = ({ badge, title, description }: { badge?: string; title: string; description?: string }) => (
  <div className="mb-12 text-center md:mb-16">
    {badge && (
      <span className="mb-4 inline-block rounded-full border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,6%)] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(0,0%,50%)]">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] md:text-4xl lg:text-5xl">{title}</h2>
    {description && (
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{description}</p>
    )}
  </div>
);

export default SectionHeading;
