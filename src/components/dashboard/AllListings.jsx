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
    <div className="min-h-screen p-10 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-800 drop-shadow-md">
        🏨 Manage All Hotels
      </h2>

      {/* Loader / Error / Empty */}
      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading hotels...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && hotels.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No hotels found. Add your first listing!
        </p>
      )}

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            {hotel.images && hotel.images[0] && (
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">
                  {hotel.name}
                </h3>
                <p className="text-sm text-gray-500">{hotel.category}</p>
                <p className="text-sm text-gray-500">{hotel.city}</p>
              </div>

              <p className="text-lg font-bold text-blue-600 mt-3">
                ${hotel.price} / night
              </p>

              <div className="flex space-x-3 mt-5">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 px-3 py-2 rounded-lg text-white font-medium shadow transition duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel.hotelId)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-2 rounded-lg text-white font-medium shadow transition duration-200"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedHotel && (
        <EditHotelModal
          hotel={selectedHotel}
          onClose={handleCloseModal}
          token={token}
        />
      )}
    </div>
  );
};

export default AllListings;
