# 🚀 Quick Start Guide - MERN Blog App

## ⚠️ IMPORTANT: MongoDB Setup Required

Your backend server needs MongoDB to work. You have **2 options**:

---

## Option 1: Use MongoDB Atlas (Cloud) - **RECOMMENDED** ✅

This is the easiest and fastest way to get started!

### Steps:

1. **Create FREE MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Click "Create"
   - Wait 3-5 minutes for cluster to deploy

3. **Set Up Database Access**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set "Database User Privileges" to "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (left menu)
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)

6. **Update Backend .env File**
   - Open: `backend\.env`
   - Replace the MONGODB_URI line with your connection string:
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/blogapp?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Save the file

7. **Restart Backend Server**
   - Stop the backend terminal (Ctrl+C)
   - Run: `npm run dev`
   - You should see: "✅ MongoDB Connected Successfully"

---

## Option 2: Install MongoDB Locally 💻

If you prefer to run MongoDB on your computer:

### For Windows:

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Choose Windows version
   - Download and install

2. **Start MongoDB**
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`
   - Or install as Windows Service during installation

3. **Verify**
   - Your backend should connect automatically
   - Connection string: `mongodb://localhost:27017/blogapp`

### For Mac:

```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### For Linux:

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongod
```

---

## 🎯 After MongoDB is Set Up

### Start the Application:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Should see: "MongoDB Connected Successfully" and "Server is running on port 5000"

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Should open: http://localhost:5173

---

## 🧪 Test the App

1. Open browser to: http://localhost:5173
2. Click "Sign up here"
3. Create account with:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
4. Click "Sign Up"
5. You should be logged in!
6. Create your first blog post

---

## ❓ Common Issues

### "MongoDB Connection Error"
- **MongoDB Atlas**: Check connection string in `.env`, ensure password is correct
- **Local MongoDB**: Make sure MongoDB service is running

### "Port 5000 already in use"
- Stop other processes using port 5000
- Or change PORT in `backend/.env` to 5001

### "Network error / CORS error"
- Make sure BOTH backend and frontend servers are running
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## 📚 Need More Help?

Check the main README.md file for detailed documentation.

Happy Coding! 🎉
