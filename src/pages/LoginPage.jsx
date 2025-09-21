import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-4">
      {/* Heading outside box */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Hotel Booking Website
        </h1>
       
      </div>

      {/* Login Card */}
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/30">
        <p className="text-xl mt-2 text-blue-500 font-semibold text-center tracking-wide py-2">
          Admin Login
        </p>
        {error && (
          <p className="text-red-600 text-center mb-4 bg-red-100 border border-red-300 p-2 rounded-lg text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Admin Email Address"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Not an admin user?{" "}
          <Link
            to="/signup"
            className="text-purple-600 hover:underline font-medium"
          >
            Go to Admin Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
