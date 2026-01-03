# Blog App Frontend - Vercel Deployment Guide

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Prepare Your Code
The code is already configured with environment variables. All API calls use `import.meta.env.VITE_API_URL`.

### Step 2: Push to GitHub
```bash
cd c:\Users\user\OneDrive\Desktop\blogapp
git add .
git commit -m "Configure frontend for Vercel deployment"
git push origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your `blog-client` repository from GitHub
4. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

5. **Add Environment Variable:**
   - Click **"Environment Variables"** section
   - Add variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://blog-server-production-fa29.up.railway.app/api`
   - Select **Production**, **Preview**, and **Development**
   
6. Click **"Deploy"**

### Step 4: Update Backend CORS
After deployment, you'll get a Vercel URL like: `https://blog-app-xyz.vercel.app`

**IMPORTANT:** Update backend CORS to allow your Vercel domain:

1. Go to your backend `server.js` file
2. Update the CORS origin array:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development
    'https://blog-app-xyz.vercel.app'  // Replace with YOUR actual Vercel URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

3. Commit and push to GitHub:
```bash
cd c:\Users\user\OneDrive\Desktop\blogapp\backend
git add server.js
git commit -m "Add Vercel frontend URL to CORS"
git push origin main
```

Railway will automatically redeploy with the new CORS settings.

## 🔧 Environment Variables

### For Vercel Dashboard
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://blog-server-production-fa29.up.railway.app/api` |

### For Local Development
Create a `.env` file in the root directory:
```env
# Use Railway backend
VITE_API_URL=https://blog-server-production-fa29.up.railway.app/api

# OR use local backend
# VITE_API_URL=http://localhost:5000/api
```

## ✅ Verify Deployment

After deployment:
1. Open your Vercel app in the browser
2. Open browser console (F12)
3. Look for: `🔗 API URL: https://blog-server-production-fa29.up.railway.app/api`
4. Test the app:
   - Sign up with a new account
   - Log in
   - Create a blog post
   - Like a post
   - Edit/delete your own posts

## 🐛 Troubleshooting

### CORS Errors
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Check backend CORS configuration includes your Vercel URL
2. Make sure Railway backend is running
3. Verify CORS allows credentials and proper methods

### API Not Found (404)
**Problem:** API calls return 404

**Solution:**
1. Verify `VITE_API_URL` is set correctly in Vercel dashboard
2. Check that URL ends with `/api`
3. Test backend directly: `https://blog-server-production-fa29.up.railway.app/api`

### Environment Variable Not Loading
**Problem:** App tries to connect to localhost

**Solution:**
1. Verify environment variable name is `VITE_API_URL` (must start with `VITE_`)
2. Check console log shows correct URL
3. Redeploy on Vercel after changing environment variables
4. Clear browser cache

### Build Fails on Vercel
**Problem:** Build process fails

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct build script: `"build": "vite build"`
3. Make sure all dependencies are in `package.json`
4. Try building locally: `npm run build`

## 📝 Redeploy Instructions

### To Redeploy After Code Changes:
1. Commit changes locally:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```
2. Vercel automatically detects the push and redeploys

### To Manually Redeploy on Vercel:
1. Go to Vercel dashboard
2. Select your project
3. Go to **Deployments** tab
4. Click the three dots (**...**) on latest deployment
5. Click **Redeploy**

### To Update Environment Variables:
1. Go to Vercel dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Edit the `VITE_API_URL` value
4. **Important:** Trigger a new deployment for changes to take effect

## 🔗 URLs Reference

- **Backend (Railway):** https://blog-server-production-fa29.up.railway.app
- **Backend API:** https://blog-server-production-fa29.up.railway.app/api
- **Frontend (Vercel):** Will be provided after deployment
- **GitHub Frontend Repo:** https://github.com/UmerAzizGujjar/blog-client
- **GitHub Backend Repo:** https://github.com/UmerAzizGujjar/blog-server

## 📚 Notes

- `.env` file is gitignored and won't be pushed to GitHub
- Always use `.env.example` as a template
- Vite uses `import.meta.env` (not `process.env`)
- Environment variables must be prefixed with `VITE_`
- Vercel rebuilds automatically on every GitHub push
- Railway redeploys automatically on every GitHub push to backend
