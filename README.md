HomeHero – Local Household Service Finder:
HomeHero is a full-stack MERN application designed to seamlessly connect users with trusted, local service providers (plumbers, electricians, cleaners, etc.). It features robust authentication, CRUD operations for service management, a complete booking system, and advanced features like dynamic service filtering and a comprehensive rating/review system.
Key Features:
This project meets all core requirements and includes advanced features to provide a professional, modern user experience.

🛡️ Secure Authentication & Private Routes: Implemented Firebase authentication (Email/Password & Google Login), with private routes (My Services, Add Service, My Bookings, Profile) accessible only after login and persistent on reload.

🧑‍🔧 Provider CRUD Operations: Service providers can Add, View (their own services only), Update, and Delete their service listings via dedicated private pages.

🛒 Comprehensive Booking System: Customers can browse all services, view details, and book via a modal, with booking data stored in a separate MongoDB collection. Users are restricted from booking their own services.

⭐ Advanced Rating & Review System: Users can submit ratings/reviews for booked services, which are stored within the main service document and used to power the Top Six-Rated Services section on the homepage.

🎨 Dynamic Homepage Display: Features an animated Hero slider, a Top Six-Rated Services section, and a separate Latest Services section for a dynamic, feature-rich homepage.

📱 Fully Responsive Design: The entire application uses a modern grid layout and is optimized for seamless viewing across mobile, tablet, and desktop devices.

🌙 Theme Toggling: Includes a Theme Toggling Button to switch the entire application between Light and Dark modes for enhanced user comfort.
Technology Stack
Category Technologies Used:
Frontend: React, React Router DOM, Framer Motion, Tailwind CSS, React Icons, Backend: Node.js, Express.js, MongoDB , Firebase Admin SDK , CORS Database MongoDB Atlas Deployment Client: Netlify / Server: Vercel
