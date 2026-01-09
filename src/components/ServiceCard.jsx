import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiUser,
  FiStar,
  FiMapPin,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";

const ServiceCard = ({ service, viewMode = "grid" }) => {
  const {
    _id,
    serviceName,
    image,
    category,
    description,
    price,
    provider,
    averageRating,
    reviewCount,
    serviceArea,
  } = service;

  const truncateDescription = (
    text,
    maxLength = viewMode === "list" ? 150 : 100
  ) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getDisplayPrice = (priceValue) => {
    if (priceValue && priceValue.$numberInt) {
      const numericPrice = parseFloat(priceValue.$numberInt);
      return isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2);
    }
    const numericPrice = parseFloat(priceValue || 0);
    return isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 group"
      >
        <div className="grid md:grid-cols-3 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img
              src={
                image ||
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
              }
              alt={serviceName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg">
                ${getDisplayPrice(price)}
              </span>
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-200">
              <FiHeart className="w-5 h-5 text-white" />
            </button>

            {/* Category */}
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                {serviceName}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {truncateDescription(description)}
              </p>

              {/* Provider Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    provider?.photoURL ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  }
                  alt={provider?.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-slate-600"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {provider?.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Service Provider
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {averageRating?.toFixed(1) || "5.0"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({reviewCount || 0})
                  </span>
                </div>

                {serviceArea && (
                  <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {serviceArea}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <Link
              to={`/services/${_id}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group w-fit"
            >
              View Details
              <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 group h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
          }
          alt={serviceName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg">
            ${getDisplayPrice(price)}
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-200">
          <FiHeart className="w-5 h-5 text-white" />
        </button>

        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
          {serviceName}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {truncateDescription(description)}
        </p>

        {/* Provider Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              provider?.photoURL ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            }
            alt={provider?.name}
            className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-slate-600"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
              {provider?.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Service Provider
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {averageRating?.toFixed(1) || "5.0"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount || 0})
            </span>
          </div>

          {serviceArea && (
            <div className="flex items-center gap-1">
              <FiMapPin className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {serviceArea}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/services/${_id}`}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group mt-auto"
        >
          View Details
          <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
