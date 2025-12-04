"use client";
import { useState } from "react";
import { FormSection } from "@/components/valuation/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Pencil,
  Package,
  Percent,
  Tag,
  Euro,
  Check,
  AlertCircle,
} from "lucide-react";

interface QuoteItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  includeVat: boolean;
  vatRate: number;
}

interface Discount {
  type: "percentage" | "fixed";
  value: number;
  reason: string;
}

// Simulated initial items from previous steps
const initialItems: QuoteItem[] = [
  {
    id: "1",
    name: "Living Room Items",
    description: "Sofa, TV Stand, Coffee Table",
    quantity: 1,
    unitPrice: 150,
    includeVat: true,
    vatRate: 21,
  },
  {
    id: "2",
    name: "Bedroom Items",
    description: "Bed, Wardrobe, Dresser",
    quantity: 2,
    unitPrice: 120,
    includeVat: true,
    vatRate: 21,
  },
  {
    id: "3",
    name: "Kitchen Items",
    description: "Refrigerator, Dishwasher",
    quantity: 1,
    unitPrice: 100,
    includeVat: true,
    vatRate: 21,
  },
  {
    id: "4",
    name: "Packing Service",
    description: "Professional packing for all items",
    quantity: 1,
    unitPrice: 200,
    includeVat: true,
    vatRate: 21,
  },
  {
    id: "5",
    name: "Transport",
    description: "67 km distance, medium truck",
    quantity: 1,
    unitPrice: 275,
    includeVat: true,
    vatRate: 21,
  },
  {
    id: "6",
    name: "Labor (8 hours)",
    description: "3 movers × 8 hours",
    quantity: 1,
    unitPrice: 480,
    includeVat: true,
    vatRate: 21,
  },
];

