# MERN Stack Blog Application

A full-stack blog application with authentication, built with MongoDB, Express, React, and Node.js.

## Features ✨

### Authentication
- User signup and login with JWT tokens
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### Blog Management
- Create new blog posts (authenticated users only)
- View all blog posts (public access)
- Edit your own blog posts
- Delete your own blog posts
- Each post shows author name and creation date

### UI Features
- Modern, responsive design with animations
- Beautiful gradient backgrounds
- Smooth transitions and hover effects
- Mobile-friendly interface
- Loading states and error handling

## Tech Stack 🛠️

### Frontend
- **React** 19.2.0 - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites 📋

Before running this application, make sure you have:
- Node.js (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## Installation & Setup 🚀

### 1. Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create/update .env file with your MongoDB connection
# Edit backend/.env and set:
MONGODB_URI=mongodb://localhost:27017/blogapp  # For local MongoDB
# OR
MONGODB_URI=your_mongodb_atlas_connection_string  # For MongoDB Atlas

JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000

# Start the backend server
npm run dev
```

Backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to root project folder
cd ..

# Install dependencies (if not done already)
npm install

# Start the frontend dev server
npm run dev
```

Frontend will run on http://localhost:5173

## Usage 📖

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Login with your credentials
3. **Create Post**: Use the form to create a new blog post
4. **View Posts**: See all blog posts from all users
5. **Edit Post**: Click "Edit" on your own posts to modify them
6. **Delete Post**: Click "Delete" on your own posts to remove them
7. **Logout**: Click logout button to end session

## API Endpoints 🔌

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs (public)
- `POST /api/blogs` - Create new blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected, author only)
- `DELETE /api/blogs/:id` - Delete blog (protected, author only)

## Project Structure 📁

```
blogapp/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Entry point
│   ├── .env            # Environment variables
│   └── package.json
├── src/
│   ├── components/      # React components
│   ├── services/        # API service
│   ├── App.jsx         # Main app component
│   └── App.css         # Styles
└── package.json

```

## Security Features 🔒

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Authorization checks for edit/delete operations
- CORS enabled for cross-origin requests

## Troubleshooting 🔧

**MongoDB Connection Error**:
- Make sure MongoDB service is running
- Check connection string in .env file
- For Atlas, ensure IP whitelist is configured

**Port Already in Use**:
- Change PORT in backend/.env file
- Or stop the process using that port

**CORS Errors**:
- Ensure backend server is running
- Check API_URL in src/services/api.js

## Contributing 🤝

This is a learning project for MERN stack internship preparation. Feel free to fork and enhance!

## License 📄

MIT License - feel free to use this project for learning purposes.
