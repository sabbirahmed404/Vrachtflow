# Full API Integration Guide for Vrachtflow

This document provides a comprehensive guide on how to integrate the Supabase API into the Vrachtflow Valuation Tool. It covers the strategy for data persistence, detailed API specifications for each step, and required code modifications.

## 1. Integration Strategy

The application currently manages state locally within each step component. To support saving data to the database, we recommend the following approach:

1.  **Lift State / Pass ID**: Modify [src/app/page.tsx](file:///b:/Code/Vrachtflow/src/app/page.tsx) to manage a `valuationId` state.
2.  **Incremental Saving**: When a user clicks "Next" or "Save Draft", save the data for the current step to the Supabase database.
3.  **Persist ID**: Store the returned `valuationId` (and `customerId`) to link subsequent steps.

### Recommended Flow in [page.tsx](file:///b:/Code/Vrachtflow/src/app/page.tsx)

```tsx
// Abstract concept of how page.tsx should look
const [valuationId, setValuationId] = useState<string | null>(null);

const handleNext = async (stepData: any) => {
  // 1. Save data to Supabase based on currentStep
  // 2. If it's Step 1, get back the new valuationId and setValuationId(id)
  // 3. Move to next step
};
```

## 2. Database Schema Reference

You will interact with the following tables. Ensure your Supabase client types are generated (`supabase gen types typescript`).

| Table | Purpose | Key Foreign Keys |
| :--- | :--- | :--- |
| `customers` | Stores customer info | `id` (PK) |
| `valuations` | The main quote record | `customer_id`, `staff_id` |
| `addresses` | Loading/Unloading locations | `valuation_id` |
| `service_types` | Catalog of available services | `id` (PK) |
| `valuation_services`| Services selected for a quote | `valuation_id`, `service_type_id` |
| `rooms` | Specific rooms (Living Room etc) | `valuation_id` |
| `room_items` | Furniture in a room | `room_id` |
| `room_boxes` | Box counts for a room | `room_id`, `box_type_id` |
| `room_photos` | Photos of a room | `room_id` |

---

## 3. Step-by-Step API Integration

### Step 1: Customer Info & Addresses
**Components involved**: [CustomerInformationSection](file:///b:/Code/Vrachtflow/src/components/valuation/step-1/customer-information-section.tsx#16-124), [LoadingAddressSection](file:///b:/Code/Vrachtflow/src/components/valuation/step-1/loading-address-section.tsx#34-287), `UnloadingAddressSection`.

**Data to Send**:
1.  **Create Customer**:
    ```typescript
    const { data: customer } = await supabase.from('customers').insert({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "+31...",
      type: "private", // or 'business'
      company_name: "..." // add column if missing or put in metadata
    }).select().single();
    ```
2.  **Create Valuation**:
    ```typescript
    const { data: valuation } = await supabase.from('valuations').insert({
      customer_id: customer.id,
      staff_id: auth.user.id,
      status: 'draft',
      date: new Date().toISOString()
    }).select().single();
    ```
3.  **Save Addresses**:
    ```typescript
    await supabase.from('addresses').insert([
      {
        valuation_id: valuation.id,
        type: 'loading',
        street: '...',
        postal_code: '...',
        // ... map all form fields
      },
      {
        valuation_id: valuation.id,
        type: 'unloading',
        // ...
      }
    ]);
    ```

### Step 2: Additional Services
**Component**: [ServiceSelectionSection](file:///b:/Code/Vrachtflow/src/components/valuation/step-2/service-selection-section.tsx#57-128).

**Data to Send**:
1.  **Fetch Options** (on mount):
    ```typescript
    const { data: services } = await supabase.from('service_types').select('*');
    ```
2.  **Save Selection**:
    ```typescript
    // Clear previous if updating, or upsert
    await supabase.from('valuation_services').delete().eq('valuation_id', valuationId);

    const servicesToInsert = selectedServiceIds.map(serviceId => ({
        valuation_id: valuationId,
        service_type_id: serviceId,
        quantity: 1 // default
    }));

    await supabase.from('valuation_services').insert(servicesToInsert);
    ```

### Step 3: Room-by-Room Inventory
**Component**: [RoomInventorySection](file:///b:/Code/Vrachtflow/src/components/valuation/step-3/room-inventory-section.tsx#163-483).

This is the most complex step structure.

**Data to Send**:
Loop through each `room` in your local state:

1.  **Create Room**:
    ```typescript
    const { data: roomRecord } = await supabase.from('rooms').insert({
      valuation_id: valuationId,
      name: room.name,
      type: 'living_room', // map explicitly if possible
      volume_m3: room.cubicMeters
    }).select().single();
    ```

2.  **Create Items (Furniture)** for that room:
    ```typescript
    const items = room.furniture.map(item => ({
      room_id: roomRecord.id,
      name: item.name,
      quantity: item.quantity,
      needs_dismantling: item.needsDismantling,
      goes_to_storage: item.goesToStorage,
      // ... other fields
    }));
    await supabase.from('room_items').insert(items);
    ```

3.  **Create Box Counts**:
    ```typescript
    const boxes = room.boxes.filter(b => b.count > 0).map(b => ({
      room_id: roomRecord.id,
      box_type_id: b.typeId, // Ensure local IDs match DB IDs for box_types
      count: b.count
    }));
    await supabase.from('room_boxes').insert(boxes);
    ```

### Step 4: Delivery Details
**Component**: `DeliveryDetailsSection`.

**Data to Send**:
This usually updates the `addresses` (unloading) or specialized access details columns if you chose to split them. If they are part of the `addresses` table (which has columns like `truck_distance_m`, `has_elevator`), update the existing record.

```typescript
await supabase.from('addresses')
  .update({
     truck_distance_m: 50,
     has_elevator: true
  })
  .eq('valuation_id', valuationId)
  .eq('type', 'unloading');
```

### Step 5: Notes
**Component**: `NotesSection`.

**Data to Send**:
Update the `valuations` table.

```typescript
await supabase.from('valuations')
  .update({
    notes_internal: internalNotes,
    notes_customer: customerNotes
    // ...
  })
  .eq('id', valuationId);
```

### Step 6: Quote Setup & Final
**Component**: `QuoteSetupSection`.

**Data to Send**:
1.  **Packages**: Fetch from `packages` table.
2.  **Save Selection**:
    ```typescript
    await supabase.from('valuation_packages').insert({
      valuation_id: valuationId,
      package_id: selectedPackageId,
      final_price: calculatedPrice
    });
    ```
3.  **Update Totals**:
    ```typescript
    await supabase.from('valuations').update({
       total_price: 1500.00,
       total_volume_m3: 45
    }).eq('id', valuationId);
    ```

---

## 4. Code Implementation Checklist

1.  [ ] **Props Passing**: Update all `*Section` components to accept `valuationId` (or a `saveData` function reference) as a prop.
2.  [ ] **State Management**: Refactor [src/app/page.tsx](file:///b:/Code/Vrachtflow/src/app/page.tsx) to hold the "Master State" or at least the `valuationId`.
3.  [ ] **Supabase Hooks**: Create a custom hook `useValuation(id)` that can fetch the full valuation tree for editing/resuming drafts.
4.  [ ] **Type Safety**: Use the types generated by `supabase gen types` in your interfaces (e.g., `interface Room { ... }`).
