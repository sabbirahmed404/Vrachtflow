"use client";

import type React from "react";

import { useState } from "react";
import { FormSection } from "@/components/valuation/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Clock,
  Check,
  Truck,
  BoxIcon,
  Users,
  MapPin,
  Calculator,
  Info,
  Star,
  Sparkles,
  Warehouse,
} from "lucide-react";

interface PackageOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  includes: string[];
  popular?: boolean;
}

const packages: PackageOption[] = [
  {
    id: "standard",
    name: "Standard Move",
    description: "Basic moving service with transport and loading",
    icon: <Truck className="h-6 w-6" />,
    basePrice: 450,
    includes: [
      "Transport",
      "Loading & Unloading",
      "Basic Protection",
      "2 Movers",
    ],
  },
  {
    id: "full-service",
    name: "Full Service",
    description: "Complete moving solution with packing included",
    icon: <Sparkles className="h-6 w-6" />,
    basePrice: 850,
    includes: [
      "All Standard features",
      "Professional Packing",
      "Unpacking",
      "Furniture Assembly",
      "3 Movers",
    ],
    popular: true,
  },
  {
    id: "storage-move",
    name: "Storage + Move",
    description: "Moving with temporary storage solution",
    icon: <Warehouse className="h-6 w-6" />,
    basePrice: 650,
    includes: [
      "All Standard features",
      "1 Month Storage",
      "Climate Control",
      "Insurance Included",
    ],
  },
];

// Simulated data from previous steps (in real app, this would come from form state)
const summaryData = {
  totalRooms: 5,
  totalItems: 32,
  totalBoxes: 24,
  totalVolume: 45, // cubic meters
  totalDistance: 67, // km
  estimatedTravelTime: 1.5, // hours
  services: ["Packing", "Dismantling", "Storage"],
};

