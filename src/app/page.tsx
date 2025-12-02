import { Card, CardContent } from "@/components/ui/card";
import { FormActions } from "@/components/valuation/form-actions";
import { CustomerInformationSection } from "@/components/valuation/step-1/customer-information-section";
import { LoadingAddressSection } from "@/components/valuation/step-1/loading-address-section";
import { PostcodeLookupSection } from "@/components/valuation/step-1/postcode-lookup-section";
import { ValuationLinkSection } from "@/components/valuation/step-1/valuation-link-section";
import { StepIndicator } from "@/components/valuation/step-indicator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-[850px]">
        <Card className="shadow-lg border border-border/50 rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <StepIndicator
              currentStep={1}
              totalSteps={8}
              stepTitle="Valuation Link & Address Fill-up"
            />

            <form>
              <PostcodeLookupSection />
              <CustomerInformationSection />
              <LoadingAddressSection />
              <ValuationLinkSection />
              <FormActions showBack={true} />
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
