# 🚀 Deploy Backend to Render NOW

## Quick Steps

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect GitHub** → Select `YourWebPartner1/CASK-ASSISTANCE`
4. **Configure:**
   - **Name**: `cask-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend` ⚠️ **CRITICAL - MUST SET THIS!**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables** (Click "Add Environment Variable" for each):
   - `MONGO_URI` = `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - `JWT_SECRET` = `your-random-secret-key-here` (any long random string)
   - `OPENAI_API_KEY` = `sk-your-openai-api-key-here`
   - `FRONTEND_URL` = `https://cask-assistance.vercel.app`
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
6. **Click**: "Create Web Service"
7. **Wait** 5-10 minutes for deployment
8. **Copy the URL** (e.g., `https://cask-backend.onrender.com`)
9. **Use this URL** in Vercel as `VITE_API_URL`

## After Backend is Deployed

1. Go back to Vercel
2. Add `VITE_API_URL` = your Render backend URL
3. Redeploy Vercel project
4. Test login

