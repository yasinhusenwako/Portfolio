@echo off
REM 🚀 Yasin Husen Portfolio - Automated Setup Script (Windows)
REM This script automates the Firebase backend setup process

echo 🚀 Starting Firebase Backend Setup...
echo ======================================
echo.

REM Check if Firebase CLI is installed
echo 📦 Checking prerequisites...
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Firebase CLI not found
    echo Installing Firebase CLI...
    npm install -g firebase-tools
) else (
    echo ✅ Firebase CLI found
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 18+ first.
    exit /b 1
) else (
    echo ✅ Node.js found
    node --version
)

echo.
echo 🔐 Logging into Firebase...
firebase login

echo.
echo 📁 Setting up project structure...

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update .env with your Firebase configuration
) else (
    echo ✅ .env file already exists
)

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔧 Setting up Firebase Functions...
cd firebase\functions
call npm install
cd ..\..

echo.
echo 🎯 Initializing Firebase project...
cd firebase
firebase use --add
cd ..

echo.
echo ======================================
echo ✅ Setup Complete!
echo ======================================
echo.
echo 📋 Next Steps:
echo.
echo 1. Update .env file with your Firebase configuration
echo.
echo 2. Enable Firebase services in console:
echo    - Firestore Database
echo    - Authentication (Email/Password)
echo    - Storage
echo    - Functions (Upgrade to Blaze plan)
echo.
echo 3. Configure email for notifications:
echo    firebase functions:config:set email.user="yhusen636@gmail.com" email.pass="your-app-password"
echo.
echo 4. Deploy security rules:
echo    npm run firebase:deploy:rules
echo.
echo 5. Deploy Cloud Functions:
echo    npm run firebase:deploy:functions
echo.
echo 6. Create admin user:
echo    - Create user in Firebase Console
echo    - Run: cd firebase\scripts ^&^& ts-node setAdminUser.ts your-email@example.com
echo.
echo 7. Initialize sample data (optional):
echo    cd firebase\scripts ^&^& ts-node initializeData.ts
echo.
echo 8. Start development:
echo    npm run dev
echo.
echo 📚 Documentation:
echo    - Quick Start: QUICK_START.md
echo    - Full Guide: BACKEND_DOCUMENTATION.md
echo    - Deployment: DEPLOYMENT_CHECKLIST.md
echo.
echo 🎉 Happy coding!
echo.
pause
