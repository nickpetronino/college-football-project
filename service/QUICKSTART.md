# NCAA Service - Quick Start Guide

## ✅ Setup Complete!

Your NCAA Service backend has been successfully scaffolded with a production-ready folder structure.

## 📁 Folder Structure Overview

```
dynasty-backend/
├── config/                    # Configuration files
│   ├── database.js           # MongoDB connection with Mongoose
│   └── env.js                # Centralized environment config
├── controllers/              # Business logic layer
│   └── healthController.js   # Health check endpoints
├── middleware/               # Custom middleware
│   ├── errorMiddleware.js    # Global error handling
│   └── validationMiddleware.js  # Request validation
├── models/                   # Mongoose schemas
│   └── exampleModel.js       # Example model template
├── routes/                   # API route definitions
│   └── healthRoutes.js       # Health check routes
├── utils/                    # Utility functions
│   ├── asyncHandler.js       # Async error wrapper
│   ├── logger.js             # Logging utility
│   └── responseHandler.js    # Standard API responses
├── .env                      # Environment variables (gitignored)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies & scripts
├── server.js                 # Main entry point
└── README.md                 # Full documentation
```

## 🚀 Getting Started

### 1. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**

```powershell
net start MongoDB
```

**macOS/Linux:**

```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

**Docker (if you prefer):**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Configure Environment Variables

The `.env` file has been created with default values:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ncaaservice
API_VERSION=v1
LOG_LEVEL=info
```

Modify these values as needed for your setup.

### 3. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

### 4. Test the API

Once the server is running, test the health check endpoints:

```bash
# Basic health check
curl http://localhost:5000/api/v1/health

# Database health check
curl http://localhost:5000/api/v1/health/db

# Root endpoint
curl http://localhost:5000
```

Expected response:

```json
{
    "success": true,
    "message": "NCAA Service is running",
    "timestamp": "2024-10-19T...",
    "uptime": 12.345,
    "environment": "development"
}
```

## 📝 Next Steps

### Create Your First Model

1. **Create a Team model** (`models/teamModel.js`):

```javascript
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Team name is required'],
            unique: true,
            trim: true,
        },
        conference: {
            type: String,
            required: true,
        },
        wins: {
            type: Number,
            default: 0,
        },
        losses: {
            type: Number,
            default: 0,
        },
        ranking: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Team', teamSchema);
```

### Create a Controller

2. **Create a Team controller** (`controllers/teamController.js`):

```javascript
const Team = require('../models/teamModel');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseHandler');

// @desc    Get all teams
// @route   GET /api/v1/teams
// @access  Public
const getAllTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();
    sendSuccess(res, teams, 'Teams retrieved successfully');
});

// @desc    Create new team
// @route   POST /api/v1/teams
// @access  Private
const createTeam = asyncHandler(async (req, res) => {
    const team = await Team.create(req.body);
    sendSuccess(res, team, 'Team created successfully', 201);
});

module.exports = {
    getAllTeams,
    createTeam,
};
```

### Create Routes

3. **Create Team routes** (`routes/teamRoutes.js`):

```javascript
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');
const teamController = require('../controllers/teamController');

// Validation rules
const createTeamValidation = [
    body('name').trim().notEmpty().withMessage('Team name is required'),
    body('conference').trim().notEmpty().withMessage('Conference is required'),
    validate,
];

router.get('/', teamController.getAllTeams);
router.post('/', createTeamValidation, teamController.createTeam);

module.exports = router;
```

### Register Routes

4. **Add routes to server** (`server.js`):

```javascript
const teamRoutes = require('./routes/teamRoutes');

// Add this line with other route declarations
app.use(`/api/${API_VERSION}/teams`, teamRoutes);
```

## 🔑 Key Features

✅ **Express Server** - Fast, minimalist web framework  
✅ **MongoDB + Mongoose** - Document database with ODM  
✅ **Environment Variables** - Secure configuration management  
✅ **Error Handling** - Centralized error middleware  
✅ **Request Validation** - Input validation with express-validator  
✅ **Security** - Helmet for security headers  
✅ **CORS** - Cross-Origin Resource Sharing enabled  
✅ **Compression** - Response compression for performance  
✅ **Logging** - Morgan HTTP request logger  
✅ **Health Checks** - API and database monitoring endpoints  
✅ **Modular Architecture** - MVC pattern for scalability

## 🛠️ Available Scripts

```json
{
    "start": "node server.js", // Production mode
    "dev": "nodemon server.js" // Development with auto-reload
}
```

## 📚 Best Practices Implemented

-   ✅ Environment-based configuration
-   ✅ Centralized error handling
-   ✅ Async/await error handling
-   ✅ Input validation
-   ✅ Standardized API responses
-   ✅ Graceful shutdown handling
-   ✅ Security middleware (Helmet)
-   ✅ CORS configuration
-   ✅ Request logging
-   ✅ MVC architecture
-   ✅ Modular code organization

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `Error connecting to MongoDB`

**Solutions:**

1. Ensure MongoDB is running: `net start MongoDB` (Windows) or `brew services start mongodb-community` (macOS)
2. Check the connection string in `.env`
3. Verify MongoDB is accessible on port 27017

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:** Change the port in `.env`:

```
PORT=3000
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:** Reinstall dependencies:

```bash
npm install
```

## 📖 Documentation

For more detailed information, see:

-   `README.md` - Full documentation
-   `models/exampleModel.js` - Model template with examples
-   `controllers/healthController.js` - Controller examples

## 🎯 What's Next?

1. ✅ **Server is set up** - You can start the server now
2. 📊 **Create your models** - Define your data schemas
3. 🎮 **Build controllers** - Implement business logic
4. 🛣️ **Add routes** - Define API endpoints
5. 🧪 **Test your API** - Use Postman, curl, or Thunder Client
6. 🚀 **Deploy** - Ready for production deployment

---

**Need help?** Check the README.md for detailed examples and documentation.

**Happy Coding! 🎉**
