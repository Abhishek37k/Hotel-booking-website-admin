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

  const [message, setMessage] = useState(null); // For success or error message

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
    setMessage(null); // Clear previous message

    try {
      const resultAction = await dispatch(addHotel({ hotelData: form, token }));

      if (addHotel.fulfilled.match(resultAction)) {
        setMessage({ type: "success", text: "Hotel added successfully!" });
        console.log("Hotel added:", resultAction.payload);

        // Optional: you can use resultAction.payload.hotelId if needed
        console.log("New hotel ID:", resultAction.payload.hotelId);

        // Reset form
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-2">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          ➕ Add New Hotel
        </h2>

        {/* Display success or error messages */}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Dropdown */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700"
            required
          >
            <option value="">Select Category</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Flat">Flat</option>
            <option value="Airbnb">Airbnb</option>
          </select>

          <input
            name="name"
            placeholder="Hotel Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700"
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700"
            required
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700 resize-none"
            rows={3}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price per Night"
            value={form.price}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700"
            required
          />

          <textarea
            name="images"
            placeholder="Enter image URLs separated by commas"
            value={form.images.join(", ")}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-gray-700 resize-none"
            rows={3}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {loading ? "Saving..." : "Add Hotel"}
          </button>
        </form>
      </div>
    </div>
  );
}
