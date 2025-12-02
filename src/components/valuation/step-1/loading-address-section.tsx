"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/valuation/form-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Building, Layers, Car } from "lucide-react";

export function LoadingAddressSection() {
  const [hasLift, setHasLift] = useState(false);
  const [propertyType, setPropertyType] = useState("");

  return (
    <FormSection title="Loading Address (Pick-up Location)">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="streetAddress"
              className="text-sm font-medium text-foreground"
            >
              Street Address
            </Label>
            <div className="relative">
              <Input
                id="streetAddress"
                placeholder="123 Main Street"
                className="bg-card pl-10"
              />
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="houseNumber"
              className="text-sm font-medium text-foreground"
            >
              House Number
            </Label>
            <Input id="houseNumber" placeholder="123" className="bg-card" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="houseAddition"
              className="text-sm font-medium text-foreground"
            >
              Addition <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="houseAddition"
              placeholder="A, B, etc."
              className="bg-card"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm font-medium text-foreground"
            >
              City
            </Label>
            <Input id="city" placeholder="Amsterdam" className="bg-card" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="postalCode"
              className="text-sm font-medium text-foreground"
            >
              Postal Code
            </Label>
            <Input id="postalCode" placeholder="1012 AB" className="bg-card" />
          </div>
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Property Type
              </Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="floorLevel"
                className="text-sm font-medium text-foreground"
              >
                Floor Level
              </Label>
              <div className="relative">
                <Input
                  id="floorLevel"
                  placeholder="e.g., 3"
                  className="bg-card pl-10"
                />
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-card">
              <Checkbox
                id="hasLift"
                checked={hasLift}
                onCheckedChange={(checked) => setHasLift(checked as boolean)}
              />
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <Label
                  htmlFor="hasLift"
                  className="text-sm font-medium cursor-pointer"
                >
                  Building has a lift/elevator
                </Label>
              </div>
            </div>

            {!hasLift && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Staircase Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="Select staircase type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straight">Straight stairs</SelectItem>
                    <SelectItem value="spiral">Spiral stairs</SelectItem>
                    <SelectItem value="wide">Wide stairs</SelectItem>
                    <SelectItem value="narrow">Narrow stairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="parkingDistance"
                className="text-sm font-medium text-foreground"
              >
                Distance to Parking (meters)
              </Label>
              <div className="relative">
                <Input
                  id="parkingDistance"
                  placeholder="e.g., 50"
                  className="bg-card pl-10"
                />
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="accessNotes"
            className="text-sm font-medium text-foreground"
          >
            Access Notes{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="accessNotes"
            placeholder="Any special instructions for accessing the property (gate codes, parking restrictions, etc.)"
            rows={3}
            className="bg-card resize-none"
          />
        </div>
      </div>
    </FormSection>
  );
}
