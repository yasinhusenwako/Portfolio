/**
 * Set admin claim for a user
 * Run this script to grant admin privileges to a user
 * 
 * Usage: ts-node setAdminUser.ts your-email@example.com
 */

import * as admin from "firebase-admin";

// Initialize Firebase Admin
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminClaim(email: string) {
  try {
    console.log(`🔍 Looking up user: ${email}`);
    
    const user = await admin.auth().getUserByEmail(email);
    
    console.log(`✅ User found: ${user.uid}`);
    console.log(`📝 Setting admin claim...`);
    
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`✅ Admin claim set successfully for ${email}`);
    console.log(`\n📌 The user needs to sign out and sign in again for the changes to take effect.`);
    
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      console.error(`❌ User not found: ${email}`);
      console.log(`\n💡 Create the user first using Firebase Authentication Console or:`);
      console.log(`   firebase auth:import users.json`);
    } else {
      console.error("❌ Error setting admin claim:", error);
    }
  } finally {
    process.exit();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error("❌ Please provide an email address");
  console.log("Usage: ts-node setAdminUser.ts your-email@example.com");
  process.exit(1);
}

// Run the script
setAdminClaim(email);
