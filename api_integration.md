# API Integration Guide

This guide explains how to connect the frontend application to the   Supabase database schema.

## Database Schema Overview

The following tables support the Valuation Tool:

### Core Tables
- `staff`: Extends `auth.users`, stores surveyor profiles.
- `customers`: Stores customer details (private/business).
- `valuations`: The main quote record, linking staff and customers.

### Details Tables
- `addresses`: Loading and unloading addresses linked to a valuation.
- `rooms`: Rooms within a valuation (e.g., Living Room, Bedroom).
- `room_items`: Furniture/items within a room.
- `room_boxes`: Box counts for a room.
- `room_photos`: Photos of a room.

### Configuration & Pricing
- `service_types`: Available services (Packing, Dismantling, etc.).
- `valuation_services`: Services selected for a specific valuation.
- `box_types`: Available box types and prices.
- `packages`: Quote packages.
- `valuation_packages`: Selected package for a quote.

## Integration Steps

### 1. Supabase Client Setup

Ensure you have the Supabase client initialized.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. TypeScript Types

You should generate TypeScript types for the database to ensure type safety.
Run the Supabase CLI command or use the MCP tool `mcp_generate_typescript_types` if available, or manually define interfaces based on the table definitions.

### 3. Creating a Valuation (Flow)

When the "New Valuation" button is clicked:

#### A. Create the Valuation Record & Customer
Ideally, create the `valuation` record early (status: 'draft') so you have an ID to link everything to.

```typescript
// Example: Creating a new valuation for a new customer
const { data: customer, error: customerError } = await supabase
  .from('customers')
  .insert({
    first_name: 'John',
    last_name: 'Doe',
    type: 'private',
    // ... other fields
  })
  .select()
  .single();

const { data: valuation, error: valuationError } = await supabase
  .from('valuations')
  .insert({
    customer_id: customer.id,
    staff_id: currentUserId, // Get from auth context
    status: 'draft',
    date: new Date(),
  })
  .select()
  .single();
```

### 4. Saving Addresses (Step 2 & 3)

```typescript
await supabase.from('addresses').insert([
  {
    valuation_id: valuation.id,
    type: 'loading',
    street: 'Keizersgracht',
    house_number: '123',
    postal_code: '1015 CJ',
    city: 'Amsterdam',
    // ... access details
  },
  {
    valuation_id: valuation.id,
    type: 'unloading',
    // ...
  }
]);
```

### 5. Saving Room Inventory (Step 6)

This is a hierarchical save. You need the `room` ID to save `room_items`.

```typescript
// 1. Create Room
const { data: room } = await supabase
  .from('rooms')
  .insert({
    valuation_id: valuation.id,
    name: 'Living Room',
    type: 'living_room'
  })
  .select()
  .single();

// 2. Add Furniture
await supabase.from('room_items').insert([
  {
    room_id: room.id,
    name: 'Sofa',
    quantity: 1,
    volume_m3_unit: 1.5,
    needs_dismantling: false
  },
  // ... other items
]);

// 3. Add Photos (if any)
await supabase.from('room_photos').insert([
  {
    room_id: room.id,
    photo_url: 'https://...', // URL from storage upload
    description: 'Corner damage'
  }
]);
```

### 6. Managing Services & Pricing

Fetch available services to populate UI options:

```typescript
const { data: services } = await supabase.from('service_types').select('*');
```

Save selected services:

```typescript
await supabase.from('valuation_services').insert({
  valuation_id: valuation.id,
  service_type_id: selectedServiceId,
  quantity: 1,
  price_applied: 50.00 // Fetch current price or calculate
});
```

### 7. Storage (Photos)

For uploading photos (Step 8):
1. Create a Supabase Storage Bucket (e.g., `valuation-photos`).
2. Upload the file.
3. Get the public URL.
4. Save the URL to `room_photos` table.

```typescript
const { data, error } = await supabase
  .storage
  .from('valuation-photos')
  .upload(`valuations/${valuationId}/${file.name}`, file);
```

## Security (RLS)

Row Level Security (RLS) is enabled on all tables. Currently, policies allow **all authenticated users** full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).

> **Note:** In a production environment, you should refine these policies so that staff can only see/edit valuations they are assigned to, or admin users have global access.
