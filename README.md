# Contaboo - Real Estate CRM

A full-stack real estate CRM application built with SvelteKit, Prisma, and PostgreSQL.

## Features

### Public Website
- **Home Page**: Hero slideshow, featured properties, most viewed properties
- **Sell Page**: Browse properties for sale with category and region filters
- **Rent Page**: Browse properties for rent with category and region filters
- **Property Details**: Comprehensive property information with image gallery and contact form
- **About Us**: Company information and features
- **Contact Us**: Contact form and business information
- **Responsive Design**: Mobile-friendly interface
- **Multi-language Support**: Language switcher (EN/AR)

### CRM Dashboard (Admin Area)
- **Authentication**: Secure login system with JWT
- **Dashboard**: Statistics overview and recent activities
- **Inventory Management**: Manage all properties (add, edit, delete, featured)
- **Leads Management**: Track and manage customer inquiries
- **Reports**: Analytics and insights (property views, leads status, top properties)
- **Admin Settings**: Configure site settings, hero slides, and users
- **Sidebar Navigation**: Easy access to all CRM features

## Tech Stack

- **Frontend**: SvelteKit, TypeScript
- **Backend**: SvelteKit API routes
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT + HttpOnly cookies
- **Styling**: Component-scoped CSS

## Database Schema

- **User**: Admin users with authentication
- **Property**: Real estate listings
- **Lead**: Customer inquiries
- **HeroSlide**: Homepage slideshow images
- **SiteSettings**: Configurable site settings

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use the provided Prisma Cloud connection)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Database is already configured with Prisma Cloud
4. Seed database: `npx tsx prisma/seed.ts`
5. Start dev server: `npm run dev`
6. Open: `http://localhost:5173`

## Default Login Credentials

- **Username**: xinreal
- **Password**: zerocall

## Contact Information

Primary Contact: **01002778090**

## License

Copyright © 2026 Contaboo. All rights reserved.

