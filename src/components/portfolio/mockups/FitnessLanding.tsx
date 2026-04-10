const FitnessLanding = () => (
  <div className="bg-[#110a1a] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-purple-900/40">
      <span className="font-bold text-rose-400 text-xs">💪 Quality Fitness Club</span>
      <div className="flex gap-3 text-[9px] text-purple-200/60">
        <span>Classes</span><span>Trainers</span><span>Pricing</span><span>Contact</span>
      </div>
      <div className="bg-rose-500 rounded px-2 py-0.5 text-[8px] font-semibold text-white">Join Now</div>
    </div>
    {/* Hero */}
    <div className="px-4 py-6 bg-gradient-to-br from-purple-900/40 to-rose-900/20">
      <p className="text-[8px] uppercase tracking-widest text-rose-400/70 mb-1">Premium Fitness Experience</p>
      <p className="text-sm font-bold leading-tight">Train Hard.<br/>Live Strong.</p>
      <p className="text-[9px] text-purple-200/50 mt-1 max-w-[70%]">World-class equipment, expert trainers, and a community that pushes you to your best.</p>
      <div className="flex gap-2 mt-3">
        <div className="bg-rose-500 rounded px-3 py-1 text-[8px] font-bold text-white">Start Free Trial</div>
        <div className="border border-rose-500/40 rounded px-3 py-1 text-[8px] text-rose-300">View Classes</div>
      </div>
    </div>
    {/* Features */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold text-purple-300/80 mb-2">WHY CHOOSE US</p>
      <div className="grid grid-cols-3 gap-2">
        {[["🏋️", "50+ Classes", "Weekly sessions"], ["👤", "Expert Trainers", "Certified pros"], ["📊", "Track Progress", "Smart analytics"]].map(([icon, title, sub], i) => (
          <div key={i} className="bg-purple-900/15 border border-purple-800/30 rounded p-2.5 text-center">
            <p className="text-lg">{icon}</p>
            <p className="text-[8px] font-semibold mt-1">{title}</p>
            <p className="text-[7px] text-purple-300/40 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Stats */}
    <div className="px-4 py-2.5 bg-purple-900/10 border-t border-b border-purple-900/30">
      <div className="flex justify-between items-center">
        {[["1,200+", "Active Members"], ["4.9★", "Member Rating"], ["98%", "Retention Rate"]].map(([val, label], i) => (
          <div key={i} className="text-center">
            <p className="text-[11px] font-bold text-rose-400">{val}</p>
            <p className="text-[7px] text-purple-300/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
    {/* Classes */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold text-purple-300/80 mb-2">POPULAR CLASSES</p>
      <div className="grid grid-cols-3 gap-2">
        {[["CrossFit", "Mon/Wed/Fri"], ["Yoga Flow", "Tue/Thu"], ["HIIT Burn", "Daily"]].map(([name, days], i) => (
          <div key={i} className="bg-gradient-to-br from-purple-900/20 to-rose-900/10 border border-purple-800/20 rounded p-2">
            <p className="text-[8px] font-semibold">{name}</p>
            <p className="text-[7px] text-purple-300/40">{days}</p>
            <div className="bg-rose-500/20 text-rose-300 rounded mt-1.5 py-0.5 text-center text-[7px] font-medium">Book →</div>
          </div>
        ))}
      </div>
    </div>
    {/* CTA */}
    <div className="px-4 py-3 text-center bg-gradient-to-r from-purple-900/20 to-rose-900/10 border-t border-purple-900/30">
      <p className="text-[9px] font-semibold">Ready to transform your fitness?</p>
      <div className="bg-rose-500 rounded px-4 py-1 text-[8px] font-bold mt-1.5 inline-block text-white">Join Today — First Week Free →</div>
    </div>
  </div>
);

export default FitnessLanding;
