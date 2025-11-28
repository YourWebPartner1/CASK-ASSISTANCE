@echo off
echo ========================================
echo CASK - Push to GitHub Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo After installation, restart your terminal and run this script again.
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Navigate to project directory
cd /d "%~dp0"

REM Initialize git if not already initialized
if not exist .git (
    echo Initializing git repository...
    git init
)

REM Add remote if not exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin https://github.com/YourWebPartner1/CASK-ASSISTANCE.git
) else (
    echo Remote already exists. Updating...
    git remote set-url origin https://github.com/YourWebPartner1/CASK-ASSISTANCE.git
)

REM Add all files
echo.
echo Adding all files...
git add .

REM Check if there are changes to commit
git diff --cached --quiet
if errorlevel 1 (
    echo.
    echo Creating commit...
    git commit -m "Initial commit: CASK voice assistant app - ready for deployment"
    
    echo.
    echo Setting main branch...
    git branch -M main
    
    echo.
    echo Pushing to GitHub...
    echo (You may be prompted for your GitHub credentials)
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo ERROR: Push failed!
        echo.
        echo Possible reasons:
        echo 1. Authentication failed - you may need to use a Personal Access Token
        echo 2. Repository doesn't exist or you don't have access
        echo.
        echo For authentication, you can:
        echo - Use GitHub Desktop (easier)
        echo - Create a Personal Access Token at: https://github.com/settings/tokens
        echo   Then use the token as your password when prompted
    ) else (
        echo.
        echo ========================================
        echo SUCCESS! Code pushed to GitHub!
        echo ========================================
        echo.
        echo Repository: https://github.com/YourWebPartner1/CASK-ASSISTANCE
        echo.
        echo Next steps:
        echo 1. Deploy backend to Render (see DEPLOYMENT.md)
        echo 2. Deploy frontend to Vercel (see DEPLOYMENT.md)
        echo.
    )
) else (
    echo.
    echo No changes to commit. Everything is up to date!
    echo.
    echo If you want to force push, run:
    echo   git push -u origin main --force
    echo.
)

pause

