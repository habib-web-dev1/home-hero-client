import React from "react";
import { Link } from "react-router";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { name: "House Cleaning", href: "/services?category=house-cleaning" },
      { name: "Plumbing", href: "/services?category=plumbing" },
      { name: "Electrical Work", href: "/services?category=electrical" },
      { name: "Handyman", href: "/services?category=handyman" },
      { name: "HVAC Services", href: "/services?category=hvac" },
      { name: "All Services", href: "/services" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Safety", href: "/safety" },
      { name: "Trust & Safety", href: "/trust-safety" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
    providers: [
      { name: "Become a Provider", href: "/become-provider" },
      { name: "Provider Resources", href: "/provider-resources" },
      { name: "Provider Login", href: "/provider-login" },
      { name: "Provider Support", href: "/provider-support" },
      { name: "Background Check", href: "/background-check" },
      { name: "Insurance", href: "/insurance" },
    ],
  };

  const socialLinks = [
    {
      icon: FiFacebook,
      href: "https://facebook.com/homehero",
      label: "Facebook",
    },
    { icon: FiTwitter, href: "https://twitter.com/homehero", label: "Twitter" },
    {
      icon: FiInstagram,
      href: "https://instagram.com/homehero",
      label: "Instagram",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/company/homehero",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white relative">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Home<span className="text-green-400">Hero</span>
                </h1>
                <p className="text-sm text-gray-400 -mt-1">Trusted Services</p>
              </div>
            </Link>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Connecting you with trusted local service providers for all your
              home and lifestyle needs. Quality guaranteed, satisfaction
              promised.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">1-800-HOME-HERO</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">support@homehero.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">
                  Available in 500+ cities nationwide
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Providers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-6">For Providers</h3>
            <ul className="space-y-3">
              {footerLinks.providers.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-2xl p-8 border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-gray-400">
                  Get the latest news, tips, and exclusive offers delivered to
                  your inbox.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© 2024 HomeHero. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <FiHeart className="w-4 h-4 text-red-500 fill-current" />
                <span>for homeowners</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4 text-sm">
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Privacy
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  Cookies
                </Link>
              </div>

              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Scroll to top"
              >
                <FiArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
