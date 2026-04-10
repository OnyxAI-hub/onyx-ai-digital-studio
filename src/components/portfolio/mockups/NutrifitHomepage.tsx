import proteinImg from "@/assets/products/protein-blend.png";
import greensImg from "@/assets/products/greens-powder.png";
import omegaImg from "@/assets/products/omega-complex.png";

const NutrifitHomepage = () => (
  <div className="bg-[#060f08] text-white text-[10px] leading-tight font-sans">
    {/* Minimal nav */}
    <div className="flex items-center justify-between px-5 py-2">
      <span className="font-light tracking-[0.15em] text-[10px] text-emerald-300/90">NUTRI<span className="font-semibold">FIT</span></span>
      <div className="flex gap-4 text-[7px] text-white/25 tracking-widest uppercase">
        <span>Shop</span><span>Journal</span><span>About</span>
      </div>
      <div className="text-[8px] text-emerald-400/50">Bag (2)</div>
    </div>

    {/* Hero — centered editorial with large product */}
    <div className="text-center pt-5 pb-3 px-5">
      <p className="text-[6px] uppercase tracking-[0.4em] text-emerald-500/40 mb-1.5">Spring Collection · Plant-Based Wellness</p>
      <p className="text-[16px] font-extralight leading-[1.1] tracking-tight text-white/90">
        Nourish from <span className="italic text-emerald-300/80">within.</span>
      </p>
      <p className="text-[7px] text-white/20 mt-2 mx-auto max-w-[65%] leading-relaxed">Organic supplements crafted for optimal wellness. Third-party tested. Sustainably sourced.</p>
      <div className="mt-3 inline-block bg-emerald-400/90 text-black rounded-full px-5 py-1 text-[7px] font-medium tracking-wider">Explore Collection</div>
    </div>

    {/* Trust strip */}
    <div className="flex justify-center py-2.5 gap-6 text-[6px] text-emerald-300/40 tracking-wider">
      <span>★ 4.9 Rating</span>
      <span>·</span>
      <span>2,400+ Reviews</span>
      <span>·</span>
      <span>Free Shipping $50+</span>
    </div>

    {/* Product strip — horizontal scroll feel */}
    <div className="px-5 py-3 border-t border-emerald-900/15">
      <p className="text-[7px] tracking-[0.2em] uppercase text-white/20 mb-2.5 text-center">Bestsellers</p>
      <div className="flex gap-3 justify-center">
        {[
          { name: "Protein Blend", price: "$29.99", img: proteinImg },
          { name: "Greens Powder", price: "$34.99", img: greensImg },
          { name: "Omega Complex", price: "$24.99", img: omegaImg },
        ].map((p, i) => (
          <div key={i} className="text-center w-[28%]">
            <div className="bg-emerald-950/20 rounded-2xl p-2 flex items-center justify-center h-12">
              <img src={p.img} alt={p.name} className="h-9 w-auto object-contain" loading="lazy" />
            </div>
            <p className="text-[7px] font-light mt-1.5 tracking-wide">{p.name}</p>
            <p className="text-[6px] text-emerald-400/60">{p.price}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Values — minimal inline */}
    <div className="px-5 py-2.5 flex justify-center gap-6 text-[6px] text-white/15 tracking-wider">
      <span>✦ Organic</span><span>✦ Lab Tested</span><span>✦ Sustainable</span><span>✦ Plant-Based</span>
    </div>
  </div>
);

export default NutrifitHomepage;
