# 🚀 Nodexa Smartnode Reward System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.5.0-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
</div>

<p align="center">
  <strong>A comprehensive platform for managing Neoxa cryptocurrency smartnode hosting, rewards tracking, and user management with enterprise-grade security.</strong>
</p>

---

## 🌟 **Overview**

Nodexa Smartnode Reward System is a cutting-edge web application designed to revolutionize smartnode hosting and reward management for the Neoxa cryptocurrency ecosystem. Built with modern technologies, it provides users with seamless smartnode management, real-time reward tracking, and comprehensive analytics.

### 🎯 **Key Features**

- **🏗️ Smartnode Hosting Management** - Private and shared smartnode hosting plans
- **💰 Real-time Rewards Tracking** - Live monitoring of daily and monthly rewards
- **📊 Advanced Analytics Dashboard** - Comprehensive statistics and performance metrics
- **🔒 Enterprise Security** - Multi-factor authentication with 2FA support
- **💳 Integrated Billing System** - Neoxa-based payment processing
- **📱 Responsive Design** - Mobile-first UI with modern UX
- **🔔 Smart Notifications** - Price alerts and system notifications
- **📈 Market Data Integration** - Real-time Neoxa price tracking

---

## 🛠️ **Technology Stack**

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router
- **TypeScript 5.0** - Type-safe development
- **TailwindCSS 4.0** - Utility-first CSS framework
- **React 19** - Latest React features
- **Chart.js & Recharts** - Data visualization
- **Heroicons** - Beautiful SVG icons

### **Backend**
- **Next.js API Routes** - Server-side functionality
- **Prisma 6.5.0** - Type-safe database ORM
- **PostgreSQL** - Robust relational database
- **NextAuth.js 4.24.7** - Authentication framework
- **JWT** - Secure token management

### **Security & Authentication**
- **bcryptjs** - Password hashing
- **2FA Support** - TOTP with QR codes
- **reCAPTCHA v2** - Bot protection
- **Email Verification** - Account security
- **Password Reset** - Secure recovery system

### **External Integrations**
- **CoinMarketCap API** - Real-time price data
- **SMTP Email** - Transactional emails
- **Node Cron** - Scheduled tasks

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nodexa-smartnode-reward-system.git
   cd nodexa-smartnode-reward-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env_sample .env
   ```
   
   Configure your `.env` file with the following variables:
   ```env
   # Application
   NODE_ENV=development
   NODEXA_PUBLIC_APP_URL=http://localhost:3000
   
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/nodexa
   
   # Authentication
   JWT_SECRET=your-jwt-secret-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # External APIs
   COINMARKETCAP_API_KEY=your-cmc-api-key
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=noreply@nodexa.com
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 **Feature Documentation**

### **🏠 Dashboard**
- **Overview Statistics** - Total nodes, earnings, performance metrics
- **Real-time Charts** - Interactive data visualization
- **Quick Actions** - Fast access to common tasks
- **Notification Center** - System alerts and updates

### **🔧 Smartnode Management**

#### **Private Nodes**
- **Dedicated Hosting** - Full control over your smartnode
- **Custom Configuration** - Personalized setup options
- **Performance Monitoring** - Real-time status tracking
- **Automated Setup** - One-click deployment

#### **Shared Nodes** 
- **Collaborative Investment** - Pool resources with other users
- **Flexible Collateral** - Multiple investment tiers
- **Profit Sharing** - Automatic reward distribution
- **Risk Mitigation** - Diversified hosting approach

### **💰 Rewards System**
- **Real-time Tracking** - Live reward calculations
- **Historical Data** - Complete earnings history
- **Automated Payouts** - Scheduled reward distribution
- **Tax Reporting** - Downloadable transaction records

### **🔐 Security Features**
- **Two-Factor Authentication** - TOTP-based 2FA
- **Email Verification** - Account validation
- **Password Security** - Bcrypt hashing
- **Session Management** - Secure JWT tokens
- **Rate Limiting** - DDoS protection

---

## 🗂️ **Project Structure**

```
nodexa-smartnode-reward-system/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main authenticated routes
│   │   │   ├── dashboard/     # Dashboard page
│   │   │   ├── privatenodes/  # Private node management
│   │   │   ├── sharednodes/   # Shared node management
│   │   │   ├── billing/       # Billing and payments
│   │   │   └── myaccount/     # User account settings
│   │   ├── (no-layout)/       # Public pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── notifications/ # Notification system
│   │   │   └── ...
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── utils/                 # Helper functions
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── package.json              # Project dependencies
```

---

## 🔧 **Configuration**

### **Database Configuration**
The application uses PostgreSQL with Prisma ORM. Key models include:
- **User** - Authentication and profile data
- **NeoxaPriceData** - Market data tracking
- **Notification** - System notifications

### **Authentication Setup**
- NextAuth.js for session management
- Custom JWT implementation
- 2FA with TOTP support
- Email verification system

### **External Services**
- **CoinMarketCap** - Price data and charts
- **SMTP Email** - Transactional emails
- **reCAPTCHA** - Bot protection

---

## 📋 **Available Scripts**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run seed       # Seed database with initial data
```

---

## 🚀 **Deployment**

### **Production Build**
```bash
npm run build
npm run start
```

### **Environment Variables**
Ensure all production environment variables are properly configured:
- Database URL with production credentials
- Secure JWT secrets
- Production SMTP settings
- Live reCAPTCHA keys
- Production API keys

### **Database Migration**
```bash
npx prisma migrate deploy
```

---

## 🛡️ **Security Best Practices**

- ✅ **Password Hashing** - bcryptjs with salt
- ✅ **JWT Tokens** - Secure session management
- ✅ **2FA Support** - TOTP authentication
- ✅ **Input Validation** - Zod schema validation
- ✅ **SQL Injection Protection** - Prisma ORM
- ✅ **XSS Protection** - React built-in protection
- ✅ **CSRF Protection** - NextAuth.js integration
- ✅ **Rate Limiting** - API route protection

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Database Connection**
```bash
# Check PostgreSQL connection
psql -h localhost -U username -d database_name
```

#### **Environment Variables**
- Verify all required variables are set
- Check for typos in variable names
- Ensure proper escaping of special characters

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Neoxa Community** - For the amazing cryptocurrency ecosystem
- **Next.js Team** - For the incredible React framework
- **Prisma Team** - For the excellent database toolkit
- **Vercel** - For hosting and deployment solutions

---

## 📞 **Support**

- **Documentation** - [docs.nodexa.com](https://docs.nodexa.com)
- **Community** - [Discord](https://discord.gg/nodexa)
- **Email** - support@nodexa.com
- **Issues** - [GitHub Issues](https://github.com/your-username/nodexa-smartnode-reward-system/issues)

---

<div align="center">
  <p><strong>Built with ❤️ by the Nodexa Team</strong></p>
  <p>🌟 <strong>Star this repository if you found it helpful!</strong> 🌟</p>
</div>
