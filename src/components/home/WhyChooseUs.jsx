import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiStar,
  FiHeadphones,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: FiShield,
      title: "Verified Professionals",
      description:
        "All service providers undergo thorough background checks, licensing verification, and skill assessments before joining our platform.",
      benefits: [
        "Background checked & verified",
        "Licensed and insured professionals",
        "Skill and experience validation",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      icon: FiDollarSign,
      title: "Transparent Pricing",
      description:
        "No hidden fees or surprise charges. Get upfront pricing with detailed breakdowns so you know exactly what you're paying for.",
      benefits: [
        "Upfront, honest pricing",
        "No hidden fees or charges",
        "Detailed cost breakdowns",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 3,
      title: "Quality Guarantee",
      icon: FiStar,
      description:
        "We stand behind every service with our satisfaction guarantee. If you're not happy, we'll make it right or refund your money.",
      benefits: [
        "100% satisfaction guarantee",
        "Quality work assurance",
        "Money-back promise",
      ],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: 4,
      icon: FiClock,
      title: "Flexible Scheduling",
      description:
        "Book services at your convenience with flexible scheduling options, including same-day and emergency services when available.",
      benefits: [
        "Same-day booking available",
        "Flexible time slots",
        "Emergency service options",
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: 5,
      icon: FiHeadphones,
      title: "24/7 Support",
      description:
        "Our dedicated customer support team is available around the clock to help with bookings, questions, or any issues that arise.",
      benefits: [
        "Round-the-clock assistance",
        "Multiple support channels",
        "Quick response times",
      ],
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      id: 6,
      icon: FiUsers,
      title: "Trusted Community",
      description:
        "Join a community of over 100,000 satisfied customers who trust HomeHero for their service needs across the country.",
      benefits: [
        "100,000+ happy customers",
        "Verified reviews and ratings",
        "Growing trusted network",
      ],
      color: "from-pink-500 to-red-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
          <h2 className="heading-2 mb-4">Why Choose HomeHero?</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            We're not just another service platform. We're your trusted partner
            in connecting you with the best professionals who deliver
            exceptional results every time.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <FiCheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative Element */}
                <div
                  className={`mt-6 h-1 w-full bg-gradient-to-r ${feature.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have discovered the
                HomeHero advantage. Your perfect service provider is just a
                click away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started Today
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold mb-1">100K+</div>
                  <div className="text-sm text-green-100">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">4.9★</div>
                  <div className="text-sm text-green-100">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-green-100">Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
