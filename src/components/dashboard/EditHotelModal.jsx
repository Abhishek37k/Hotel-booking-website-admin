import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { updateHotel } from "../../redux/slices/hotelSlice";

const modalRoot = document.getElementById("modal-root");

const EditHotelModal = ({ hotel, onClose, token }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...hotel });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // trigger animation
  }, []);

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
    await dispatch(
      updateHotel({ hotelId: hotel.hotelId, hotelData: form, token })
    );
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div
        className={`bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Gradient Header */}
        <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center text-xl font-bold shadow-md">
          ✏️ Edit Hotel Details
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "category", "city", "price"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "price" ? "number" : "text"}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          ))}

          <textarea
            name="images"
            placeholder="Image URLs (comma separated)"
            value={form.images.join(", ")}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-600 text-white font-semibold transition transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default EditHotelModal;
