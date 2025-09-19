import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, error ,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(signup({ email, password }));
  };


    useEffect(() => {
    if (user) {
      console.log("✅ Logged in:", user);
      navigate("/Dashboard");
    }
  }, [user, navigate]);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
