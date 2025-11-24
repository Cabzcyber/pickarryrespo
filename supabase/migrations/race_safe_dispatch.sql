-- 1. The Atomic Function (Safe Race Handler)
-- This function handles the concurrency check for accepting an order.
-- It ensures that only one driver can accept an order at a time.
CREATE OR REPLACE FUNCTION accept_order_atomic(p_order_id BIGINT, p_driver_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated_count INT;
BEGIN
  -- Attempt to update the order ONLY if it is still Pending (deliverystatus_id = 1)
  UPDATE "order"
  SET 
    courier_id = p_driver_id,
    deliverystatus_id = 2, -- Accepted
    accepted_at = NOW(),
    updated_at = NOW()
  WHERE order_id = p_order_id AND deliverystatus_id = 1;

  GET DIAGNOSTICS v_updated_count = ROW_COUNT;
  
  -- Return TRUE if we successfully updated a row (won the race), FALSE otherwise
  RETURN v_updated_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Security Definitions
-- Ensure RLS is enabled on the 'order' table
ALTER TABLE "order" ENABLE ROW LEVEL SECURITY;

-- Policy: Couriers view open orders
-- Allow authenticated users (couriers) to see orders that are Pending (1)
-- OR orders that they have already accepted (courier_id = auth.uid())
CREATE POLICY "Couriers view open and assigned orders" 
ON "order" FOR SELECT 
TO authenticated 
USING (
  deliverystatus_id = 1 -- Pending
  OR 
  courier_id = auth.uid() -- Assigned to me
);

-- Policy: Prevent direct updates by couriers
-- We do NOT create an UPDATE policy for couriers that allows changing status/courier_id directly.
-- This forces them to use the accept_order_atomic RPC.
-- If there are existing UPDATE policies, ensure they don't allow changing deliverystatus_id from 1 to 2 directly.
