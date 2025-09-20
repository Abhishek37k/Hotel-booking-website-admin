import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { updateHotel } from "../../redux/slices/hotelSlice";

const modalRoot = document.getElementById("modal-root"); 

const EditHotelModal = ({ hotel, onClose, token }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...hotel });

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
    await dispatch(updateHotel({ hotelId: hotel.hotelId, hotelData: form, token }));
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-bold mb-4">Edit Hotel</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Hotel Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price per Night"
            value={form.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            name="images"
            placeholder="Image URLs (comma separated)"
            value={form.images.join(", ")}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default EditHotelModal;
