import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels, deleteHotel } from "../../redux/slices/hotelSlice";
import EditHotelModal from "./EditHotelModal";

const AllListings = () => {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state) => state.hotel);
  const token = useSelector((state) => state.auth.token);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHotels(token));
  }, [dispatch, token]);

  const handleDelete = (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      dispatch(deleteHotel({ hotelId, token }));
    }
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <div className="min-height-screen p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🏨 All Hotels</h2>

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && hotels.length === 0 && <p>No hotels found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.hotelId} className="bg-white shadow rounded-lg overflow-hidden">
            {hotel.images && hotel.images[0] && (
              <img src={hotel.images[0]} alt={hotel.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-1">{hotel.category}</p>
              <p className="text-gray-600 mb-1">{hotel.city}</p>
              <p className="text-gray-800 font-bold mb-2">${hotel.price} / night</p>

              <div className="flex space-x-2 ">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel.hotelId)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedHotel && (
        <EditHotelModal hotel={selectedHotel} onClose={handleCloseModal} token={token} />
      )}
    </div>
  );
};

export default AllListings;
