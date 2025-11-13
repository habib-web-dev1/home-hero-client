import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { FaDollarSign, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import axios from "axios";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filterServices, setfilterServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const location = useLocation();
  const shouldRefresh = location.state?.refresh;
  const fetchServices = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://home-hero-server-kappa.vercel.app/services"
      );
      const data = response.data.reverse();

      setfilterServices(data);
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
    if (shouldRefresh) {
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [shouldRefresh, location.pathname]);
  const handleFilter = (e) => {
    e.preventDefault();
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const filtered = filterServices
      .filter((service) => service.price >= min && service.price <= max)
      .reverse();
    setServices(filtered);
    setFilterApplied(true);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilterApplied(false);
    setServices(filterServices);
  };
  if (loading) {
    return (
      <div className="py-16 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-600">Loading services...</p>
      </div>
    );
  }
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold  mb-3 leading-tight">
          Explore All Services 🛠️
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the perfect service for your needs, from plumbing to tech
          support.
        </p>
      </div>
      <div className="mb-10 p-6  rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
          <FaDollarSign className="mr-2" /> Filter By Price Range
        </h2>
        <form onSubmit={handleFilter} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="minPrice"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="maxPrice"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g., 200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
              />
            </div>
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
              disabled={!minPrice && !maxPrice}
            >
              Apply Filter
            </button>
            {(minPrice || maxPrice || filterApplied) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
      {services.length === 0 ? (
        <div className="flex items-center justify-center  p-8 bg-white border border-gray-200 rounded-xl shadow-lg mx-auto max-w-2xl">
          <div className="text-center p-8">
            <div className="flex justify-center text-5xl">
              <FaSearch />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-6 mb-3">
              No Services Found
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Sorry! We couldn't find any services matching your current filter
              or search criteria.
            </p>

            <Link to="/home">
              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-300">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;
