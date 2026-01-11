import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../config/api";
import ServiceCard from "../components/ServiceCard";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiMapPin,
  FiDollarSign,
  FiStar,
  FiX,
} from "react-icons/fi";

const AllServices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    location: searchParams.get("location") || "",
    sortBy: "latest",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch services with React Query
  const {
    data: servicesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.services);
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      return data;
    },
  });

  // Extract services array from API response
  const allServices = servicesResponse?.data || [];

  // Filter and sort services
  const filteredServices = React.useMemo(() => {
    if (!Array.isArray(allServices)) return [];

    let filtered = [...allServices];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (service) =>
          service.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          service.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          service.category?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((service) =>
        service.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(
        (service) => service.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (service) => service.price <= parseFloat(filters.maxPrice)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (service) =>
          service.serviceArea
            ?.toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          service.provider?.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())
      );
    }

    // Sort services
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        break;
      case "popular":
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default: // latest
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }

    return filtered;
  }, [allServices, filters]);

  const categories = [
    "House Cleaning",
    "Plumbing",
    "Electrical Work",
    "Handyman",
    "HVAC Services",
    "Painting",
    "Moving Services",
    "Landscaping",
    "Security Systems",
    "Photography",
    "Pet Care",
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      sortBy: "latest",
    });
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== "latest"
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiX className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't fetch the services. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore All Services
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Discover trusted professionals for all your home and lifestyle
              needs. Quality guaranteed, satisfaction promised.
            </p>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services, categories, or providers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 font-medium"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Filter Toggle & View Mode */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                showFilters
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600"
              }`}
            >
              <FiFilter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-gray-300 dark:border-slate-600">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Count & Sort */}
          <div className="flex items-center gap-4 lg:ml-auto">
            <span className="text-gray-600 dark:text-gray-400">
              {filteredServices.length} services found
            </span>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="latest">Latest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter city or area"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-600">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <FiX className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Services Grid/List */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700"
              >
                <div className="h-48 bg-gray-200 dark:bg-slate-700 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-4 w-3/4" />
                  <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Services Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard service={service} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
