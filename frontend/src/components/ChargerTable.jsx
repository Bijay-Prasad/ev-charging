import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { reverseGeocode } from "../utils/reverseGeocode";
import { useEffect } from "react";

const ChargerTable = ({ chargers, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [connectorFilter, setConnectorFilter] = useState("");
  const [powerFilter, setPowerFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [chargerWithAddress, setChargerWithAddress] = useState([]);
  

  useEffect(() => {
    const fetchAddresses = async () => {
      const updated = await Promise.all(
        chargers.map(async (charger) => {
          const address = await reverseGeocode(charger.location.lat, charger.location.lng);
          return { ...charger, address };
        })
      );
      console.log("updated:", updated);
      
      setChargerWithAddress(updated);
    };

    fetchAddresses();
  }, [chargers]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (key) => {
    if (sortKey !== key) return <FaSort className="inline ml-1" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  // 🧠 Filter logic
  const filtered = chargerWithAddress
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (statusFilter ? c.status === statusFilter : true))
    .filter((c) =>
      connectorFilter ? c.connectorType === connectorFilter : true
    )
    .filter((c) =>
      powerFilter ? String(c.powerOutput) === powerFilter : true
    );

  // 🎯 Sorting
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (sortKey === "powerOutput") {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else {
        aVal = aVal?.toString().toLowerCase();
        bVal = bVal?.toString().toLowerCase();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🌈 Unique values for filters
  const statusOptions = [...new Set(chargers.map((c) => c.status))];
  const connectorOptions = [...new Set(chargers.map((c) => c.connectorType))];
  const powerOptions = [...new Set(chargers.map((c) => String(c.powerOutput)))];

  return (
    <div className="mt-6 px-2 md:px-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by charger name..."
          className="border rounded-md px-3 py-2 w-full md:max-w-sm shadow-sm focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 text-sm"
            value={connectorFilter}
            onChange={(e) => setConnectorFilter(e.target.value)}
          >
            <option value="">All Connectors</option>
            {connectorOptions.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 text-sm"
            value={powerFilter}
            onChange={(e) => setPowerFilter(e.target.value)}
          >
            <option value="">All Power</option>
            {powerOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort("name")}>
                Name {getSortIcon("name")}
              </th>
              {/* <th className="px-4 py-3">Latitude</th>
              <th className="px-4 py-3">Longitude</th> */}
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort("powerOutput")}>
                Power (kW) {getSortIcon("powerOutput")}
              </th>
              <th className="px-4 py-3">Connector</th>
              {user?.role === "ADMIN" && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((charger) => (
              <tr key={charger._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{charger.name}</td>
                {/* <td className="px-4 py-3">{charger.location.lat}</td>
                <td className="px-4 py-3">{charger.location.lng}</td> */}
                <td className="px-4 py-3 text-sm text-gray-600">{charger.address || "Loading..."}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${charger.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {charger.status}
                  </span>
                </td>
                <td className="px-4 py-3">{charger.powerOutput}</td>
                <td className="px-4 py-3">{charger.connectorType}</td>
                {user?.role === "ADMIN" && (
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => onEdit(charger)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(charger._id)}
                      className="bg-red-400 text-white px-2 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChargerTable;