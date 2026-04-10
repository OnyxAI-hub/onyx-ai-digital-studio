const FitnessSchedule = () => (
  <div className="bg-[#110a1a] text-white text-[10px] leading-tight flex">
    {/* Sidebar */}
    <div className="w-[22%] bg-[#0d0815] border-r border-purple-900/30 py-3 px-2 shrink-0">
      <p className="font-bold text-rose-400 text-[10px] mb-3 px-1">💪 QFC</p>
      {[["📊", "Dashboard"], ["📅", "Schedule", true], ["👥", "Members"], ["💳", "Payments"], ["📈", "Analytics"]].map(([icon, label, active], i) => (
        <div key={i} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[8px] mb-0.5 ${active ? "bg-rose-500/15 text-rose-300" : "text-purple-300/40"}`}>
          <span className="text-[9px]">{icon as string}</span>
          <span>{label as string}</span>
        </div>
      ))}
    </div>
    {/* Main */}
    <div className="flex-1 p-3">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-bold">Class Schedule</p>
        <div className="bg-rose-500/15 border border-rose-500/30 rounded px-2 py-0.5 text-[8px] text-rose-300">+ Add Class</div>
      </div>
      {/* Day tabs */}
      <div className="flex gap-1 mb-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
          <div key={d} className={`flex-1 text-center py-1 rounded text-[7px] ${i === 2 ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30" : "bg-purple-900/15 text-purple-300/40 border border-purple-800/20"}`}>
            <p>{d}</p>
            <p className="text-[9px] font-bold mt-0.5">{15 + i}</p>
          </div>
        ))}
      </div>
      {/* Schedule */}
      <div className="space-y-1.5">
        {[
          ["6:00 AM", "Morning HIIT", "Coach Sarah", "18/25", "bg-rose-500/15 border-rose-500/30", "text-rose-300"],
          ["7:30 AM", "Power Yoga", "Instructor Maya", "12/20", "bg-purple-500/15 border-purple-500/30", "text-purple-300"],
          ["9:00 AM", "Spin Class", "Coach Alex", "22/25", "bg-blue-500/15 border-blue-500/30", "text-blue-300"],
          ["10:30 AM", "CrossFit WOD", "Coach Ryan", "25/25", "bg-amber-500/15 border-amber-500/30", "text-amber-300"],
          ["12:00 PM", "Boxing Basics", "Coach Jake", "8/15", "bg-emerald-500/15 border-emerald-500/30", "text-emerald-300"],
          ["2:00 PM", "Pilates Core", "Instructor Lily", "14/20", "bg-pink-500/15 border-pink-500/30", "text-pink-300"],
          ["4:30 PM", "Strength Training", "Coach David", "16/20", "bg-cyan-500/15 border-cyan-500/30", "text-cyan-300"],
          ["6:00 PM", "Evening Yoga Flow", "Instructor Maya", "10/20", "bg-purple-500/15 border-purple-500/30", "text-purple-300"],
        ].map(([time, name, trainer, cap, bg, color], i) => (
          <div key={i} className={`flex items-center gap-3 ${bg} border rounded p-2`}>
            <span className="text-[8px] text-purple-300/40 w-12 shrink-0">{time}</span>
            <div className="flex-1">
              <p className={`text-[9px] font-semibold ${color}`}>{name}</p>
              <p className="text-[7px] text-purple-300/40">{trainer}</p>
            </div>
            <div className="text-right">
              <p className="text-[7px] text-purple-300/40">{cap}</p>
              <div className={`text-[7px] mt-0.5 px-1.5 py-0.5 rounded ${cap === "25/25" ? "bg-amber-500/20 text-amber-300" : `${bg} ${color}`}`}>
                {cap === "25/25" ? "Full" : "Join"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FitnessSchedule;