export function QuoteSetupSection() {
  const [pricingType, setPricingType] = useState<"package" | "hourly">(
    "package"
  );
  const [selectedPackage, setSelectedPackage] =
    useState<string>("full-service");
  const [hourlyRate, setHourlyRate] = useState("75");
  const [estimatedHours, setEstimatedHours] = useState("8");
  const [numberOfMovers, setNumberOfMovers] = useState("3");
  const [truckSize, setTruckSize] = useState<"small" | "medium" | "large">(
    "medium"
  );

  // Calculate prices
  const selectedPkg = packages.find((p) => p.id === selectedPackage);
  const packagePrice = selectedPkg
    ? selectedPkg.basePrice + summaryData.totalVolume * 5
    : 0;

  const hourlyTotal =
    Number.parseFloat(hourlyRate) *
      Number.parseFloat(estimatedHours) *
      Number.parseFloat(numberOfMovers) +
    summaryData.totalDistance * 1.5;

  const truckPrices = { small: 100, medium: 175, large: 250 };
  const finalHourlyPrice = hourlyTotal + truckPrices[truckSize];

  return (
    <>
      <FormSection title="Quote Summary" showDivider>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <BoxIcon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">
              {summaryData.totalRooms}
            </p>
            <p className="text-xs text-muted-foreground">Rooms</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <Package className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">
              {summaryData.totalItems}
            </p>
            <p className="text-xs text-muted-foreground">Items</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <MapPin className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">
              {summaryData.totalDistance} km
            </p>
            <p className="text-xs text-muted-foreground">Distance</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <Calculator className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">
              {summaryData.totalVolume} m³
            </p>
            <p className="text-xs text-muted-foreground">Volume</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {summaryData.services.map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
            >
              <Check className="h-3.5 w-3.5" />
              {service}
            </span>
          ))}
        </div>
      </FormSection>

      <FormSection title="Pricing Method" showDivider>
        <RadioGroup
          value={pricingType}
          onValueChange={(value) =>
            setPricingType(value as "package" | "hourly")
          }
          className="grid md:grid-cols-2 gap-4"
        >
          <Label
            htmlFor="package"
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              pricingType === "package"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
          >
            <RadioGroupItem value="package" id="package" className="sr-only" />
            <div
              className={`p-3 rounded-lg ${
                pricingType === "package"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Package Based</p>
              <p className="text-sm text-muted-foreground">
                Choose a pre-defined package
              </p>
            </div>
          </Label>

          <Label
            htmlFor="hourly"
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              pricingType === "hourly"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
          >
            <RadioGroupItem value="hourly" id="hourly" className="sr-only" />
            <div
              className={`p-3 rounded-lg ${
                pricingType === "hourly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Hourly Basis</p>
              <p className="text-sm text-muted-foreground">
                Calculate based on time & resources
              </p>
            </div>
          </Label>
        </RadioGroup>
      </FormSection>

      {pricingType === "package" && (
        <FormSection title="Select Package" showDivider={false}>
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? "border-2 border-primary ring-2 ring-primary/20"
                    : "border border-border hover:border-muted-foreground/50"
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                      <div
                        className={`p-3 rounded-xl ${
                          selectedPackage === pkg.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {pkg.icon}
                      </div>
                      <div className="flex-1 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {pkg.description}
                            </p>
                          </div>
                          <div className="md:text-right">
                            <p className="text-sm text-muted-foreground">From</p>
                            <p className="text-2xl font-bold text-foreground">
                              €{pkg.basePrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {pkg.includes.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                            >
                              <Check className="h-3 w-3 text-green-600" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-5 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  Estimated Total for {selectedPkg?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Base price + volume adjustment ({summaryData.totalVolume} m³ ×
                  €5)
                </p>
              </div>
              <p className="text-3xl font-bold text-primary text-center md:text-right">
                €{packagePrice.toFixed(2)}
              </p>
            </div>
          </div>
        </FormSection>
      )}

      {pricingType === "hourly" && (
        <FormSection title="Hourly Rate Configuration" showDivider={false}>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="text-sm font-medium">
                Hourly Rate (€/hr/mover)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  €
                </span>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours" className="text-sm font-medium">
                Estimated Hours
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="estimatedHours"
                  type="number"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfMovers" className="text-sm font-medium">
                Number of Movers
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="numberOfMovers"
                  type="number"
                  value={numberOfMovers}
                  onChange={(e) => setNumberOfMovers(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <Label className="text-sm font-medium">Truck Size</Label>
            <div className="grid grid-cols-3 gap-3">
              {(["small", "medium", "large"] as const).map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={truckSize === size ? "default" : "outline"}
                  className="flex flex-col h-auto py-4"
                  onClick={() => setTruckSize(size)}
                >
                  <Truck
                    className={`h-5 w-5 mb-1 ${
                      size === "large"
                        ? "scale-125"
                        : size === "small"
                        ? "scale-90"
                        : ""
                    }`}
                  />
                  <span className="capitalize">{size}</span>
                  <span className="text-xs opacity-70">
                    €{truckPrices[size]}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  Auto-calculated based on:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Travel time: {summaryData.estimatedTravelTime} hours (via
                    Google Maps)
                  </li>
                  <li>
                    Distance charge: {summaryData.totalDistance} km × €1.50 = €
                    {(summaryData.totalDistance * 1.5).toFixed(2)}
                  </li>
                  <li>Volume to move: {summaryData.totalVolume} m³</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Labor ({estimatedHours}h × {numberOfMovers} movers × €
                  {hourlyRate})
                </span>
                <span className="font-medium">
                  €
                  {(
                    Number.parseFloat(hourlyRate) *
                    Number.parseFloat(estimatedHours) *
                    Number.parseFloat(numberOfMovers)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Distance ({summaryData.totalDistance} km × €1.50)
                </span>
                <span className="font-medium">
                  €{(summaryData.totalDistance * 1.5).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Truck ({truckSize})
                </span>
                <span className="font-medium">
                  €{truckPrices[truckSize].toFixed(2)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">
                  Estimated Total
                </span>
                <span className="text-2xl font-bold text-primary">
                  €{finalHourlyPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </FormSection>
      )}
    </>
  );
}
