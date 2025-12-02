import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  showDivider?: boolean;
}

export function FormSection({
  title,
  children,
  showDivider = true,
}: FormSectionProps) {
  return (
    <div className={`py-6 ${showDivider ? "border-b border-border" : ""}`}>
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </div>
  );
}
