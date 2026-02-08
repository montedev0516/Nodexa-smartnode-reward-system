# Nodexa Smartnode Reward System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.5.0-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
</div>

<p align="center">
  <strong>Neoxa smartnode hosting + reward tracking platform with secure auth, notifications, and market data.</strong>
</p>

## Table of Contents

1. [About](#about)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Screenshots](#screenshots)
8. [API Documentation](#api-documentation)
9. [Contact](#contact)

## About

Nodexa Smartnode Reward System was built to make smartnode hosting and reward visibility simple for the Neoxa ecosystem. It centralizes user onboarding, authentication (including 2FA), notifications, and market data so operators and users can track activity and performance in one place.

## Features

- **Smartnode management**: private + shared smartnode hosting plans
- **Rewards & analytics**: dashboards for tracking performance over time
- **Market data**: Neoxa price data + history stored in PostgreSQL
- **Notifications**: global notifications based on recent registrations and price events
- **Security**: email verification, password reset, reCAPTCHA protection, JWT cookie auth + NextAuth session checks
- **2FA**: TOTP-based 2FA endpoints (enable/verify/disable) with QR support
- **Contact form**: server-side email delivery via SMTP

## Tech Stack

- **Languages**: TypeScript
- **Frameworks**: Next.js (App Router), React, NextAuth.js
- **Database / ORM**: PostgreSQL, Prisma
- **UI**: Tailwind CSS, Chart.js, Recharts, Heroicons
- **Security**: bcryptjs, reCAPTCHA, JWT (jose/jsonwebtoken), Zod validation, TOTP (otplib/speakeasy)
- **Services / tooling**: Nodemailer (SMTP), node-cron, tsx

## Installation

### Prerequisites

- Node.js 18+
- PostgreSQL 12+

### Setup

```bash
# Clone
git clone https://github.com/your-username/nodexa-smartnode-reward-system.git
cd nodexa-smartnode-reward-system

# Install dependencies
npm install
```

Create your `.env` file (see [Configuration](#configuration)), then:

```bash
# Prisma
npx prisma generate
npx prisma migrate dev

# Optional: seed data
npm run seed
```

## Usage

```bash
# Dev server
npm run dev
```

Then open:
[http://localhost:3000](http://localhost:3000)

### Useful scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run seed
```

## Configuration

Create a `.env` file in the project root. Commonly-used variables in this codebase:

```env
# App
NODE_ENV=development
NODEXA_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nodexa

# Auth
JWT_SECRET=replace-me-with-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me-with-a-long-random-secret

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=replace-me
RECAPTCHA_SECRET_KEY=replace-me

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=replace-me
SMTP_PASSWORD=replace-me
EMAIL_FROM=noreply@nodexa.com

# CoinMarketCap (charts / price fetch)
COINMARKETCAP_API_KEY_CHARTS=replace-me
```

Notes:
- Set **both** `NODEXA_PUBLIC_APP_URL` and `NEXT_PUBLIC_APP_URL` to your base URL (the code currently references both).
- Auth flows like signup/login/reset use **reCAPTCHA** and will fail without valid keys.

## Screenshots

Add screenshots to a folder like `public/screenshots/` and reference them here:

```md
![Dashboard](public/screenshots/dashboard.png)
![Auth](public/screenshots/auth.png)
```

## API Documentation

This project uses Next.js route handlers under `src/app/api/*`. Common endpoints:

### Auth

- `POST /api/auth/signup` - create account (reCAPTCHA) + send verification email
- `GET /api/auth/verify-email/[token]` - verify email token
- `POST /api/auth/login` - login (reCAPTCHA) + sets `auth-token` cookie
- `POST /api/auth/logout` - clears `auth-token` cookie
- `GET /api/auth/check` - checks NextAuth session and/or custom JWT cookie
- `POST /api/auth/resend-verification` - resend verification email
- `POST /api/auth/reset-password` - request password reset email (reCAPTCHA)
- `POST /api/auth/new-password` - set a new password (after verification)

### Account

- `GET /api/auth/myaccount` - fetch account details
- `GET /api/auth/myaccount/fetchusername` - fetch username
- `POST /api/auth/myaccount/updatemail` - update email
- `POST /api/auth/myaccount/deleteaccount` - delete account

### 2FA (TOTP)

- `POST /api/auth/2fa/enable`
- `POST /api/auth/2fa/verify`
- `POST /api/auth/2fa/disable`
- `POST /api/auth/2fa/store2FA`

### Neoxa price data

- `GET /api/auth/neoxa` - latest Neoxa price data (from DB)
- `GET /api/auth/neoxa/coinmarketcap` - latest Neoxa price data (from DB)
- `GET /api/auth/neoxa/price-history?timeRange=1H|1D|1W|1M|3M|6M|1Y|ALL` - price history
- `POST /api/auth/neoxa/price-history` - insert a price point
- `GET /api/auth/neoxa/save-price` - fetch from CoinMarketCap and store to history

### Other

- `GET /api/notifications` - creates/fetches latest notifications
- `POST /api/contact` - contact form submission (sends email)
- `GET /api/test-db` - basic DB connectivity test

## Contact

- **Email**: `international.contributor.21@gmail.com`
- **Issues**: update the repository URL and use GitHub Issues
- **License**: MIT (see `LICENSE`)