export function FinalQuoteSection() {
  const [items, setItems] = useState<QuoteItem[]>(initialItems);
  const [discount, setDiscount] = useState<Discount>({
    type: "percentage",
    value: 0,
    reason: "",
  });
  const [editingItem, setEditingItem] = useState<QuoteItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<QuoteItem>>({
    name: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
    includeVat: true,
    vatRate: 21,
  });

  // Calculate totals
  const calculateItemTotal = (item: QuoteItem) => {
    const base = item.quantity * item.unitPrice;
    return item.includeVat ? base * (1 + item.vatRate / 100) : base;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const totalVat = items.reduce((sum, item) => {
    if (item.includeVat) {
      return sum + item.quantity * item.unitPrice * (item.vatRate / 100);
    }
    return sum;
  }, 0);

  const discountAmount =
    discount.type === "percentage"
      ? (subtotal + totalVat) * (discount.value / 100)
      : discount.value;

  const grandTotal = subtotal + totalVat - discountAmount;

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (updatedItem: QuoteItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.unitPrice) {
      const item: QuoteItem = {
        id: Date.now().toString(),
        name: newItem.name || "",
        description: newItem.description || "",
        quantity: newItem.quantity || 1,
        unitPrice: newItem.unitPrice || 0,
        includeVat: newItem.includeVat ?? true,
        vatRate: newItem.vatRate || 21,
      };
      setItems([...items, item]);
      setNewItem({
        name: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        includeVat: true,
        vatRate: 21,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleToggleVat = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, includeVat: !item.includeVat } : item
      )
    );
  };

  return (
    <>
      <FormSection title="Quote Line Items" showDivider>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Review and adjust items before sending the quote
          </p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Add a custom item to the quote
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    placeholder="e.g., TV Installation"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description..."
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: Number.parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Price (€)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.unitPrice}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          unitPrice: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>VAT Rate (%)</Label>
                    <Select
                      value={String(newItem.vatRate)}
                      onValueChange={(value) =>
                        setNewItem({
                          ...newItem,
                          vatRate: Number.parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="9">9%</SelectItem>
                        <SelectItem value="21">21%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3 pt-8">
                    <Switch
                      checked={newItem.includeVat}
                      onCheckedChange={(checked) =>
                        setNewItem({ ...newItem, includeVat: checked })
                      }
                    />
                    <Label>Include VAT</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="border border-border">
              <CardContent className="p-4">
                {editingItem?.id === item.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Item Name</Label>
                        <Input
                          value={editingItem.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Description</Label>
                        <Input
                          value={editingItem.description}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={editingItem.quantity}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              quantity: Number.parseInt(e.target.value) || 1,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Price (€)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editingItem.unitPrice}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              unitPrice: Number.parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">VAT Rate</Label>
                        <Select
                          value={String(editingItem.vatRate)}
                          onValueChange={(value) =>
                            setEditingItem({
                              ...editingItem,
                              vatRate: Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="9">9%</SelectItem>
                            <SelectItem value="21">21%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Include VAT</Label>
                        <div className="flex items-center h-10 gap-2 px-3 border rounded-md">
                          <Switch
                            checked={editingItem.includeVat}
                            onCheckedChange={(checked) =>
                              setEditingItem({
                                ...editingItem,
                                includeVat: checked,
                              })
                            }
                          />
                          <span className="text-xs text-muted-foreground">
                            {editingItem.includeVat ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem(null)}
                        className="flex-1 md:flex-none"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateItem(editingItem)}
                        className="flex-1 md:flex-none"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h4 className="font-medium text-foreground">
                          {item.name}
                        </h4>
                        {item.includeVat && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground w-fit">
                            +{item.vatRate}% VAT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.quantity} × €{item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0 border-t md:border-t-0">
                      <div className="text-left md:text-right">
                        <p className="font-semibold text-foreground text-lg md:text-base">
                          €{calculateItemTotal(item).toFixed(2)}
                        </p>
                        {item.includeVat && (
                          <p className="text-xs text-muted-foreground">
                            incl. VAT
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingItem(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No items in quote. Add items to continue.</p>
          </div>
        )}
      </FormSection>

      <FormSection title="Apply Discount" showDivider>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Discount Type</Label>
            <Select
              value={discount.type}
              onValueChange={(value: "percentage" | "fixed") =>
                setDiscount({ ...discount, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Percentage
                  </div>
                </SelectItem>
                <SelectItem value="fixed">
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Fixed Amount
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {discount.type === "percentage"
                ? "Discount (%)"
                : "Discount Amount (€)"}
            </Label>
            <div className="relative">
              {discount.type === "percentage" ? (
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                type="number"
                min="0"
                max={discount.type === "percentage" ? 100 : undefined}
                value={discount.value || ""}
                onChange={(e) =>
                  setDiscount({
                    ...discount,
                    value: Number.parseFloat(e.target.value) || 0,
                  })
                }
                className="pl-10"
                placeholder="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Reason (Optional)</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={discount.reason}
                onChange={(e) =>
                  setDiscount({ ...discount, reason: e.target.value })
                }
                className="pl-10"
                placeholder="e.g., Loyal customer"
              />
            </div>
          </div>
        </div>

        {discount.value > 0 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg flex items-center gap-3">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-700 dark:text-green-400">
              Discount of{" "}
              {discount.type === "percentage"
                ? `${discount.value}%`
                : `€${discount.value.toFixed(2)}`}{" "}
              applied
              {discount.reason && ` - ${discount.reason}`}
            </p>
          </div>
        )}
      </FormSection>

      <FormSection title="Quote Total" showDivider={false}>
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal (excl. VAT)
                </span>
                <span className="font-medium">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total VAT</span>
                <span className="font-medium">€{totalVat.toFixed(2)}</span>
              </div>
              {discount.value > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    Discount
                    {discount.reason && (
                      <span className="text-xs">({discount.reason})</span>
                    )}
                  </span>
                  <span className="font-medium">
                    -€{discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-foreground text-lg">
                    Grand Total
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Including all taxes and discounts
                  </p>
                </div>
                <span className="text-3xl font-bold text-primary">
                  €{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-700 dark:text-amber-400">
            <p className="font-medium">Review before proceeding</p>
            <p className="mt-1">
              Please verify all items, quantities, and prices are correct before
              sending the quote to the customer.
            </p>
          </div>
        </div>
      </FormSection>
    </>
  );
}
