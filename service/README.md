# NCAA Service Backend

A scalable Node.js backend service for NCAA College Football data using Express and MongoDB.

## 📁 Project Structure

```
dynasty-backend/
├── config/              # Configuration files
│   ├── database.js      # MongoDB connection setup
│   └── env.js           # Environment variables configuration
├── controllers/         # Route controllers (business logic)
│   └── healthController.js
├── middleware/          # Custom middleware
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── models/              # Mongoose models (database schemas)
│   └── exampleModel.js
├── routes/              # API routes
│   └── healthRoutes.js
├── utils/               # Utility functions
│   ├── asyncHandler.js
│   ├── logger.js
│   └── responseHandler.js
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── server.js            # Main application entry point
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   MongoDB (running locally or remote instance)
-   npm or yarn

### Installation

1. Navigate to the backend directory:

```bash
cd dynasty-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

4. Start MongoDB (if running locally):

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Start the server:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📝 Environment Variables

| Variable      | Description                              | Default                                 |
| ------------- | ---------------------------------------- | --------------------------------------- |
| `NODE_ENV`    | Environment mode                         | `development`                           |
| `PORT`        | Server port                              | `5000`                                  |
| `MONGODB_URI` | MongoDB connection string                | `mongodb://localhost:27017/ncaaservice` |
| `API_VERSION` | API version prefix                       | `v1`                                    |
| `LOG_LEVEL`   | Logging level (error, warn, info, debug) | `info`                                  |

## 🛣️ API Endpoints

### Health Check

-   `GET /api/v1/health` - Check API status
-   `GET /api/v1/health/db` - Check database connection

## 🏗️ Architecture

### MVC Pattern

This project follows the Model-View-Controller (MVC) pattern:

-   **Models** (`/models`): Define data structure and database schema
-   **Controllers** (`/controllers`): Handle business logic and request processing
-   **Routes** (`/routes`): Define API endpoints and map to controllers

### Middleware

Custom middleware for:

-   Error handling
-   Request validation
-   Logging

### Utilities

Reusable helper functions:

-   Async error handler
-   Response formatters
-   Logger

## 📦 Adding New Features

### Creating a New Model

1. Create a file in `/models` (e.g., `teamModel.js`)
2. Define schema using Mongoose
3. Export the model

```javascript
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        // ... other fields
    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
```

### Creating a New Route

1. Create a file in `/routes` (e.g., `teamRoutes.js`)
2. Define routes and map to controller functions

```javascript
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getAllTeams);
router.post('/', teamController.createTeam);

module.exports = router;
```

3. Import and use in `server.js`:

```javascript
const teamRoutes = require('./routes/teamRoutes');
app.use(`/api/${API_VERSION}/teams`, teamRoutes);
```

### Creating a New Controller

1. Create a file in `/controllers` (e.g., `teamController.js`)
2. Implement business logic

```javascript
const Team = require('../models/teamModel');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAllTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();
    sendSuccess(res, teams, 'Teams retrieved successfully');
});

module.exports = { getAllTeams };
```

## 🔒 Best Practices

-   ✅ Use environment variables for configuration
-   ✅ Implement proper error handling
-   ✅ Use async/await with try-catch or asyncHandler
-   ✅ Validate input data
-   ✅ Use meaningful HTTP status codes
-   ✅ Add indexes to frequently queried fields
-   ✅ Keep controllers thin, models fat
-   ✅ Use middleware for cross-cutting concerns
-   ✅ Log important events and errors
-   ✅ Follow RESTful API conventions

## 📚 Dependencies

### Production Dependencies

-   **express**: Web framework
-   **mongoose**: MongoDB ODM
-   **dotenv**: Environment variable management
-   **cors**: Cross-Origin Resource Sharing
-   **helmet**: Security headers
-   **compression**: Response compression
-   **express-validator**: Request validation
-   **morgan**: HTTP request logger

### Development Dependencies

-   **nodemon**: Auto-restart server on file changes

## 🐛 Debugging

Set `LOG_LEVEL=debug` in `.env` for verbose logging.

## 📄 License

ISC
