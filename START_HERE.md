# 🚀 Quick Start Guide

## ✅ Setup Complete!

Your NCAA College Football project now has:

-   **Frontend**: React + Vite + Material UI (root directory)
-   **Backend**: Express + MongoDB + Mongoose (`/service` directory)

---

## 🎯 Start Everything with ONE Command

### 1. Make sure MongoDB is running:

**Option A: Windows Service**

```powershell
net start MongoDB
```

**Option B: Docker**

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Start BOTH frontend and backend:

```powershell
npm run dev
```

This will start:

-   ✅ Frontend on `http://localhost:5173` (Vite)
-   ✅ Backend on `http://localhost:5000` (Express)

---

## 🧪 Test Your Backend

Once running, test these endpoints:

### Health Check

```
http://localhost:5000/api/v1/health
```

### Database Status

```
http://localhost:5000/api/v1/health/db
```

### Root Endpoint

```
http://localhost:5000
```

---

## 📂 Project Structure

```
college-football-project/
├── src/                    # Frontend React app
├── service/                # Backend Express API
│   ├── config/            # Database & environment config
│   ├── controllers/       # Business logic
│   ├── middleware/        # Error handling & validation
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Helper functions
│   ├── server.js          # Main entry point
│   └── .env               # Environment variables
├── package.json           # Root scripts
└── START_HERE.md          # This file
```

---

## 🛠️ Available Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start BOTH frontend & backend |
| `npm run dev:frontend` | Start only frontend (Vite)    |
| `npm run dev:backend`  | Start only backend (Express)  |
| `npm run build`        | Build frontend for production |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `Error connecting to MongoDB`

**Fix:**

```powershell
# Start MongoDB
net start MongoDB

# OR use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Fix:** Kill the process using the port:

```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Fix:** Install dependencies:

```powershell
# Install root dependencies
npm install

# Install backend dependencies
cd service
npm install
```

---

## 🎯 Next Steps

1. ✅ Start the server: `npm run dev`
2. 📊 Build your first model in `service/models/`
3. 🎮 Create controllers in `service/controllers/`
4. 🛣️ Add API routes in `service/routes/`
5. 💻 Connect frontend to backend

---

## 📚 Documentation

-   **Backend Architecture**: `service/ARCHITECTURE.md`
-   **Backend Quick Start**: `service/QUICKSTART.md`
-   **Full Backend Docs**: `service/README.md`

---

**🏈 Ready to build your NCAA College Football app!**
