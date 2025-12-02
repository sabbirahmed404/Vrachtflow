"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/valuation/form-section";
import { Link2, Copy, CheckCircle2, ExternalLink } from "lucide-react";

export function ValuationLinkSection() {
  const [isCopied, setIsCopied] = useState(false);
  const valuationLink = "https://vrachtpatser.nl/valuation/abc123xyz";

  const handleCopy = () => {
    navigator.clipboard.writeText(valuationLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <FormSection title="Valuation Link" showDivider={false}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Share this link with the customer to allow them to fill in their
          inventory details online.
        </p>

        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <Label
              htmlFor="valuationLink"
              className="text-sm font-medium text-foreground"
            >
              Customer Valuation Link
            </Label>
            <div className="relative">
              <Input
                id="valuationLink"
                value={valuationLink}
                readOnly
                className="bg-muted/50 pr-10 text-muted-foreground"
              />
              <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="h-10 bg-transparent"
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              asChild
              className="h-10 bg-transparent"
            >
              <a href={valuationLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview
              </a>
            </Button>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Tip:</strong> Once the customer completes their valuation,
            the inventory data will automatically sync with this job.
          </p>
        </div>
      </div>
    </FormSection>
  );
}
