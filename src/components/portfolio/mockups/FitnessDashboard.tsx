const FitnessDashboard = () => (
  <div className="bg-[#110a1a] text-white text-[10px] leading-tight flex">
    {/* Sidebar */}
    <div className="w-[22%] bg-[#0d0815] border-r border-purple-900/30 py-3 px-2 shrink-0">
      <p className="font-bold text-rose-400 text-[10px] mb-3 px-1">💪 QFC</p>
      {[["📊", "Dashboard", true], ["📅", "Schedule"], ["👥", "Members"], ["💳", "Payments"], ["📈", "Analytics"], ["⚙️", "Settings"]].map(([icon, label, active], i) => (
        <div key={i} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[8px] mb-0.5 ${active ? "bg-rose-500/15 text-rose-300" : "text-purple-300/40 hover:text-purple-200/60"}`}>
          <span className="text-[9px]">{icon as string}</span>
          <span>{label as string}</span>
        </div>
      ))}
    </div>
    {/* Main */}
    <div className="flex-1 p-3">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-[9px] text-purple-300/50">Good morning</p>
          <p className="text-sm font-bold">Dashboard Overview</p>
        </div>
        <div className="bg-rose-500/15 border border-rose-500/30 rounded px-2 py-0.5 text-[8px] text-rose-300">+ New Member</div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[["1,284", "Total Members", "↑ 12%", "text-emerald-400"], ["48", "Classes Today", "↑ 5%", "text-blue-400"], ["$28.4k", "Revenue", "↑ 18%", "text-rose-400"], ["94%", "Retention", "↑ 3%", "text-amber-400"]].map(([val, label, change, color], i) => (
          <div key={i} className="bg-purple-900/15 border border-purple-800/20 rounded p-2">
            <p className={`text-[11px] font-bold ${color}`}>{val}</p>
            <p className="text-[7px] text-purple-300/40 mt-0.5">{label}</p>
            <p className={`text-[6px] ${color} mt-0.5`}>{change}</p>
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div className="bg-purple-900/10 border border-purple-800/20 rounded p-2 mb-3">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[8px] font-semibold">Member Activity</p>
          <div className="flex gap-1 text-[6px] text-purple-300/40">
            <span className="bg-purple-800/30 rounded px-1.5 py-0.5">Week</span>
            <span className="bg-rose-500/20 text-rose-300 rounded px-1.5 py-0.5">Month</span>
            <span className="bg-purple-800/30 rounded px-1.5 py-0.5">Year</span>
          </div>
        </div>
        {/* Mini chart bars */}
        <div className="flex items-end gap-1 h-12">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-rose-500/60 to-rose-400/30" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[6px] text-purple-300/30 mt-1">
          <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
        </div>
      </div>
      {/* Recent */}
      <div className="bg-purple-900/10 border border-purple-800/20 rounded p-2">
        <p className="text-[8px] font-semibold mb-1.5">Recent Check-ins</p>
        {[["Alex Torres", "CrossFit", "2 min ago"], ["Maya Chen", "Yoga", "15 min ago"], ["Ryan Bell", "Weights", "32 min ago"]].map(([name, cls, time], i) => (
          <div key={i} className="flex items-center justify-between py-1 border-b border-purple-800/15 last:border-0">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-500/40 to-purple-500/40" />
              <div>
                <p className="text-[8px] font-medium">{name}</p>
                <p className="text-[6px] text-purple-300/40">{cls}</p>
              </div>
            </div>
            <span className="text-[6px] text-purple-300/30">{time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FitnessDashboard;
