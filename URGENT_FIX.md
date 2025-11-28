# 🚨 URGENT FIX: 405 Error on Login

## The Problem
Your frontend is trying to POST to `https://cask-assistance.vercel.app/XX/login` instead of your Render backend.

**Error in console:**
```
POST https://cask-assistance.vercel.app/XX/login 405 (Method Not Allowed)
```

## Root Cause
The `VITE_API_URL` environment variable is **NOT SET** in Vercel, so the frontend is using the wrong URL.

## ⚡ IMMEDIATE FIX (Do This Now!)

### Step 1: Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click your project**: `cask-assistance`
3. **Settings** → **Environment Variables**
4. **Click "Add New"**
5. **Enter:**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-NAME.onrender.com`
     - ⚠️ **Replace with your actual Render backend URL**
     - Example: `https://cask-backend.onrender.com`
   - **Environments**: Check **Production**, **Preview**, and **Development**
6. **Click "Save"**

### Step 2: Redeploy Vercel Project

**CRITICAL:** Environment variables only work after redeploy!

1. Go to **Deployments** tab
2. Click **"..."** (three dots) on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (2-3 minutes)

### Step 3: Test

1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Hard refresh**: Ctrl+Shift+R
3. **Try login again**
4. **Check console** (F12): Should now show requests to your Render backend URL

## If Backend Not Deployed Yet

You **MUST** deploy the backend first! The frontend needs a backend URL to work.

### Deploy Backend to Render:

1. **Go to**: https://dashboard.render.com
2. **New +** → **Web Service**
3. **Connect GitHub** → Select `YourWebPartner1/CASK-ASSISTANCE`
4. **Configure:**
   - **Name**: `cask-backend`
   - **Root Directory**: `backend` ⚠️ **MUST BE SET!**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables** (Add these):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   JWT_SECRET=your-random-secret-key-here
   OPENAI_API_KEY=sk-your-openai-key-here
   FRONTEND_URL=https://cask-assistance.vercel.app
   NODE_ENV=production
   PORT=10000
   ```
6. **Deploy** and wait (5-10 minutes)
7. **Copy the backend URL** (e.g., `https://cask-backend.onrender.com`)
8. **Use this URL** in Step 1 above as `VITE_API_URL`

## Verify It's Fixed

After redeploying Vercel:

1. Open browser console (F12)
2. Look for network requests
3. They should go to: `https://your-backend.onrender.com/login` ✅
4. NOT: `https://cask-assistance.vercel.app/XX/login` ❌

## Quick Checklist

- [ ] Backend deployed on Render? (If not, deploy it first)
- [ ] Backend URL copied? (e.g., `https://cask-backend.onrender.com`)
- [ ] `VITE_API_URL` added in Vercel with backend URL?
- [ ] Vercel project redeployed after adding env var?
- [ ] Browser cache cleared?
- [ ] Tested login again?

## Still Not Working?

1. **Check Vercel Environment Variables:**
   - Go to Settings → Environment Variables
   - Verify `VITE_API_URL` exists and has correct value
   - Make sure it's enabled for Production

2. **Check Render Backend:**
   - Go to Render dashboard
   - Verify backend is "Live" (green status)
   - Check logs for errors
   - Test backend directly: `https://your-backend.onrender.com/login` (should return error, but confirms it's running)

3. **Check Browser Console:**
   - F12 → Console tab
   - Look for what URL is being used
   - Should show your Render backend URL, not Vercel URL

## Need Your Backend URL?

If you've deployed to Render:
- Go to Render Dashboard
- Click your backend service
- Copy the URL from the top (e.g., `https://cask-backend.onrender.com`)

If you haven't deployed yet:
- **You must deploy backend first!** See deployment steps above.

