Startup Benefits & Partnerships Platform

A full-stack web platform built for startup founders, small teams, and indie builders to discover and claim exclusive SaaS discounts and partner perks. The project emphasizes clean architecture, strong authentication, and a polished user experience with smooth animations and modern UI practices.

Overall Application Flow

The system follows a clear separation between frontend and backend, communicating through REST APIs.

User Journey

Visitors first arrive on a visually engaging landing page created with Next.js, enhanced with animations and optional 3D elements.

To unlock restricted deals or claim benefits, users must sign up and log in.

Deal information is retrieved dynamically from the backend database and rendered on the frontend.

When a deal is claimed, the server performs validation checks, stores the claim in the database, and the dashboard instantly reflects the updated claim status.

Authentication & Authorization Approach

JWT Authentication: Secure login is handled using JSON Web Tokens.

Stateless Requests: Every protected API request includes a token in the request header, which the server verifies.

Password Protection: User passwords are hashed using Bcrypt with salting to enhance security.

User Verification Layer: A boolean flag (isVerified) is used to distinguish verified founders from regular users and control access to restricted deals.

Deal Claim Logic (Backend Flow)

Initial Validation: The server confirms the deal exists and checks whether the user has already claimed it.

Eligibility Check: If the deal is restricted, the system verifies the user’s verification status.

Access Denied: Unverified users attempting to claim locked deals receive a 403 Forbidden response.

Database Entry: Successful claims are saved in the claims collection, linking both the user ID and deal ID through references.

Frontend–Backend Communication

RESTful APIs: Data exchange happens through JSON-based REST endpoints.

CORS Handling: The backend only accepts requests from the authorized frontend origin.

Session Persistence: JWT tokens and minimal user info are stored locally to maintain login sessions across refreshes.

Current Limitations

Verification Process: The verification feature is currently automated; in a real production system, this would involve manual document review or admin approval.

No Admin Panel: Users can view claim statuses, but there is no dedicated admin dashboard to manage or approve claims.

Production-Level Improvements

Rate Limiting: Introducing request throttling on authentication routes to reduce brute-force attempts.

Stronger Validation: Using libraries such as Joi or Zod to enforce strict input validation rules.

Secure Token Storage: Migrating from local storage to HttpOnly cookies to reduce XSS exposure.

UI & Performance Highlights

Motion & Interaction: Smooth transitions, staggered animations, and micro-interactions are implemented using animation libraries.

3D Enhancements: A lightweight 3D visual in the hero section adds depth and a premium SaaS feel.

Skeleton Loaders: Placeholder screens are shown while fetching data to prevent layout shifts.

Fluid Navigation: Fixed header and footer layouts ensure that only the main content scrolls, creating a cleaner browsing experience.

Technology Stack

Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Framer Motion

Icon Libraries

Backend

Node.js

Express.js

JWT Authentication

Bcrypt Encryption

Database

MongoDB with Mongoose ODM

Installation & Setup
Clone Repository
git clone <repository-url>

Backend Setup
cd backend
npm install


Create a .env file with:

PORT

MONGO_URI

JWT_SECRET

Seed initial deals:

node seed.js


Run server:

npm run dev

Frontend Setup
cd frontend
npm install
npm run dev
