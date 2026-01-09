import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheck, FiGift, FiTrendingUp, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const benefits = [
    {
      icon: FiGift,
      title: "Exclusive Discounts",
      description:
        "Get 15% off your first booking and access to member-only deals",
    },
    {
      icon: FiTrendingUp,
      title: "Service Updates",
      description: "Be the first to know about new services and features",
    },
    {
      icon: FiUsers,
      title: "Expert Tips",
      description:
        "Receive home maintenance tips and seasonal advice from professionals",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="section-padding bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome to the HomeHero Family!
              </h2>
              <p className="text-xl text-green-100 mb-8">
                You're all set! Check your inbox for a welcome email with your
                exclusive 15% discount code.
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30"
              >
                Subscribe Another Email
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiMail className="w-6 h-6" />
              <span className="font-semibold">Stay Connected</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Exclusive Deals & Home Care Tips
            </h2>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join over 50,000 homeowners who receive our weekly newsletter
              packed with exclusive discounts, seasonal maintenance tips, and
              early access to new services.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/30">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-green-100 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Start Saving Today
                </h3>
                <p className="text-green-100">
                  Get 15% off your first service + weekly tips
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 font-medium placeholder-gray-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FiGift className="w-5 h-5" />
                      Get My 15% Discount
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-green-100">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe
                  at any time.
                </p>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-4 text-green-100">
                  <div className="flex items-center gap-2">
                    <FiUsers className="w-4 h-4" />
                    <span className="text-sm">50K+ subscribers</span>
                  </div>
                  <div className="w-1 h-1 bg-green-100 rounded-full" />
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4" />
                    <span className="text-sm">Weekly tips</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
