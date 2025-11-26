@echo off
echo ========================================
echo Firebase Admin Setup Script
echo ========================================
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Firebase CLI is not installed!
    echo Please install it first: npm install -g firebase-tools
    echo Then run: firebase login
    pause
    exit /b 1
)

echo Step 1: Installing Firebase Functions dependencies...
cd firebase\functions
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
cd ..\..

echo.
echo Step 2: Deploying Firebase Functions...
echo This may take a few minutes...
firebase deploy --only functions
if errorlevel 1 (
    echo ERROR: Failed to deploy functions
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Functions deployed.
echo ========================================
echo.
echo Next steps:
echo 1. Go to Firebase Console: https://console.firebase.google.com
echo 2. Click on "Authentication" in the left menu
echo 3. Click "Add user" button
echo 4. Enter your email and password
echo 5. Open make-admin.html in your browser
echo 6. Enter your email and click "Make Admin"
echo.
echo OR use the command line:
echo   cd firebase\scripts
echo   npm install
echo   npx ts-node setAdminUser.ts your-email@example.com
echo.
pause
