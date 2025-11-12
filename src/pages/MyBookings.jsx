import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaBook,
  FaBookOpen,
  FaCalendarAlt,
  FaDollarSign,
  FaSearch,
  FaSpinner,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const MyBookings = () => {
  const { user, loading: authLoading } = useContext(AuthContext) || {};
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const getBookingId = (booking) => booking._id?.$oid || booking._id;
  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setReviewText("");
    setIsModalOpen(true);
  };
  const handleSubmitReview = async () => {
    if (!reviewText.trim() || rating < 1 || rating > 5) {
      Swal.fire(
        "Error",
        "Please provide a valid rating (1-5) and a comment.",
        "error"
      );
      return;
    }

    const reviewData = {
      rating: rating,
      comment: reviewText.trim(),
      reviewerName: user.displayName || user.email,

      userEmail: user.email,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/services/${selectedBooking.serviceId}/review`,
        reviewData
      );

      if (response.data.success) {
        Swal.fire(
          "Success!",
          "Your review has been submitted and saved.",
          "success"
        );
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === selectedBooking._id ? { ...b, hasReviewed: true } : b
          )
        );
        setIsModalOpen(false);
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to submit review.",
          "error"
        );
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      Swal.fire(
        "Error",
        "An unexpected error occurred while submitting your review.",
        "error"
      );
    }
  };
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/bookings`);
      const userBookings = response.data.filter(
        (booking) => booking.userEmail === user.email
      );
      setBookings(userBookings);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email || authLoading) {
      setLoading(false);
      return;
    }
    fetchBookings();
  }, [user, authLoading]);

  const handleCancelBooking = async (bookingId, serviceName) => {
    Swal.fire({
      title: `Are you sure you want to cancel the booking for ${serviceName}?`,
      text: "This action cannot be undone and will permanently delete the record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/bookings/${bookingId}`
          );

          if (response.data.success) {
            setBookings((prevBookings) =>
              prevBookings.filter((b) => getBookingId(b) !== bookingId)
            );

            Swal.fire(
              "Deleted!",
              `The booking for ${serviceName} has been successfully deleted.`,
              "success"
            );
          } else {
            Swal.fire(
              "Error",
              response.data.message ||
                "Failed to delete the booking on the server.",
              "error"
            );
          }
        } catch (error) {
          console.error("Booking deletion failed:", error);
          Swal.fire(
            "Error",
            "Could not connect to the server or delete booking. Please try again.",
            "error"
          );
        }
      }
    });
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <FaSpinner className="text-5xl text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-[80vh] text-center">
        <div className="alert alert-error shadow-lg w-full max-w-xl mx-auto mt-20">
          <div>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-[80vh] flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center border-t-4 border-primary/70 transform transition duration-500 hover:shadow-2xl hover:scale-[1.01]">
          <FaBookOpen className="text-7xl text-primary mx-auto mb-6 opacity-80" />

          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
            No Bookings Yet!
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            It looks like your booking list is empty. Ready to find the perfect
            service?
          </p>

          <Link to="/services">
            <button className="btn btn-primary btn-lg text-white font-bold tracking-wider shadow-lg hover:shadow-xl transition-all duration-300">
              <FaSearch className="mr-2" /> Start Exploring Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[80vh]">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white flex items-center justify-center">
        <FaBook className="mr-3 text-primary" /> My Booked Services
      </h1>

      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-primary text-white text-lg text-center">
              <th>#</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.map((booking, index) => {
              const bookingId = getBookingId(booking);
              const bookingDate = new Date(
                booking.bookingDate
              ).toLocaleDateString();

              return (
                <tr
                  key={bookingId}
                  className="hover:bg-base-200 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td className="font-semibold">{booking.serviceName}</td>
                  <td>
                    <FaDollarSign className="inline mr-1" />
                    {booking.price}
                  </td>
                  <td>
                    <div className="flex items-center justify-center space-x-2">
                      <FaCalendarAlt className="text-sm text-info" />
                      {bookingDate}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "confirmed"
                          ? "badge-success"
                          : booking.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      } text-white font-bold`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col space-y-2 items-center">
                      <button
                        onClick={() =>
                          handleCancelBooking(bookingId, booking.serviceName)
                        }
                        className="btn btn-error btn-sm text-white w-full max-w-[120px]"
                      >
                        <FaTrashAlt /> Cancel
                      </button>

                      {booking.hasReviewed ? (
                        <button className="btn btn-disabled btn-sm w-full max-w-[120px]">
                          Reviewed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenReviewModal(booking)}
                          className="btn btn-success btn-sm text-white w-full max-w-[120px]"
                        >
                          <FaStar /> Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-base-300">
              <td colSpan="6" className="text-right font-medium">
                Total Bookings: {bookings.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isModalOpen && selectedBooking && (
        <div className="modal modal-open">
          <div
            className="modal-box w-11/12 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-2xl text-primary mb-4">
              Review: {selectedBooking.serviceName}
            </h3>
            <p className="text-gray-600 mb-6">
              Share your experience and help others!
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
            >
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Your Rating:</span>
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <FaStar
                        key={starValue}
                        className={`cursor-pointer transition-colors text-4xl ${
                          starValue <= rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => setRating(starValue)}
                      />
                    ))}
                  </div>

                  <span className="text-2xl font-extrabold text-primary">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Your Comment:
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Write your detailed review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
