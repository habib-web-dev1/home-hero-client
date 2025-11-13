import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaTools,
  FaPencilAlt,
  FaClock,
  FaTimes,
  FaSave,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { useAuth } from "../context/useAuth";

const ProfileDetail = ({ icon: Icon, label, value, highlight = false }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
    <Icon
      className={`text-xl mr-3 ${
        highlight ? "text-indigo-600" : "text-gray-500"
      }`}
      size={20}
    />
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium break-words">{value}</p>
    </div>
  </div>
);

const UpdateProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [name, setName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedData = {
      displayName: name,
      photoURL,
    };

    try {
      await onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-indigo-50 rounded-t-xl">
          <h3 className="text-xl font-bold text-indigo-800 flex items-center">
            <FaPencilAlt className="mr-2" /> Update Profile
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              <FaUser className="inline mr-1 text-indigo-500" /> Display Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              <FaImage className="inline mr-1 text-indigo-500" /> Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {photoURL && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img
                  src={photoURL}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/80x80/cccccc/333333?";
                  }}
                />
              </div>
            )}
          </div>

          <div className="text-sm text-red-600 border-t pt-4">
            * Note: Email cannot be changed here. Changing the user's email
            requires a separate re-authentication step for security.
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 flex items-center rounded-lg shadow-md transition ${
                isSaving
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
              disabled={isSaving}
            >
              <FaSave className="mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, loading, updateUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-indigo-600">
        <FaClock className="inline mr-2" /> Loading user profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-600">
        Please log in to view your profile.
      </div>
    );
  }

  const formatLoginTime = (ts) => {
    const time = ts || user.metadata?.lastSignInTime;
    return time ? new Date(time).toLocaleString() : "N/A";
  };

  const handleUpdateSuccess = (updatedData) => {
    updateUser(updatedData);
    setIsModalOpen(false);
  };

  const isProvider = user.isProvider ?? false;

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative p-6 sm:p-10 text-center">
          <div className="absolute inset-0 bg-indigo-600 opacity-80" />
          <div className="relative z-10">
            <img
              src={user.photoURL || "https://i.ibb.co.com/RwzL7gL/download.png"}
              alt={user.displayName}
              className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover mb-4 transform transition-transform hover:scale-105"
            />
            <h1 className="text-4xl font-extrabold text-white">
              {user.displayName || "User Profile"}
            </h1>
            {isProvider && (
              <span className="inline-flex items-center mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-yellow-400 text-indigo-900 shadow-md">
                <FaTools className="mr-2" /> Service Provider
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="border-b pb-6 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="space-y-3">
              <ProfileDetail
                icon={FaUserCircle}
                label="Display Name"
                value={user.displayName}
              />
              <ProfileDetail
                icon={FaEnvelope}
                label="Email Address (Read-Only)"
                value={user.email}
              />
              <ProfileDetail
                icon={FaClock}
                label="Last Login"
                value={formatLoginTime()}
              />
            </div>
          </div>

          {isProvider && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Account Status
              </h2>
              <ProfileDetail
                icon={MdVerifiedUser}
                label="Provider Status"
                value="Active Service Provider"
                highlight
              />
            </div>
          )}
        </div>

        <div className="p-6 sm:p-10 bg-gray-50 flex justify-end gap-3 border-t border-gray-200">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 flex items-center bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            <FaPencilAlt className="mr-2" /> Update Profile
          </button>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={user}
        onUpdate={handleUpdateSuccess}
      />
    </div>
  );
};

export default Profile;
