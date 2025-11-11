import React from "react";
import { FaCalendarAlt, FaDollarSign, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const BookingModal = ({ service, user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBookService = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User session lost. Please log in again.",
      });
      onClose();
      return;
    }

    const form = e.target;
    const bookingDate = form.bookingDate.value;
    const instructions = form.instructions.value;

    const newBooking = {
      userEmail: user.email,
      serviceId: service._id,
      bookingDate: new Date(bookingDate).toISOString(),
      price: service.price,

      serviceName: service.name,
      providerEmail: service.provider.email,
      userName: user.displayName || "Anonymous User",
      instructions: instructions,
      status: "pending",
      bookedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/bookings`,
        newBooking
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Request Sent!",
          text: `Your booking for ${service.name} is pending confirmation.`,
          showConfirmButton: false,
          timer: 3000,
        });
        form.reset();
        onClose();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Booking Issue",
          text: "Booking request accepted, but confirmation ID is missing.",
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Could not connect to the server or request failed.";

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-primary">
            Confirm Service Booking
          </h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mb-6 space-y-2 border-b pb-4">
          <p className="text-xl font-semibold">{service.name}</p>
          <div className="flex justify-between items-center">
            <p className="flex items-center text-lg text-gray-700">
              <FaDollarSign className="mr-2 text-green-600" />
              Price: <span className="font-bold ml-1">${service.price}</span>
            </p>
            <p className="text-sm text-gray-500">
              Provider: {service.provider.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleBookService}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <FaUser className="mr-1" /> Your Email (Read-Only)
              </span>
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              className="input input-bordered w-full cursor-not-allowed bg-gray-100"
              readOnly
            />
          </div>

          <input type="hidden" name="serviceId" defaultValue={service._id} />

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <FaCalendarAlt className="mr-1" /> Desired Service Date *
              </span>
            </label>
            <input
              type="date"
              name="bookingDate"
              className="input input-bordered w-full"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-medium">
                Special Instructions (Optional)
              </span>
            </label>
            <textarea
              name="instructions"
              placeholder="E.g., Back door entry, need a morning slot."
              className="textarea textarea-bordered h-20"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full text-lg font-semibold"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
