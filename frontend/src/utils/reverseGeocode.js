const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const reverseGeocode = async (lat, lng) => {
  try {
    // eslint-disable-next-line no-constant-binary-expression
    const url = `${API_BASE}/api/reverse-geocode?lat=${lat}&lng=${lng}` || `/api/reverse-geocode?lat=${lat}&lng=${lng}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    return "Unknown Location";
  }
};