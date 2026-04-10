import proteinImg from "@/assets/products/protein-blend.png";
import greensImg from "@/assets/products/greens-powder.png";
import omegaImg from "@/assets/products/omega-complex.png";

const NutrifitProduct = () => (
  <div className="bg-[#0a1a0f] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-900/40">
      <span className="font-bold text-emerald-400 text-xs">🌿 NutriFit</span>
      <div className="flex gap-3 text-[9px] text-emerald-200/60">
        <span>Shop</span><span>Blog</span><span>About</span>
      </div>
      <div className="bg-emerald-600 rounded px-2 py-0.5 text-[8px] font-semibold">Cart (2)</div>
    </div>
    {/* Breadcrumb */}
    <div className="px-4 py-1.5 text-[8px] text-emerald-300/40">Shop → Supplements → Protein Blend</div>
    {/* Product Layout */}
    <div className="px-4 py-3 flex gap-4">
      {/* Image */}
      <div className="w-[45%] shrink-0">
        <div className="bg-gradient-to-br from-emerald-800/30 to-teal-800/20 rounded-lg h-32 flex items-center justify-center border border-emerald-700/20">
          <img src={proteinImg} alt="Premium Protein Blend" className="h-24 w-auto object-contain" loading="lazy" />
        </div>
        <div className="flex gap-1 mt-1.5">
          {[proteinImg, greensImg, omegaImg].map((img, i) => (
            <div key={i} className="w-8 h-8 rounded bg-emerald-800/20 border border-emerald-700/20 flex items-center justify-center overflow-hidden">
              <img src={img} alt="" className="h-6 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {/* Details */}
      <div className="flex-1">
        <p className="text-[8px] text-emerald-400/60 uppercase tracking-wider">Supplements</p>
        <p className="text-sm font-bold mt-0.5">Premium Protein Blend</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[8px] text-yellow-400">⭐⭐⭐⭐⭐</span>
          <span className="text-[7px] text-emerald-300/40">(128 reviews)</span>
        </div>
        <p className="text-base font-bold text-emerald-400 mt-2">$29.99</p>
        <p className="text-[8px] text-emerald-200/50 mt-1.5">25g protein per serving. Plant-based, organic, and scientifically formulated for recovery and growth.</p>
        {/* Options */}
        <div className="mt-2">
          <p className="text-[7px] text-emerald-300/60 mb-1">Flavor</p>
          <div className="flex gap-1">
            {["Vanilla", "Chocolate", "Berry"].map((f, i) => (
              <div key={i} className={`px-2 py-0.5 rounded text-[7px] border ${i === 0 ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-emerald-800/30 text-emerald-300/40"}`}>{f}</div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="bg-emerald-500 rounded px-4 py-1.5 text-[9px] font-bold text-black flex-1 text-center">Add to Cart</div>
          <div className="border border-emerald-500/40 rounded px-3 py-1.5 text-[9px] text-emerald-300">♡</div>
        </div>
      </div>
    </div>
    {/* Recommended */}
    <div className="px-4 py-3 border-t border-emerald-900/30">
      <p className="text-[9px] font-semibold text-emerald-300/80 mb-2">YOU MAY ALSO LIKE</p>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { name: "Greens Powder", price: "$34.99", img: greensImg },
          { name: "BCAA Mix", price: "$24.99", img: proteinImg },
          { name: "Omega-3", price: "$29.99", img: omegaImg },
          { name: "Vitamin D", price: "$19.99", img: greensImg },
        ].map((p, i) => (
          <div key={i} className="bg-emerald-900/20 border border-emerald-800/20 rounded p-1.5 text-center">
            <div className="h-8 rounded bg-emerald-950/40 mb-1 flex items-center justify-center overflow-hidden">
              <img src={p.img} alt={p.name} className="h-6 w-auto object-contain" loading="lazy" />
            </div>
            <p className="text-[7px] truncate">{p.name}</p>
            <p className="text-[6px] text-emerald-400">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default NutrifitProduct;
