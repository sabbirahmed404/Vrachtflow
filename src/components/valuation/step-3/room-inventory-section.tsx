"use client";

import { useRef, useState } from "react";
import { FormSection } from "@/components/valuation/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Sofa,
  Bed,
  UtensilsCrossed,
  Bath,
  Briefcase,
  Baby,
  Warehouse,
  Wrench,
  Package,
  Camera,
  X,
  ImageIcon,
} from "lucide-react";

// Predefined rooms
const predefinedRooms = [
  {
    id: "living-room",
    name: "Living Room",
    icon: <Sofa className="h-4 w-4" />,
  },
  { id: "bedroom", name: "Bedroom", icon: <Bed className="h-4 w-4" /> },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: <UtensilsCrossed className="h-4 w-4" />,
  },
  { id: "bathroom", name: "Bathroom", icon: <Bath className="h-4 w-4" /> },
  {
    id: "office",
    name: "Office / Study",
    icon: <Briefcase className="h-4 w-4" />,
  },
  { id: "kids-room", name: "Kids Room", icon: <Baby className="h-4 w-4" /> },
  {
    id: "garage",
    name: "Garage / Storage",
    icon: <Warehouse className="h-4 w-4" />,
  },
];

// Predefined furniture per room type
const predefinedFurniture: Record<string, string[]> = {
  "living-room": [
    "Sofa",
    "Armchair",
    "Coffee Table",
    "TV Stand",
    "Bookcase",
    "Side Table",
    "Floor Lamp",
    "Rug",
  ],
  bedroom: [
    "Bed Frame",
    "Mattress",
    "Wardrobe",
    "Dresser",
    "Nightstand",
    "Mirror",
    "Desk",
    "Chair",
  ],
  kitchen: [
    "Dining Table",
    "Dining Chairs",
    "Kitchen Cabinet",
    "Refrigerator",
    "Microwave",
    "Dishwasher",
  ],
  bathroom: [
    "Bathroom Cabinet",
    "Mirror",
    "Washing Machine",
    "Dryer",
    "Laundry Basket",
  ],
  office: [
    "Desk",
    "Office Chair",
    "Bookshelf",
    "Filing Cabinet",
    "Printer",
    "Computer",
  ],
  "kids-room": [
    "Kids Bed",
    "Wardrobe",
    "Toy Box",
    "Desk",
    "Chair",
    "Bookshelf",
  ],
  garage: [
    "Workbench",
    "Tool Cabinet",
    "Shelving Unit",
    "Bicycle",
    "Garden Equipment",
  ],
};

// Box types
const boxTypes = [
  {
    id: "book-box",
    name: "Book Box (Small)",
    description: "For heavy items like books",
  },
  {
    id: "standard-box",
    name: "Standard Box (Medium)",
    description: "General purpose moving box",
  },
  {
    id: "wardrobe-box",
    name: "Wardrobe Box (Large)",
    description: "For hanging clothes",
  },
  { id: "fragile-box", name: "Fragile Box", description: "For delicate items" },
];

interface FurnitureItem {
  id: string;
  name: string;
  quantity: number;
  needsDismantling: boolean;
  goesToStorage: boolean;
  cubicMeters?: number;
  isCustom: boolean;
}

interface BoxCount {
  typeId: string;
  count: number;
}

interface RoomData {
  id: string;
  name: string;
  isCustom: boolean;
  cubicMeters?: number;
  furniture: FurnitureItem[];
  boxes: BoxCount[];
  photos: string[];
  isExpanded: boolean;
}

