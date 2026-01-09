import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiTrendingUp, FiArrowRight, FiStar } from "react-icons/fi";

const PopularServices = () => {
  const popularServices = [
    {
      id: 1,
      name: "House Cleaning",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      startingPrice: 89,
      rating: 4.9,
      bookings: "2,500+ this month",
      trending: true,
      description: "Professional deep cleaning and regular maintenance",
    },
    {
      id: 2,
      name: "Plumbing Repair",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      startingPrice: 125,
      rating: 4.8,
      bookings: "1,800+ this month",
      trending: true,
      description: "Emergency repairs and routine maintenance",
    },
    {
      id: 3,
      name: "Electrical Work",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      startingPrice: 150,
      rating: 4.9,
      bookings: "1,200+ this month",
      trending: false,
      description: "Licensed electricians for all your electrical needs",
    },
    {
      id: 4,
      name: "Handyman Services",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      startingPrice: 75,
      rating: 4.7,
      bookings: "3,100+ this month",
      trending: true,
      description: "General repairs and home maintenance",
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-slate-800/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiTrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-semibold">Trending Now</span>
          </div>
          <h2 className="heading-2 mb-4">Most Popular Services</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Discover the services that our customers book most frequently. These
            top-rated professionals are ready to help you today.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Trending Badge */}
                  {service.trending && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <FiTrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30">
                      From ${service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {service.bookings}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/services?category=${service.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
                  >
                    Book Now
                    <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
