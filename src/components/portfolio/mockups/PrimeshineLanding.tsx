const PrimeshineLanding = () => (
  <div className="bg-[#0b1520] text-white text-[10px] leading-tight">
    {/* Navbar — utility-first, strong CTA */}
    <div className="flex items-center justify-between px-4 py-2 bg-[#0e1926] border-b border-blue-900/30">
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-[7px] font-black text-white">P</div>
        <span className="font-bold text-[10px]">PrimeShine</span>
      </div>
      <div className="flex gap-3 text-[8px] text-white/40">
        <span>Services</span><span>Areas</span><span>Reviews</span><span>Pricing</span>
      </div>
      <div className="flex gap-1.5">
        <div className="text-[8px] text-blue-300/60">📞 (555) 123-4567</div>
        <div className="bg-blue-500 rounded-sm px-2.5 py-0.5 text-[7px] font-bold">Get Quote</div>
      </div>
    </div>

    {/* Hero — conversion-focused with form */}
    <div className="px-4 py-5 bg-gradient-to-b from-blue-950/30 to-transparent">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="inline-block bg-blue-500/15 text-blue-300 text-[6px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm mb-2">Rated #1 in Austin</div>
          <p className="text-[14px] font-black leading-[1.15] tracking-tight">Professional<br/>Cleaning You<br/>Can Trust</p>
          <p className="text-[8px] text-white/35 mt-2 leading-relaxed">Residential & commercial cleaning with a 100% satisfaction guarantee. Licensed, insured, background-checked teams.</p>
          <div className="flex gap-1.5 mt-2 text-[7px]">
            {["✓ Licensed & Insured", "✓ Same-Day Available", "✓ Eco-Friendly"].map((t, i) => (
              <span key={i} className="text-blue-300/50">{t}</span>
            ))}
          </div>
        </div>
        {/* Mini quote form */}
        <div className="w-[38%] shrink-0 bg-[#0d1c2e] border border-blue-800/30 rounded-sm p-2.5">
          <p className="text-[8px] font-bold mb-1.5">Get a Free Estimate</p>
          {["Service Type", "Property Size", "Your ZIP Code"].map((label, i) => (
            <div key={i} className="mb-1">
              <div className="bg-[#0a1525] border border-blue-900/30 rounded-sm px-2 py-1 text-[7px] text-white/20">{label}</div>
            </div>
          ))}
          <div className="bg-blue-500 rounded-sm py-1 text-center text-[8px] font-bold mt-1">Get My Quote →</div>
        </div>
      </div>
    </div>

    {/* Services — icon blocks with pricing */}
    <div className="px-4 py-3">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[9px] font-bold">Our Services</p>
        <p className="text-[7px] text-blue-400/50">See all services →</p>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[["🏠", "Standard\nClean", "$89"], ["✨", "Deep\nClean", "$149"], ["🏢", "Office\nClean", "$199"], ["🔄", "Move In/\nOut", "$249"]].map(([icon, title, price], i) => (
          <div key={i} className="bg-blue-950/20 border border-blue-900/20 rounded-sm p-2 text-center">
            <p className="text-[12px]">{icon}</p>
            <p className="text-[7px] font-semibold mt-1 whitespace-pre-line leading-tight">{title}</p>
            <p className="text-[7px] text-blue-400 font-bold mt-1">From {price}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Social proof bar */}
    <div className="mx-4 py-2 bg-blue-950/20 border border-blue-900/20 rounded-sm flex items-center justify-around">
      {[["500+", "Jobs Done"], ["4.9", "Google ★"], ["100%", "Guaranteed"], ["24hr", "Response"]].map(([val, label], i) => (
        <div key={i} className="text-center">
          <p className="text-[10px] font-black text-blue-400">{val}</p>
          <p className="text-[6px] text-white/30">{label}</p>
        </div>
      ))}
    </div>

    {/* Review strip */}
    <div className="px-4 py-3">
      <div className="flex gap-2">
        {[
          ["J. Rodriguez", "Incredible attention to detail. Our office has never looked better."],
          ["M. Thompson", "Same-day booking and they were on time. Highly recommend!"],
        ].map(([name, text], i) => (
          <div key={i} className="flex-1 bg-[#0d1c2e] border border-blue-900/20 rounded-sm p-2">
            <p className="text-[7px] text-white/35 italic leading-relaxed">"{text}"</p>
            <p className="text-[6px] text-blue-400/60 mt-1 font-semibold">{name} ⭐⭐⭐⭐⭐</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PrimeshineLanding;
