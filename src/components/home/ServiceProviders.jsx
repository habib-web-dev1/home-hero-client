import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiCheckCircle, FiAward } from "react-icons/fi";

const ServiceProviders = () => {
  const topProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "House Cleaning Expert",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 324,
      completedJobs: 1250,
      location: "New York, NY",
      verified: true,
      topRated: true,
      yearsExperience: 8,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      specialty: "Licensed Plumber",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 287,
      completedJobs: 890,
      location: "Los Angeles, CA",
      verified: true,
      topRated: true,
      yearsExperience: 12,
    },
    {
      id: 3,
      name: "Emily Chen",
      specialty: "Certified Electrician",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 198,
      completedJobs: 567,
      location: "Chicago, IL",
      verified: true,
      topRated: false,
      yearsExperience: 6,
    },
    {
      id: 4,
      name: "David Thompson",
      specialty: "Handyman Services",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviews: 412,
      completedJobs: 1580,
      location: "Houston, TX",
      verified: true,
      topRated: true,
      yearsExperience: 15,
    },
    {
      id: 5,
      name: "Lisa Park",
      specialty: "Interior Painter",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 156,
      completedJobs: 423,
      location: "Miami, FL",
      verified: true,
      topRated: false,
      yearsExperience: 9,
    },
    {
      id: 6,
      name: "James Wilson",
      specialty: "HVAC Technician",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 203,
      completedJobs: 678,
      location: "Phoenix, AZ",
      verified: true,
      topRated: true,
      yearsExperience: 11,
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
          <h2 className="heading-2 mb-4">Meet Our Top-Rated Professionals</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Our platform features skilled, verified professionals who
            consistently deliver exceptional service. Each provider is
            background-checked and highly rated by customers.
          </p>
        </motion.div>

        {/* Providers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {topProviders.map((provider) => (
            <motion.div
              key={provider.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
                {/* Top Rated Badge */}
                {provider.topRated && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FiAward className="w-3 h-3" />
                      Top Rated
                    </div>
                  </div>
                )}

                {/* Profile Image */}
                <div className="relative mb-6">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-gray-200 dark:border-slate-600 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
                    }}
                  />
                  {provider.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white p-1 rounded-full">
                        <FiCheckCircle className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Provider Info */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {provider.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                  {provider.specialty}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {provider.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {provider.reviews} reviews
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {provider.completedJobs.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Jobs completed
                    </p>
                  </div>
                </div>

                {/* Location & Experience */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4" />
                    <span className="text-sm">{provider.location}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {provider.yearsExperience} years experience
                  </p>
                </div>

                {/* Action Button */}
                <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                  View Profile
                </button>

                {/* Background Decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-green-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-linear-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-12 border border-gray-200 dark:border-slate-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Join Our Network?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Are you a skilled professional looking to grow your business? Join
              thousands of service providers who trust HomeHero to connect them
              with customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                Become a Provider
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProviders;
