import React, { use } from "react";
import ServiceCard from "./ServiceCard";
const servicePromise = fetch("http://localhost:5000/latest-services").then(
  (res) => res.json()
);
const LatestService = () => {
  const services = use(servicePromise);
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2">
          Handpicked Just For You
        </p>
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
          🔥 Our Latest & Most Popular Services
        </h2>
        <div className="h-1 w-24 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Explore the newest offerings and services trending with our community
          of users.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-10 text-xl text-gray-500">
          No latest services available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id.$oid} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestService;
