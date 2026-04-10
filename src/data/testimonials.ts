export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Maria Santos",
    role: "Owner",
    company: "Bella Beauty Studio",
    content: "ONYX AI transformed our outdated site into something our clients actually love using. The booking system alone has saved us hours every week. Highly recommend.",
    rating: 5,
  },
  {
    name: "Derek Thompson",
    role: "Founder",
    company: "PrimeShine Cleaning Co.",
    content: "Working with Xavier was straightforward — no jargon, no runaround. We got a clean, professional site that looks great on every device. Exactly what we needed.",
    rating: 5,
  },
  {
    name: "Aisha Johnson",
    role: "Marketing Director",
    company: "Quality Fitness Club",
    content: "The dashboard they built gives us real visibility into member engagement. It's been a game-changer for how we run campaigns and track results.",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    role: "CEO",
    company: "NutriFit Wellness",
    content: "From concept to launch in under three weeks. The site looks premium, loads fast, and our online orders have increased noticeably since going live.",
    rating: 5,
  },
];
