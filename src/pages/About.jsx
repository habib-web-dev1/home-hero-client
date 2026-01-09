import React from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTarget,
  FiHeart,
  FiAward,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

const About = () => {
  const stats = [
    { number: "100K+", label: "Happy Customers", icon: FiUsers },
    { number: "15K+", label: "Verified Providers", icon: FiShield },
    { number: "500+", label: "Cities Served", icon: FiTarget },
    { number: "4.9★", label: "Average Rating", icon: FiAward },
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Customer First",
      description:
        "Every decision we make is centered around delivering exceptional customer experiences and building lasting relationships.",
    },
    {
      icon: FiShield,
      title: "Trust & Safety",
      description:
        "We maintain the highest standards of safety through rigorous background checks and continuous quality monitoring.",
    },
    {
      icon: FiTrendingUp,
      title: "Innovation",
      description:
        "We continuously evolve our platform with cutting-edge technology to make home services more accessible and efficient.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "Former VP at a leading tech company, Sarah founded HomeHero to solve the trust gap in home services.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech veteran with 15+ years building scalable platforms. Passionate about connecting people through technology.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert focused on ensuring quality service delivery and provider success across all markets.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting Communities Through Trust
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              We're on a mission to make finding reliable home services as easy
              as ordering your morning coffee. Every connection we facilitate is
              built on trust, quality, and genuine care for our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gray-50 dark:bg-slate-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-6 text-body">
                <p>
                  HomeHero was born from a simple frustration: finding
                  trustworthy home service providers shouldn't be a gamble. Our
                  founder, Sarah Johnson, experienced this firsthand when a
                  "highly recommended" contractor left her kitchen renovation
                  half-finished.
                </p>
                <p>
                  That experience sparked an idea: What if there was a platform
                  that truly vetted service providers, where transparency wasn't
                  just a buzzword, and where both customers and providers could
                  thrive in a trusted ecosystem?
                </p>
                <p>
                  Today, HomeHero connects over 100,000 customers with 15,000+
                  verified professionals across 500+ cities. We've facilitated
                  millions of successful service connections, but our mission
                  remains the same: building trust, one service at a time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="HomeHero team"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-600 rounded-3xl opacity-20" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Our Values</h2>
            <p className="text-xl text-body max-w-3xl mx-auto">
              These core values guide every decision we make and every feature
              we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-body leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-slate-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 mb-4">Meet Our Team</h2>
            <p className="text-xl text-body max-w-3xl mx-auto">
              The passionate people behind HomeHero who work tirelessly to
              connect communities through trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-green-500 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-body leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Whether you're looking for trusted services or want to grow your
              business as a provider, HomeHero is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                Find Services
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30">
                Become a Provider
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
