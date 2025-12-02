"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/valuation/form-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Building2 } from "lucide-react";

export function CustomerInformationSection() {
  const [customerType, setCustomerType] = useState("individual");

  return (
    <FormSection title="Customer Information">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Customer Type
          </Label>
          <Select value={customerType} onValueChange={setCustomerType}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual / Private</SelectItem>
              <SelectItem value="business">Business / Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-foreground"
            >
              First Name
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                placeholder="John"
                className="bg-card pl-10"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-foreground"
            >
              Last Name
            </Label>
            <Input id="lastName" placeholder="Doe" className="bg-card" />
          </div>
        </div>

        {customerType === "business" && (
          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="text-sm font-medium text-foreground"
            >
              Company Name
            </Label>
            <div className="relative">
              <Input
                id="companyName"
                placeholder="Acme Inc."
                className="bg-card pl-10"
              />
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-card pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="+31 6 12345678"
                className="bg-card pl-10"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
}
