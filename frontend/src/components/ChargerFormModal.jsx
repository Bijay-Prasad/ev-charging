import { useState } from "react";
import toast from 'react-hot-toast';
import { updateCharger } from "../services/api";

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
      ...form,
      location: {
        lat: form.lat,
        lng: form.lng,
      },
    };

    await updateCharger(charger._id, payload);
    toast.success("Charger updated");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Edit Charger</h2>

        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Charger Name"
        />
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="Latitude"
        />
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="Longitude"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 border px-3 py-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          name="powerOutput"
          value={form.powerOutput}
          onChange={handleChange}
          placeholder="Power (kW)"
        />
        <input
          className="w-full mb-4 border px-3 py-2 rounded"
          name="connectorType"
          value={form.connectorType}
          onChange={handleChange}
          placeholder="Connector Type"
        />

        <div className="flex justify-end gap-2">
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
