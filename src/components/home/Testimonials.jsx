import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
} from "react-icons/fi";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Homeowner",
      location: "Austin, TX",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "HomeHero made finding a reliable cleaning service so easy! Sarah arrived on time, was professional, and did an amazing job. My house has never looked better. I'll definitely be booking again!",
      service: "House Cleaning",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "Business Owner",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "When our office plumbing failed, HomeHero connected us with Mike within hours. He fixed the issue quickly and professionally. The transparent pricing was a huge plus - no surprises!",
      service: "Emergency Plumbing",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Lisa Thompson",
      role: "Property Manager",
      location: "Miami, FL",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I manage multiple properties and HomeHero has become my go-to platform. The quality of service providers is consistently excellent, and the booking process is seamless.",
      service: "Property Maintenance",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Park",
      role: "Homeowner",
      location: "Seattle, WA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The electrician Emily was knowledgeable and efficient. She explained everything clearly and completed the work safely. HomeHero's verification process gives me confidence in their professionals.",
      service: "Electrical Installation",
      date: "1 week ago",
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      role: "Homeowner",
      location: "Phoenix, AZ",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service! The handyman James was punctual, skilled, and cleaned up after himself. The online booking and payment made everything so convenient. Highly recommended!",
      service: "Home Repairs",
      date: "4 days ago",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real customers have to
            say about their HomeHero experience.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-slate-700 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 left-8">
                <FiMessageCircle className="w-12 h-12 text-green-500/20" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-green-500 shadow-lg"
                />
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                    {currentTestimonial.service} • {currentTestimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-green-600 w-8"
                      : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <FiChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
            <div className="text-gray-600 dark:text-gray-400">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
            <div className="text-gray-600 dark:text-gray-400">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-400">
              Satisfaction Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
            <div className="text-gray-600 dark:text-gray-400">
              Happy Customers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
