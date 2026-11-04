# Trendora Fashion

Trendora is a full-stack e-commerce web application built with the **MERN stack**. It provides user authentication, product discovery, category/search filtering, wishlist management, shopping cart functionality, address management, and checkout/order-related backend APIs.

The project is structured as a separate React frontend and Node.js/Express backend connected to MongoDB.

## Live Demo

[Trendora Live Demo](https://mern-shopping-site-43xo.vercel.app/)

 
---

## Features

### Authentication

* User registration and login
* Password hashing using `bcrypt`
* JWT-based authentication
* JWT expiration configured for 7 days
* Protected API routes using Bearer tokens
* Authenticated profile retrieval
* Profile update functionality
* Logout through client-side token removal

### Product Discovery

* Product listing
* Product detail pages
* Category filtering
* Product title search
* Minimum rating filtering
* Price sorting:

  * Low to high
  * High to low
* Featured product support
* Product stock information

Example:

```text
GET /api/products?category=Clothing&search=shirt&rating=4&sort=lowToHigh
```

### Wishlist

Authenticated users can:

* View their wishlist
* Add products
* Remove products

Wishlist product references are stored inside the authenticated user's document.

### Shopping Cart

Authenticated users can:

* View cart items
* Add products
* Increase quantity
* Decrease quantity
* Remove products

Cart items are embedded inside the user document and contain the product reference and quantity.

### Address Management

Authenticated users can:

* Add addresses
* View addresses
* Update addresses
* Delete addresses

Addresses are embedded inside the user document.

### Orders

The backend provides protected order APIs for:

* Creating orders
* Retrieving the authenticated user's orders
* Storing ordered products and quantities
* Storing a shipping-address snapshot
* Calculating total items
* Calculating total price
* Tracking order status

Supported order statuses:

```text
Placed
Processing
Shipped
Delivered
Cancelled
```

> **Implementation note:** The current frontend checkout page uses `OrderContext` to create local checkout/order state and does not currently call the backend `POST /api/orders` endpoint. The backend order infrastructure is implemented separately and can be integrated with the frontend checkout flow.

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* Bootstrap
* Bootstrap Icons
* React Toastify
* Context API
* Reducers
* Fetch API

## Backend

* Node.js
* Express.js
* Mongoose
* JWT
* bcrypt
* CORS
* dotenv

## Database

* MongoDB

---

# Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │                      │
                    │ Pages / Components   │
                    │ Context / Reducers   │
                    └──────────┬───────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌──────────────────────┐
                    │    API Layer         │
                    │                      │
                    │ api.js               │
                    │ productApi.js        │
                    │ wishlistApi.js       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Express.js Server    │
                    │                      │
                    │ Routes               │
                    │ Middleware           │
                    │ Controllers           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Mongoose       │
                    │       Models         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    └──────────────────────┘
```

The main backend request flow is:

```text
React
  ↓
API Request
  ↓
Express Route
  ↓
Authentication Middleware
  ↓
Controller
  ↓
Mongoose Model
  ↓
MongoDB
  ↓
JSON Response
  ↓
React State/UI
```

---

# Project Structure

```text
MERN-Shopping-Site/
│
├── backend/
│   ├── controllers/
│   │   ├── addressController.js
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── addressRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── seed/
│   │   └── products.js
│   │
│   ├── seedDatabase.js
│   ├── server.js
│   └── package.json
│
├── shopping-site/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── reducers/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Data Model

## User

The `User` model contains:

```text
name
email
password
phone
wishlist[]
cart[]
addresses[]
createdAt
updatedAt
```

The cart and wishlist are stored directly inside the user document.

Each cart item contains:

```text
product
quantity
```

Each address contains:

```text
name
phone
street
city
state
country
pincode
```

## Product

```text
title
brand
description
image
category
price
rating
stock
featured
createdAt
updatedAt
```

## Order

Orders are stored separately from users.

```text
user
items[]
shippingAddress
totalItems
totalPrice
orderStatus
createdAt
updatedAt
```

Each order item stores:

```text
product
quantity
price
```

This allows an order to retain the purchase price instead of depending only on the current product price.

---

# REST API

## Authentication

| Method | Endpoint             | Authentication |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Public         |
| POST   | `/api/auth/login`    | Public         |
| GET    | `/api/auth/profile`  | Protected      |

## User

| Method | Endpoint             | Authentication |
| ------ | -------------------- | -------------- |
| GET    | `/api/users/profile` | Protected      |
| PUT    | `/api/users/profile` | Protected      |

## Products

| Method | Endpoint            | Authentication |
| ------ | ------------------- | -------------- |
| GET    | `/api/products`     | Public         |
| GET    | `/api/products/:id` | Public         |

Product filtering is handled through query parameters:

```text
category
search
rating
sort
```

## Wishlist

| Method | Endpoint                   | Authentication |
| ------ | -------------------------- | -------------- |
| GET    | `/api/wishlist`            | Protected      |
| POST   | `/api/wishlist/:productId` | Protected      |
| DELETE | `/api/wishlist/:productId` | Protected      |

## Cart

| Method | Endpoint               | Authentication |
| ------ | ---------------------- | -------------- |
| GET    | `/api/cart`            | Protected      |
| POST   | `/api/cart/:productId` | Protected      |
| PUT    | `/api/cart/:productId` | Protected      |
| DELETE | `/api/cart/:productId` | Protected      |

For quantity updates:

```json
{
  "action": "increment"
}
```

or:

```json
{
  "action": "decrement"
}
```

## Address

| Method | Endpoint                  | Authentication |
| ------ | ------------------------- | -------------- |
| GET    | `/api/address`            | Protected      |
| POST   | `/api/address`            | Protected      |
| PUT    | `/api/address/:addressId` | Protected      |
| DELETE | `/api/address/:addressId` | Protected      |

## Orders

| Method | Endpoint      | Authentication |
| ------ | ------------- | -------------- |
| POST   | `/api/orders` | Protected      |
| GET    | `/api/orders` | Protected      |

---

# Authentication Flow

Trendora uses JWT-based authentication.

```text
User
 │
 │ Register/Login
 ▼
Auth Controller
 │
 ├── bcrypt password verification
 │
 └── JWT generation
       │
       ▼
     Client
       │
       ▼
 localStorage
       │
       ▼
 Authorization: Bearer <token>
       │
       ▼
 authMiddleware
       │
       ├── Verify JWT
       ├── Extract userId
       └── Load user
             │
             ▼
       Protected Controller
```

The JWT payload contains the authenticated user's ID.

The backend validates:

1. Authorization header exists.
2. Token follows the Bearer format.
3. JWT signature is valid.
4. Token has not expired.
5. Corresponding user exists.

---

# Frontend State Management

The frontend uses React Context API combined with reducers.

Main contexts include:

```text
AuthContext
ProductContext
SearchContext
WishlistContext
CartContext
AddressContext
OrderContext
```

`AppProvider` combines these contexts so application-level state can be shared across the component tree.

This approach keeps state management lightweight without introducing Redux for the current project scope.

---

# Security

The project implements several authentication and security fundamentals:

* Password hashing with bcrypt
* JWT authentication
* Protected backend routes
* Bearer token authentication
* User lookup after JWT verification
* Authenticated user-specific wishlist/cart/address data
* User-specific order retrieval
* Environment variables for database and JWT configuration
* Client-side token removal during logout

Production hardening can be improved further with:

* HTTP-only secure cookies or stronger token storage strategy
* CORS origin allowlisting
* Rate limiting
* Request validation
* Security headers
* Refresh-token rotation
* More explicit authorization rules

---

# Local Development

## Prerequisites

Install:

* Node.js
* npm
* MongoDB or MongoDB Atlas

---

## 1. Clone the Repository

```bash
git clone https://github.com/sunny-raj-sah/MERN-Shopping-Site.git

cd MERN-Shopping-Site
```

---

# 2. Start the Backend

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start development server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

---

# 3. Seed Products

From the backend directory:

```bash
npm run seed
```

The seed script clears existing products and inserts the configured seed product dataset.

---

# 4. Start the Frontend

Open another terminal:

```bash
cd shopping-site
npm install
```

Create:

```text
shopping-site/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

Start Vite:

```bash
npm run dev
```

The frontend will be available through the Vite development URL shown in the terminal.

---

# Engineering Decisions

### 1. JWT authentication

JWT keeps the backend stateless for authenticated API requests and allows protected routes to identify the current user.

### 2. Embedded user data

Wishlist, cart, and addresses are embedded in the `User` document because these collections are closely tied to an individual user's account.

### 3. Separate order collection

Orders use a separate model because order history is persistent transactional data and should not be coupled directly to the mutable cart.

### 4. Context + reducers

React Context and reducers provide centralized state management while keeping the frontend dependency footprint small.

### 5. Backend filtering

Product search and filtering are exposed through API query parameters so the backend can perform database-level filtering.

---

# Current Implementation Limitations

The current implementation intentionally leaves several areas open for further development.

### Checkout integration

The backend provides order creation and order history APIs, but the current frontend checkout flow creates the checkout result through `OrderContext` instead of calling `POST /api/orders`.

### Pagination

A pagination implementation exists in commented backend controller code, but pagination is not currently exposed as an active product API feature.

### Payments

No payment gateway is currently integrated.

### Inventory enforcement

Products contain a `stock` field, but the current cart/order implementation does not perform complete stock reservation or stock decrement workflows.

### Admin functionality

The current application focuses on the customer shopping experience. A complete product/order administration system can be added later.

---

# Future Improvements

* Connect frontend checkout to the backend order API
* Persist frontend address state through backend APIs
* Add product pagination
* Add payment gateway integration
* Add inventory validation and stock updates
* Add admin dashboard
* Add product CRUD for administrators
* Add reviews and ratings
* Add order-status management
* Add request validation
* Add API rate limiting
* Add automated tests
* Improve production CORS configuration
* Add refresh-token authentication
* Add image upload/storage service

---

# Interview Concepts Demonstrated

This project provides practical experience with:

* MERN architecture
* REST API design
* JWT authentication
* Authentication middleware
* Password hashing
* Protected routes
* MongoDB document modeling
* Embedded MongoDB documents
* Mongoose
* Express controllers
* Query parameters
* Search and filtering
* React Context API
* Reducer-based state management
* React Router
* Frontend/backend separation
* Environment variables
* API error handling
* E-commerce data modeling

---

# Author

**Sunny Raj**

Full Stack Engineer | Backend Engineer | AI Engineer

* GitHub: sunny-raj-sah
* LinkedIn: Sunny Raj
