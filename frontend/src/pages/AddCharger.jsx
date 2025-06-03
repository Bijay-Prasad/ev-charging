import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import toast from 'react-hot-toast';
import { createCharger } from '../services/api';

import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AddCharger = () => {
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lng: '',
    status: 'Active',
    powerOutput: '',
    connectorType: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formData.name,
        location: {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        },
        status: formData.status,
        powerOutput: parseFloat(formData.powerOutput),
        connectorType: formData.connectorType,
      };
      await createCharger(data);
      toast.success('Charger added successfully!');
      navigate('/chargers');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add charger');
    }
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
        }));
      },
    });
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold">Add New Charger</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Charger Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={formData.lat}
            onChange={handleChange}
            step="any"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={formData.lng}
            onChange={handleChange}
            step="any"
            required
            className="p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Pick Location on Map:
          </label>
          <MapContainer
            center={[12.9629, 77.5775]} // Center on India
            zoom={5}
            scrollWheelZoom={true}
            className="h-64 rounded border"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <LocationPicker />
            {formData.lat && formData.lng && (
              <Marker position={[formData.lat, formData.lng]} />
            )}
          </MapContainer>
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          type="number"
          name="powerOutput"
          placeholder="Power Output (kW)"
          value={formData.powerOutput}
          onChange={handleChange}
          step="any"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="connectorType"
          placeholder="Connector Type (e.g. Type2)"
          value={formData.connectorType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Add Charger
        </button>
      </form>
    </div>
  );
};

export default AddCharger;