// Decides whether an intakeType belongs to the in-platform creative flow
// (saves to creative_requests via /generate) or to the public Project Intake
// form (for custom business / agency work).

export const CREATIVE_INTAKE_TYPES = new Set<string>([
  "AI Image Creation",
  "AI Video Generation",
  "AI Promo Video",
  "Music Visualizer",
  "Cover Art / Brand Visual",
  "Custom AI Request",
  "Social Content Pack",
]);

export const BUSINESS_INTAKE_TYPES = new Set<string>([
  "Website / Landing Page",
  "Web App / Business System",
  "AI Agent Setup",
  "Automation System",
  "Monthly Support",
  "Custom Business Project",
  "Book Consultation",
]);

export function isCreativeIntake(intakeType: string) {
  return CREATIVE_INTAKE_TYPES.has(intakeType);
}

export function tabForIntakeType(intakeType: string): string {
  if (intakeType.includes("Video") || intakeType.includes("Promo")) return "Video";
  if (intakeType.includes("Music")) return "Audio";
  if (intakeType.includes("Cover") || intakeType.includes("Brand")) return "Design";
  if (intakeType === "Custom AI Request") return "Apps";
  return "Image";
}

export function getStudioHref(
  intakeType: string,
  extra?: Record<string, string>,
): string {
  if (isCreativeIntake(intakeType)) {
    const params = new URLSearchParams({
      tab: tabForIntakeType(intakeType),
      type: intakeType,
      ...(extra ?? {}),
    });
    return `/generate?${params.toString()}`;
  }
  const params = new URLSearchParams({ type: intakeType, ...(extra ?? {}) });
  return `/project-intake?${params.toString()}`;
}
