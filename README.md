# CASK - Voice Assistant Application

A full-stack voice assistant application built with React, Node.js, Express, and OpenAI.

## Project Structure

```
Cask/
├── backend/          # Express.js backend server
├── frontend/         # React + Vite frontend
└── README.md
```

## Features

- Voice-based AI assistant
- Multi-language support (English, Hindi, Telugu)
- Chat history management
- User authentication
- Text-to-speech with OpenAI voices

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=sk-your-openai-api-key-here
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Deployment

### Backend Deployment (Render)

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository.

2. **Create a Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure the Service**:
   - **Name**: `cask-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)

4. **Add Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
   - `PORT`: `10000` (Render sets this automatically, but you can specify)

5. **Deploy**: Click "Create Web Service" and wait for deployment.

6. **Note your backend URL**: It will be something like `https://cask-backend.onrender.com`

### Frontend Deployment (Vercel)

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository.

2. **Import Project to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure the Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if your frontend is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://cask-backend.onrender.com`)

5. **Deploy**: Click "Deploy" and wait for deployment.

6. **Update Backend CORS**: After getting your Vercel URL, update the `FRONTEND_URL` environment variable in Render to match your Vercel deployment URL.

### Important Notes

- **CORS Configuration**: The backend CORS is configured to allow requests from the frontend URL specified in `FRONTEND_URL`.
- **Environment Variables**: Never commit `.env` files. Use `.env.example` files as templates.
- **MongoDB Atlas**: For production, use MongoDB Atlas (free tier available).
- **API Keys**: Keep your API keys secure and never expose them in client-side code.

## Environment Variables Reference

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key
- `FRONTEND_URL`: Frontend deployment URL for CORS

### Frontend (.env)
- `VITE_API_URL`: Backend API URL

## License

ISC

