import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ChargerList from './pages/ChargerList';
import MapView from './components/MapView';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddCharger from './pages/AddCharger';
import Notfound from './components/Notfound';
import Unauthorized from './components/Unauthorized';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/chargers" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chargers"
          element={<ProtectedRoute><ChargerList /></ProtectedRoute>}
        />
        <Route
          path="/map"
          element={<ProtectedRoute><MapView /></ProtectedRoute>}
        />
        <Route
          path="/add-charger"
          element={<ProtectedRoute><PrivateRoute allowedRoles={['ADMIN']}><AddCharger /></PrivateRoute></ProtectedRoute>}
        />
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
        <Route
          path="/*"
          element={<Notfound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
