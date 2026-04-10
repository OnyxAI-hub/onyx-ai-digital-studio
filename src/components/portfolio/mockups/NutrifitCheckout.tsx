const NutrifitCheckout = () => (
  <div className="bg-[#0a1a0f] text-white text-[10px] leading-tight">
    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-900/40">
      <span className="font-bold text-emerald-400 text-xs">🌿 NutriFit</span>
      <span className="text-[9px] text-emerald-200/60">Secure Checkout 🔒</span>
    </div>
    {/* Progress */}
    <div className="px-4 py-2 flex items-center gap-2 text-[7px]">
      {["Cart", "Shipping", "Payment"].map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold ${i < 2 ? "bg-emerald-500 text-black" : "bg-emerald-800/30 text-emerald-300/40"}`}>{i + 1}</div>
          <span className={i < 2 ? "text-emerald-300" : "text-emerald-300/40"}>{s}</span>
          {i < 2 && <div className="w-6 h-px bg-emerald-700/40" />}
        </div>
      ))}
    </div>
    {/* Main */}
    <div className="px-4 py-3 flex gap-4">
      {/* Form */}
      <div className="flex-1">
        <p className="text-[9px] font-semibold mb-2">Shipping Information</p>
        <div className="space-y-1.5">
          <div className="flex gap-1.5">
            <div className="flex-1">
              <p className="text-[7px] text-emerald-300/50 mb-0.5">First Name</p>
              <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">Sarah</div>
            </div>
            <div className="flex-1">
              <p className="text-[7px] text-emerald-300/50 mb-0.5">Last Name</p>
              <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">Mitchell</div>
            </div>
          </div>
          <div>
            <p className="text-[7px] text-emerald-300/50 mb-0.5">Email</p>
            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">sarah@email.com</div>
          </div>
          <div>
            <p className="text-[7px] text-emerald-300/50 mb-0.5">Address</p>
            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">123 Wellness Ave</div>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1">
              <p className="text-[7px] text-emerald-300/50 mb-0.5">City</p>
              <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">Austin</div>
            </div>
            <div className="w-16">
              <p className="text-[7px] text-emerald-300/50 mb-0.5">ZIP</p>
              <div className="bg-emerald-900/20 border border-emerald-800/30 rounded px-2 py-1 text-[8px] text-emerald-200/40">78701</div>
            </div>
          </div>
        </div>
        <p className="text-[9px] font-semibold mt-3 mb-2">Payment Method</p>
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-2">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-emerald-500 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /></div>
            <span className="text-[8px]">Credit Card</span>
            <div className="ml-auto flex gap-1 text-[7px] text-emerald-300/40">💳 Visa / MC</div>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-800/20 rounded px-2 py-1 text-[8px] text-emerald-200/30">•••• •••• •••• 4242</div>
        </div>
      </div>
      {/* Summary */}
      <div className="w-[38%] shrink-0">
        <div className="bg-emerald-900/15 border border-emerald-800/30 rounded-lg p-3">
          <p className="text-[9px] font-semibold mb-2">Order Summary</p>
          {[["Protein Blend ×2", "$59.98"], ["Greens Powder ×1", "$34.99"]].map(([item, price], i) => (
            <div key={i} className="flex justify-between py-1 border-b border-emerald-800/20 text-[8px]">
              <span className="text-emerald-200/60">{item}</span>
              <span>{price}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 text-[8px] text-emerald-300/50">
            <span>Shipping</span><span className="text-emerald-400">Free</span>
          </div>
          <div className="flex justify-between pt-2 mt-1 border-t border-emerald-700/30 font-bold text-[10px]">
            <span>Total</span><span className="text-emerald-400">$94.97</span>
          </div>
          <div className="bg-emerald-500 rounded mt-3 py-1.5 text-center text-[9px] font-bold text-black">Complete Order →</div>
          <p className="text-[6px] text-emerald-300/30 text-center mt-1.5">🔒 Secured by Stripe</p>
        </div>
      </div>
    </div>
  </div>
);

export default NutrifitCheckout;
