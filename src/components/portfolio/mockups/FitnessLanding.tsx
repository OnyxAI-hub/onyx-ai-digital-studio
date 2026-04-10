const FitnessLanding = () => (
  <div className="bg-[#08060e] text-white text-[10px] leading-tight">
    {/* Navbar — bold, sportier */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
      <span className="font-black text-[11px] tracking-tight">QUALITY<span className="text-rose-500">.</span></span>
      <div className="flex gap-4 text-[7px] text-white/25 font-bold tracking-[0.15em] uppercase">
        <span>Programs</span><span>Trainers</span><span>Membership</span>
      </div>
      <div className="bg-white text-black rounded-none px-2.5 py-0.5 text-[7px] font-black tracking-wider uppercase">Join</div>
    </div>

    {/* Hero — dramatic, full-width, angular */}
    <div className="relative px-4 py-8 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-rose-950/30" />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-rose-500/5 to-transparent" />
      {/* Diagonal accent */}
      <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-rose-500/20 to-transparent rotate-12" />
      
      <div className="relative">
        <p className="text-[6px] font-black tracking-[0.4em] uppercase text-rose-500/60 mb-2">No Limits. No Excuses.</p>
        <p className="text-[20px] font-black leading-[0.9] tracking-tighter uppercase">
          PUSH<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">BEYOND</span>
        </p>
        <p className="text-[7px] text-white/20 mt-3 max-w-[55%] leading-relaxed font-medium">Elite training programs, world-class facilities, and a community built for results.</p>
        <div className="flex gap-2 mt-4">
          <div className="bg-rose-500 text-white px-4 py-1.5 text-[7px] font-black tracking-wider uppercase">Start Free Trial</div>
          <div className="border border-white/15 px-3 py-1.5 text-[7px] font-bold tracking-wider uppercase text-white/40">Watch Film →</div>
        </div>
      </div>
    </div>

    {/* Stats bar — angular, high contrast */}
    <div className="mx-4 flex border-t border-b border-white/5">
      {[["1,200+", "MEMBERS"], ["50+", "CLASSES/WK"], ["15", "TRAINERS"], ["98%", "RETENTION"]].map(([val, label], i) => (
        <div key={i} className="flex-1 py-2.5 text-center border-r border-white/5 last:border-0">
          <p className="text-[10px] font-black tracking-tight">{val}</p>
          <p className="text-[5px] font-bold tracking-[0.2em] text-white/15 mt-0.5">{label}</p>
        </div>
      ))}
    </div>

    {/* Programs — card style with image-like blocks */}
    <div className="px-4 py-4">
      <p className="text-[7px] font-black tracking-[0.25em] uppercase text-white/30 mb-2.5">Programs</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "CROSSFIT", accent: "from-rose-600/30 to-rose-900/10", desc: "High intensity" },
          { name: "YOGA", accent: "from-purple-600/30 to-purple-900/10", desc: "Mind & body" },
          { name: "HIIT", accent: "from-amber-600/20 to-amber-900/10", desc: "Fat burning" },
        ].map((p, i) => (
          <div key={i} className="relative overflow-hidden">
            <div className={`bg-gradient-to-b ${p.accent} rounded-sm p-3 h-16 flex flex-col justify-end`}>
              <p className="text-[8px] font-black tracking-wider">{p.name}</p>
              <p className="text-[6px] text-white/25 font-medium">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA strip — bold */}
    <div className="mx-4 py-3 border-t border-white/5 flex items-center justify-between">
      <div>
        <p className="text-[8px] font-black tracking-tight">First week free.</p>
        <p className="text-[6px] text-white/20 font-medium">No commitment. Cancel anytime.</p>
      </div>
      <div className="bg-white text-black px-3 py-1 text-[7px] font-black tracking-wider uppercase">Claim Offer</div>
    </div>
  </div>
);

export default FitnessLanding;
