import { useState } from "react";
import toast from 'react-hot-toast';
import { updateCharger } from "../services/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fixing default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationPicker = ({ setCoords }) => {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const ChargerFormModal = ({ charger, onClose }) => {
  const [form, setForm] = useState({
    name: charger.name,
    lat: charger.location.lat,
    lng: charger.location.lng,
    status: charger.status,
    powerOutput: charger.powerOutput,
    connectorType: charger.connectorType,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      location: {
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
      },
      status: form.status,
      powerOutput: parseFloat(form.powerOutput),
      connectorType: form.connectorType,
    };

    try {
      await updateCharger(charger._id, payload);
      toast.success("Charger updated");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Edit Charger</h2>

        <label className="block mb-1 font-medium">Charger Name</label>
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Latitude</label>
            <input
              className="w-full mb-3 border px-3 py-2 rounded"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Longitude</label>
            <input
              className="w-full mb-3 border px-3 py-2 rounded"
              name="lng"
              value={form.lng}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <label className="block mb-2 font-medium">Pick Location on Map</label>
        <MapContainer
          center={[form.lat || 20.5937, form.lng || 78.9629]}
          zoom={5}
          className="h-40 w-full rounded mb-4"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker setCoords={({ lat, lng }) =>
            setForm((prev) => ({ ...prev, lat, lng }))
          } />
          <Marker position={[form.lat, form.lng]} />
        </MapContainer>

        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <label className="block mb-1 font-medium">Power Output (kW)</label>
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="powerOutput"
          value={form.powerOutput}
          onChange={handleChange}
          required
        />

        <label className="block mb-1 font-medium">Connector Type</label>
        <input
          className="w-full mb-4 border px-3 py-2 rounded"
          name="connectorType"
          value={form.connectorType}
          onChange={handleChange}
          required
        />


        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChargerFormModal;