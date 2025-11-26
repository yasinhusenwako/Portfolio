# 🚀 Firebase Backend Documentation
## Yasin Husen Portfolio - Complete Backend Setup

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Setup Instructions](#setup-instructions)
3. [Database Structure](#database-structure)
4. [Security Rules](#security-rules)
5. [Cloud Functions](#cloud-functions)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Deployment](#deployment)
9. [Testing](#testing)

---

## 🏗️ Architecture Overview

### Technology Stack
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Functions**: Cloud Functions (Node.js/TypeScript)
- **Hosting**: Firebase Hosting
- **Email**: Nodemailer with Gmail

### Key Features
✅ Secure admin-only CRUD operations  
✅ Public read access for portfolio content  
✅ Contact form with email notifications  
✅ Image upload and optimization  
✅ Real-time data synchronization  
✅ Comprehensive validation  
✅ Error handling and logging  

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project created at console.firebase.google.com

### Step 1: Firebase CLI Login
```bash
firebase login
```

### Step 2: Initialize Firebase Project
```bash
cd firebase
firebase init
```

Select:
- ✅ Firestore
- ✅ Functions
- ✅ Storage
- ✅ Hosting

### Step 3: Install Dependencies
```bash
# Install frontend dependencies (already done)
npm install

# Install Cloud Functions dependencies
cd firebase/functions
npm install
cd ../..
```

### Step 4: Configure Environment Variables

Create `.env` file in root:
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

### Step 5: Configure Email for Cloud Functions
```bash
cd firebase
firebase functions:config:set email.user="yhusen636@gmail.com" email.pass="your-app-password"
```

**Get Gmail App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App passwords → Generate new password
4. Use this password in the config above

### Step 6: Download Service Account Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `firebase/serviceAccountKey.json`
4. **⚠️ Never commit this file to Git!**

### Step 7: Initialize Database with Sample Data
```bash
cd firebase/scripts
npm install -g ts-node
ts-node initializeData.ts
```

### Step 8: Create Admin User

First, create a user in Firebase Console:
1. Go to Authentication → Users → Add User
2. Email: `yhusen636@gmail.com`
3. Password: (your secure password)

Then set admin claim:
```bash
cd firebase/scripts
ts-node setAdminUser.ts yhusen636@gmail.com
```

---

## 📊 Database Structure

### Collections

#### 1. **projects**
```typescript
{
  id: string (auto-generated)
  title: string
  description: string
  techStack: string[]
  imageURL: string
  githubURL: string
  liveDemoURL: string
  featured: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### 2. **skills**
```typescript
{
  id: string (auto-generated)
  category: string  // "Frontend", "Backend", "DevOps", etc.
  skills: string[]
  createdAt: Timestamp
}
```

#### 3. **about/profile** (document)
```typescript
{
  bio: string
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  profileImageURL: string
  updatedAt: Timestamp
}
```

#### 4. **messages**
```typescript
{
  id: string (auto-generated)
  name: string
  email: string
  subject: string
  message: string
  timestamp: Timestamp
  read: boolean
  readAt?: Timestamp
}
```

---

## 🔒 Security Rules

### Firestore Rules (`firebase/firestore.rules`)

**Key Security Features:**
- ✅ Public can read projects, skills, about
- ✅ Only admin can create/update/delete
- ✅ Public can create messages (contact form)
- ✅ Only admin can read/delete messages
- ✅ Data validation on all writes
- ✅ Email format validation

### Storage Rules (`firebase/storage.rules`)

**Key Security Features:**
- ✅ Public can read all images
- ✅ Only admin can upload/delete
- ✅ Image type validation
- ✅ 5MB file size limit

---

## ☁️ Cloud Functions

### Available Functions

#### 1. **api** (HTTP Function)
Main API endpoint for all CRUD operations.

**Base URL:** `https://us-central1-yasin-husen-portfolio.cloudfunctions.net/api`

#### 2. **onNewMessage** (Firestore Trigger)
Automatically sends email notification when new contact message is received.

**Trigger:** `onCreate` on `messages/{messageId}`

#### 3. **setAdminClaim** (Callable Function)
Sets admin custom claim for a user (use script instead).

---

## 🌐 API Endpoints

### Projects

#### Get All Projects
```http
GET /api/projects
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "title": "Project Name",
      "description": "...",
      "techStack": ["React", "Node.js"],
      "imageURL": "...",
      "githubURL": "...",
      "liveDemoURL": "...",
      "featured": true,
      "createdAt": "..."
    }
  ]
}
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Create Project (Admin Only)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "techStack": ["React", "TypeScript"],
  "imageURL": "https://...",
  "githubURL": "https://github.com/...",
  "liveDemoURL": "https://...",
  "featured": false
}
```

#### Update Project (Admin Only)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "featured": true
}
```

#### Delete Project (Admin Only)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Skills

#### Get All Skills
```http
GET /api/skills
```

#### Create Skill Category (Admin Only)
```http
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "Frontend",
  "skills": ["React", "Vue", "Angular"]
}
```

#### Update Skill Category (Admin Only)
```http
PUT /api/skills/:id
Authorization: Bearer <token>
```

#### Delete Skill Category (Admin Only)
```http
DELETE /api/skills/:id
Authorization: Bearer <token>
```

### About

#### Get About Info
```http
GET /api/about
```

#### Update About Info (Admin Only)
```http
PUT /api/about
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Updated bio",
  "experience": [...],
  "profileImageURL": "https://..."
}
```

### Messages

#### Get All Messages (Admin Only)
```http
GET /api/messages
Authorization: Bearer <token>
```

#### Mark Message as Read (Admin Only)
```http
PUT /api/messages/:id/read
Authorization: Bearer <token>
```

#### Delete Message (Admin Only)
```http
DELETE /api/messages/:id
Authorization: Bearer <token>
```

---

## 🔐 Authentication

### Admin Login (Frontend)
```typescript
import { authAPI } from "@/services/adminService";

const user = await authAPI.signIn("yhusen636@gmail.com", "password");
```

### Using Auth in Components
```typescript
import { useAuth } from "@/hooks/useAuth";

const { user, isAdmin, signIn, signOut } = useAuth();

if (isAdmin) {
  // Show admin features
}
```

### Making Authenticated API Calls
```typescript
import { projectsAPI } from "@/services/adminService";

// Create project (requires admin auth)
await projectsAPI.create({
  title: "New Project",
  description: "...",
  // ...
});
```

---

## 🚀 Deployment

### Deploy Everything
```bash
cd firebase
firebase deploy
```

### Deploy Specific Services

#### Firestore Rules Only
```bash
firebase deploy --only firestore:rules
```

#### Storage Rules Only
```bash
firebase deploy --only storage
```

#### Cloud Functions Only
```bash
firebase deploy --only functions
```

#### Hosting Only
```bash
npm run build
firebase deploy --only hosting
```

### Deploy Specific Function
```bash
firebase deploy --only functions:api
firebase deploy --only functions:onNewMessage
```

---

## 🧪 Testing

### Test Cloud Functions Locally
```bash
cd firebase/functions
npm run serve
```

Functions will be available at:
- `http://localhost:5001/yasin-husen-portfolio/us-central1/api`

### Test API Endpoints
```bash
# Get projects
curl http://localhost:5001/yasin-husen-portfolio/us-central1/api/api/projects

# Create project (requires auth token)
curl -X POST http://localhost:5001/yasin-husen-portfolio/us-central1/api/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test",...}'
```

### Test Firestore Rules
```bash
firebase emulators:start --only firestore
```

---

## 📝 Usage Examples

### Frontend Integration

#### Fetch Projects
```typescript
import { projectsAPI } from "@/services/adminService";

const { data: projects } = await projectsAPI.getAll();
```

#### Submit Contact Form
```typescript
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

await addDoc(collection(db, "messages"), {
  name: "John Doe",
  email: "john@example.com",
  subject: "Inquiry",
  message: "Hello!",
  timestamp: serverTimestamp(),
  read: false
});
```

#### Upload Image (Admin)
```typescript
import { storageAPI } from "@/services/adminService";

const file = event.target.files[0];
const imageURL = await storageAPI.uploadImage(
  file, 
  `projects/${Date.now()}_${file.name}`
);
```

---

## 🔧 Maintenance

### View Logs
```bash
firebase functions:log
```

### Monitor Performance
Go to Firebase Console → Performance

### Check Usage
Go to Firebase Console → Usage and Billing

---

## 🆘 Troubleshooting

### Issue: "Permission denied" errors
**Solution:** Check Firestore rules and ensure user has admin claim

### Issue: Email notifications not working
**Solution:** 
1. Verify email config: `firebase functions:config:get`
2. Check Gmail app password is correct
3. Enable "Less secure app access" if needed

### Issue: Functions deployment fails
**Solution:**
1. Check Node.js version (must be 18)
2. Run `npm install` in functions directory
3. Check for TypeScript errors: `npm run build`

### Issue: CORS errors
**Solution:** Functions already have CORS enabled. Check frontend URL configuration.

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

## 👨‍💻 Developer: Yasin Husen
**Email:** yhusen636@gmail.com  
**GitHub:** https://github.com/yasinhusenwako  
**LinkedIn:** https://www.linkedin.com/in/yasin-husen-79a3a5364/

---

**Last Updated:** November 2024
