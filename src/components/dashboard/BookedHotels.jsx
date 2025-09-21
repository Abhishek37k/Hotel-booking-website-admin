import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../../redux/slices/bookings-slice";

const BookedHotels = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-4">Loading bookings...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Bookings</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
            {/* Hotel Image */}

            <div className="h-48 w-full overflow-hidden">
              <img
                src={b.images?.[0] || "https://via.placeholder.com/400x250"}
                alt={b.hotelName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">🏨 {b.hotelName}</h3>
              <p className="text-gray-600 mb-2">👤 {b.name}</p>
              <p className="text-gray-600 mb-2">📧 {b.userEmail}</p>
              <p className="text-gray-600 mb-2">📅 Check In: {b.checkIn}</p>
              <p className="text-gray-600 mb-2">📅 Check Out: {b.checkOut}</p>
              <p className="text-gray-600 mb-2">👥 People: {b.people}</p>
              <p className="text-gray-800 font-semibold mb-3">
                Status: <span className={`capitalize ${b.status === "approved" ? "text-green-600" : b.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {b.status}
                </span>
              </p>

              {/* Actions */}
              {b.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full font-semibold transition"
                    onClick={() =>
                      dispatch(updateBookingStatus({ id: b.id, status: "approved" }))
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
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
