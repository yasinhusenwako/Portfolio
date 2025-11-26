# How to Create Admin Account

## Quick Start (3 Steps)

### Step 1: Deploy Firebase Functions
Run the setup script:
```bash
setup-admin.bat
```

This will:
- Install Firebase Functions dependencies
- Deploy all cloud functions to Firebase

### Step 2: Create User in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **yasin-husen-portfolio**
3. Click **Authentication** in the left menu
4. Click **Add user** button
5. Enter your email and password (e.g., `admin@yasinhusen.com` / `YourSecurePassword123`)
6. Click **Add user**

### Step 3: Make User Admin

**Option A: Use the Web Interface (Easiest)**
1. Open `make-admin.html` in your browser
2. Enter the email you just created
3. Click "Make Admin"
4. Done! ✓

**Option B: Use Command Line**
```bash
cd firebase/scripts
npm install
npx ts-node setAdminUser.ts admin@yasinhusen.com
```

### Step 4: Login
1. Go to your website: `/admin`
2. Login with the email and password you created
3. You now have full admin access!

---

## Alternative: Use Demo Mode (No Setup Required)

If you just want to test the admin panel without Firebase setup:

**Login credentials:**
- Email: `admin@demo.com`
- Password: `demo123`

This uses localStorage and works immediately without any Firebase configuration.

---

## Troubleshooting

**"Firebase CLI not found"**
```bash
npm install -g firebase-tools
firebase login
```

**"Function not found"**
- Make sure you ran `setup-admin.bat` successfully
- Check Firebase Console → Functions to see if they're deployed

**"User not found"**
- Make sure you created the user in Firebase Console first
- Check Firebase Console → Authentication → Users

**"Still not admin after running script"**
- Sign out completely from your website
- Clear browser cache
- Sign in again

---

## Your Firebase Project Details

- **Project ID:** yasin-husen-portfolio
- **Auth Domain:** yasin-husen-portfolio.firebaseapp.com
- **Console:** https://console.firebase.google.com/project/yasin-husen-portfolio

---

## Security Note

After creating your admin account, you may want to:
1. Delete or restrict access to `make-admin.html`
2. Add security rules to the `setAdminClaim` function
3. Keep your admin credentials secure
