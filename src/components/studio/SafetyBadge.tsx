import { Shield } from "lucide-react";
import { Safety, safetyBadgeClass } from "@/data/studio";

const SafetyBadge = ({ safety }: { safety: Safety }) => (
  <span className={safetyBadgeClass(safety)}>
    <Shield className="h-2.5 w-2.5" />
    {safety}
  </span>
);

export default SafetyBadge;
