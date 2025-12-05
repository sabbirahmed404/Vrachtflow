"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingAddressSection } from "@/components/valuation/step-1/loading-address-section";
import { UnloadingAddressSection } from "@/components/valuation/step-1/unloading-address-section";
import { StepIndicator } from "@/components/valuation/step-indicator";
import { ServiceSelectionSection } from "@/components/valuation/step-2/service-selection-section";
import { FormActions } from "@/components/valuation/form-actions";
import { RoomInventorySection } from "@/components/valuation/step-3/room-inventory-section";
import { DeliveryDetailsSection } from "@/components/valuation/step-4/delivery-details-section";
import { NotesSection } from "@/components/valuation/step-5/notes-section";
import { QuoteSetupSection } from "@/components/valuation/step-6/quote-setup-section";
import { FinalQuoteSection } from "@/components/valuation/step-7/final-quote-section";
import { SendQuoteSection } from "@/components/valuation/step-8/send-quote-section";
import { CustomerInformationSection } from "@/components/valuation/step-1/customer-information-section";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-[850px]">
        <Card className="shadow-lg border border-border/50 rounded-2xl relative">
          <button
            onClick={() => logout()}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            title="Sign out"
            type="button"
          >
            <LogOut className="h-5 w-5 text-gray-500 hover:text-red-500" />
          </button>
          <CardContent className="p-6 md:p-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={8}
              stepTitle={stepTitles[currentStep]}
            />

            <form>
              {currentStep === 1 && (
                <>
                  <CustomerInformationSection />
                  <LoadingAddressSection />
                  <UnloadingAddressSection />
                </>
              )}

              {currentStep === 2 && <ServiceSelectionSection />}

              {currentStep === 3 && <RoomInventorySection />}

              {currentStep === 4 && <DeliveryDetailsSection />}

              {currentStep === 5 && <NotesSection />}

              {currentStep === 6 && <QuoteSetupSection />}

              {currentStep === 7 && <FinalQuoteSection />}

              {currentStep === 8 && <SendQuoteSection />}

              <FormActions
                showBack={currentStep > 1}
                onBack={handleBack}
                onNext={handleNext}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
