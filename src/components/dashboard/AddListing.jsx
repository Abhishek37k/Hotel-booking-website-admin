import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "../../redux/slices/hotelSlice";

export default function AddListing() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.hotel);
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    category: "",
    name: "",
    location: "",
    city: "",
    pincode: "",
    address: "",
    price: "",
    images: [],
  });

  const [message, setMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setForm({ ...form, images: value.split(",").map((url) => url.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const resultAction = await dispatch(addHotel({ hotelData: form, token }));

      if (addHotel.fulfilled.match(resultAction)) {
        setMessage({ type: "success", text: "Hotel added successfully!" });
        setForm({
          category: "",
          name: "",
          city: "",
          pincode: "",
          address: "",
          price: "",
          images: [],
        });
      } else {
        setMessage({ type: "error", text: "Failed to add hotel." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong." });
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-10">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 w-full max-w-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
          ➕ Add New Hotel
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
            required
          >
            <option value="">Select Category</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Flat">Flat</option>
            <option value="Airbnb">Airbnb</option>
          </select>

          {/* Name */}
          <input
            name="name"
            placeholder="Hotel Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
            required
          />

          {/* City */}
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
            required
          />

          {/* Pincode */}
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
            required
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 resize-none"
            rows={3}
            required
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price per Night"
            value={form.price}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
            required
          />

          {/* Images */}
          <textarea
            name="images"
            placeholder="Enter image URLs separated by commas"
            value={form.images.join(", ")}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 resize-none"
            rows={3}
            required
          />
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-md transition transform hover:scale-105"
        >
          {loading ? "Saving..." : "Add Hotel"}
        </button>
      </div>
    </div>
  );
}
