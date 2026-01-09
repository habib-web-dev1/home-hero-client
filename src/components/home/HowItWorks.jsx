import React from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiUserCheck,
  FiCalendar,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: FiSearch,
      title: "Search & Browse",
      description:
        "Find the perfect service provider by browsing categories or searching for specific services in your area.",
      details: [
        "Browse 50+ service categories",
        "Filter by location, price, and ratings",
        "Read reviews and compare providers",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      icon: FiUserCheck,
      title: "Choose Provider",
      description:
        "Select from verified, background-checked professionals with transparent pricing and genuine reviews.",
      details: [
        "All providers are background verified",
        "View detailed profiles and portfolios",
        "Check availability and instant quotes",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      icon: FiCalendar,
      title: "Book & Schedule",
      description:
        "Book your service instantly with flexible scheduling options that fit your busy lifestyle.",
      details: [
        "Instant booking confirmation",
        "Flexible scheduling options",
        "Secure payment processing",
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      icon: FiCheckCircle,
      title: "Get It Done",
      description:
        "Relax while our professional completes your service with quality guarantee and 24/7 support.",
      details: [
        "Quality work guaranteed",
        "Real-time service updates",
        "24/7 customer support",
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
          <h2 className="heading-2 mb-4">How It Works</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Getting the help you need is simple. Follow these four easy steps to
            connect with trusted professionals and get your tasks done.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-24"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-gray-300 dark:text-slate-600">
                      {step.id.toString().padStart(2, "0")}
                    </span>
                    <div className="w-12 h-0.5 bg-gray-300 dark:bg-slate-600" />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="heading-3 mb-4">{step.title}</h3>
                  <p className="text-lg text-body leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Details List */}
                <div className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <FiCheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block">
                    <div
                      className={`flex items-center gap-2 text-gray-400 dark:text-slate-500 mt-8 ${
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="text-sm font-medium">Next Step</span>
                      <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="flex-1 max-w-lg">
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-2xl ${step.bgColor} p-8`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />

                  {/* Decorative Elements */}
                  <div
                    className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${step.color} rounded-full opacity-20`}
                  />
                  <div
                    className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-full opacity-30`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of satisfied customers who trust HomeHero for their
              service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                Find Services Now
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30">
                Become a Provider
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
