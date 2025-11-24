-- Fix RLS Policies for Courier Order Updates

-- 1. Ensure RLS is enabled
ALTER TABLE "public"."order" ENABLE ROW LEVEL SECURITY;

-- 2. Allow Couriers to UPDATE orders where they are the assigned courier
-- Drop existing policy if it exists to avoid errors
DROP POLICY IF EXISTS "Couriers can update their assigned orders" ON "public"."order";

CREATE POLICY "Couriers can update their assigned orders"
ON "public"."order"
FOR UPDATE
TO authenticated
USING (
  auth.uid() = courier_id
)
WITH CHECK (
  auth.uid() = courier_id
);

-- 3. Allow Couriers to VIEW their assigned orders (and pending ones)
DROP POLICY IF EXISTS "Couriers can view orders" ON "public"."order";

CREATE POLICY "Couriers can view orders"
ON "public"."order"
FOR SELECT
TO authenticated
USING (
  -- Can see orders assigned to them
  auth.uid() = courier_id
  OR
  -- Can see pending orders (Status 1) to accept them
  deliverystatus_id = 1
);
