import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../../redux/slices/bookings-slice";

const BookedHotels = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading)
    return <p className="text-center mt-10 text-gray-700 text-lg">Loading bookings...</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
        📋 All Bookings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            {/* Hotel Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={b.hotelImg?.[0] || "https://via.placeholder.com/400x250"}
                alt={b.hotelName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold mb-1 text-gray-800">🏨 {b.hotelName}</h3>
              <p className="text-gray-600">👤 {b.name}</p>
              <p className="text-gray-600">📧 {b.userEmail}</p>
              <p className="text-gray-600">📅 Check In: {b.checkIn}</p>
              <p className="text-gray-600">📅 Check Out: {b.checkOut}</p>
              <p className="text-gray-600">👥 People: {b.people}</p>

              <p className="text-gray-800 font-semibold">
                Status:{" "}
                <span
                  className={`capitalize font-medium ${
                    b.status === "approved"
                      ? "text-green-600"
                      : b.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {b.status}
                </span>
              </p>

              {/* Action buttons */}
              {b.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-2xl font-semibold shadow transition"
                    onClick={() =>
                      dispatch(updateBookingStatus({ id: b.id, status: "approved" }))
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-2xl font-semibold shadow transition"
                    onClick={() =>
                      dispatch(updateBookingStatus({ id: b.id, status: "rejected" }))
                    }
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedHotels;
