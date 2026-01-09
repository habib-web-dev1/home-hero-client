import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiHome,
  FiZap,
  FiDroplet,
  FiTool,
  FiTruck,
  FiEdit3,
  FiWind,
  FiShield,
  FiScissors,
  FiCamera,
  FiHeart,
  FiMoreHorizontal,
} from "react-icons/fi";

const ServiceCategories = () => {
  const categories = [
    {
      id: 1,
      name: "House Cleaning",
      icon: FiHome,
      description: "Professional cleaning services",
      serviceCount: "1,200+",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Electrical Work",
      icon: FiZap,
      description: "Licensed electricians",
      serviceCount: "800+",
      color: "from-yellow-500 to-orange-500",
      hoverColor: "hover:from-yellow-600 hover:to-orange-600",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Plumbing",
      icon: FiDroplet,
      description: "Expert plumbing solutions",
      serviceCount: "950+",
      color: "from-blue-600 to-cyan-600",
      hoverColor: "hover:from-blue-700 hover:to-cyan-700",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Handyman",
      icon: FiTool,
      description: "General repairs & maintenance",
      serviceCount: "1,500+",
      color: "from-green-500 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:to-emerald-700",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Moving Services",
      icon: FiTruck,
      description: "Reliable moving & packing",
      serviceCount: "600+",
      color: "from-purple-500 to-indigo-600",
      hoverColor: "hover:from-purple-600 hover:to-indigo-700",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Painting",
      icon: FiEdit3,
      description: "Interior & exterior painting",
      serviceCount: "700+",
      color: "from-pink-500 to-rose-600",
      hoverColor: "hover:from-pink-600 hover:to-rose-700",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      name: "HVAC Services",
      icon: FiWind,
      description: "Heating & cooling experts",
      serviceCount: "450+",
      color: "from-teal-500 to-cyan-600",
      hoverColor: "hover:from-teal-600 hover:to-cyan-700",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      name: "Security Systems",
      icon: FiShield,
      description: "Home security installation",
      serviceCount: "300+",
      color: "from-red-500 to-pink-600",
      hoverColor: "hover:from-red-600 hover:to-pink-700",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      name: "Landscaping",
      icon: FiScissors,
      description: "Garden & lawn care",
      serviceCount: "850+",
      color: "from-green-600 to-lime-600",
      hoverColor: "hover:from-green-700 hover:to-lime-700",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      name: "Photography",
      icon: FiCamera,
      description: "Event & portrait photography",
      serviceCount: "400+",
      color: "from-indigo-500 to-purple-600",
      hoverColor: "hover:from-indigo-600 hover:to-purple-700",
      image:
        "https://images.unsplash.com/photo-1554048612-b6a482b224d1?w=400&h=300&fit=crop",
    },
    {
      id: 11,
      name: "Pet Care",
      icon: FiHeart,
      description: "Pet sitting & grooming",
      serviceCount: "350+",
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-600 hover:to-red-600",
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    },
    {
      id: 12,
      name: "More Services",
      icon: FiMoreHorizontal,
      description: "Explore all categories",
      serviceCount: "2,000+",
      color: "from-gray-500 to-slate-600",
      hoverColor: "hover:from-gray-600 hover:to-slate-700",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="section-padding bg-white dark:bg-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Popular Service Categories</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Discover trusted professionals for all your home and lifestyle
            needs. From routine maintenance to specialized services, we've got
            you covered.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link
                to={`/services?category=${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
                  {/* Image Background */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Service Count */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                        {category.serviceCount}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse All Services
            <FiMoreHorizontal className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
