"use client";

import type React from "react";

import { useState } from "react";
import { FormSection } from "@/components/valuation/form-section";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  Wrench,
  Building2,
  Trash2,
  Warehouse,
  Info,
} from "lucide-react";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "packing",
    title: "Packing",
    description: "Professional packing of all items and belongings",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "dismantling",
    title: "Dismantling Furniture",
    description: "Taking apart beds, wardrobes, and other furniture",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    id: "moving-lift",
    title: "Moving Lift / Hoist",
    description: "External lift when no elevator is available",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "waste-disposal",
    title: "Waste Disposal",
    description: "Removal and disposal of unwanted items",
    icon: <Trash2 className="h-5 w-5" />,
  },
  {
    id: "storage",
    title: "Storage",
    description: "Items going to storage instead of new location",
    icon: <Warehouse className="h-5 w-5" />,
  },
];

export function ServiceSelectionSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <FormSection title="Which Services Must Take Place?" showDivider={false}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select any additional services the customer requires. These will
          affect the final quote.
        </p>

        <div className="space-y-3">
          {serviceOptions.map((option) => (
            <label
              key={option.id}
              className={`flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedServices.includes(option.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <Checkbox
                checked={selectedServices.includes(option.id)}
                onCheckedChange={() => toggleService(option.id)}
                className="md:mt-0.5 self-start md:self-auto"
              />
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 w-full text-center md:text-left">
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    selectedServices.includes(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {option.icon}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-foreground block">
                    {option.title}
                  </span>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {option.description}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-700">
              {selectedServices.length} service
              {selectedServices.length > 1 ? "s" : ""} selected. These will be
              included in the final quote calculation.
            </p>
          </div>
        )}
      </div>
    </FormSection>
  );
}
