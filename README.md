# Astrologer CRM

Full-stack CRM for an astrology consultation business.

## Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Charts: Recharts
- PDF Invoice: PDFKit

## Run Locally

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Create `backend/.env` from `backend/.env.example`.
3. Install dependencies:

```bash
npm run install:all
```

4. Seed sample data:

```bash
npm run seed --prefix backend
```

5. Start both apps:

```bash
npm run dev
```

If PowerShell blocks `npm`, use `npm.cmd` instead:

```bash
npm.cmd run install:all
npm.cmd run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Demo Login

Admin:

- Email: `admin@astrocrm.com`
- Password: `Admin@123`

Astrologer:

- Email: `rahul@astrocrm.com`
- Password: `Astro@123`

## Main Features

- JWT login
- Role-based access for Admin and Astrologer
- Admin and Astrologer dashboards
- Lead management
- Customer management
- Appointment management
- Availability management
- Consultation notes
- Payments
- Reports with charts
- PDF invoice generation
- Sample seed data
