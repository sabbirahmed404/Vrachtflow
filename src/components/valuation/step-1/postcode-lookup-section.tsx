"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/valuation/form-section";
import { Search, MapPin, CheckCircle2 } from "lucide-react";

interface AddressSuggestion {
  id: string;
  address: string;
  postcode: string;
  city: string;
}

export function PostcodeLookupSection() {
  const [postcode, setPostcode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSuggestion | null>(null);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSuggestions([
        {
          id: "1",
          address: "123 Main Street",
          postcode: postcode,
          city: "Amsterdam",
        },
        {
          id: "2",
          address: "125 Main Street",
          postcode: postcode,
          city: "Amsterdam",
        },
        {
          id: "3",
          address: "127 Main Street",
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
    <FormSection title="Postcode Lookup">
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <Label
              htmlFor="postcode"
              className="text-sm font-medium text-foreground"
            >
              Enter Postcode
            </Label>
            <div className="relative">
              <Input
                id="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g., 1012 AB"
                className="bg-card pr-10"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              onClick={handleSearch}
              disabled={!postcode || isSearching}
              className="h-9"
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
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {suggestion.address}
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
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedAddress.address}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedAddress.postcode}, {selectedAddress.city}
              </p>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}
