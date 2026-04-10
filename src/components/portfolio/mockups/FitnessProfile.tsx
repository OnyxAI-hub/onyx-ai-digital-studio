const FitnessProfile = () => (
  <div className="bg-[#110a1a] text-white text-[10px] leading-tight flex">
    {/* Sidebar */}
    <div className="w-[22%] bg-[#0d0815] border-r border-purple-900/30 py-3 px-2 shrink-0">
      <p className="font-bold text-rose-400 text-[10px] mb-3 px-1">💪 QFC</p>
      {[["📊", "Dashboard"], ["📅", "Schedule"], ["👥", "Members", true], ["💳", "Payments"], ["📈", "Analytics"]].map(([icon, label, active], i) => (
        <div key={i} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[8px] mb-0.5 ${active ? "bg-rose-500/15 text-rose-300" : "text-purple-300/40"}`}>
          <span className="text-[9px]">{icon as string}</span>
          <span>{label as string}</span>
        </div>
      ))}
    </div>
    {/* Main */}
    <div className="flex-1 p-3">
      {/* Profile Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/50 to-purple-500/50 shrink-0 flex items-center justify-center text-lg">AT</div>
        <div className="flex-1">
          <p className="text-sm font-bold">Alex Torres</p>
          <p className="text-[8px] text-purple-300/50">Member since Jan 2023</p>
          <div className="flex gap-1.5 mt-1">
            <span className="bg-rose-500/15 text-rose-300 rounded px-1.5 py-0.5 text-[7px] border border-rose-500/20">Premium</span>
            <span className="bg-emerald-500/15 text-emerald-300 rounded px-1.5 py-0.5 text-[7px] border border-emerald-500/20">Active</span>
          </div>
        </div>
        <div className="bg-purple-900/20 border border-purple-800/30 rounded px-2 py-0.5 text-[8px] text-purple-300/60">Edit Profile</div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[["156", "Workouts", "text-rose-400"], ["23", "Classes", "text-blue-400"], ["48", "Streak Days", "text-amber-400"], ["2,840", "Calories/wk", "text-emerald-400"]].map(([val, label, color], i) => (
          <div key={i} className="bg-purple-900/15 border border-purple-800/20 rounded p-2 text-center">
            <p className={`text-[11px] font-bold ${color}`}>{val}</p>
            <p className="text-[6px] text-purple-300/40 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      {/* Membership */}
      <div className="bg-gradient-to-r from-rose-900/20 to-purple-900/15 border border-rose-800/20 rounded p-2.5 mb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[8px] text-rose-300/60">Current Plan</p>
            <p className="text-[10px] font-bold">Premium Unlimited</p>
            <p className="text-[7px] text-purple-300/40 mt-0.5">Next billing: Feb 1, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-rose-400">$79<span className="text-[7px] text-rose-300/40">/mo</span></p>
            <div className="bg-purple-800/30 rounded px-1.5 py-0.5 text-[7px] text-purple-300/50 mt-0.5">Manage</div>
          </div>
        </div>
      </div>
      {/* Activity / Goals */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-purple-900/10 border border-purple-800/20 rounded p-2">
          <p className="text-[8px] font-semibold mb-1.5">Weekly Goals</p>
          {[["Workouts", 80], ["Cardio", 60], ["Strength", 90]].map(([label, pct], i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between text-[7px] mb-0.5">
                <span className="text-purple-300/50">{label as string}</span>
                <span className="text-rose-300">{pct as number}%</span>
              </div>
              <div className="h-1 bg-purple-800/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-purple-900/10 border border-purple-800/20 rounded p-2">
          <p className="text-[8px] font-semibold mb-1.5">Recent Activity</p>
          {[["CrossFit WOD", "Today, 7:00 AM"], ["Spin Class", "Yesterday"], ["Yoga Flow", "Jan 14"]].map(([cls, date], i) => (
            <div key={i} className="flex justify-between py-0.5 border-b border-purple-800/15 last:border-0 text-[7px]">
              <span>{cls}</span>
              <span className="text-purple-300/30">{date}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Account */}
      <div className="mt-3 bg-purple-900/10 border border-purple-800/20 rounded p-2">
        <p className="text-[8px] font-semibold mb-1">Account Details</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[7px]">
          <span className="text-purple-300/40">Email</span><span>alex.torres@email.com</span>
          <span className="text-purple-300/40">Phone</span><span>(512) 555-0147</span>
          <span className="text-purple-300/40">Emergency</span><span>Maria Torres</span>
        </div>
      </div>
    </div>
  </div>
);

export default FitnessProfile;
