const PrimeshineLanding = () => (
  <div className="bg-[#0a1625] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-blue-900/40">
      <span className="font-bold text-blue-400 text-xs">✨ PrimeShine</span>
      <div className="flex gap-3 text-[9px] text-blue-200/60">
        <span>Services</span><span>Pricing</span><span>Areas</span><span>Reviews</span>
      </div>
      <div className="bg-blue-500 rounded px-2 py-0.5 text-[8px] font-semibold">Book Now</div>
    </div>
    {/* Hero */}
    <div className="px-4 py-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/15">
      <p className="text-[8px] uppercase tracking-widest text-blue-400/70 mb-1">Professional Cleaning</p>
      <p className="text-sm font-bold leading-tight">A Cleaner Home.<br/>A Better Life.</p>
      <p className="text-[9px] text-blue-200/50 mt-1 max-w-[65%]">Trusted residential & commercial cleaning in your area. Book online in 60 seconds.</p>
      <div className="flex gap-2 mt-3">
        <div className="bg-blue-500 rounded px-3 py-1 text-[8px] font-bold text-white">Get Free Quote</div>
        <div className="border border-blue-500/40 rounded px-3 py-1 text-[8px] text-blue-300">Our Services</div>
      </div>
    </div>
    {/* Services */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold text-blue-300/80 mb-2">OUR SERVICES</p>
      <div className="grid grid-cols-3 gap-2">
        {[["🏠", "Residential", "From $89"], ["🏢", "Commercial", "From $149"], ["🧹", "Deep Clean", "From $199"]].map(([icon, title, price], i) => (
          <div key={i} className="bg-blue-900/15 border border-blue-800/30 rounded p-2.5 text-center">
            <p className="text-lg">{icon}</p>
            <p className="text-[8px] font-semibold mt-1">{title}</p>
            <p className="text-[7px] text-blue-400 mt-0.5">{price}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Trust */}
    <div className="px-4 py-2.5 bg-blue-900/10 border-t border-b border-blue-900/30">
      <div className="flex justify-between items-center">
        {[["500+", "Homes Cleaned"], ["4.9★", "Google Rating"], ["100%", "Satisfaction"]].map(([val, label], i) => (
          <div key={i} className="text-center">
            <p className="text-[11px] font-bold text-blue-400">{val}</p>
            <p className="text-[7px] text-blue-300/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Testimonial */}
    <div className="px-4 py-3">
      <div className="bg-blue-900/15 border border-blue-800/20 rounded p-2.5">
        <p className="text-[8px] text-blue-200/60 italic">"They transformed our office! Incredibly thorough and always on time."</p>
        <p className="text-[7px] text-blue-400 mt-1">— James R. ⭐⭐⭐⭐⭐</p>
      </div>
    </div>
    {/* CTA */}
    <div className="px-4 py-3 text-center bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border-t border-blue-900/30">
      <p className="text-[9px] font-semibold">Ready for a spotless space?</p>
      <div className="bg-blue-500 rounded px-4 py-1 text-[8px] font-bold mt-1.5 inline-block">Book Your Cleaning →</div>
    </div>
  </div>
);

export default PrimeshineLanding;
