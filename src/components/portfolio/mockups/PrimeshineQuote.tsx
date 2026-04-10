const PrimeshineQuote = () => (
  <div className="bg-[#0a1625] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-blue-900/40">
      <span className="font-bold text-blue-400 text-xs">✨ PrimeShine</span>
      <span className="text-[9px] text-blue-200/60">Instant Quote</span>
    </div>
    <div className="px-4 py-3">
      <p className="text-sm font-bold mb-0.5">Get Your Free Estimate</p>
      <p className="text-[8px] text-blue-200/50 mb-3">Answer a few questions and get an instant price quote.</p>
      {/* Service Type */}
      <p className="text-[8px] font-semibold text-blue-300/70 mb-1">Service Type</p>
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[["🏠", "Standard"], ["✨", "Deep Clean"], ["🏢", "Commercial"]].map(([icon, label], i) => (
          <div key={i} className={`text-center py-2 rounded border ${i === 1 ? "border-blue-500 bg-blue-500/10" : "border-blue-800/30"}`}>
            <p className="text-sm">{icon}</p>
            <p className="text-[7px] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      {/* Property Size */}
      <p className="text-[8px] font-semibold text-blue-300/70 mb-1">Property Size</p>
      <div className="flex gap-1.5 mb-3">
        {["Studio", "1-2 BR", "3-4 BR", "5+ BR"].map((s, i) => (
          <div key={i} className={`flex-1 text-center py-1 rounded text-[7px] border ${i === 2 ? "border-blue-500 bg-blue-500/10 text-blue-300 font-semibold" : "border-blue-800/30 text-blue-200/50"}`}>{s}</div>
        ))}
      </div>
      {/* Extras */}
      <p className="text-[8px] font-semibold text-blue-300/70 mb-1">Add-Ons</p>
      <div className="space-y-1 mb-3">
        {[["Inside Oven", "+$30", true], ["Inside Fridge", "+$25", true], ["Window Cleaning", "+$45", false], ["Laundry Service", "+$35", false]].map(([label, price, checked], i) => (
          <div key={i} className="flex items-center justify-between bg-blue-900/10 border border-blue-800/20 rounded px-2 py-1">
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded border ${checked ? "bg-blue-500 border-blue-500" : "border-blue-700/40"} flex items-center justify-center text-[6px]`}>{checked ? "✓" : ""}</div>
              <span className="text-[8px]">{label as string}</span>
            </div>
            <span className="text-[7px] text-blue-400">{price as string}</span>
          </div>
        ))}
      </div>
      {/* Frequency */}
      <p className="text-[8px] font-semibold text-blue-300/70 mb-1">Frequency</p>
      <div className="flex gap-1.5 mb-3">
        {[["One-Time", "$249"], ["Weekly", "$199/wk"], ["Bi-Weekly", "$219"], ["Monthly", "$229"]].map(([label, price], i) => (
          <div key={i} className={`flex-1 text-center py-1.5 rounded text-[7px] border ${i === 1 ? "border-blue-500 bg-blue-500/10" : "border-blue-800/30"}`}>
            <p className="font-semibold">{label}</p>
            <p className="text-blue-400 text-[6px] mt-0.5">{price}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Quote Result */}
    <div className="px-4 py-3 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border-t border-blue-800/30">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[8px] text-blue-300/50">Your Estimated Quote</p>
          <p className="text-lg font-bold text-blue-400">$254<span className="text-[9px] text-blue-300/40">/session</span></p>
        </div>
        <div className="bg-blue-500 rounded px-4 py-1.5 text-[9px] font-bold">Book Now →</div>
      </div>
    </div>
  </div>
);

export default PrimeshineQuote;
