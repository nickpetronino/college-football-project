# NCAA Service - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Application                      │
│                    (Frontend / API Consumer)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS Requests
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Express Application                        │
│                         (server.js)                              │
├─────────────────────────────────────────────────────────────────┤
│  Middleware Stack:                                               │
│  • Helmet (Security Headers)                                     │
│  • CORS (Cross-Origin Resource Sharing)                          │
│  • Body Parser (JSON/URL-encoded)                                │
│  • Compression                                                   │
│  • Morgan (HTTP Logging)                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Routes Layer                            │
│                        (/routes)                                 │
├─────────────────────────────────────────────────────────────────┤
│  • healthRoutes.js    → /api/v1/health                           │
│  • teamRoutes.js      → /api/v1/teams                            │
│  • playerRoutes.js    → /api/v1/players                          │
│  • ... (add more routes)                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Validation Middleware                         │
│                 (/middleware/validationMiddleware.js)            │
│  • Express Validator Rules                                       │
│  • Input Sanitization                                            │
│  • Request Validation                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Controllers Layer                             │
│                      (/controllers)                              │
├─────────────────────────────────────────────────────────────────┤
│  • Business Logic                                                │
│  • Request Processing                                            │
│  • Response Formatting                                           │
│  • Error Handling                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Models Layer                                │
│                        (/models)                                 │
├─────────────────────────────────────────────────────────────────┤
│  • Mongoose Schemas                                              │
│  • Data Validation                                               │
│  • Instance Methods                                              │
│  • Static Methods                                                │
│  • Middleware Hooks                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MongoDB Database                              │
│                  (localhost:27017/ncaaservice)                   │
├─────────────────────────────────────────────────────────────────┤
│  Collections:                                                    │
│  • teams                                                         │
│  • players                                                       │
│  • games                                                         │
│  • ... (add more collections)                                    │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

```
1. Client Request
   ↓
2. Express Middleware Stack
   • Security (Helmet)
   • CORS
   • Body Parsing
   • Compression
   • Logging (Morgan)
   ↓
3. Route Handler
   • Match URL to route
   • Extract params/query
   ↓
4. Validation Middleware
   • Validate request data
   • Sanitize inputs
   ↓
5. Controller
   • Execute business logic
   • Interact with models
   ↓
6. Model Layer
   • Mongoose ODM
   • Database operations
   ↓
7. MongoDB
   • Store/retrieve data
   ↓
8. Response Flow (reverse)
   • Model → Controller → Routes → Client
```

## 📂 Directory Structure & Responsibilities

### `/config`

**Purpose:** Configuration files and environment setup

-   `database.js` - MongoDB connection logic, error handling, graceful shutdown
-   `env.js` - Centralized environment variable access with validation

**Responsibilities:**

-   Database connection management
-   Environment variable validation
-   Configuration defaults

---

### `/controllers`

**Purpose:** Business logic and request handling

-   `healthController.js` - Health check endpoints
-   `teamController.js` - Team CRUD operations (example)
-   `playerController.js` - Player CRUD operations (example)

**Responsibilities:**

-   Process incoming requests
-   Call model methods
-   Format responses using responseHandler
-   Handle errors with asyncHandler
-   Implement business rules

**Example Pattern:**

```javascript
const getResource = asyncHandler(async (req, res) => {
    const resource = await Model.find();
    sendSuccess(res, resource, 'Success message');
});
```

---

### `/middleware`

**Purpose:** Request/response interceptors

-   `errorMiddleware.js` - Global error handling (404, 500, validation errors)
-   `validationMiddleware.js` - Request validation helper

**Responsibilities:**

-   Error handling and formatting
-   Request validation
-   Authentication (add as needed)
-   Authorization (add as needed)
-   Rate limiting (add as needed)

---

### `/models`

**Purpose:** Data layer and database schemas

-   `exampleModel.js` - Template for new models
-   `teamModel.js` - Team schema (to be created)
-   `playerModel.js` - Player schema (to be created)

**Responsibilities:**

-   Define data structure
-   Schema validation
-   Default values
-   Instance methods
-   Static methods
-   Indexes for performance
-   Middleware hooks (pre/post)

**Example Pattern:**

```javascript
const schema = new mongoose.Schema({
  field: { type: String, required: true }
}, { timestamps: true });

schema.methods.instanceMethod = function() { ... };
schema.statics.staticMethod = function() { ... };

module.exports = mongoose.model('Model', schema);
```

---

### `/routes`

**Purpose:** API endpoint definitions

-   `healthRoutes.js` - Health check routes
-   `teamRoutes.js` - Team API routes (to be created)
-   `playerRoutes.js` - Player API routes (to be created)

**Responsibilities:**

-   Define URL patterns
-   Map routes to controllers
-   Apply route-specific middleware
-   Define validation rules

**Example Pattern:**

