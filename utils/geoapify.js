// SECURITY NOTE: Ensure EXPO_PUBLIC_GEOAPIFY_API_KEY is set in your .env file
const API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

if (!API_KEY) {
  console.warn("Warning: EXPO_PUBLIC_GEOAPIFY_API_KEY is missing.");
}

export const fetchAutocomplete = async (text) => {
  if (!text || text.length < 3) return [];
  if (!API_KEY) return [];

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error("Geoapify Autocomplete Error:", error);
    return [];
  }
};

export const fetchReverseGeocode = async (lat, lon) => {
  if (!API_KEY) return null;
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return {
        address: data.features[0].properties.formatted,
        lat: data.features[0].properties.lat,
        lon: data.features[0].properties.lon,
      };
    }
    return null;
  } catch (error) {
    console.error("Geoapify Reverse Geo Error:", error);
    return null;
  }
};

export const fetchRouteDetails = async (start, end) => {
  if (!start || !end || !API_KEY) return null;
  const waypoints = `${start.lat},${start.lon}|${end.lat},${end.lon}`;
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&units=metric&apiKey=${API_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const props = data.features[0].properties;
      return {
        distanceKm: (props.distance / 1000).toFixed(2),
        timeMin: (props.time / 60).toFixed(0)
      };
    }
    return null;
  } catch (error) {
    console.error("Geoapify Routing Error:", error);
    return null;
  }
};

export const GEOAPIFY_TILE_URL = `https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=${API_KEY}`;