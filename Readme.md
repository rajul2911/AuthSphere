# 🔐 MERN Stack Authentication System

A full-stack MERN (MongoDB, Express, React, Node.js) authentication system with role-based access control, JWT tokens, session management, and comprehensive security features.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables Setup](#-environment-variables-setup)
- [Running the Project](#️-running-the-project)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Security Features](#️-security-features)
- [User Roles](#-user-roles)
- [Troubleshooting](#-troubleshooting)
- [Additional Resources](#-additional-resources)

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup with JWT
- 🎫 **Dual Token System** - Access tokens (15m) and Refresh tokens (7d)
- 👥 **Role-Based Access Control** - Admin, Manager, and Employee roles
- 🔄 **Session Management** - Track and manage active user sessions
- 🛡️ **CSRF Protection** - Protect against cross-site request forgery
- 🚦 **Rate Limiting** - Prevent brute force attacks
- 📝 **Audit Logging** - Track all user activities
- 🔑 **Password Management** - Secure password change functionality
- 👤 **User Profile** - View and update user information
- 📊 **Role-Specific Dashboards** - Different views for different roles
- 🔒 **HTTP-Only Cookies** - Secure token storage
- ✅ **Input Validation** - Server-side validation for all inputs

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **TailwindCSS** (optional) - Styling

## 📦 Prerequisites

Before starting, ensure you have installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js  | v14+    | [nodejs.org](https://nodejs.org/) |
| npm      | v6+     | Comes with Node.js |
| Git      | Latest  | [git-scm.com](https://git-scm.com/) |
| MongoDB Atlas Account | Free Tier | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |

**Check installations:**
```bash
node --version
npm --version
git --version
```

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/rajul2911/AuthSphere.git

# Navigate to project directory
cd MERN
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd mern-auth-backend

# Install dependencies
npm install
```

**Expected packages:**
- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- helmet
- express-validator
- cookie-parser
- express-rate-limit

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend folder (from root)
cd ../mern-auth-frontend

# Install dependencies
npm install
```

**Expected packages:**
- react
- react-dom
- react-router-dom
- @reduxjs/toolkit
- react-redux
- axios
- vite

## 🔧 Environment Variables Setup

### Backend Environment Configuration

#### Create `.env` File

1. Navigate to backend folder:
```bash
cd mern-auth-backend
```

2. Create `.env` file:
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

3. Open `.env` in your editor and add variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

---

### 📝 Detailed Guide for Each Environment Variable

#### 1️⃣ PORT

**What it is:** The port number where your backend server will run.

**How to set:**
```env
PORT=5000
```

**Options:**
- `5000` (recommended)
- `3000`, `8000`, or any available port
- Avoid ports: `80`, `443`, `3306`, `27017` (reserved)

---

#### 2️⃣ MONGO_URI (MongoDB Connection String)

**What it is:** Connection string to your MongoDB database.

**Step-by-Step Setup:**

1. **Go to MongoDB Atlas**
   - Visit: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred region (closest to you)
   - Click "Create Cluster"
   - Wait 3-5 minutes for cluster creation

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `myuser` (example)
   - Password: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT:** Save this password securely!
   - User Privileges: Select "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - IP: `0.0.0.0/0`
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 4.1 or later
   - Copy the connection string

6. **Format Connection String**
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

   Replace:
   - `<username>` → Your database username
   - `<password>` → Your database password
   - `<cluster-url>` → Automatically provided
   - `<database-name>` → Choose a name (e.g., `MERNProject`)

**Example:**
```env
MONGO_URI=mongodb+srv://myuser:MySecurePass123@cluster0.abc123.mongodb.net/MERNProject?retryWrites=true&w=majority
```

**⚠️ Common Mistakes:**
- Not replacing `<password>` with actual password
- Using special characters in password without URL encoding
- Forgetting to add IP to whitelist

---

#### 3️⃣ JWT_SECRET

**What it is:** A secret key used to sign JWT tokens (general purpose).

**How to Generate:**

**Method 1 - Using Node.js (Recommended):**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Method 2 - Using Online Generator:**
- Visit: [https://www.grc.com/passwords.htm](https://www.grc.com/passwords.htm)
- Copy the "63 random hexadecimal characters" string

**Method 3 - Using PowerShell (Windows):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Example Output:**
```env
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

**Requirements:**
- Minimum 64 characters
- Mix of letters and numbers
- Keep it secret and secure

---

#### 4️⃣ ACCESS_TOKEN_SECRET

**What it is:** Secret key specifically for signing access tokens.

**How to Generate:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Example:**
```env
ACCESS_TOKEN_SECRET=f733db9c76a1b44ba1c3531263dffbeb2d291ff3e75424c1fb5c01740afd159d820f37625218ed2f6959b5e228af2e8d4563654b777e8d71782cf004be382707
```

**⚠️ Important:**
- Must be DIFFERENT from JWT_SECRET
- Must be DIFFERENT from REFRESH_TOKEN_SECRET
- Generate a unique value

---

#### 5️⃣ REFRESH_TOKEN_SECRET

**What it is:** Secret key specifically for signing refresh tokens.

**How to Generate:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Example:**
```env
REFRESH_TOKEN_SECRET=d09cc0cf5cc826797f7e3a91bb01ac88266db90e58f6b503c7e04f054fd5eb99028cd82c083706d381d633afeb16d8fc35413f01fcb49268db59e383965e8e9e
```

**⚠️ Important:**
- Must be DIFFERENT from JWT_SECRET
- Must be DIFFERENT from ACCESS_TOKEN_SECRET
- Generate a unique value

---

#### 6️⃣ NODE_ENV

**What it is:** Defines the environment your application is running in.

**Options:**
```env
# For development
NODE_ENV=development

# For production
NODE_ENV=production
```

**Differences:**
- `development`: More detailed error messages, hot reload
- `production`: Optimized, minimal logging, cached

**For this project, use:**
```env
NODE_ENV=development
```

---

#### 7️⃣ ACCESS_TOKEN_EXPIRE

**What it is:** How long access tokens remain valid.

**Format:** Number + Unit
- `s` = seconds
- `m` = minutes
- `h` = hours
- `d` = days

**Examples:**
```env
ACCESS_TOKEN_EXPIRE=15m    # 15 minutes (recommended)
ACCESS_TOKEN_EXPIRE=30m    # 30 minutes
ACCESS_TOKEN_EXPIRE=1h     # 1 hour
ACCESS_TOKEN_EXPIRE=300s   # 300 seconds (5 minutes)
```

**Recommended:**
```env
ACCESS_TOKEN_EXPIRE=15m
```

**Why short-lived?**
- More secure
- If stolen, expires quickly
- Use refresh token to get new one

---

#### 8️⃣ REFRESH_TOKEN_EXPIRE

**What it is:** How long refresh tokens remain valid.

**Examples:**
```env
REFRESH_TOKEN_EXPIRE=7d     # 7 days (recommended)
REFRESH_TOKEN_EXPIRE=14d    # 14 days
REFRESH_TOKEN_EXPIRE=30d    # 30 days
REFRESH_TOKEN_EXPIRE=168h   # 7 days (in hours)
```

**Recommended:**
```env
REFRESH_TOKEN_EXPIRE=7d
```

**Why longer-lived?**
- Better user experience
- User stays logged in
- Stored securely in HTTP-only cookies

---

### 📄 Complete `.env` File Example

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://myusername:MySecurePassword123@cluster0.abc123.mongodb.net/MERNProject?retryWrites=true&w=majority

# JWT Secrets (Generate unique values for each)
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
ACCESS_TOKEN_SECRET=f733db9c76a1b44ba1c3531263dffbeb2d291ff3e75424c1fb5c01740afd159d820f37625218ed2f6959b5e228af2e8d4563654b777e8d71782cf004be382707
REFRESH_TOKEN_SECRET=d09cc0cf5cc826797f7e3a91bb01ac88266db90e58f6b503c7e04f054fd5eb99028cd82c083706d381d633afeb16d8fc35413f01fcb49268db59e383965e8e9e

# Token Expiration
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

---

### Frontend Environment Configuration (Optional)

1. Navigate to frontend folder:
```bash
cd mern-auth-frontend
```

2. Create `.env` file:
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

3. Add the following:
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** Vite requires `VITE_` prefix for environment variables.

---

## ▶️ Running the Project

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Start Backend

```bash
# Navigate to backend
cd mern-auth-backend

# Start development server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: cluster0.abc123.mongodb.net
```

#### Terminal 2 - Start Frontend

```bash
# Navigate to frontend (from root)
cd mern-auth-frontend

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Option 2: Run Both with Concurrently (Recommended)

1. **Install concurrently in root directory:**
```bash
# From MERN root directory
npm install -g concurrently
```

2. **Create a start script** (optional):

Create `package.json` in root `MERN` folder:
```json
{
  "name": "mern-auth-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"cd mern-auth-backend && npm run dev\" \"cd mern-auth-frontend && npm run dev\"",
    "backend": "cd mern-auth-backend && npm run dev",
    "frontend": "cd mern-auth-frontend && npm run dev"
  }
}
```

3. **Run both servers:**
```bash
# From root directory
npm run dev
```

---

### Option 3: Using VS Code Tasks

Create `.vscode/tasks.json` in root:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "cd mern-auth-backend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "cd mern-auth-frontend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Start Both",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "problemMatcher": []
    }
  ]
}
```

Run: `Ctrl+Shift+P` → `Tasks: Run Task` → `Start Both`

---

### 🌐 Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | [http://localhost:5173](http://localhost:5173) | React application |
| Backend API | [http://localhost:5000](http://localhost:5000) | Express server |
| API Docs | [http://localhost:5000/api](http://localhost:5000/api) | API endpoints |

---

## 📁 Project Structure

```
MERN/
├── mern-auth-backend/               # Backend Node.js application
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic (login, signup, logout)
│   │   └── admin.controller.js      # Admin operations (user management)
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT token verification
│   │   ├── role.middleware.js       # Role-based access control
│   │   ├── admin.middleware.js      # Admin-specific middleware
│   │   ├── authorize.middleware.js  # Authorization checks
│   │   ├── csrf.middleware.js       # CSRF token validation
│   │   ├── error.middleware.js      # Global error handler
│   │   ├── rateLimit.middleware.js  # Rate limiting
│   │   └── validation.middleware.js # Input validation
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, role)
│   │   └── AuditLog.js              # Activity logging schema
│   ├── routes/
│   │   ├── auth.routes.js           # Authentication routes (/signup, /login, etc.)
│   │   ├── admin.routes.js          # Admin routes (/users, /audit-logs)
│   │   └── dashboard.routes.js      # Dashboard routes (role-specific)
│   ├── utils/
│   │   ├── AppError.js              # Custom error class
│   │   ├── asyncHandler.js          # Async route handler wrapper
│   │   ├── generateToken.js         # JWT token generation
│   │   ├── generateCsrfToken.js     # CSRF token generation
│   │   └── getCsrfToken.js          # CSRF token retrieval
│   ├── validators/
│   │   └── auth.validator.js        # Express-validator rules
│   ├── .env                         # Environment variables (DO NOT COMMIT)
│   ├── .gitignore                   # Git ignore file
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Entry point (Express app setup)
│
└── mern-auth-frontend/              # Frontend React application
    ├── public/                      # Static files
    ├── src/
    │   ├── api/                     # API integration
    │   │   ├── authApi.js           # Auth API calls (login, signup, logout)
    │   │   ├── adminApi.js          # Admin API calls (user management)
    │   │   └── baseApi.js           # Axios instance configuration
    │   ├── app/
    │   │   └── store.js             # Redux store configuration
    │   ├── components/
    │   │   ├── AuthBootstrap.jsx    # Auth initialization on app load
    │   │   ├── AuthPageGuard.jsx    # Redirect if already authenticated
    │   │   ├── HomeRedirect.jsx     # Role-based home redirection
    │   │   ├── Navbar.jsx           # Top navigation bar
    │   │   ├── ProtectedRoute.jsx   # Route protection HOC
    │   │   ├── Sidebar.jsx          # Side navigation menu
    │   │   ├── common/
    │   │   │   ├── AuthBootstrap.jsx
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── layout/
    │   │   │   ├── AuthLayout.jsx   # Layout for login/signup pages
    │   │   │   ├── DashboardLayout.jsx # Layout for dashboard pages
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── Topbar.jsx
    │   │   └── ui/                  # Reusable UI components
    │   │       ├── Button.jsx
    │   │       ├── EmptyState.jsx
    │   │       ├── Input.jsx
    │   │       ├── Loader.jsx
    │   │       └── Skeleton.jsx
    │   ├── features/
    │   │   └── auth/
    │   │       └── authSlice.js     # Redux auth state management
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx        # Login page
    │   │   │   └── Signup.jsx       # Signup page
    │   │   ├── dashboards/
    │   │   │   ├── AdminDashboard.jsx    # Admin dashboard
    │   │   │   ├── ManagerDashboard.jsx  # Manager dashboard
    │   │   │   └── EmployeeDashboard.jsx # Employee dashboard
    │   │   ├── ChangePassword.jsx   # Password change page
    │   │   ├── Profile.jsx          # User profile page
    │   │   └── Sessions.jsx         # Active sessions page
    │   ├── routes/
    │   │   ├── AdminRoute.jsx       # Admin-only route wrapper
    │   │   ├── AppRoutes.jsx        # Main routing configuration
    │   │   ├── PrivateRoute.jsx     # Protected route wrapper
    │   │   └── RoleRoute.jsx        # Role-based route wrapper
    │   ├── styles/
    │   │   └── globals.css          # Global styles
    │   ├── App.css                  # App-level styles
    │   ├── App.jsx                  # Root component
    │   ├── index.css                # Base styles
    │   └── main.jsx                 # Entry point
    ├── .env                         # Frontend environment variables
    ├── .gitignore                   # Git ignore file
    ├── eslint.config.js             # ESLint configuration
    ├── index.html                   # HTML template
    ├── package.json                 # Frontend dependencies
    ├── vite.config.js               # Vite configuration
    └── README.md                    # Frontend documentation
```

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/auth/signup` | Register new user | ❌ | Public |
| POST | `/api/auth/login` | Login user | ❌ | Public |
| POST | `/api/auth/logout` | Logout user | ✅ | Any |
| POST | `/api/auth/refresh` | Refresh access token | ✅ | Any |
| GET | `/api/auth/me` | Get current user info | ✅ | Any |
| GET | `/api/auth/profile` | Get user profile | ✅ | Any |
| PUT | `/api/auth/profile` | Update user profile | ✅ | Any |
| PUT | `/api/auth/change-password` | Change password | ✅ | Any |
| GET | `/api/auth/sessions` | Get active sessions | ✅ | Any |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/admin/users` | Get all users | ✅ | Admin |
| GET | `/api/admin/users/:id` | Get user by ID | ✅ | Admin |
| PUT | `/api/admin/users/:id` | Update user | ✅ | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | ✅ | Admin |
| GET | `/api/admin/audit-logs` | View audit logs | ✅ | Admin |
| POST | `/api/admin/users/:id/role` | Change user role | ✅ | Admin |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/dashboard/admin` | Admin dashboard data | ✅ | Admin |
| GET | `/api/dashboard/manager` | Manager dashboard data | ✅ | Manager |
| GET | `/api/dashboard/employee` | Employee dashboard data | ✅ | Employee |

---

### API Request Examples

#### 1. User Signup
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "employee"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. User Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### 3. Get Current User
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer <access_token>
```

#### 4. Change Password
```bash
PUT http://localhost:5000/api/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!"
}
```

---

## 🛡️ Security Features

### 1. Authentication & Authorization

#### JWT Token System
- **Access Token**: Short-lived (15 minutes), stored in memory
- **Refresh Token**: Long-lived (7 days), stored in HTTP-only cookies
- **Token Rotation**: New refresh token issued on each refresh

#### Password Security
- **Hashing**: bcrypt with salt rounds (10)
- **Validation**: Minimum 8 characters, uppercase, lowercase, number
- **Storage**: Never stored in plain text

### 2. CSRF Protection

```javascript
// CSRF token included in state-changing requests
headers: {
  'X-CSRF-Token': csrfToken
}
```

### 3. Rate Limiting

```javascript
// Login endpoint: 5 attempts per 15 minutes
// API endpoints: 100 requests per 15 minutes
```

### 4. HTTP Security Headers

- **helmet.js**: Sets secure HTTP headers
- **CORS**: Configured for specific origins
- **XSS Protection**: Content Security Policy enabled

### 5. Input Validation

```javascript
// Server-side validation using express-validator
body('email').isEmail().normalizeEmail()
body('password').isLength({ min: 8 }).isStrongPassword()
```

### 6. Role-Based Access Control (RBAC)

```javascript
// Three roles with hierarchical permissions
Admin > Manager > Employee
```

### 7. Audit Logging

All critical actions are logged:
- User login/logout
- Password changes
- Role modifications
- User deletions
- Failed login attempts

---

## 👥 User Roles

### 🔴 Admin
**Permissions:**
- ✅ Access admin dashboard
- ✅ View all users
- ✅ Create/update/delete users
- ✅ Change user roles
- ✅ View audit logs
- ✅ Access all system features

**Default Admin Credentials** (Create manually in DB):
```javascript
{
  name: "Admin User",
  email: "admin@example.com",
  password: "Admin@123",
  role: "admin"
}
```

### 🟡 Manager
**Permissions:**
- ✅ Access manager dashboard
- ✅ View employee data
- ✅ Manage team members
- ❌ Cannot access admin features

### 🟢 Employee
**Permissions:**
- ✅ Access employee dashboard
- ✅ View own profile
- ✅ Update own information
- ❌ Cannot access admin/manager features

---

## 🐛 Troubleshooting

### Backend Issues

#### 1. MongoDB Connection Error

**Error:**
```
MongooseServerSelectionError: Could not connect to any servers
```

**Solutions:**

✅ **Check MongoDB URI:**
```bash
# Verify .env file has correct MONGO_URI
cd mern-auth-backend
cat .env  # Mac/Linux
type .env  # Windows
```

✅ **Verify MongoDB Atlas Setup:**
- Go to MongoDB Atlas → Network Access
- Ensure IP `0.0.0.0/0` is whitelisted
- Check database user credentials

✅ **Test Connection:**
```javascript
// Add to db.js temporarily
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Connected Successfully');
});
```

#### 2. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID 1234 /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

#### 3. JWT Secret Error

**Error:**
```
Error: secretOrPrivateKey must have a value
```

**Solutions:**

✅ **Verify .env file:**
```bash
# Check all secrets are set
JWT_SECRET=...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
```

✅ **Restart server:**
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

✅ **Check dotenv loading:**
```javascript
// In server.js, verify this is at the top
require('dotenv').config();
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
```

#### 4. Password Hashing Error

**Error:**
```
ValidationError: User validation failed: password: Path `password` is required
```

**Solution:**

Check `User.js` model has pre-save hook:
```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

---

### Frontend Issues

#### 1. CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

✅ **Check backend CORS config:**
```javascript
// In server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

✅ **Check Vite proxy:**
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

#### 2. API Connection Error

**Error:**
```
Network Error / Failed to fetch
```

**Solutions:**

✅ **Verify backend is running:**
```bash
# Check if backend server is active
curl http://localhost:5000/api/health
```

✅ **Check API URL in frontend:**
```javascript
// In baseApi.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

✅ **Verify .env file:**
```env
# mern-auth-frontend/.env
VITE_API_URL=http://localhost:5000/api
```

#### 3. Redux State Not Persisting

**Error:**
User gets logged out on page refresh

**Solutions:**

✅ **Check localStorage:**
```javascript
// Browser console
localStorage.getItem('token')
```

✅ **Verify AuthBootstrap component:**
```javascript
// Should be wrapping app in main.jsx
<AuthBootstrap>
  <App />
</AuthBootstrap>
```

✅ **Check token storage:**
```javascript
// In authSlice.js
localStorage.setItem('token', action.payload.accessToken);
```

#### 4. Routing Issues

**Error:**
```
Cannot GET /dashboard
```

**Solutions:**

✅ **Add Vite fallback:**
```javascript
// vite.config.js
export default defineConfig({
  server: {
    historyApiFallback: true
  }
});
```

✅ **Check React Router setup:**
```javascript
// App.jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <AppRoutes />
</BrowserRouter>
```

---

### Common Issues

#### 1. Dependencies Not Installing

**Error:**
```
npm ERR! code ERESOLVE
```

**Solutions:**

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

#### 2. Environment Variables Not Loading

**Error:**
`undefined` when accessing `process.env.VARIABLE_NAME`

**Solutions:**

✅ **Backend:**
```javascript
// Ensure dotenv is required at top of server.js
require('dotenv').config();

// Test loading
console.log('Environment loaded:', process.env.NODE_ENV);
```

✅ **Frontend (Vite):**
```javascript
// Use import.meta.env, NOT process.env
const apiUrl = import.meta.env.VITE_API_URL;

// Check in browser console
console.log(import.meta.env);
```

✅ **Restart dev server after .env changes**

#### 3. Git Tracking .env Files

**Error:**
`.env` files appearing in git status

**Solutions:**

```bash
# Remove from git tracking
git rm --cached mern-auth-backend/.env
git rm --cached mern-auth-frontend/.env

# Commit the removal
git commit -m "Remove .env files from tracking"

# Verify .gitignore includes
echo "# Verify these lines exist in .gitignore:"
cat .gitignore | grep -E "\.env"
```

#### 4. Module Not Found Errors

**Error:**
```
Error: Cannot find module 'express'
```

**Solutions:**

```bash
# Reinstall specific package
npm install express

# Or reinstall all dependencies
rm -rf node_modules
npm install
```

---

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// In server.js
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}
```

**Frontend:**
```javascript
// In baseApi.js
axios.interceptors.request.use((config) => {
  console.log('API Request:', config.method, config.url);
  return config;
});
```

---

## 🧪 Testing the Application

### Manual Testing Checklist

#### Authentication Flow
- [ ] Signup with new user
- [ ] Login with credentials
- [ ] Access protected route
- [ ] Logout
- [ ] Verify token expiration
- [ ] Test refresh token flow

#### Authorization
- [ ] Admin can access admin routes
- [ ] Manager cannot access admin routes
- [ ] Employee cannot access admin/manager routes
- [ ] Test role-based dashboard access

#### Security
- [ ] Test CSRF protection
- [ ] Test rate limiting (multiple login attempts)
- [ ] Verify password hashing
- [ ] Test XSS prevention

### API Testing with Postman/Thunder Client

**Create Collection:**
1. Import endpoints from API docs
2. Set environment variables
3. Chain requests (login → get token → use in headers)

**Example Postman Collection:**
```json
{
  "info": {
    "name": "MERN Auth API"
  },
  "item": [
    {
      "name": "Signup",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/auth/signup",
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"Test@123\"}"
        }
      }
    }
  ]
}
```

---

## 📚 Additional Resources

### Official Documentation
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

### Learning Resources
- [JWT Introduction](https://jwt.io/introduction)
- [RESTful API Design](https://restfulapi.net/)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [MongoDB University](https://university.mongodb.com/)

### Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [Postman](https://www.postman.com/) - API testing
- [Thunder Client](https://www.thunderclient.com/) - VS Code API client
- [JWT Debugger](https://jwt.io/) - Decode JWT tokens

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
- MongoDB for VS Code
- REST Client
- GitLens

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mern-auth.git
   cd mern-auth
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add: Amazing new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Commit Message Convention
```
Add: New feature
Fix: Bug fix
Update: Existing feature improvement
Remove: Deprecated code removal
Docs: Documentation changes
Style: Code formatting
Refactor: Code restructuring
Test: Adding tests
```

---

## 📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- MongoDB Atlas for free database hosting
- Vite team for blazing fast build tool
- Redux Toolkit for simplified state management
- Express.js community for excellent middleware
- All open-source contributors

---

## ⚠️ Important Security Notes

### Before Deploying to Production:

1. **Change all secrets** - Generate new JWT secrets
2. **Update MONGO_URI** - Use production database
3. **Set NODE_ENV=production** - Enable production optimizations
4. **Configure CORS** - Restrict to specific domains
5. **Enable HTTPS** - Use SSL certificates
6. **Whitelist specific IPs** - Remove 0.0.0.0/0 from MongoDB
7. **Set up monitoring** - Use logging services (e.g., Winston, Morgan)
8. **Enable rate limiting** - Stricter limits for production
9. **Regular updates** - Keep dependencies up to date
10. **Backup database** - Regular automated backups

### Never Commit:
- ❌ `.env` files
- ❌ `node_modules/`
- ❌ Private keys
- ❌ Database credentials
- ❌ API secrets

### Always:
- ✅ Use `.env.example` for documentation
- ✅ Validate user input
- ✅ Sanitize data
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Review security advisories

---

## 📞 Support

If you encounter any issues:

1. **Check this README** - Most common issues are covered
2. **Search existing issues** - Someone may have had the same problem
3. **Create new issue** - Provide detailed information:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version)
   - Screenshots if applicable

---

## 🗺️ Roadmap

### Planned Features
- [ ] Email verification
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub)
- [ ] User activity dashboard
- [ ] Real-time notifications
- [ ] File upload functionality
- [ ] Export data to CSV/PDF
- [ ] Advanced audit logging
- [ ] API rate limiting per user

---

## 📊 Project Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** February 2026

---

## 🎉 Getting Started Quick Guide

**For complete beginners:**

```bash
# 1. Install Node.js from nodejs.org

# 2. Clone repository
git clone <your-repo-url>
cd MERN

# 3. Setup backend
cd mern-auth-backend
npm install
# Create .env file with MongoDB URI and secrets (see above)
npm run dev

# 4. Setup frontend (new terminal)
cd ../mern-auth-frontend
npm install
npm run dev

# 5. Open browser
# Visit http://localhost:5173
```

**That's it! You're ready to go! 🚀**

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ and ☕

[Report Bug](https://github.com/yourusername/mern-auth/issues) · [Request Feature](https://github.com/yourusername/mern-auth/issues)

</div>