import { Check, Minus } from "lucide-react";

type Cell = string | boolean;
interface Row { label: string; values: Cell[]; }
interface Group { title: string; rows: Row[]; }

const cols = ["Free", "Starter", "Basic", "Premium", "Pro", "Ultra"];

const groups: Group[] = [
  {
    title: "Credits & Usage",
    rows: [
      { label: "Monthly credits", values: ["300", "5,000", "11,000", "25,000", "60,000", "130,000"] },
      { label: "Free assistant turns / day", values: ["5", "5", "10", "15", "25", "30"] },
      { label: "Est. standard images / mo", values: ["~30", "~500", "~1,100", "~2,500", "~6,000", "~13,000"] },
      { label: "Est. 5s standard videos / mo", values: ["—", "10", "22", "50", "120", "260"] },
      { label: "Est. music visuals / mo", values: ["—", "~65", "~145", "~330", "~800", "~1,700"] },
      { label: "Concurrent jobs", values: ["1", "2", "3", "5", "7", "10"] },
      { label: "Storage", values: ["500MB", "10GB", "20GB", "40GB", "50GB", "60GB"] },
    ],
  },
  {
    title: "Model Access",
    rows: [
      { label: "Standard image models", values: [true, true, true, true, true, true] },
      { label: "Premium image models", values: [false, true, true, true, true, true] },
      { label: "Standard video models", values: [false, false, true, true, true, true] },
      { label: "High-end video models", values: [false, false, false, true, true, true] },
      { label: "Audio / music tools", values: [false, true, true, true, true, true] },
      { label: "Creative apps", values: [false, false, true, true, true, true] },
      { label: "Website studio (requests)", values: [true, true, true, true, true, true] },
      { label: "Automation studio (requests)", values: [true, true, true, true, true, true] },
    ],
  },
  {
    title: "Platform Features",
    rows: [
      { label: "No watermark", values: [false, true, true, true, true, true] },
      { label: "Asset manager", values: [true, true, true, true, true, true] },
      { label: "Gallery posting", values: [true, true, true, true, true, true] },
      { label: "Profile page", values: [true, true, true, true, true, true] },
      { label: "Challenges", values: [true, true, true, true, true, true] },
      { label: "Daily rewards", values: [true, true, true, true, true, true] },
      { label: "Blog / community posting", values: [false, true, true, true, true, true] },
      { label: "Design studio", values: [false, false, true, true, true, true] },
      { label: "Commercial usage", values: [false, false, false, true, true, true] },
      { label: "Priority processing", values: [false, false, false, false, true, true] },
      { label: "Credit pack bonus", values: ["—", "—", "—", "—", "+5%", "+10%"] },
      { label: "Model discounts", values: [false, false, false, false, true, true] },
    ],
  },
  {
    title: "Access Level",
    rows: [
      { label: "Content safety level", values: ["Strict", "Standard", "Standard", "Standard", "Custom", "Custom"] },
      { label: "Generation filtering", values: [true, true, true, true, true, true] },
      { label: "Support level", values: ["Community", "Email", "Email", "Priority", "Priority", "Priority"] },
    ],
  },
];

const renderCell = (v: Cell) => {
  if (v === true) return <Check className="h-4 w-4 mx-auto text-foreground/90" />;
  if (v === false) return <Minus className="h-4 w-4 mx-auto text-muted-foreground/40" />;
  return <span className="text-xs text-foreground/85">{v}</span>;
};

const CompareTable = () => (
  <div className="glass-card overflow-x-auto">
    <table className="w-full min-w-[760px] text-sm">
      <thead>
        <tr className="border-b border-border/40 bg-card/40">
          <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3">Feature</th>
          {cols.map((c) => (
            <th key={c} className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3">{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => (
          <>
            <tr key={g.title} className="bg-card/20">
              <td colSpan={cols.length + 1} className="px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
                {g.title}
              </td>
            </tr>
            {g.rows.map((r) => (
              <tr key={g.title + r.label} className="border-b border-border/20 last:border-0">
                <td className="px-5 py-3 text-xs text-muted-foreground">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="px-3 py-3 text-center">{renderCell(v)}</td>
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompareTable;