export function RoomInventorySection() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [customRoomName, setCustomRoomName] = useState("");
  const [customRoomSize, setCustomRoomSize] = useState("");
  const idCounter = useRef(0);

  const createId = (...parts: string[]) => {
    idCounter.current += 1;
    const base = parts.filter((part) => part.length > 0).join("-") || "item";
    return `${base}-${idCounter.current}`;
  };

  // Add predefined room
  const addPredefinedRoom = (roomId: string, roomName: string) => {
    const newRoom: RoomData = {
      id: createId(roomId),
      name: roomName,
      isCustom: false,
      furniture: [],
      boxes: boxTypes.map((bt) => ({ typeId: bt.id, count: 0 })),
      photos: [],
      isExpanded: true,
    };
    setRooms([...rooms, newRoom]);
    setShowRoomSelector(false);
  };

  // Add custom room
  const addCustomRoom = () => {
    if (!customRoomName.trim()) return;
    const newRoom: RoomData = {
      id: createId("custom-room"),
      name: customRoomName,
      isCustom: true,
      cubicMeters: customRoomSize
        ? Number.parseFloat(customRoomSize)
        : undefined,
      furniture: [],
      boxes: boxTypes.map((bt) => ({ typeId: bt.id, count: 0 })),
      photos: [],
      isExpanded: true,
    };
    setRooms([...rooms, newRoom]);
    setCustomRoomName("");
    setCustomRoomSize("");
    setShowRoomSelector(false);
  };

  // Remove room
  const removeRoom = (roomId: string) => {
    setRooms(rooms.filter((r) => r.id !== roomId));
  };

  // Toggle room expansion
  const toggleRoomExpansion = (roomId: string) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId ? { ...r, isExpanded: !r.isExpanded } : r
      )
    );
  };

  // Add furniture to room
  const addFurnitureToRoom = (
    roomId: string,
    furnitureName: string,
    isCustom = false
  ) => {
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        const newFurniture: FurnitureItem = {
          id: createId(roomId, "furniture"),
          name: furnitureName,
          quantity: 1,
          needsDismantling: false,
          goesToStorage: false,
          isCustom,
        };
        return { ...r, furniture: [...r.furniture, newFurniture] };
      })
    );
  };

  // Update furniture item
  const updateFurnitureItem = (
    roomId: string,
    furnitureId: string,
    updates: Partial<FurnitureItem>
  ) => {
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        return {
          ...r,
          furniture: r.furniture.map((f) =>
            f.id === furnitureId ? { ...f, ...updates } : f
          ),
        };
      })
    );
  };

  // Remove furniture item
  const removeFurnitureItem = (roomId: string, furnitureId: string) => {
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        return {
          ...r,
          furniture: r.furniture.filter((f) => f.id !== furnitureId),
        };
      })
    );
  };

  // Update box count
  const updateBoxCount = (roomId: string, boxTypeId: string, count: number) => {
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        return {
          ...r,
          boxes: r.boxes.map((b) =>
            b.typeId === boxTypeId ? { ...b, count: Math.max(0, count) } : b
          ),
        };
      })
    );
  };

  // Add photo (simulated)
  const addPhoto = (roomId: string) => {
    const photoId = createId(roomId, "photo");
    const photoUrl = `/placeholder.svg?height=200&width=200&query=room furniture photo ${photoId}`;
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        return { ...r, photos: [...r.photos, photoUrl] };
      })
    );
  };

  // Remove photo
  const removePhoto = (roomId: string, photoIndex: number) => {
    setRooms(
      rooms.map((r) => {
        if (r.id !== roomId) return r;
        return { ...r, photos: r.photos.filter((_, i) => i !== photoIndex) };
      })
    );
  };

  // Get room type for furniture suggestions
  const getRoomType = (roomName: string): string => {
    const lowerName = roomName.toLowerCase();
    if (lowerName.includes("living")) return "living-room";
    if (lowerName.includes("bed")) return "bedroom";
    if (lowerName.includes("kitchen") || lowerName.includes("dining"))
      return "kitchen";
    if (lowerName.includes("bath") || lowerName.includes("laundry"))
      return "bathroom";
    if (lowerName.includes("office") || lowerName.includes("study"))
      return "office";
    if (lowerName.includes("kid") || lowerName.includes("child"))
      return "kids-room";
    if (lowerName.includes("garage") || lowerName.includes("storage"))
      return "garage";
    return "living-room"; // default
  };

  return (
    <FormSection title="Room-by-Room Inventory" showDivider={false}>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Add rooms and list the furniture in each. You can also count boxes and
          take photos.
        </p>

        {/* Added Rooms */}
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onToggleExpansion={() => toggleRoomExpansion(room.id)}
            onRemove={() => removeRoom(room.id)}
            onAddFurniture={(name, isCustom) =>
              addFurnitureToRoom(room.id, name, isCustom)
            }
            onUpdateFurniture={(furnitureId, updates) =>
              updateFurnitureItem(room.id, furnitureId, updates)
            }
            onRemoveFurniture={(furnitureId) =>
              removeFurnitureItem(room.id, furnitureId)
            }
            onUpdateBoxCount={(boxTypeId, count) =>
              updateBoxCount(room.id, boxTypeId, count)
            }
            onAddPhoto={() => addPhoto(room.id)}
            onRemovePhoto={(index) => removePhoto(room.id, index)}
            suggestedFurniture={
              predefinedFurniture[getRoomType(room.name)] || []
            }
          />
        ))}

        {/* Add Room Button / Selector */}
        {!showRoomSelector ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowRoomSelector(true)}
            className="w-full border-dashed border-2 h-14 gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Room
          </Button>
        ) : (
          <div className="border-2 border-dashed border-border rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Select a Room</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowRoomSelector(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Predefined Rooms */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {predefinedRooms.map((room) => (
                <Button
                  key={room.id}
                  type="button"
                  variant="outline"
                  onClick={() => addPredefinedRoom(room.id, room.name)}
                  className="justify-start gap-2 h-auto py-3"
                >
                  {room.icon}
                  <span className="text-sm">{room.name}</span>
                </Button>
              ))}
            </div>

            {/* Custom Room */}
            <div className="border-t border-border pt-4 space-y-3">
              <Label className="text-sm font-medium">
                Or add a custom room
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Room name (e.g., Child's Playroom)"
                  value={customRoomName}
                  onChange={(e) => setCustomRoomName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Size (m³)"
                  type="number"
                  value={customRoomSize}
                  onChange={(e) => setCustomRoomSize(e.target.value)}
                  className="w-24"
                />
                <Button
                  type="button"
                  onClick={addCustomRoom}
                  disabled={!customRoomName.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {rooms.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 space-y-2">
            <h4 className="font-medium text-foreground">Inventory Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Rooms:</span>
                <span className="ml-2 font-medium">{rooms.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Items:</span>
                <span className="ml-2 font-medium">
                  {rooms.reduce(
                    (sum, r) =>
                      sum + r.furniture.reduce((s, f) => s + f.quantity, 0),
                    0
                  )}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Boxes:</span>
                <span className="ml-2 font-medium">
                  {rooms.reduce(
                    (sum, r) => sum + r.boxes.reduce((s, b) => s + b.count, 0),
                    0
                  )}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Photos:</span>
                <span className="ml-2 font-medium">
                  {rooms.reduce((sum, r) => sum + r.photos.length, 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}

// Room Card Component
interface RoomCardProps {
  room: RoomData;
  onToggleExpansion: () => void;
  onRemove: () => void;
  onAddFurniture: (name: string, isCustom: boolean) => void;
  onUpdateFurniture: (
    furnitureId: string,
    updates: Partial<FurnitureItem>
  ) => void;
  onRemoveFurniture: (furnitureId: string) => void;
  onUpdateBoxCount: (boxTypeId: string, count: number) => void;
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
  suggestedFurniture: string[];
}

function RoomCard({
  room,
  onToggleExpansion,
  onRemove,
  onAddFurniture,
  onUpdateFurniture,
  onRemoveFurniture,
  onUpdateBoxCount,
  onAddPhoto,
  onRemovePhoto,
  suggestedFurniture,
}: RoomCardProps) {
  const [showFurnitureSelector, setShowFurnitureSelector] = useState(false);
  const [customFurnitureName, setCustomFurnitureName] = useState("");
  const [customFurnitureSize, setCustomFurnitureSize] = useState("");

  const addCustomFurniture = () => {
    if (!customFurnitureName.trim()) return;
    onAddFurniture(customFurnitureName, true);
    setCustomFurnitureName("");
    setCustomFurnitureSize("");
    setShowFurnitureSelector(false);
  };

  const totalItems = room.furniture.reduce((sum, f) => sum + f.quantity, 0);
  const totalBoxes = room.boxes.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Room Header */}
      <div
        className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
        onClick={onToggleExpansion}
      >
        <div className="flex items-center gap-3">
          {room.isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
          <div>
            <h3 className="font-semibold text-foreground">{room.name}</h3>
            <p className="text-sm text-muted-foreground">
              {totalItems} item{totalItems !== 1 ? "s" : ""} • {totalBoxes} box
              {totalBoxes !== 1 ? "es" : ""} • {room.photos.length} photo
              {room.photos.length !== 1 ? "s" : ""}
              {room.cubicMeters && ` • ${room.cubicMeters} m³`}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Room Content */}
      {room.isExpanded && (
        <div className="p-4 space-y-6">
          {/* Furniture Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sofa className="h-4 w-4" />
                Furniture Items
              </Label>
            </div>

            {/* Furniture List */}
            {room.furniture.length > 0 && (
              <div className="space-y-2">
                {room.furniture.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.cubicMeters && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({item.cubicMeters} m³)
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 bg-transparent"
                        onClick={() =>
                          onUpdateFurniture(item.id, {
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 bg-transparent"
                        onClick={() =>
                          onUpdateFurniture(item.id, {
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        +
                      </Button>
                    </div>

                    {/* Dismantling */}
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <Checkbox
                        checked={item.needsDismantling}
                        onCheckedChange={(checked) =>
                          onUpdateFurniture(item.id, {
                            needsDismantling: checked === true,
                          })
                        }
                      />
                      <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                    </label>

                    {/* Storage */}
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <Checkbox
                        checked={item.goesToStorage}
                        onCheckedChange={(checked) =>
                          onUpdateFurniture(item.id, {
                            goesToStorage: checked === true,
                          })
                        }
                      />
                      <Warehouse className="h-3.5 w-3.5 text-muted-foreground" />
                    </label>

                    {/* Remove */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveFurniture(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Legend */}
            {room.furniture.length > 0 && (
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Wrench className="h-3 w-3" /> Dismantling
                </span>
                <span className="flex items-center gap-1">
                  <Warehouse className="h-3 w-3" /> To Storage
                </span>
              </div>
            )}

            {/* Add Furniture */}
            {!showFurnitureSelector ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowFurnitureSelector(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Furniture
              </Button>
            ) : (
              <div className="border border-border rounded-lg p-3 space-y-3">
                {/* Suggested Furniture */}
                <div className="flex flex-wrap gap-2">
                  {suggestedFurniture
                    .filter((f) => !room.furniture.some((rf) => rf.name === f))
                    .slice(0, 8)
                    .map((furniture) => (
                      <Button
                        key={furniture}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onAddFurniture(furniture, false);
                          setShowFurnitureSelector(false);
                        }}
                        className="text-xs"
                      >
                        {furniture}
                      </Button>
                    ))}
                </div>

                {/* Custom Furniture */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Input
                    placeholder="Custom item name"
                    value={customFurnitureName}
                    onChange={(e) => setCustomFurnitureName(e.target.value)}
                    className="flex-1 h-9 text-sm"
                  />
                  <Input
                    placeholder="m³"
                    type="number"
                    value={customFurnitureSize}
                    onChange={(e) => setCustomFurnitureSize(e.target.value)}
                    className="w-16 h-9 text-sm"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={addCustomFurniture}
                    disabled={!customFurnitureName.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFurnitureSelector(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Boxes Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Boxes Required
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {boxTypes.map((boxType) => {
                const boxData = room.boxes.find((b) => b.typeId === boxType.id);
                const count = boxData?.count || 0;
                return (
                  <div
                    key={boxType.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <span className="text-sm font-medium">
                        {boxType.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {boxType.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 bg-transparent"
                        onClick={() => onUpdateBoxCount(boxType.id, count - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">{count}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 bg-transparent"
                        onClick={() => onUpdateBoxCount(boxType.id, count + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photos Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Room Photos
            </Label>
            <div className="flex flex-wrap gap-3">
              {room.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`${room.name} photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemovePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-20 h-20 flex flex-col gap-1 bg-transparent"
                onClick={onAddPhoto}
              >
                <ImageIcon className="h-5 w-5" />
                <span className="text-xs">Add</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Photos help the moving team prepare and serve as proof for the
              customer.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
