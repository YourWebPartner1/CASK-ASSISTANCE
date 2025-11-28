# GitHub Setup Instructions

Since Git is not currently installed on your system, follow these steps:

## Step 1: Install Git

1. Download Git for Windows: https://git-scm.com/download/win
2. Run the installer with default settings
3. **Restart your terminal/PowerShell** after installation

## Step 2: Verify Git Installation

Open a new terminal and run:
```bash
git --version
```

You should see a version number.

## Step 3: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Cask` (or your preferred name)
3. Description: "Voice Assistant Application"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 5: Push Your Code

Navigate to your project directory and run:

```bash
cd C:\Users\kamal\Downloads\Cask

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CASK voice assistant app"

# Add GitHub remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password (or personal access token).

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Select `C:\Users\kamal\Downloads\Cask`
5. Publish repository to GitHub

## After Pushing to GitHub

Once your code is on GitHub, proceed with the deployment steps in `DEPLOYMENT.md`.

