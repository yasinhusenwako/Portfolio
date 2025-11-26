/**
 * Initialize Firestore with sample data
 * Run this script once to populate your database with initial data
 * 
 * Usage: ts-node initializeData.ts
 */

import * as admin from "firebase-admin";

// Initialize Firebase Admin
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function initializeData() {
  console.log("🚀 Starting data initialization...\n");

  try {
    // ============================================
    // Initialize About Section
    // ============================================
    console.log("📝 Creating about section...");
    await db.collection("about").doc("profile").set({
      bio: "I'm Yasin Husen, a passionate Full Stack Developer with expertise in building modern web applications. I specialize in React, Node.js, and cloud technologies, creating scalable and user-friendly solutions.",
      experience: [
        {
          title: "Full Stack Developer",
          company: "Freelance",
          period: "2020 - Present",
          description: "Building custom web applications for clients worldwide",
        },
        {
          title: "Frontend Developer",
          company: "Tech Company",
          period: "2018 - 2020",
          description: "Developed responsive web applications using React and TypeScript",
        },
      ],
      profileImageURL: "https://via.placeholder.com/400",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("✅ About section created\n");

    // ============================================
    // Initialize Skills
    // ============================================
    console.log("💪 Creating skills...");
    
    const skills = [
      {
        category: "Frontend",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
      },
      {
        category: "Backend",
        skills: ["Node.js", "Express", "Python", "Django", "GraphQL"],
      },
      {
        category: "Database",
        skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"],
      },
      {
        category: "DevOps",
        skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Git"],
      },
      {
        category: "Tools",
        skills: ["VS Code", "Figma", "Postman", "Jest", "Webpack"],
      },
    ];

    for (const skill of skills) {
      await db.collection("skills").add({
        ...skill,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("✅ Skills created\n");

    // ============================================
    // Initialize Sample Projects
    // ============================================
    console.log("🎨 Creating sample projects...");
    
    const projects = [
      {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
        techStack: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
        imageURL: "https://via.placeholder.com/600x400",
        githubURL: "https://github.com/yasinhusenwako/ecommerce-platform",
        liveDemoURL: "https://demo.example.com",
        featured: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates and team features.",
        techStack: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
        imageURL: "https://via.placeholder.com/600x400",
        githubURL: "https://github.com/yasinhusenwako/task-manager",
        liveDemoURL: "https://demo.example.com",
        featured: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        title: "Social Media Dashboard",
        description: "Analytics dashboard for managing multiple social media accounts with scheduling features.",
        techStack: ["React", "GraphQL", "PostgreSQL", "Docker"],
        imageURL: "https://via.placeholder.com/600x400",
        githubURL: "https://github.com/yasinhusenwako/social-dashboard",
        liveDemoURL: "https://demo.example.com",
        featured: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const project of projects) {
      await db.collection("projects").add(project);
    }
    console.log("✅ Sample projects created\n");

    console.log("🎉 Data initialization completed successfully!");
    console.log("\n📌 Next steps:");
    console.log("1. Deploy Firestore rules: firebase deploy --only firestore:rules");
    console.log("2. Deploy Storage rules: firebase deploy --only storage");
    console.log("3. Deploy Cloud Functions: firebase deploy --only functions");
    console.log("4. Create admin user and set admin claim");
    
  } catch (error) {
    console.error("❌ Error initializing data:", error);
  } finally {
    process.exit();
  }
}

// Run initialization
initializeData();
