import axios from "axios";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { API_ENDPOINTS } from "../config/api";

const UpdateServiceModal = ({ service, onClose, onUpdateSuccess }) => {
  if (!service) return null;

  const getInitialPrice = (price) => {
    if (price && price.$numberInt) {
      return price.$numberInt.toString();
    }

    return price?.toString() || "";
  };

  const [formData, setFormData] = useState({
    name: service.name || "",
    price: getInitialPrice(service.price),
    description: service.description || "",
    category: service.category || "",
    image: service.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        price: { $numberInt: parseInt(formData.price, 10) },
      };

      const response = await axios.patch(
        API_ENDPOINTS.serviceById(service._id),
        payload
      );

      if (response.data.modifiedCount === 1) {
        Swal.fire("Updated!", "Service successfully updated.", "success");
        onUpdateSuccess();
        onClose();
      } else {
        Swal.fire("Info", "No changes detected.", "info");
        onClose();
      }
    } catch (error) {
      console.error("Error updating service:", error);
      Swal.fire("Error", "Failed to update service.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Update {service.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Service Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyServices = () => {
  const { user } = useContext(AuthContext) || {};

  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updateModal, setUpdateModal] = useState({
    visible: false,
    service: null,
  });

  const initiateUpdate = (service) => {
    setUpdateModal({ visible: true, service: service });
  };

  const closeUpdateModal = () => {
    setUpdateModal({ visible: false, service: null });
  };

  const fetchUserServices = useCallback(async () => {
    setLoading(true);
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        API_ENDPOINTS.servicesByUser(user.email)
      );

      // Handle the API response structure {success: true, data: [...]}
      const services = response.data?.data || response.data || [];
      setUserServices(Array.isArray(services) ? services : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load user services:", error);
      setUserServices([]); // Set empty array on error
      Swal.fire({
        icon: "error",
        title: "Load Failed",
        text: "Could not load your services. Check server connection and provider email.",
      });
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUserServices();
  }, [fetchUserServices]);

  const initiateDelete = (id, serviceName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the service: "${serviceName}". This action is irreversible!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmDelete(id, serviceName);
      }
    });
  };

  const handleConfirmDelete = async (serviceId, serviceName) => {
    try {
      await axios.delete(API_ENDPOINTS.serviceById(serviceId));

      setUserServices((prev) => {
        const currentServices = Array.isArray(prev) ? prev : [];
        return currentServices.filter((service) => service._id !== serviceId);
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Service "${serviceName}" successfully deleted.`,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "Deletion Failed. Check your network or server logs.",
      });
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-indigo-600 animate-pulse">
          Fetching your services for management...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {updateModal.visible && (
        <UpdateServiceModal
          service={updateModal.service}
          onClose={closeUpdateModal}
          onUpdateSuccess={fetchUserServices}
        />
      )}

      <h1 className="text-5xl font-extrabold mb-4 text-center leading-tight">
        My Services Dashboard ⚙️
      </h1>
      <p className="text-center text-lg mb-12">
        Manage the services you have listed for your customers.
      </p>

      <div className="overflow-x-auto rounded-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] bg-white border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-indigo-700 text-white text-lg font-bold">
              <th className="p-4 rounded-tl-xl">Service Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Created On</th>
              <th className="p-4 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(userServices) || userServices.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-500 text-xl font-medium"
                >
                  You currently have no services listed for management.
                </td>
              </tr>
            ) : (
              userServices.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-gray-200 hover:bg-indigo-50 transition duration-150"
                >
                  <td className="p-4 font-semibold text-gray-800">
                    {service.name}
                  </td>
                  <td className="p-4 text-green-600 font-bold">
                    $
                    {service.price?.$numberInt
                      ? parseFloat(service.price.$numberInt).toFixed(2)
                      : service.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(
                      service.createdAt?.$date?.$numberLong
                        ? service.createdAt.$date.$numberLong
                        : Date.now()
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => initiateUpdate(service)}
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => initiateDelete(service._id, service.name)}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
