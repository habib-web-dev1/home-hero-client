import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How do I book a service on HomeHero?",
      answer:
        "Booking is simple! Search for the service you need, browse verified providers, read reviews, and book instantly. You can schedule services for the same day or plan ahead. Payment is secure and processed through our platform.",
    },
    {
      id: 2,
      question: "Are all service providers background checked?",
      answer:
        "Yes, absolutely! Every service provider on HomeHero undergoes a comprehensive background check, license verification, and skill assessment. We also verify insurance coverage to ensure you're protected.",
    },
    {
      id: 3,
      question: "What if I'm not satisfied with the service?",
      answer:
        "We stand behind every service with our satisfaction guarantee. If you're not happy with the work, contact our support team within 24 hours. We'll work with the provider to make it right or provide a full refund.",
    },
    {
      id: 4,
      question: "How does pricing work?",
      answer:
        "Our pricing is transparent with no hidden fees. Providers set their rates, which you can see upfront. The price includes the service and any applicable taxes. You'll know the exact cost before booking.",
    },
    {
      id: 5,
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule up to 2 hours before your appointment time without any fees. For cancellations within 2 hours, a small cancellation fee may apply to compensate the service provider.",
    },
    {
      id: 6,
      question: "Is my payment information secure?",
      answer:
        "Absolutely! We use bank-level encryption and secure payment processing. Your payment information is never stored on our servers and all transactions are protected by industry-standard security measures.",
    },
    {
      id: 7,
      question: "What areas do you serve?",
      answer:
        "HomeHero operates in over 500 cities across the United States. We're constantly expanding to new areas. Enter your zip code on our platform to see available services in your location.",
    },
    {
      id: 8,
      question: "How do I become a service provider?",
      answer:
        "To join our network, apply through our 'Become a Provider' page. You'll need to pass our background check, provide proof of licensing/insurance, and complete our onboarding process. We're always looking for skilled professionals!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiHelpCircle className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-semibold">Got Questions?</span>
          </div>
          <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Find answers to common questions about HomeHero. Can't find what
            you're looking for? Our support team is here to help 24/7.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <FiMinus className="w-6 h-6 text-green-600" />
                    ) : (
                      <FiPlus className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Our friendly support team is available 24/7 to help you with any
              questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg">
                Contact Support
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30">
                Live Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
