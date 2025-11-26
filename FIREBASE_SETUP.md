# Firebase Setup Guide

## Overview
This project uses Firebase as the backend for storing contact form submissions and other data.

## Installed Services

### Firebase Core
- **Firebase App**: Main Firebase initialization
- **Analytics**: Track user interactions and page views
- **Firestore**: NoSQL database for storing messages and data
- **Authentication**: User authentication (ready to use)
- **Storage**: File storage (ready to use)

## Configuration

The Firebase configuration is located in `src/lib/firebase.ts`:

```typescript
import { app, analytics, db, auth, storage } from "@/lib/firebase";
```

## Current Implementation

### Contact Form
The contact form (`src/pages/Contact.tsx`) now saves submissions to Firestore:
- Collection: `messages`
- Fields: name, email, subject, message, timestamp, read

### Firebase Hooks
Custom hooks are available in `src/hooks/useFirebase.ts`:

1. **useFirestoreCollection** - Fetch real-time data from a collection
2. **useAddDocument** - Add documents to a collection
3. **useUpdateDocument** - Update existing documents
4. **useDeleteDocument** - Delete documents

## Usage Examples

### Reading Messages (Admin Panel)
```typescript
import { useFirestoreCollection } from "@/hooks/useFirebase";
import { orderBy } from "firebase/firestore";

const { data: messages, loading } = useFirestoreCollection(
  "messages", 
  orderBy("timestamp", "desc")
);
```

### Adding Data
```typescript
import { useAddDocument } from "@/hooks/useFirebase";

const { addDocument } = useAddDocument("messages");

await addDocument({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello!"
});
```

### Updating Data
```typescript
import { useUpdateDocument } from "@/hooks/useFirebase";

const { updateDocument } = useUpdateDocument("messages");

await updateDocument(messageId, { read: true });
```

## Firestore Security Rules

Make sure to set up proper security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to messages (contact form)
    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Next Steps

1. **Set up Firestore Database** in Firebase Console
2. **Configure Security Rules** as shown above
3. **Enable Analytics** (optional)
4. **Add Authentication** if you want an admin panel
5. **Create an admin dashboard** to view messages

## Environment Variables (Optional)

For better security, consider moving Firebase config to environment variables:

Create `.env.local`:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Then update `src/lib/firebase.ts` to use these variables.
