const PrimeshineBooking = () => (
  <div className="bg-[#0a1625] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-blue-900/40">
      <span className="font-bold text-blue-400 text-xs">✨ PrimeShine</span>
      <span className="text-[9px] text-blue-200/60">Book a Cleaning</span>
    </div>
    {/* Progress */}
    <div className="px-4 py-2 flex items-center gap-1 text-[7px]">
      {["Service", "Date & Time", "Details", "Confirm"].map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold ${i < 2 ? "bg-blue-500 text-white" : "bg-blue-800/30 text-blue-300/40"}`}>{i + 1}</div>
          <span className={`${i < 2 ? "text-blue-300" : "text-blue-300/40"} hidden sm:inline`}>{s}</span>
          {i < 3 && <div className="w-4 h-px bg-blue-700/40" />}
        </div>
      ))}
    </div>
    {/* Date Time */}
    <div className="px-4 py-3">
      <p className="text-[9px] font-semibold mb-2">Select Date & Time</p>
      {/* Calendar mini */}
      <div className="bg-blue-900/15 border border-blue-800/30 rounded-lg p-2.5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[8px] text-blue-300/50">‹</span>
          <span className="text-[9px] font-semibold">January 2025</span>
          <span className="text-[8px] text-blue-300/50">›</span>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[7px]">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <span key={d} className="text-blue-300/40 py-0.5">{d}</span>)}
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className={`py-0.5 rounded ${i === 14 ? "bg-blue-500 text-white font-bold" : i === 7 || i === 21 ? "text-blue-300/30" : "text-blue-200/60 hover:bg-blue-800/20"}`}>{i + 1}</div>
          ))}
        </div>
      </div>
      {/* Time slots */}
      <p className="text-[9px] font-semibold mt-3 mb-1.5">Available Times</p>
      <div className="grid grid-cols-4 gap-1.5">
        {["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"].map((t, i) => (
          <div key={i} className={`text-center py-1 rounded text-[8px] border ${i === 2 ? "border-blue-500 bg-blue-500/15 text-blue-300 font-semibold" : "border-blue-800/30 text-blue-200/50"}`}>{t}</div>
        ))}
      </div>
    </div>
    {/* Service selected */}
    <div className="px-4 py-2.5 border-t border-blue-900/30 bg-blue-900/10">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[8px] text-blue-300/50">Selected Service</p>
          <p className="text-[9px] font-semibold">Deep Clean — 3 Bedrooms</p>
        </div>
        <p className="text-[10px] font-bold text-blue-400">$199</p>
      </div>
    </div>
    {/* CTA */}
    <div className="px-4 py-3">
      <div className="flex gap-2">
        <div className="border border-blue-700/30 rounded px-4 py-1.5 text-[9px] text-blue-300/60 text-center">← Back</div>
        <div className="bg-blue-500 rounded px-4 py-1.5 text-[9px] font-bold text-center flex-1">Continue to Details →</div>
      </div>
    </div>
  </div>
);

export default PrimeshineBooking;
