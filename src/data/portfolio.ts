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
    description: "A modern e-commerce platform for a wellness brand, featuring product catalogs, online ordering, and a nutrition blog. Built for speed and conversion.",
    tags: ["React", "Tailwind CSS", "Stripe", "SEO"],
    gradient: "from-emerald-500/20 to-teal-600/20",
    slug: "nutrifit-wellness",
  },
  {
    title: "PrimeShine Cleaning Co.",
    category: "Service Business",
    description: "Professional website with online booking, service area maps, and instant quote calculator. Designed to convert visitors into booked appointments.",
    tags: ["React", "TypeScript", "Booking System", "Responsive"],
    gradient: "from-blue-500/20 to-cyan-600/20",
    slug: "primeshine-cleaning",
  },
  {
    title: "Quality Fitness Club",
    category: "Dashboard & Web App",
    description: "Member management dashboard with class scheduling, payment tracking, and engagement analytics. A complete digital toolkit for gym operations.",
    tags: ["React", "Supabase", "Dashboard", "Analytics"],
    gradient: "from-rose-500/20 to-orange-600/20",
    slug: "quality-fitness-club",
  },
];
