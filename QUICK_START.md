# 🚀 Quick Start Guide
## Get Your Firebase Backend Running in 10 Minutes

---

## ✅ Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Gmail account for email notifications

---

## 📦 Step-by-Step Setup

### 1️⃣ Login to Firebase
```bash
firebase login
```

### 2️⃣ Link Your Project
```bash
cd firebase
firebase use --add
# Select your project: yasin-husen-portfolio
```

### 3️⃣ Enable Firebase Services

Go to Firebase Console and enable:
- ✅ **Firestore Database** (Start in production mode)
- ✅ **Authentication** (Enable Email/Password)
- ✅ **Storage** (Start in production mode)
- ✅ **Functions** (Upgrade to Blaze plan - pay as you go)

### 4️⃣ Deploy Security Rules
```bash
firebase deploy --only firestore:rules,storage
```

### 5️⃣ Configure Email for Notifications

Get Gmail App Password:
1. Go to [Google Account](https://myaccount.google.com/)
2. Security → 2-Step Verification → App passwords
3. Generate password for "Mail"

Set in Firebase:
```bash
firebase functions:config:set email.user="yhusen636@gmail.com" email.pass="your-16-char-app-password"
```

### 6️⃣ Deploy Cloud Functions
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

⏳ This takes 3-5 minutes...

### 7️⃣ Create Admin User

In Firebase Console:
1. Go to **Authentication** → **Users** → **Add User**
2. Email: `yhusen636@gmail.com`
3. Password: (create a strong password)
4. Click **Add User**

### 8️⃣ Set Admin Privileges

Download service account key:
1. Firebase Console → **Project Settings** → **Service Accounts**
2. Click **Generate New Private Key**
3. Save as `firebase/serviceAccountKey.json`

Run admin script:
```bash
cd firebase/scripts
npm install -g ts-node typescript @types/node
npm install firebase-admin
ts-node setAdminUser.ts yhusen636@gmail.com
```

### 9️⃣ Initialize Sample Data (Optional)
```bash
ts-node initializeData.ts
```

### 🔟 Update Frontend Configuration

Create `.env` in project root:
```env
VITE_FIREBASE_API_KEY=AIzaSyDFYX6WA-GVrMSExo3sWbMw_dvv7gg1aG8
VITE_FIREBASE_AUTH_DOMAIN=yasin-husen-portfolio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=yasin-husen-portfolio
VITE_FIREBASE_STORAGE_BUCKET=yasin-husen-portfolio.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=489170254740
VITE_FIREBASE_APP_ID=1:489170254740:web:59c0c3fa054d3af8cfad81
VITE_FIREBASE_MEASUREMENT_ID=G-KPWBE4G8TF
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-yasin-husen-portfolio.cloudfunctions.net/api
```

---

## 🧪 Test Your Setup

### Test Contact Form
1. Run your app: `npm run dev`
2. Go to Contact page
3. Submit a message
4. Check your email for notification ✉️

### Test Admin Access
```typescript
// In browser console or admin page
import { authAPI } from "@/services/adminService";

await authAPI.signIn("yhusen636@gmail.com", "your-password");
// Should succeed if admin claim is set
```

### Test API Endpoints
```bash
# Get projects (public)
curl https://us-central1-yasin-husen-portfolio.cloudfunctions.net/api/api/projects

# Should return: {"success": true, "data": [...]}
```

---

## 🎯 What You Have Now

✅ **Secure Database** - Firestore with validation rules  
✅ **Admin Authentication** - Email/password with admin claims  
✅ **Cloud Functions** - RESTful API for CRUD operations  
✅ **Email Notifications** - Auto-send on contact form submission  
✅ **File Storage** - Upload images for projects and profile  
✅ **Security Rules** - Public read, admin write  

---

## 📱 Next Steps

### Build Admin Dashboard
Create admin pages to:
- View and manage projects
- View and respond to messages
- Update skills and about section
- Upload images

### Deploy to Production
```bash
# Build frontend
npm run build

# Deploy everything
cd firebase
firebase deploy
```

Your site will be live at:
`https://yasin-husen-portfolio.web.app`

---

## 🆘 Common Issues

### "Permission denied" on Firestore
**Fix:** Deploy rules again
```bash
firebase deploy --only firestore:rules
```

### Email not sending
**Fix:** Check config
```bash
firebase functions:config:get
```

### Functions not deploying
**Fix:** Check Node version
```bash
node --version  # Should be 18+
```

### Admin claim not working
**Fix:** User must sign out and sign in again after claim is set

---

## 📚 Full Documentation

For detailed information, see:
- `BACKEND_DOCUMENTATION.md` - Complete backend guide
- `FIREBASE_SETUP.md` - Firebase integration details

---

## 💬 Need Help?

**Email:** yhusen636@gmail.com  
**GitHub:** https://github.com/yasinhusenwako

---

**🎉 Congratulations! Your backend is ready!**
