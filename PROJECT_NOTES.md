# Project Notes: Astrologer CRM

## Tech Stack
- **Frontend**: React (v18), React Router Dom (v7), Vite, Tailwind CSS, Recharts (for analytics), Lucide Icons.
- **Backend**: Node.js, Express.js, JWT (JsonWebTokens) for secure session management, PDFKit (for generating PDF invoices).
- **Database**: MongoDB (Mongoose ORM) with local fallback support.

## Architecture
The application follows a standard decoupled Client-Server architecture:
1. **Frontend Client**: SPA (Single Page Application) managed by Vite. It uses a centralized React Context (`AuthContext`) for authentication state management. Pages are dynamically loaded, with role-based routing controls (`ProtectedRoute`) for Admin and Astrologer access limits.
2. **Backend API**: A RESTful Express server structured cleanly with:
   - **Models**: Defines strict Mongoose schemas (Users, Astrologers, Leads, Customers, Appointments, Availability, Consultations, Payments, Notifications, and AuditLogs).
   - **Controllers**: Handles core business logic, including slot overlap validations, dynamic status sync, and PDF streaming.
   - **Middlewares**: Custom token check (`requireAuth`), role check (`requireRole`), and global central handlers for 404 and Express errors.
   - **Routes**: Modular routing mount points under `/api/`.

## Key Assumptions & Data Integrity Checks
- **Availability & Slot Overlaps**: Appointments are verified against the astrologer's active schedule days and configured breaks. Overlapping slot bookings are blocked at the database check level (using index compound lookups).
- **Payment & Appointment Sync**: Changing a payment status to "paid" automatically syncs the linked appointment's payment status, generating a timestamped invoice number for the client.
- **Fallbacks**: The database connector (`db.js`) tries connecting to the primary `MONGO_URI` first (useful for production/Atlas), with a silent auto-fallback to `mongodb://127.0.0.1:27017/astrologer_crm` for easier local review.

## Future Improvements
1. **Real-time Notifications**: Integrate WebSockets/Socket.io for instant desktop notifications when appointments are confirmed or updated.
2. **Video Consultation Integration**: Replace placeholder links with an API integration like Zoom or Jitsi Meet for automated video link generation.
3. **Automated Reminders**: Introduce Cron jobs (using Node-Cron or Agenda) to dispatch automatic Email/SMS alerts 15 minutes before an appointment.
4. **Localization**: Multi-language support on the frontend for regional clientele.
