export const reverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(
      `/api/reverse-geocode?lat=${lat}&lng=${lng}`
    );
    const data = await res.json();
    return data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    return "Unknown Location";
  }
};