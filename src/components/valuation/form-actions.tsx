import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface FormActionsProps {
  showBack?: boolean;
}

export function FormActions({ showBack = false }: FormActionsProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      {showBack ? (
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          Save Draft
        </Button>
      )}
      <Button className="gap-2">
        Next
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
