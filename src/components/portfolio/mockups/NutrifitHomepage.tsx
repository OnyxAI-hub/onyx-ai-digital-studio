import proteinImg from "@/assets/products/protein-blend.png";
import greensImg from "@/assets/products/greens-powder.png";
import omegaImg from "@/assets/products/omega-complex.png";

const products = [
  { name: "Protein Blend", price: "$29.99", img: proteinImg },
  { name: "Greens Powder", price: "$34.99", img: greensImg },
  { name: "Omega Complex", price: "$24.99", img: omegaImg },
];

const NutrifitHomepage = () => (
  <div className="bg-[#0a1a0f] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-900/40">
      <span className="font-bold text-emerald-400 text-xs">🌿 NutriFit</span>
      <div className="flex gap-3 text-[9px] text-emerald-200/60">
        <span>Shop</span><span>Blog</span><span>About</span><span>Contact</span>
      </div>
      <div className="bg-emerald-600 rounded px-2 py-0.5 text-[8px] font-semibold">Cart (2)</div>
    </div>
    {/* Hero */}
    <div className="px-4 py-6 bg-gradient-to-br from-emerald-900/40 to-teal-900/20">
      <p className="text-[8px] uppercase tracking-widest text-emerald-400/70 mb-1">Natural Wellness</p>
      <p className="text-sm font-bold leading-tight">Fuel Your Body.<br/>Elevate Your Life.</p>
      <p className="text-[9px] text-emerald-200/50 mt-1 max-w-[70%]">Premium supplements and nutrition products crafted for peak performance.</p>
      <div className="flex gap-2 mt-3">
        <div className="bg-emerald-500 rounded px-3 py-1 text-[8px] font-bold text-black">Shop Now</div>
        <div className="border border-emerald-500/40 rounded px-3 py-1 text-[8px] text-emerald-300">Learn More</div>
      </div>
    </div>
    {/* Products */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold text-emerald-300/80 mb-2">BESTSELLERS</p>
      <div className="grid grid-cols-3 gap-2">
        {products.map((p, i) => (
          <div key={i} className="bg-emerald-900/20 border border-emerald-800/30 rounded p-2">
            <div className="h-14 rounded mb-1.5 bg-emerald-950/40 flex items-center justify-center overflow-hidden">
              <img src={p.img} alt={p.name} className="h-12 w-auto object-contain" loading="lazy" />
            </div>
            <p className="text-[8px] font-semibold">{p.name}</p>
            <p className="text-[7px] text-emerald-400">{p.price}</p>
            <div className="bg-emerald-600/80 rounded mt-1 py-0.5 text-center text-[7px] font-semibold text-black">Add to Cart</div>
          </div>
        ))}
      </div>
    </div>
    {/* Benefits */}
    <div className="px-4 py-3 bg-emerald-900/10 border-t border-emerald-900/30">
      <div className="grid grid-cols-3 gap-2 text-center">
        {[["🧪", "Lab Tested"], ["🚚", "Free Shipping"], ["🌱", "100% Natural"]].map(([icon, label], i) => (
          <div key={i}>
            <p className="text-sm">{icon}</p>
            <p className="text-[7px] text-emerald-300/60 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Testimonials */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold text-emerald-300/80 mb-2">WHAT CUSTOMERS SAY</p>
      <div className="bg-emerald-900/15 border border-emerald-800/20 rounded p-2">
        <p className="text-[8px] text-emerald-200/60 italic">"The best supplements I've ever used. My energy levels have never been higher."</p>
        <p className="text-[7px] text-emerald-400 mt-1">— Sarah M. ⭐⭐⭐⭐⭐</p>
      </div>
    </div>
  </div>
);

export default NutrifitHomepage;
