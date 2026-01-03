# Blog App Frontend - Deployment Guide

## 🚀 Quick Start

### Local Development
1. Copy `.env.example` to `.env`
2. Make sure backend is running on `http://localhost:5000`
3. Run `npm run dev`

### Environment Variables

This project uses **Vite** (not Create React App), so environment variables must be prefixed with `VITE_`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add environment variables for deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your `blog-client` repository
4. Configure environment variables:
   - Click **"Environment Variables"**
   - Add variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://blog-server-production-fa29.up.railway.app/api`
5. Click **"Deploy"**

### Step 3: Update Backend CORS
After deploying, update your backend's CORS settings to allow your Vercel domain:

In `backend/server.js`, update CORS configuration:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app'
  ]
}));
```

## 🔧 Environment Variables Reference

| Variable | Local Development | Production (Vercel) |
|----------|-------------------|---------------------|
| `VITE_API_URL` | `http://localhost:5000/api` | `https://blog-server-production-fa29.up.railway.app/api` |

## ✅ Verify Deployment

After deployment:
1. Open browser console (F12)
2. Look for: `🔗 API URL: https://blog-server-production-fa29.up.railway.app/api`
3. Test login/signup functionality
4. Check that blog posts load correctly

## 🐛 Troubleshooting

### CORS Errors
- Make sure backend allows your Vercel domain in CORS
- Check Railway backend logs

### API Not Found (404)
- Verify `VITE_API_URL` is set correctly in Vercel dashboard
- Check that URL ends with `/api`

### Environment Variable Not Working
- Must use `VITE_` prefix (not `REACT_APP_`)
- Restart dev server after changing `.env`
- In Vercel: redeploy after changing environment variables

## 📝 Notes

- `.env` is in `.gitignore` and won't be pushed to GitHub
- Always use `.env.example` as a template
- Vercel automatically rebuilds when you push to GitHub
- Environment variables are set in Vercel dashboard, not in code
