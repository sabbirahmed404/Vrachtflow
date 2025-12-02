"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/valuation/form-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building,
  Layers,
  Car,
  Search,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface AddressSuggestion {
  id: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
}

export function LoadingAddressSection() {
  const [postcode, setPostcode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSuggestion | null>(null);
  const [hasLift, setHasLift] = useState(false);
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    if (!postcode || !houseNumber) return;
    setIsSearching(true);
    // Simulate API call (e.g., Google Maps / local address API)
    setTimeout(() => {
      setSuggestions([
        {
          id: "1",
          street: "Keizersgracht",
          houseNumber: houseNumber,
          postcode: postcode,
          city: "Amsterdam",
        },
        {
          id: "2",
          street: "Prinsengracht",
          houseNumber: houseNumber,
          postcode: postcode,
          city: "Amsterdam",
        },
      ]);
      setIsSearching(false);
    }, 500);
  };

  const handleSelectAddress = (address: AddressSuggestion) => {
    setSelectedAddress(address);
    setSuggestions([]);
  };

  return (
    <FormSection title="Loading Address (Pick-up Location)">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="postcode"
              className="text-sm font-medium text-foreground"
            >
              Postal Code
            </Label>
            <div className="relative">
              <Input
                id="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g., 1012 AB"
                className="bg-card pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="houseNumber"
              className="text-sm font-medium text-foreground"
            >
              House Number
            </Label>
            <Input
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="e.g., 123"
              className="bg-card"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              onClick={handleSearch}
              disabled={!postcode || !houseNumber || isSearching}
              className="w-full h-9"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "Searching..." : "Find Address"}
            </Button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="px-4 py-2 bg-muted/50 border-b border-border">
              <p className="text-sm font-medium text-foreground">
                Select an address
              </p>
            </div>
            <div className="divide-y divide-border">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSelectAddress(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-3"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {suggestion.street} {suggestion.houseNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.postcode}, {suggestion.city}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedAddress && (
          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedAddress.street} {selectedAddress.houseNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedAddress.postcode}, {selectedAddress.city}
              </p>
            </div>
          </div>
        )}

        {/* Property Details */}
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

        {/* Access Notes */}
        <div className="space-y-2">
          <Label
            htmlFor="accessNotes"
            className="text-sm font-medium text-foreground"
          >
            Special Notes{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="accessNotes"
            placeholder='Any special instructions (e.g., "no elevator", "need traffic signs", gate codes, parking restrictions)'
            rows={3}
            className="bg-card resize-none"
          />
        </div>
      </div>
    </FormSection>
  );
}
