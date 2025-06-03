// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapView = ({ chargers }) => {
  
  const defaultPosition = [12.9629, 77.5775]; // Fallback: Bengaluru, India

  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={true} className="h-[500px] w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {chargers?.map((charger) => (
        <Marker
          key={charger._id}
          position={[charger.location.lat, charger.location.lng]}
        >
          <Popup>
            <h2 className="font-bold">{charger.name}</h2>
            <p>Status: {charger.status}</p>
            <p>Power Output: {charger.powerOutput} kW</p>
            <p>Connector: {charger.connectorType}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
