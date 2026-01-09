import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiUsers,
  FiStar,
  FiCheckCircle,
  FiTrendingUp,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      id: 1,
      icon: FiUsers,
      number: 100000,
      suffix: "+",
      label: "Happy Customers",
      description: "Satisfied customers across the country",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      icon: FiCheckCircle,
      number: 50000,
      suffix: "+",
      label: "Services Completed",
      description: "Successfully completed projects",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 3,
      icon: FiStar,
      number: 4.9,
      suffix: "/5",
      label: "Average Rating",
      description: "Based on customer reviews",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: 4,
      icon: FiTrendingUp,
      number: 15000,
      suffix: "+",
      label: "Verified Providers",
      description: "Background-checked professionals",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: 5,
      icon: FiMapPin,
      number: 500,
      suffix: "+",
      label: "Cities Covered",
      description: "Service areas nationwide",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      id: 6,
      icon: FiClock,
      number: 24,
      suffix: "/7",
      label: "Support Available",
      description: "Round-the-clock assistance",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const CountUpAnimation = ({ number, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(number * easeOutQuart));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(number);
        }
      };

      requestAnimationFrame(animate);
    }, [isInView, number, duration]);

    return (
      <span className="text-4xl md:text-5xl font-bold">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Our numbers speak for themselves. Join the growing community of
            satisfied customers who trust HomeHero for their service needs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div
                className={`${stat.bgColor} rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Number */}
                <div
                  className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  <CountUpAnimation
                    number={stat.number}
                    suffix={stat.suffix}
                    duration={2000 + stat.id * 200}
                  />
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative Element */}
                <div
                  className={`mt-6 h-1 w-16 bg-gradient-to-r ${stat.color} rounded-full mx-auto opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-700">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Growing Fast
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  +25% month-over-month growth in new customers
                </p>
              </div>

              <div className="border-l border-r border-gray-200 dark:border-slate-700 px-8">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Quality First
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  98% of customers would recommend us to friends
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Always Improving
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuous platform updates based on user feedback
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">ISO Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">24/7 Monitored</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
