import React, { useContext, useState } from "react";
import {
  FaBookMedical,
  FaDollarSign,
  FaEnvelope,
  FaList,
  FaLock,
  FaStar,
  FaUserTie,
} from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import BookingModal from "../components/BookingModal";

const ServiceDetails = () => {
  const service = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    name,
    price,
    category,
    description,
    image,
    provider,
    reviews = [],
  } = service;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const isServiceOwner = user && provider && user.email === provider.email;

  const handleOpenModal = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book a service.",
      });
      navigate("/login");
      return;
    }

    setIsModalOpen(true);
  };

  if (!service) {
    return (
      <div className="container mx-auto p-10 text-center min-h-[80vh]">
        <h2 className="text-3xl text-red-600">Error Loading Service</h2>
        <p>The requested service could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img
            src={image}
            alt={name}
            className="w-full h-96 object-cover rounded-xl shadow-2xl mb-8"
          />

          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            {name}
          </h1>

          <div className="flex items-center space-x-6 text-xl mb-6 border-b pb-4">
            <div className="flex items-center text-primary font-bold">
              <FaDollarSign className="mr-2" /> ${price}
            </div>
            <div className="flex items-center text-accent">
              <FaList className="mr-2" /> {category}
            </div>
            <div className="flex items-center text-yellow-500">
              <FaStar className="mr-1" />
              {reviews.length > 0
                ? averageRating?.toFixed(1) || "N/A"
                : "No Ratings"}
              <span className="text-sm text-gray-500 ml-1">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
            About This Service
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {description}
          </p>

          <div className="mt-8 p-6 bg-base-200 rounded-xl shadow-lg border border-primary/20">
            <h3 className="text-xl font-bold mb-3 text-primary flex items-center">
              <FaUserTie className="mr-2" /> Service Provided by:
            </h3>
            <div className="text-lg space-y-1">
              <p className="font-semibold">{provider.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <FaEnvelope className="mr-2" /> {provider.email}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-base-100 p-8 rounded-xl shadow-2xl border-t-4 border-primary">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center">
              <FaBookMedical className="mr-3" /> Book This Service
            </h2>

            {isServiceOwner ? (
              <div className="alert alert-error shadow-lg my-6">
                <div>
                  <FaLock className="text-2xl" />
                  <span className="font-semibold">Booking Blocked</span>
                </div>
                <p className="text-sm">
                  You cannot book a service that you own.
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenModal}
                className="btn btn-primary btn-lg w-full text-lg font-semibold"
              >
                Confirm Booking Request
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 mt-12 border-t pt-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <FaStar className="mr-3 text-yellow-500" /> Customer Reviews (
            {reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="alert shadow-lg bg-base-200 border-none">
              <span className="text-lg">
                Be the first to leave a review for this service!
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-5 bg-base-100 shadow-md rounded-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <FaUserTie className="text-secondary" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {review.userEmail}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BookingModal
        service={service}
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ServiceDetails;
