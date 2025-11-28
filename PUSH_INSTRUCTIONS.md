# Push to GitHub - Quick Instructions

Your repository is ready at: **https://github.com/YourWebPartner1/CASK-ASSISTANCE.git**

## Option 1: Using the Batch Script (Easiest)

1. **Install Git** (if not already installed):
   - Download: https://git-scm.com/download/win
   - Run the installer with default settings
   - **Restart your terminal/PowerShell** after installation

2. **Run the script**:
   - Double-click `push-to-github.bat` in the `Cask` folder
   - OR run it from terminal: `.\push-to-github.bat`

3. **If prompted for credentials**:
   - Username: Your GitHub username
   - Password: Use a **Personal Access Token** (not your GitHub password)
     - Create one at: https://github.com/settings/tokens
     - Click "Generate new token (classic)"
     - Select scopes: `repo` (full control of private repositories)
     - Copy the token and use it as your password

## Option 2: Manual Git Commands

If you prefer to run commands manually:

```bash
# Navigate to project
cd C:\Users\kamal\Downloads\Cask

# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YourWebPartner1/CASK-ASSISTANCE.git
# OR if remote already exists:
git remote set-url origin https://github.com/YourWebPartner1/CASK-ASSISTANCE.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: CASK voice assistant app - ready for deployment"

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Option 3: Using GitHub Desktop (GUI - Recommended for beginners)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Add the repository**:
   - File → Add Local Repository
   - Browse to: `C:\Users\kamal\Downloads\Cask`
   - Click "Add repository"
4. **Publish to GitHub**:
   - Click "Publish repository" button
   - Repository name: `CASK-ASSISTANCE`
   - Description: "Voice Assistant Application"
   - Choose Public or Private
   - Click "Publish Repository"

## After Pushing to GitHub

Once your code is successfully pushed:

1. ✅ Verify at: https://github.com/YourWebPartner1/CASK-ASSISTANCE
2. ✅ Proceed with deployment:
   - **Backend**: Deploy to Render (see `DEPLOYMENT.md`)
   - **Frontend**: Deploy to Vercel (see `DEPLOYMENT.md`)

## Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart your terminal after installation

### "Authentication failed"
- GitHub no longer accepts passwords for Git operations
- Use a Personal Access Token instead:
  1. Go to: https://github.com/settings/tokens
  2. Generate new token (classic)
  3. Select `repo` scope
  4. Copy token and use as password

### "Repository not found"
- Make sure the repository exists at: https://github.com/YourWebPartner1/CASK-ASSISTANCE
- Verify you have write access to the repository
- Check the repository URL is correct

### "Everything up to date"
- Your code is already pushed
- If you made changes, make sure to:
  ```bash
  git add .
  git commit -m "Your commit message"
  git push
  ```

## Next Steps After Push

1. **Deploy Backend to Render**:
   - See `DEPLOYMENT.md` for detailed instructions
   - Root Directory: `Cask/backend`
   - Add environment variables (MONGO_URI, JWT_SECRET, OPENAI_API_KEY, etc.)

2. **Deploy Frontend to Vercel**:
   - See `DEPLOYMENT.md` for detailed instructions
   - Root Directory: `Cask/frontend`
   - Add environment variable: `VITE_API_URL` (your Render backend URL)

3. **Update Backend CORS**:
   - After getting Vercel URL, update `FRONTEND_URL` in Render

