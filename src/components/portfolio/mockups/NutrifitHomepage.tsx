import proteinImg from "@/assets/products/protein-blend.png";
import greensImg from "@/assets/products/greens-powder.png";
import omegaImg from "@/assets/products/omega-complex.png";

const products = [
  { name: "Protein Blend", price: "$29.99", img: proteinImg, tag: "Best Seller" },
  { name: "Greens Powder", price: "$34.99", img: greensImg, tag: "New" },
  { name: "Omega Complex", price: "$24.99", img: omegaImg, tag: "Popular" },
];

const NutrifitHomepage = () => (
  <div className="bg-[#060f08] text-white text-[10px] leading-tight font-sans">
    {/* Minimal top bar */}
    <div className="flex items-center justify-between px-5 py-2.5">
      <span className="font-light tracking-[0.15em] text-[10px] text-emerald-300/90">NUTRI<span className="font-semibold">FIT</span></span>
      <div className="flex gap-4 text-[8px] text-white/30 tracking-wider uppercase">
        <span>Shop</span><span>Journal</span><span>About</span>
      </div>
      <div className="text-[8px] text-emerald-400/60">Bag (2)</div>
    </div>

    {/* Hero — editorial split layout */}
    <div className="flex">
      {/* Left: text */}
      <div className="w-[55%] px-5 py-7 flex flex-col justify-center">
        <p className="text-[7px] uppercase tracking-[0.3em] text-emerald-500/50 mb-2">Spring Collection</p>
        <p className="text-[15px] font-extralight leading-[1.2] tracking-tight text-white/90">
          Nourish<br/>from<br/><span className="italic text-emerald-300/80">within.</span>
        </p>
        <p className="text-[8px] text-white/25 mt-3 max-w-[85%] leading-relaxed">Plant-based supplements crafted with organic ingredients for optimal wellness.</p>
        <div className="mt-4">
          <div className="inline-block bg-emerald-400/90 text-black rounded-full px-4 py-1 text-[7px] font-medium tracking-wider uppercase">Explore Collection</div>
        </div>
      </div>
      {/* Right: featured product */}
      <div className="w-[45%] bg-gradient-to-b from-emerald-950/30 to-emerald-950/10 flex items-center justify-center py-5">
        <div className="relative">
          <img src={proteinImg} alt="Protein Blend" className="h-20 w-auto object-contain drop-shadow-lg" loading="lazy" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 text-[6px] text-emerald-300/70 whitespace-nowrap">★ 4.9 — 2,400+ reviews</div>
        </div>
      </div>
    </div>

    {/* Product grid — editorial cards */}
    <div className="px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[9px] font-light tracking-[0.2em] uppercase text-white/40">Bestsellers</p>
        <p className="text-[7px] text-emerald-400/50 tracking-wider">View All →</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {products.map((p, i) => (
          <div key={i} className="group">
            <div className="bg-emerald-950/20 rounded-2xl p-3 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-1.5 left-1.5 bg-emerald-500/15 text-emerald-300/60 text-[5px] tracking-wider uppercase rounded-full px-1.5 py-0.5">{p.tag}</div>
              <img src={p.img} alt={p.name} className="h-12 w-auto object-contain my-1" loading="lazy" />
            </div>
            <div className="mt-1.5 px-0.5">
              <p className="text-[8px] font-light tracking-wide">{p.name}</p>
              <p className="text-[7px] text-emerald-400/70 font-medium">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Values strip — horizontal flow */}
    <div className="mx-5 py-3 border-t border-b border-emerald-900/20 flex justify-between">
      {[["Organic", "Certified ingredients"], ["Tested", "Third-party verified"], ["Sustainable", "Eco-conscious"]].map(([title, sub], i) => (
        <div key={i} className="text-center flex-1">
          <p className="text-[7px] font-medium text-white/50 tracking-wider">{title}</p>
          <p className="text-[6px] text-white/20 mt-0.5">{sub}</p>
        </div>
      ))}
    </div>

    {/* Testimonial — minimal editorial */}
    <div className="px-5 py-4">
      <p className="text-[9px] italic font-light text-white/30 leading-relaxed">"The cleanest supplements I've found. My energy and focus have completely transformed."</p>
      <p className="text-[7px] text-emerald-400/40 mt-1.5 tracking-wider">— Sarah M., Verified Buyer</p>
    </div>
  </div>
);

export default NutrifitHomepage;