```javascript
router.get('/', controller.getAll);
router.post('/', validationRules, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', validationRules, controller.update);
router.delete('/:id', controller.delete);
```

---

### `/utils`

**Purpose:** Reusable helper functions

-   `asyncHandler.js` - Wraps async functions to catch errors
-   `logger.js` - Structured logging with levels
-   `responseHandler.js` - Standardized API response formats

**Responsibilities:**

-   Error handling utilities
-   Logging utilities
-   Response formatting
-   Common helper functions

---

## 🔐 Security Layers

```
┌──────────────────────────────────┐
│ 1. Helmet                        │  ← Security headers (XSS, etc.)
├──────────────────────────────────┤
│ 2. CORS                          │  ← Cross-origin restrictions
├──────────────────────────────────┤
│ 3. Input Validation              │  ← Express validator
├──────────────────────────────────┤
│ 4. Mongoose Schema Validation    │  ← Data type validation
├──────────────────────────────────┤
│ 5. Error Handling                │  ← No stack traces in prod
└──────────────────────────────────┘
```

## 🎯 Design Patterns

### 1. **MVC (Model-View-Controller)**

-   **Model:** Mongoose schemas (`/models`)
-   **View:** JSON responses (API, not traditional views)
-   **Controller:** Business logic (`/controllers`)

### 2. **Repository Pattern**

Models act as repositories:

```javascript
Team.find();
Team.findById(id);
Team.create(data);
Team.findByIdAndUpdate(id, data);
Team.findByIdAndDelete(id);
```

### 3. **Middleware Pattern**

Composable request/response processors:

```javascript
app.use(middleware1).use(middleware2).use(middleware3);
```

### 4. **Async/Await with Error Handling**

```javascript
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

## 📊 Data Flow Example

**Creating a Team:**

```
POST /api/v1/teams
Body: { "name": "Alabama", "conference": "SEC" }

1. Request hits Express server
2. Helmet adds security headers
3. CORS checks origin
4. Body parser converts JSON to object
5. Route matches: /api/v1/teams → POST
6. Validation middleware checks:
   - name is present
   - conference is valid
7. teamController.createTeam executes:
   - Team.create(req.body)
8. Mongoose validates against schema
9. MongoDB inserts document
10. Controller formats success response
11. Response sent to client:
    {
      "success": true,
      "message": "Team created successfully",
      "data": { ... team object ... },
      "timestamp": "2024-10-19T..."
    }
```

## 🚦 Error Flow Example

```
Error in Controller
↓
Caught by asyncHandler
↓
Passed to next(error)
↓
Error Middleware
↓
Format error response
↓
Send to client:
{
  "success": false,
  "message": "Error description",
  "timestamp": "..."
}
```

## 📈 Scalability Considerations

### Current Architecture Supports:

1. **Horizontal Scaling**

    - Stateless design
    - Can run multiple instances
    - Load balancer ready

2. **Database Scaling**

    - MongoDB replica sets
    - Sharding support
    - Read replicas

3. **Caching Layer** (Ready to add)

    - Redis integration
    - Response caching
    - Session storage

4. **Microservices** (Ready to split)

    - Each route group can become a service
    - API Gateway pattern ready

5. **Testing**
    - Modular structure easy to test
    - Unit tests per controller
    - Integration tests per route

## 🔧 Extension Points

### Easy to Add:

1. **Authentication**

    - JWT middleware
    - Passport.js integration

2. **Authorization**

    - Role-based access control
    - Permission middleware

3. **File Uploads**

    - Multer middleware
    - S3 integration

4. **Real-time Features**

    - Socket.io integration
    - WebSocket support

5. **Caching**

    - Redis integration
    - Cache middleware

6. **Rate Limiting**

    - Express rate limit
    - Per-route limits

7. **API Documentation**
    - Swagger/OpenAPI
    - Auto-generated docs

## 📚 Technology Stack

| Layer       | Technology        | Purpose                 |
| ----------- | ----------------- | ----------------------- |
| Runtime     | Node.js           | JavaScript runtime      |
| Framework   | Express           | Web framework           |
| Database    | MongoDB           | Document database       |
| ODM         | Mongoose          | MongoDB object modeling |
| Validation  | Express Validator | Request validation      |
| Security    | Helmet            | Security headers        |
| CORS        | cors              | Cross-origin support    |
| Logging     | Morgan            | HTTP request logger     |
| Compression | compression       | Response compression    |
| Dev Tools   | Nodemon           | Auto-reload in dev      |

## 🎓 Best Practices Implemented

✅ Separation of Concerns  
✅ DRY (Don't Repeat Yourself)  
✅ SOLID Principles  
✅ Error Handling  
✅ Input Validation  
✅ Security Headers  
✅ Environment Variables  
✅ Graceful Shutdown  
✅ Structured Logging  
✅ Standardized Responses  
✅ Async/Await Pattern  
✅ Modular Architecture

---

**This architecture is production-ready and scales from small projects to enterprise applications.**
