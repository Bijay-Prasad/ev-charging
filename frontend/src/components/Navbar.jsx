import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-xl font-bold">EV Charger Dashboard</h1>

      {token && (
        <>
          <Link to="/chargers" className="mr-4">Chargers List</Link>
          {/* <Link to="/map" className="mr-4">Chargers Map</Link> */}

          {user?.role === "ADMIN" && <Link to="/add-charger" className="mr-4">Add Charger</Link>}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      )}

    </nav>
  );
};

export default Navbar;