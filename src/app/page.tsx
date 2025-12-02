"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingAddressSection } from "@/components/valuation/step-1/loading-address-section";
import { UnloadingAddressSection } from "@/components/valuation/step-1/unloading-address-section";
import { StepIndicator } from "@/components/valuation/step-indicator";

const stepTitles: Record<number, string> = {
  1: "Customer Info & Address Fill-Up",
  2: "Additional Services",
  3: "Room-by-Room Inventory",
  4: "Customer Details & Addresses",
  5: "Notes & Preferences",
  6: "Payment Agreements",
  7: "Total Estimate",
  8: "Send Quote",
};

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-[850px]">
        <Card className="shadow-lg border border-border/50 rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={8}
              stepTitle={stepTitles[currentStep]}
            />

            <form>
              {currentStep === 1 && (
                <>
                  <LoadingAddressSection />
                  <UnloadingAddressSection />
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
