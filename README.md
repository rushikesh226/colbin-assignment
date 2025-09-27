# Backend Setup Documentation

## Overview

This is a Node.js backend application that provides authentication endpoints for user registration and login functionality using Express.js and MongoDB.

## Project Structure

```
backend-app/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── models/
│   └── User.js          # User model schema
├── routes/
│   └── auth.js          # Authentication routes
└── node_modules/        # Dependencies (auto-generated)
```

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

1. **Navigate to the backend directory:**

   ```
   cd backend-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

## Environment Configuration

1. **Create a `.env` file in the backend-app directory:**

Add the following environment variables to your `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/colbin
JWT_SECRET=your-secret-jwt-key
PORT=5000
```

**For MongoDB Atlas (cloud database):**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/colbin?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

**Important:** Replace the placeholder values with your actual:

- MongoDB connection string
- A strong, random JWT secret key
- Port number (optional, defaults to 5000)

## Database Setup

#### Option 1: Local MongoDB

1. **Install MongoDB locally** (if not already installed)
2. **Start MongoDB service:**

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Use the local connection string in your `.env` file**

#### Option 2: MongoDB Atlas (Recommended for development)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster**
3. **Create a database user** with read/write permissions
4. **Whitelist your IP address** (or use 0.0.0.0/0 for development)
5. **Get your connection string** and add it to your `.env` file

## Running the Application

1. **Start the development server:**

   ```bash
   npm start
   ```

   The server will start with nodemon, which automatically restarts the server when you make changes to the code.

2. **Verify the server is running:**
   - You should see: `Server is running` and `Server running on port 5000`
   - The server will be available at: `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "msg": "User registered successfully"
}
```

#### POST `/api/auth/login`

Login an existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Dependencies

The following packages are used in this project:

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **bcryptjs**: Password hashing library
- **jsonwebtoken**: JWT token generation and verification
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable loader
- **nodemon**: Development server with auto-restart

## Code Structure

- **`index.js`**: Main server file that sets up Express, middleware, routes, and database connection
- **`models/User.js`**: Mongoose schema for user data with email, password, and name fields
- **`routes/auth.js`**: Authentication routes for user registration and login

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Input validation for email format and password length
- CORS enabled for cross-origin requests

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**

   - Verify your `MONGO_URI` in the `.env` file
   - Ensure MongoDB is running (if using local installation)
   - Check network connectivity (if using MongoDB Atlas)

2. **Port Already in Use:**

   - Change the `PORT` in your `.env` file
   - Or kill the process using the port: `npx kill-port 5000`

3. **JWT Secret Error:**

   - Ensure `JWT_SECRET` is set in your `.env` file
   - Use a strong, random secret key

4. **Module Not Found:**
   - Run `npm install` in the `backend-app` directory
   - Check that you're in the correct directory

## Development

### Scripts

- `npm start`: Start the development server with nodemon
- `npm test`: Run tests (currently not implemented)

## Frontend Setup

The frontend is a React application built with Vite.

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Navigate to the frontend directory:**

   ```
   cd recruitment-platform
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

### Running the Frontend

1. **Start the development server:**

   ```
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

2. **Build for production:**

   ```
   npm run build
   ```

3. **Preview production build:**
   ```
   npm run preview
   ```

## Frontend Project Structure

```
recruitment-platform/
├── src/
│   ├── Components/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Homepage.jsx
│   │   ├── PageNotFoundPage.jsx
│   │   └── Auth.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## Frontend Features

### Authentication Flow

- **Signup Page**: User registration with form validation
- **Login Page**: User authentication with JWT tokens
- **Protected Routes**: Automatic redirects based on authentication status
- **Homepage**: Displays user profile data fetched from backend

### Components

#### Signup Component (`/signup`)

- Form fields: Name, Email, Password, Confirm Password
- Client-side validation
- API integration with backend
- Automatic redirect to login after successful signup

#### Login Component (`/login`)

- Form fields: Email, Password
- Client-side validation
- JWT token storage in localStorage
- Automatic redirect to homepage after successful login

#### Homepage Component (`/`)

- Fetches user data from backend API
- Displays user profile information
- Logout functionality
- Protected route (requires authentication)

#### App Component

- Route management with React Router
- Authentication state management
- Automatic redirects based on auth status
- Loading states

### API Integration

The frontend communicates with the backend API:

#### Authentication Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

#### User Profile Endpoints

- `GET /api/user/profile` - Fetch user profile data
- `PUT /api/user/profile` - Update user profile

### State Management

- **Authentication State**: Managed in App.jsx with localStorage persistence
- **User Data**: Fetched from backend and stored in component state
- **Form State**: Local state management in auth components
- **Error Handling**: Client-side error states and user feedback

### Styling

- **CSS Modules**: Shared styles in `Auth.css`
- **Responsive Design**: Mobile-friendly layouts
- **Consistent UI**: Unified design system across components

## Frontend Dependencies

- **react**: UI library
- **react-dom**: React DOM bindings
- **react-router-dom**: Client-side routing
- **vite**: Build tool and dev server

## Frontend Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Environment Variables

The frontend connects to the backend at `http://localhost:5000` by default. To change this, update the API URLs in the components.

## Full Stack Development

### Running Both Backend and Frontend

1. **Start the backend server:**

   ```
   cd backend-app
   npm start
   ```

2. **Start the frontend server (in a new terminal):**

   ```
   cd recruitment-platform
   npm run dev
   ```
