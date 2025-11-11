import React from "react";
import { FaDollarSign, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { _id, name, image, category, description, price, provider } = service;
  const truncateDescription = (text) => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };
  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl flex flex-col">
      <figure className="h-52 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body p-6 flex flex-col justify-between grow">
        <div>
          <div className="flex flex-col gap-2 items-start mb-2">
            <h2 className="card-title text-xl font-bold text-primary-focus dark:text-primary">
              {name}
            </h2>
            <div className="badge badge-lg badge-accent text-white font-semibold">
              {category}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm min-h-[40px]">
            {truncateDescription(description)}
          </p>

          <div className="flex items-center space-x-4 text-sm mb-2 border-t pt-3 mt-3">
            <div className="flex items-center text-secondary font-semibold">
              <FaDollarSign className="mr-1" /> Price: ${price}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-300">
              <FaUserCircle className="mr-1" /> Provider: {provider.name}
            </div>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link
            to={`/service/${_id}`}
            className="btn btn-primary w-full mt-2 transition-transform hover:scale-[1.02]"
          >
            <FaInfoCircle /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
