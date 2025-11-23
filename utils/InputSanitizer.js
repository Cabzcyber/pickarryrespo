// utils/InputSanitizer.js

/**
 * Sanitizes the goods details object to ensure data integrity.
 * Cleans text fields but CRITICALLY PRESERVES IDs and Images required by the backend.
 * * @param {Object} input - The raw goods object from SetGoods screen
 * @returns {Object} - A clean object with correct data types
 */
export const sanitizeGoodsDetails = (input) => {
  // 1. Safety Check
  if (!input) {
    return null;
  }

  // 2. Construct Clean Data Object
  // We explicitly map every field to ensure no data is lost.
  const cleanData = {
    // Text: Trim whitespace and limit length
    other_details: typeof input.other_details === 'string'
      ? input.other_details.trim().substring(0, 500)
      : "",

    // ID: Ensure it is a valid Integer (Crucial for Database FK)
    category_id: input.category_id ? parseInt(input.category_id, 10) : null,

    // Money: Ensure it is a Number (so math works in FareCalculator)
    rush_fee: input.rush_fee ? parseFloat(input.rush_fee) : 0,

    // Images: Pass the array through safely (or empty array if missing)
    images: Array.isArray(input.images) ? input.images : []
  };

  return cleanData;
};