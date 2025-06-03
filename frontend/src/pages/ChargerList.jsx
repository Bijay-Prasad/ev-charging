import { useEffect, useState } from 'react';
import MapView from '../components/MapView';
import ChargerTable from '../components/ChargerTable';
import { deleteCharger, getChargers } from '../services/api';
import toast from 'react-hot-toast';
import ChargerFormModal from '../components/ChargerFormModal';

const ChargerList = () => {
  const [chargers, setChargers] = useState([]);
  const [editingCharger, setEditingCharger] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const res = await getChargers();
        setChargers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChargers();
  }, [showModal]);


  const handleEdit = (charger) => {
    setEditingCharger(charger);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this charger?")) {
      await deleteCharger(id);
      toast.success("Charger deleted");
      getChargers().then(res => setChargers(res.data));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Charging Stations Map</h1>
      <MapView chargers={chargers} />
      <h1 className="text-xl font-semibold mt-4 mb-4">Charging Stations List</h1>
      <ChargerTable chargers={chargers} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <ChargerFormModal
          charger={editingCharger}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ChargerList;
