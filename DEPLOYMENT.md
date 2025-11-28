# Deployment Guide

This guide will help you deploy the CASK application to GitHub, Vercel (frontend), and Render (backend).

## Step 1: Push to GitHub

### If Git is not installed:
1. Download and install Git from https://git-scm.com/download/win
2. Restart your terminal after installation

### Initialize Git and Push:

```bash
# Navigate to project root
cd C:\Users\kamal\Downloads\Cask

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CASK voice assistant app"

# Add your GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: If you haven't created a GitHub repository yet:
1. Go to https://github.com/new
2. Create a new repository (don't initialize with README)
3. Copy the repository URL and use it in the `git remote add origin` command above

## Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**: https://dashboard.render.com
   - Sign up or log in

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Service**:
   - **Name**: `cask-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Cask/backend` (if your backend is in Cask/backend)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add:
   - `MONGO_URI`: Your MongoDB Atlas connection string
     - Get this from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
     - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - `JWT_SECRET`: Generate a random string (e.g., use: `openssl rand -base64 32`)
   - `OPENAI_API_KEY`: Your OpenAI API key from https://platform.openai.com/api-keys
   - `FRONTEND_URL`: Leave this for now, we'll update it after deploying frontend
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will override this, but it's good to set)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (takes 5-10 minutes)
   - **Copy your backend URL** (e.g., `https://cask-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
   - Sign up or log in with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `Cask/frontend` (click "Edit" and set this)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`
     - Replace with your actual Render backend URL from Step 2

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (takes 2-5 minutes)
   - **Copy your frontend URL** (e.g., `https://cask-app.vercel.app`)

## Step 4: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Edit your backend service**
3. **Update Environment Variables**:
   - Update `FRONTEND_URL` to your Vercel frontend URL (e.g., `https://cask-app.vercel.app`)
4. **Redeploy** (Render will auto-redeploy when you save)

## Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try signing up/logging in
3. Test the voice assistant

## Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: 
  - Verify your `MONGO_URI` is correct
  - Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Render's IP
- **Port Issues**: Render automatically sets PORT, but make sure your code uses `process.env.PORT`
- **Build Fails**: Check that all dependencies are in `package.json`

### Frontend Issues:
- **API Calls Fail**: 
  - Verify `VITE_API_URL` is set correctly in Vercel
  - Check browser console for CORS errors
  - Make sure backend `FRONTEND_URL` matches your Vercel URL
- **Build Fails**: 
  - Check that all dependencies are in `package.json`
  - Verify Vite config is correct

### CORS Errors:
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that backend CORS configuration allows your frontend origin

## Environment Variables Summary

### Backend (Render):
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.onrender.com
```

## Next Steps

- Set up custom domains (optional)
- Configure MongoDB Atlas IP whitelist for better security
- Set up monitoring and logging
- Configure automatic deployments on git push

