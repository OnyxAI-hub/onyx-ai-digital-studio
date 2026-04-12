export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: "NutriFit Wellness",
    category: "E-Commerce & Health",
    description: "A conversion-optimized e-commerce platform for a wellness brand — featuring streamlined product catalogs, frictionless checkout, and content designed to drive repeat purchases and build long-term customer trust.",
    tags: ["React", "Tailwind CSS", "Stripe", "SEO"],
    gradient: "from-emerald-500/20 to-teal-600/20",
    slug: "nutrifit-wellness",
  },
  {
    title: "PrimeShine Cleaning Co.",
    category: "Service Business",
    description: "A professional site engineered to turn visitors into booked appointments — with online scheduling, service area maps, and an instant quote calculator that removes friction from the buying process.",
    tags: ["React", "TypeScript", "Booking System", "Responsive"],
    gradient: "from-blue-500/20 to-cyan-600/20",
    slug: "primeshine-cleaning",
  },
  {
    title: "Quality Fitness Club",
    category: "Dashboard & Web App",
    description: "A member management dashboard that gives gym operators real-time visibility into class scheduling, payment tracking, and engagement analytics — replacing spreadsheets with a streamlined digital toolkit.",
    tags: ["React", "Supabase", "Dashboard", "Analytics"],
    gradient: "from-rose-500/20 to-orange-600/20",
    slug: "quality-fitness-club",
  },
];
