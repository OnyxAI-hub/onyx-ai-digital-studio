const FitnessLanding = () => (
  <div className="bg-[#08060e] text-white text-[10px] leading-tight">
    {/* Nav — minimal, sportier */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
      <span className="font-black text-[11px] tracking-tighter">QUALITY<span className="text-rose-500">.</span></span>
      <div className="flex gap-4 text-[6px] text-white/20 font-bold tracking-[0.15em] uppercase">
        <span>Programs</span><span>Trainers</span><span>Membership</span>
      </div>
      <div className="bg-white text-black px-2.5 py-0.5 text-[6px] font-black tracking-wider uppercase">Join</div>
    </div>

    {/* Hero — cinematic, centered, layered */}
    <div className="relative py-10 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-transparent to-rose-950/20" />
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-rose-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#08060e] to-transparent" />

      <div className="relative text-center px-4">
        <p className="text-[5px] font-black tracking-[0.5em] uppercase text-rose-500/50 mb-3">No Limits · No Excuses · No Compromise</p>
        <p className="text-[22px] font-black leading-[0.85] tracking-tighter uppercase">
          PUSH<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400">BEYOND</span>
        </p>
        <p className="text-[7px] text-white/15 mt-3 mx-auto max-w-[50%] leading-relaxed font-medium">Elite training. World-class facilities. A community built for results.</p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="bg-rose-500 text-white px-5 py-1.5 text-[7px] font-black tracking-wider uppercase">Start Free Trial</div>
          <div className="border border-white/10 px-4 py-1.5 text-[7px] font-bold tracking-wider uppercase text-white/30">Watch Film →</div>
        </div>
      </div>
    </div>

    {/* Stats — bold strip */}
    <div className="flex border-t border-b border-white/5">
      {[["1,200+", "MEMBERS"], ["50+", "CLASSES"], ["15", "TRAINERS"], ["98%", "RETENTION"]].map(([val, label], i) => (
        <div key={i} className="flex-1 py-2 text-center border-r border-white/5 last:border-0">
          <p className="text-[10px] font-black tracking-tight">{val}</p>
          <p className="text-[4px] font-bold tracking-[0.25em] text-white/10 mt-0.5">{label}</p>
        </div>
      ))}
    </div>

    {/* Programs — angular cards */}
    <div className="px-4 py-3">
      <p className="text-[6px] font-black tracking-[0.3em] uppercase text-white/15 mb-2 text-center">Programs</p>
      <div className="flex gap-2 justify-center">
        {[
          { name: "CROSSFIT", sub: "High intensity", accent: "from-rose-600/25 to-rose-900/5" },
          { name: "YOGA", sub: "Mind & body", accent: "from-purple-600/25 to-purple-900/5" },
          { name: "HIIT", sub: "Fat burning", accent: "from-amber-600/15 to-amber-900/5" },
        ].map((p, i) => (
          <div key={i} className={`flex-1 bg-gradient-to-b ${p.accent} p-2.5 flex flex-col justify-end h-14`}>
            <p className="text-[7px] font-black tracking-wider">{p.name}</p>
            <p className="text-[5px] text-white/15 font-medium">{p.sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA — centered bold */}
    <div className="text-center py-3 border-t border-white/5">
      <p className="text-[7px] font-black tracking-tight">First week free<span className="text-rose-500">.</span></p>
      <p className="text-[5px] text-white/15 mt-0.5">No commitment. Cancel anytime.</p>
    </div>
  </div>
);

export default FitnessLanding;
