import supabase from '../lib/supabase';

/**
 * Calculates the complete fare breakdown and prepares the order payload.
 * This acts as a secure logic layer before database insertion.
 *
 * @param {Object} inputs - The raw data from OrderContext and UI state
 * @returns {Promise<Object>} - The fully calculated object ready for the 'order' table
 */
export const calculateAndPrepareOrder = async (inputs) => {
  const {
    pickupLocation,
    dropoffLocation,
    goodsDetails,
    orderMetrics,
    vehicleId,
    serviceId,
    paymentId,
    userId,
    isScheduled,
    scheduledDate
  } = inputs;

  // --- DEBUGGING: Check what the Calculator actually sees ---
  console.log("FareCalculator Received GoodsDetails:", JSON.stringify(goodsDetails));

  try {
    // ---------------------------------------------------------
    // 1. FETCH CONFIGURATION & RATES (Backend Validation)
    // ---------------------------------------------------------

    const { data: fareConfig, error: configError } = await supabase
      .from('fare_configuration')
      .select('*')
      .eq('is_active', true)
      .single();

    if (configError || !fareConfig) throw new Error("Active Fare Configuration not found.");

    const { data: vehicleData, error: vehicleError } = await supabase
      .from('type_vehicle')
      .select('base_fare, distance_rate_per_km')
      .eq('vehicle_id', vehicleId)
      .single();

    if (vehicleError || !vehicleData) throw new Error("Vehicle details not found.");

    // ---------------------------------------------------------
    // 2. CALCULATE COMPONENTS
    // ---------------------------------------------------------

    const distanceKm = parseFloat(orderMetrics?.distanceKm || 0);
    const durationMin = parseInt(orderMetrics?.durationMin || 0);

    // SAFE ACCESS: Handle string or number for rush_fee
    const rushFeeInput = goodsDetails?.rush_fee ? parseFloat(goodsDetails.rush_fee) : 0;

    const baseFareComp = parseFloat(vehicleData.base_fare);
    const distanceRate = parseFloat(vehicleData.distance_rate_per_km);
    const distanceChargeComp = distanceKm * distanceRate;
    const timeRate = parseFloat(fareConfig.time_rate_per_minute);
    const timeChargeComp = durationMin * timeRate;
    const bonusChargeComp = rushFeeInput > 0 ? rushFeeInput : 0;
    const vehicleChargeComp = 0;

    // ---------------------------------------------------------
    // 3. FINAL TOTALS
    // ---------------------------------------------------------

    const totalFare = baseFareComp
      + distanceChargeComp
      + timeChargeComp
      + bonusChargeComp
      + vehicleChargeComp;

    const commissionRate = parseFloat(fareConfig.platform_commission_percentage) / 100;
    const commissionAmount = totalFare * commissionRate;
    const penaltyAmount = 0; // Static 0 for new orders

    // ---------------------------------------------------------
    // 4. EXTRACTION & VALIDATION
    // ---------------------------------------------------------

    // Fix Category ID: Ensure we handle string or number
    let safeCategoryId = null;
    if (goodsDetails?.category_id) {
        safeCategoryId = parseInt(goodsDetails.category_id, 10);
    }

    // Fix Images: Safely check the array
    const img1 = goodsDetails?.images?.[0]?.uri || null;
    const img2 = goodsDetails?.images?.[1]?.uri || null;
    const img3 = goodsDetails?.images?.[2]?.uri || null;

    // FIX: Ensure scheduled_pickup_time is NEVER null
    // If not scheduled, use current time for immediate booking
    const finalScheduledTime = (isScheduled && scheduledDate)
      ? scheduledDate
      : new Date().toISOString();

    // ---------------------------------------------------------
    // 5. CONSTRUCT DATABASE PAYLOAD
    // ---------------------------------------------------------

    const orderPayload = {
      // -- IDs --
      user_id: userId,
      service_id: serviceId,
      payment_id: paymentId,
      vehicle_id: vehicleId,
      deliverystatus_id: 1, // Pending
      courier_id: null, // Explicitly null for new orders

      // -- Goods Data --
      category_id: safeCategoryId,
      other_details: goodsDetails?.other_details || "",
      goods_image1: img1,
      goods_image2: img2,
      goods_image3: img3,

      // -- Location & Metrics --
      pickup_address: pickupLocation.address,
      pickup_latitude: pickupLocation.latitude,
      pickup_longitude: pickupLocation.longitude,
      dropoff_address: dropoffLocation.address,
      dropoff_latitude: dropoffLocation.latitude,
      dropoff_longitude: dropoffLocation.longitude,
      distance: distanceKm,
      estimated_duration: durationMin,

      // -- Financials --
      rush_fee: rushFeeInput,
      base_fare_component: baseFareComp.toFixed(2),
      distance_charge_component: distanceChargeComp.toFixed(2),
      time_charge_component: timeChargeComp.toFixed(2),
      vehicle_charge_component: vehicleChargeComp.toFixed(2),
      bonus_charge_component: bonusChargeComp.toFixed(2),

      total_fare: totalFare.toFixed(2),
      commission_amount: commissionAmount.toFixed(2),
      penalty_amount: penaltyAmount.toFixed(2),

      // -- Scheduling --
      is_scheduled: isScheduled,
      scheduled_pickup_time: finalScheduledTime, // Now safe from NULL constraints

      // -- Metadata --
      created_at: new Date().toISOString(),
    };

    return orderPayload;

  } catch (error) {
    console.error("Fare Calculation Error:", error);
    throw error;
  }
};