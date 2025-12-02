"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface FormActionsProps {
  showBack?: boolean;
  onBack?: () => void;
  onNext?: () => void;
}

export function FormActions({
  showBack = false,
  onBack,
  onNext,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      {showBack ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          Save Draft
        </Button>
      )}
      <Button type="button" onClick={onNext} className="gap-2">
        Next
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
