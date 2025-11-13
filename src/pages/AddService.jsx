import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import {
  FaDollarSign,
  FaEnvelope,
  FaImage,
  FaList,
  FaPlusCircle,
  FaUserTie,
} from "react-icons/fa";

const AddService = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const serviceCategories = [
    "Plumbing",
    "Cleaning",
    "Electrical",
    "Landscaping",
    "Handyman",
    "HVAC",
    "Window Cleaning",
    "Roofing & Gutters",
    "Appliance Cleaning",
  ];

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newService = {
      name: form.serviceName.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      image: form.image.value,
      provider: {
        name: form.providerName.value,
        email: form.providerEmail.value,
      },
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    if (
      !newService.name ||
      !newService.price ||
      !newService.description ||
      !newService.image
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please fill in all required service details.",
        confirmButtonColor: "#d33",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/services",
        newService
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: `${newService.name} has been successfully listed.`,
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        navigate("/services", { state: { refresh: true } });
      }
    } catch (error) {
      console.error("Error adding service:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Service",
        text:
          error.response?.data?.message ||
          "Could not connect to the server or save the data.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white flex items-center justify-center">
          <FaPlusCircle className="mr-3 text-primary" /> Add New Service
        </h1>
        <div className="bg-base-100 shadow-2xl rounded-xl p-6 md:p-10 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleAddService}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-primary">
              Service Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Service Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="serviceName"
                  placeholder="e.g., Emergency Pipe Leak Repair"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FaList className="mr-2" /> Category *
                  </span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FaDollarSign className="mr-2" /> Price ($) *
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 85"
                  className="input input-bordered w-full"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FaImage className="mr-2" /> Image URL *
                  </span>
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://i.ibb.co/service-image.jpg"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="form-control mb-8">
              <label className="label">
                <span className="label-text font-semibold">Description *</span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a detailed description of the service offered..."
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-secondary">
              Provider Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FaUserTie className="mr-2" /> Provider Name
                  </span>
                </label>
                <input
                  type="text"
                  name="providerName"
                  defaultValue={user?.displayName || "N/A"}
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <FaEnvelope className="mr-2" /> Provider Email
                  </span>
                </label>
                <input
                  type="email"
                  name="providerEmail"
                  defaultValue={user?.email || "N/A"}
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full text-lg font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding Service...
                  </>
                ) : (
                  <>
                    <FaPlusCircle /> List Service
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
