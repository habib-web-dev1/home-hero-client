import React from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { motion } from "framer-motion";
const ChoosingUs = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-700 mb-2">
            Why Choose Our Service Platform?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect you with certified professionals quickly and safely,
            ensuring quality service every time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-t-green-500 text-center">
            <MdOutlineSecurity className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Certified & Trusted</h3>
            <p className="text-gray-600">
              All providers are background-checked and professionally certified
              for your peace of mind.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-t-green-500 text-center">
            <FaRegCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Guaranteed Quality</h3>
            <p className="text-gray-600">
              We stand by the quality of work. If you're not satisfied, we'll
              make it right.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-t-green-500 text-center">
            <IoIosPeople className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is available around the clock to assist
              with bookings or issues.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ChoosingUs;
