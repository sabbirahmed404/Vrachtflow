interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepTitle,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
          {currentStep}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
          <h1 className="text-xl font-semibold text-foreground">{stepTitle}</h1>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-colors ${
              i + 1 <= currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
