"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/valuation/form-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MapPin,
  Plus,
  Trash2,
  Home,
  Layers,
  Building,
  Car,
  Route,
  Clock,
  ArrowDown,
  ArrowUp,
  GripVertical,
} from "lucide-react"

interface Address {
  id: string
  type: "loading" | "unloading"
  streetAddress: string
  houseNumber: string
  houseAddition: string
  city: string
  postalCode: string
  propertyType: string
  floorLevel: string
  hasLift: boolean
  staircaseType: string
  parkingDistance: string
  accessNotes: string
}

const defaultAddress = (type: "loading" | "unloading"): Address => ({
  id: crypto.randomUUID(),
  type,
  streetAddress: "",
  houseNumber: "",
  houseAddition: "",
  city: "",
  postalCode: "",
  propertyType: "",
  floorLevel: "",
  hasLift: false,
  staircaseType: "",
  parkingDistance: "",
  accessNotes: "",
})

export function DeliveryDetailsSection() {
  const [addresses, setAddresses] = useState<Address[]>([defaultAddress("loading"), defaultAddress("unloading")])
  const [expandedAddresses, setExpandedAddresses] = useState<Set<string>>(new Set(addresses.map((a) => a.id)))

  // Simulated route calculation
  const routeInfo = {
    totalDistance: "45.2 km",
    totalDuration: "52 min",
    segments: [{ from: "Amsterdam", to: "Utrecht", distance: "45.2 km", duration: "52 min" }],
  }

  const addAddress = (type: "loading" | "unloading") => {
    const newAddress = defaultAddress(type)
    setAddresses([...addresses, newAddress])
    setExpandedAddresses(new Set([...expandedAddresses, newAddress.id]))
  }

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id))
    const newExpanded = new Set(expandedAddresses)
    newExpanded.delete(id)
    setExpandedAddresses(newExpanded)
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedAddresses)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedAddresses(newExpanded)
  }

  const updateAddress = (id: string, field: keyof Address, value: string | boolean) => {
    setAddresses(addresses.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  const loadingAddresses = addresses.filter((a) => a.type === "loading")
  const unloadingAddresses = addresses.filter((a) => a.type === "unloading")

  const renderAddressCard = (address: Address, index: number, typeAddresses: Address[]) => {
    const isExpanded = expandedAddresses.has(address.id)
    const canDelete = typeAddresses.length > 1

    return (
      <div key={address.id} className="border border-border rounded-xl bg-card overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => toggleExpanded(address.id)}
        >
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                address.type === "loading" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-foreground">
                {address.type === "loading" ? "Pick-up" : "Drop-off"} Location {index + 1}
              </p>
              <p className="text-sm text-muted-foreground">
                {address.streetAddress && address.city
                  ? `${address.streetAddress} ${address.houseNumber}, ${address.city}`
                  : "Enter address details"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canDelete && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation()
                  removeAddress(address.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {isExpanded ? (
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 pt-0 space-y-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-foreground">Street Address</Label>
                <div className="relative">
                  <Input
                    value={address.streetAddress}
                    onChange={(e) => updateAddress(address.id, "streetAddress", e.target.value)}
                    placeholder="123 Main Street"
                    className="bg-background pl-10"
                  />
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">House Number</Label>
                <Input
                  value={address.houseNumber}
                  onChange={(e) => updateAddress(address.id, "houseNumber", e.target.value)}
                  placeholder="123"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Addition <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  value={address.houseAddition}
                  onChange={(e) => updateAddress(address.id, "houseAddition", e.target.value)}
                  placeholder="A, B, etc."
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">City</Label>
                <Input
                  value={address.city}
                  onChange={(e) => updateAddress(address.id, "city", e.target.value)}
                  placeholder="Amsterdam"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Postal Code</Label>
                <Input
                  value={address.postalCode}
                  onChange={(e) => updateAddress(address.id, "postalCode", e.target.value)}
                  placeholder="1012 AB"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-foreground mb-4">Property Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Property Type</Label>
                  <Select
                    value={address.propertyType}
                    onValueChange={(value) => updateAddress(address.id, "propertyType", value)}
                  >
                    <SelectTrigger className="bg-background">
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
                  <Label className="text-sm font-medium text-foreground">Floor Level</Label>
                  <div className="relative">
                    <Input
                      value={address.floorLevel}
                      onChange={(e) => updateAddress(address.id, "floorLevel", e.target.value)}
                      placeholder="e.g., 3"
                      className="bg-background pl-10"
                    />
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-background">
                  <Checkbox
                    id={`lift-${address.id}`}
                    checked={address.hasLift}
                    onCheckedChange={(checked) => updateAddress(address.id, "hasLift", checked as boolean)}
                  />
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor={`lift-${address.id}`} className="text-sm font-medium cursor-pointer">
                      Building has a lift/elevator
                    </Label>
                  </div>
                </div>

                {!address.hasLift && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Staircase Type</Label>
                    <Select
                      value={address.staircaseType}
                      onValueChange={(value) => updateAddress(address.id, "staircaseType", value)}
                    >
                      <SelectTrigger className="bg-background">
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
                  <Label className="text-sm font-medium text-foreground">Distance to Parking (meters)</Label>
                  <div className="relative">
                    <Input
                      value={address.parkingDistance}
                      onChange={(e) => updateAddress(address.id, "parkingDistance", e.target.value)}
                      placeholder="e.g., 50"
                      className="bg-background pl-10"
                    />
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Access Notes <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                value={address.accessNotes}
                onChange={(e) => updateAddress(address.id, "accessNotes", e.target.value)}
                placeholder="Any special instructions for accessing the property..."
                rows={2}
                className="bg-background resize-none"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <FormSection title="Delivery Details & Addresses">
      <div className="space-y-6">
        {/* Loading Addresses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="font-semibold text-foreground">Pick-up Locations</h3>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => addAddress("loading")} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </div>
          <div className="space-y-3">
            {loadingAddresses.map((address, index) => renderAddressCard(address, index, loadingAddresses))}
          </div>
        </div>

        {/* Unloading Addresses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <h3 className="font-semibold text-foreground">Drop-off Locations</h3>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => addAddress("unloading")} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </div>
          <div className="space-y-3">
            {unloadingAddresses.map((address, index) => renderAddressCard(address, index, unloadingAddresses))}
          </div>
        </div>

        {/* Route Summary */}
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Route className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Route Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Total Distance</span>
              </div>
              <p className="text-xl font-bold text-foreground">{routeInfo.totalDistance}</p>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Estimated Time</span>
              </div>
              <p className="text-xl font-bold text-foreground">{routeInfo.totalDuration}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              {loadingAddresses.length} pick-up location{loadingAddresses.length !== 1 ? "s" : ""}
              <span className="mx-2">→</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {unloadingAddresses.length} drop-off location{unloadingAddresses.length !== 1 ? "s" : ""}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Distance and time calculated via Google Maps API (simulated)
          </p>
        </div>
      </div>
    </FormSection>
  )
}
