import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiClock,
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

const TrustBadges = () => {
  const badges = [
    {
      icon: FiShield,
      title: "Verified Professionals",
      description: "Background checked & insured",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: FiClock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: FiUsers,
      title: "100K+ Customers",
      description: "Trusted by thousands",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: FiAward,
      title: "Quality Guaranteed",
      description: "100% satisfaction promise",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: FiCheckCircle,
      title: "Easy Booking",
      description: "Book in just 3 clicks",
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      icon: FiStar,
      title: "Top Rated",
      description: "4.9/5 average rating",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-800/50">
      <div className="container-custom px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div
                className={`${badge.bgColor} rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-100 dark:border-slate-700`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 ${badge.color} mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <badge.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base mb-1 md:mb-2">
                  {badge.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiShield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiCheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiAward className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FiUsers className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Trusted Community</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
