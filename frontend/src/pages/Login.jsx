import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);

      localStorage.setItem('token', data.token);

      dispatch(
        loginSuccess({
          token: data.token,
          userId: data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role
        })
      );
      toast.success('Logged in successfully! Redirecting to Dashboard...');
      navigate('/chargers');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
          <input
            className="w-full p-2 border"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-2 border"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/register')}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}