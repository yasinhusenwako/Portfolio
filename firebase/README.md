# Firebase Backend Structure

## 📁 Folder Structure

```
firebase/
├── functions/                  # Cloud Functions
│   ├── src/
│   │   └── index.ts           # Main functions file
│   ├── package.json
│   └── tsconfig.json
├── scripts/                    # Utility scripts
│   ├── initializeData.ts      # Initialize database with sample data
│   └── setAdminUser.ts        # Set admin claim for user
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore indexes
├── storage.rules              # Storage security rules
├── firebase.json              # Firebase configuration
└── serviceAccountKey.json     # Service account (DO NOT COMMIT!)
```

## 🚀 Quick Commands

### Deploy All
```bash
firebase deploy
```

### Deploy Specific Services
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only functions
firebase deploy --only hosting
```

### Test Locally
```bash
# Start emulators
firebase emulators:start

# Test functions only
cd functions
npm run serve
```

### View Logs
```bash
firebase functions:log
```

### Initialize Data
```bash
cd scripts
ts-node initializeData.ts
```

### Set Admin User
```bash
cd scripts
ts-node setAdminUser.ts your-email@example.com
```

## 📝 Configuration

### Email Config
```bash
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.pass="your-app-password"
```

### View Config
```bash
firebase functions:config:get
```

## 🔒 Security

**Important Files to Keep Secret:**
- `serviceAccountKey.json` - Never commit to Git!
- Email passwords in functions config
- `.env` files with API keys

These are already in `.gitignore`.

## 📚 Documentation

See root directory for:
- `BACKEND_DOCUMENTATION.md` - Complete backend guide
- `QUICK_START.md` - Quick setup guide
- `FIREBASE_SETUP.md` - Firebase integration details

## 🆘 Support

For issues or questions:
- Email: yhusen636@gmail.com
- GitHub: https://github.com/yasinhusenwako
