import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/api";
import {
  FiStar,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";

const FeaturedServices = () => {
  const [activeTab, setActiveTab] = useState("latest");

  // Fetch services data
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["latest-services"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.latestServices);
      if (!response.ok) throw new Error("Failed to fetch services");
      return response.json();
    },
  });

  const tabs = [
    { id: "latest", label: "Latest Services", icon: FiClock },
    { id: "popular", label: "Most Popular", icon: FiHeart },
    { id: "rated", label: "Top Rated", icon: FiStar },
  ];

  const getFilteredServices = () => {
    if (!services.length) return [];

    switch (activeTab) {
      case "popular":
        return [...services]
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(0, 6);
      case "rated":
        return [...services]
          .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
          .slice(0, 6);
      default:
        return services.slice(0, 6);
    }
  };

  const ServiceCard = ({ service }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 card-hover">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              service.image ||
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
            }
            alt={service.serviceName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg">
              ${service.price}
            </span>
          </div>

          {/* Favorite Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-200">
            <FiHeart className="w-5 h-5 text-white" />
          </button>

          {/* Category */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Service Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
            {service.serviceName}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Provider Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                service.provider?.photoURL ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              }
              alt={service.provider?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-slate-600"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">
                {service.provider?.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Service Provider
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {service.averageRating?.toFixed(1) || "5.0"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({service.reviewCount || 0})
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {service.serviceArea || "Local"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={`/services/${service._id}`}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            View Details
            <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700">
      <div className="h-48 bg-gray-200 dark:bg-slate-700 animate-pulse" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-4 w-3/4" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-1 w-20" />
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-16" />
          </div>
        </div>
        <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
      </div>
    </div>
  );

  return (
    <section className="section-padding bg-gray-50 dark:bg-slate-800/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">Featured Services</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Discover our most popular and highly-rated services from trusted
            professionals in your area.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : getFilteredServices().map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            View All Services
            <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
