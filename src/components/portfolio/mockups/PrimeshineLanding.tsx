const PrimeshineLanding = () => (
  <div className="bg-[#0b1520] text-white text-[10px] leading-tight">
    {/* Nav — utility with phone + CTA */}
    <div className="flex items-center justify-between px-4 py-1.5 bg-[#0e1926] border-b border-blue-900/25">
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded bg-blue-500 flex items-center justify-center text-[6px] font-black text-white">P</div>
        <span className="font-bold text-[9px]">PrimeShine</span>
      </div>
      <div className="flex items-center gap-3 text-[7px] text-white/30">
        <span>Services</span><span>Areas</span><span>Reviews</span>
        <span className="text-blue-300/50">📞 (555) 123-4567</span>
        <div className="bg-blue-500 rounded-sm px-2 py-0.5 text-[6px] font-bold text-white">Free Quote</div>
      </div>
    </div>

    {/* Hero banner — full-width, top-to-bottom scan */}
    <div className="px-4 py-4 bg-gradient-to-b from-blue-950/25 to-transparent text-center">
      <div className="inline-block bg-blue-500/10 text-blue-300/70 text-[6px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm mb-2">⭐ Rated #1 Cleaning Service in Austin</div>
      <p className="text-[14px] font-black leading-[1.1] tracking-tight">Professional Cleaning<br/>You Can Trust</p>
      <p className="text-[7px] text-white/25 mt-1.5 mx-auto max-w-[70%]">Licensed, insured, background-checked teams. 100% satisfaction guaranteed.</p>
      <div className="flex justify-center gap-2 mt-3">
        <div className="bg-blue-500 rounded-sm px-4 py-1 text-[7px] font-bold">Get Free Estimate →</div>
        <div className="border border-white/10 rounded-sm px-3 py-1 text-[7px] text-white/35 font-medium">Our Services</div>
      </div>
    </div>

    {/* Trust bar */}
    <div className="mx-4 py-1.5 border-t border-b border-blue-900/15 flex justify-around">
      {[["500+", "Jobs Done"], ["4.9★", "Google"], ["100%", "Guaranteed"], ["<24h", "Response"]].map(([val, label], i) => (
        <div key={i} className="text-center">
          <p className="text-[9px] font-black text-blue-400">{val}</p>
          <p className="text-[5px] text-white/20 tracking-wider uppercase">{label}</p>
        </div>
      ))}
    </div>

    {/* Services row */}
    <div className="px-4 py-3">
      <p className="text-[7px] font-bold mb-2">Our Services</p>
      <div className="grid grid-cols-4 gap-1.5">
        {[["🏠", "Standard", "$89"], ["✨", "Deep Clean", "$149"], ["🏢", "Office", "$199"], ["🔄", "Move Out", "$249"]].map(([icon, name, price], i) => (
          <div key={i} className="bg-[#0d1c2e] border border-blue-900/15 rounded-sm p-2 text-center">
            <p className="text-[11px]">{icon}</p>
            <p className="text-[7px] font-semibold mt-0.5">{name}</p>
            <p className="text-[6px] text-blue-400 font-bold mt-0.5">From {price}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Inline estimate form — horizontal */}
    <div className="mx-4 bg-[#0d1c2e] border border-blue-800/20 rounded-sm p-2.5">
      <p className="text-[7px] font-bold mb-1.5">Quick Estimate</p>
      <div className="flex gap-1.5">
        {["Service Type", "Bedrooms", "ZIP Code"].map((label, i) => (
          <div key={i} className="flex-1 bg-[#0a1525] border border-blue-900/20 rounded-sm px-2 py-1 text-[6px] text-white/15">{label}</div>
        ))}
        <div className="bg-blue-500 rounded-sm px-3 py-1 text-[7px] font-bold shrink-0">Get Quote</div>
      </div>
    </div>

    {/* Reviews */}
    <div className="px-4 py-2.5 flex gap-1.5">
      {[["J. Rodriguez", "Incredible detail. Office never looked better."], ["M. Thompson", "Same-day booking, always on time!"]].map(([name, text], i) => (
        <div key={i} className="flex-1 bg-[#0d1c2e] border border-blue-900/15 rounded-sm p-2">
          <p className="text-[6px] text-white/25 italic">"{text}"</p>
          <p className="text-[5px] text-blue-400/50 mt-1 font-semibold">{name} ⭐⭐⭐⭐⭐</p>
        </div>
      ))}
    </div>
  </div>
);

export default PrimeshineLanding;
