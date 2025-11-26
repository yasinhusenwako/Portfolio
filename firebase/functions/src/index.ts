import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as express from "express";
import * as cors from "cors";

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email?.user || process.env.EMAIL_USER,
    pass: functions.config().email?.pass || process.env.EMAIL_PASS,
  },
});

// Express app for API endpoints
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ============================================
// HELPER FUNCTIONS
// ============================================

// Verify admin token
const verifyAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    if (!decodedToken.admin) {
      res.status(403).json({ error: "Forbidden: Admin access required" });
      return;
    }
    
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// ============================================
// PROJECTS CRUD OPERATIONS
// ============================================

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const snapshot = await db.collection("projects")
      .orderBy("createdAt", "desc")
      .get();
    
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get single project
app.get("/api/projects/:id", async (req, res) => {
  try {
    const doc = await db.collection("projects").doc(req.params.id).get();
    
    if (!doc.exists) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create project (Admin only)
app.post("/api/projects", verifyAdmin, async (req, res) => {
  try {
    const { title, description, techStack, imageURL, githubURL, liveDemoURL, featured } = req.body;
    
    // Validation
    if (!title || !description || !techStack || !imageURL || !githubURL || !liveDemoURL) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    
    const projectData = {
      title,
      description,
      techStack,
      imageURL,
      githubURL,
      liveDemoURL,
      featured: featured || false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    const docRef = await db.collection("projects").add(projectData);
    
    res.json({ 
      success: true, 
      message: "Project created successfully",
      data: { id: docRef.id, ...projectData }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update project (Admin only)
app.put("/api/projects/:id", verifyAdmin, async (req, res) => {
  try {
    const { title, description, techStack, imageURL, githubURL, liveDemoURL, featured } = req.body;
    
    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (techStack) updateData.techStack = techStack;
    if (imageURL) updateData.imageURL = imageURL;
    if (githubURL) updateData.githubURL = githubURL;
    if (liveDemoURL) updateData.liveDemoURL = liveDemoURL;
    if (featured !== undefined) updateData.featured = featured;
    
    await db.collection("projects").doc(req.params.id).update(updateData);
    
    res.json({ 
      success: true, 
      message: "Project updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete project (Admin only)
app.delete("/api/projects/:id", verifyAdmin, async (req, res) => {
  try {
    await db.collection("projects").doc(req.params.id).delete();
    
    res.json({ 
      success: true, 
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ============================================
// SKILLS CRUD OPERATIONS
// ============================================

// Get all skills
app.get("/api/skills", async (req, res) => {
  try {
    const snapshot = await db.collection("skills").get();
    
    const skills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Create skill category (Admin only)
app.post("/api/skills", verifyAdmin, async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    if (!category || !skills || !Array.isArray(skills)) {
      res.status(400).json({ error: "Invalid data format" });
      return;
    }
    
    const skillData = {
      category,
      skills,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    const docRef = await db.collection("skills").add(skillData);
    
    res.json({ 
      success: true, 
      message: "Skill category created successfully",
      data: { id: docRef.id, ...skillData }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create skill category" });
  }
});

// Update skill category (Admin only)
app.put("/api/skills/:id", verifyAdmin, async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    const updateData: any = {};
    if (category) updateData.category = category;
    if (skills) updateData.skills = skills;
    
    await db.collection("skills").doc(req.params.id).update(updateData);
    
    res.json({ 
      success: true, 
      message: "Skill category updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill category" });
  }
});

// Delete skill category (Admin only)
app.delete("/api/skills/:id", verifyAdmin, async (req, res) => {
  try {
    await db.collection("skills").doc(req.params.id).delete();
    
    res.json({ 
      success: true, 
      message: "Skill category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill category" });
  }
});

// ============================================
// ABOUT OPERATIONS
// ============================================

// Get about info
app.get("/api/about", async (req, res) => {
  try {
    const doc = await db.collection("about").doc("profile").get();
    
    if (!doc.exists) {
      res.status(404).json({ error: "About info not found" });
      return;
    }
    
    res.json({ success: true, data: doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch about info" });
  }
});

// Update about info (Admin only)
app.put("/api/about", verifyAdmin, async (req, res) => {
  try {
    const { bio, experience, profileImageURL } = req.body;
    
    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    if (bio) updateData.bio = bio;
    if (experience) updateData.experience = experience;
    if (profileImageURL) updateData.profileImageURL = profileImageURL;
    
    await db.collection("about").doc("profile").set(updateData, { merge: true });
    
    res.json({ 
      success: true, 
      message: "About info updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update about info" });
  }
});

// ============================================
// MESSAGES OPERATIONS
// ============================================

// Get all messages (Admin only)
app.get("/api/messages", verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection("messages")
      .orderBy("timestamp", "desc")
      .get();
    
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Mark message as read (Admin only)
app.put("/api/messages/:id/read", verifyAdmin, async (req, res) => {
  try {
    await db.collection("messages").doc(req.params.id).update({
      read: true,
      readAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    res.json({ 
      success: true, 
      message: "Message marked as read"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
});

// Delete message (Admin only)
app.delete("/api/messages/:id", verifyAdmin, async (req, res) => {
  try {
    await db.collection("messages").doc(req.params.id).delete();
    
    res.json({ 
      success: true, 
      message: "Message deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// ============================================
// CLOUD FUNCTIONS
// ============================================

// Export API
export const api = functions.https.onRequest(app);

// Send email notification when new message is received
export const onNewMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap, context) => {
    const message = snap.data();
    
    const mailOptions = {
      from: `Portfolio Contact <${functions.config().email?.user}>`,
      to: "yhusen636@gmail.com", // Your email
      subject: `New Contact Message: ${message.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email notification sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

// Set admin claim for a user (run once to create admin)
export const setAdminClaim = functions.https.onCall(async (data, context) => {
  // This should be protected - only run once manually or with proper authentication
  const { email } = data;
  
  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "Email is required");
  }
  
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    return { 
      success: true, 
      message: `Admin claim set for ${email}` 
    };
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Failed to set admin claim");
  }
});
