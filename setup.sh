#!/bin/bash

# 🚀 Yasin Husen Portfolio - Automated Setup Script
# This script automates the Firebase backend setup process

echo "🚀 Starting Firebase Backend Setup..."
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
echo "📦 Checking prerequisites..."
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI not found${NC}"
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
else
    echo -e "${GREEN}✅ Firebase CLI found${NC}"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+ first.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
fi

echo ""
echo "🔐 Logging into Firebase..."
firebase login

echo ""
echo "📁 Setting up project structure..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update .env with your Firebase configuration${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up Firebase Functions..."
cd firebase/functions
npm install
cd ../..

echo ""
echo "🎯 Initializing Firebase project..."
cd firebase
firebase use --add
cd ..

echo ""
echo "======================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Update .env file with your Firebase configuration"
echo ""
echo "2. Enable Firebase services in console:"
echo "   - Firestore Database"
echo "   - Authentication (Email/Password)"
echo "   - Storage"
echo "   - Functions (Upgrade to Blaze plan)"
echo ""
echo "3. Configure email for notifications:"
echo "   firebase functions:config:set email.user=\"yhusen636@gmail.com\" email.pass=\"your-app-password\""
echo ""
echo "4. Deploy security rules:"
echo "   npm run firebase:deploy:rules"
echo ""
echo "5. Deploy Cloud Functions:"
echo "   npm run firebase:deploy:functions"
echo ""
echo "6. Create admin user:"
echo "   - Create user in Firebase Console"
echo "   - Run: cd firebase/scripts && ts-node setAdminUser.ts your-email@example.com"
echo ""
echo "7. Initialize sample data (optional):"
echo "   cd firebase/scripts && ts-node initializeData.ts"
echo ""
echo "8. Start development:"
echo "   npm run dev"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Full Guide: BACKEND_DOCUMENTATION.md"
echo "   - Deployment: DEPLOYMENT_CHECKLIST.md"
echo ""
echo "🎉 Happy coding!"
