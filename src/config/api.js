// API Configuration
const API_CONFIG = {
  development: {
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  },
  production: {
    baseURL: "https://home-hero-server-kappa.vercel.app",
  },
};

const environment = import.meta.env.MODE || "development";
const config = API_CONFIG[environment];

export const API_BASE_URL = config.baseURL;

// API Endpoints
export const API_ENDPOINTS = {
  // Services
  services: `${API_BASE_URL}/services`,
  latestServices: `${API_BASE_URL}/latest-services`,
  serviceById: (id) => `${API_BASE_URL}/services/${id}`,
  servicesByUser: (email) => `${API_BASE_URL}/services/user/${email}`,

  // Bookings
  bookings: `${API_BASE_URL}/bookings`,

  // Users
  users: `${API_BASE_URL}/users`,
  userRole: (email) => `${API_BASE_URL}/users/role/${email}`,
  allUsers: `${API_BASE_URL}/all-users`,

  // Stats
  providerStats: (email) => `${API_BASE_URL}/provider-stats/${email}`,
  adminStats: `${API_BASE_URL}/admin-stats`,
  userStats: (email) => `${API_BASE_URL}/user-stats/${email}`,

  // Reviews
  addReview: (serviceId) => `${API_BASE_URL}/services/${serviceId}/review`,
};

export default API_ENDPOINTS;
