# 🚀 Yasin Husen - Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Firebase backend.

![Portfolio Preview](https://via.placeholder.com/1200x600?text=Portfolio+Preview)

## 👨‍💻 About

I'm Yasin Husen, a passionate Full Stack Developer specializing in building modern web applications with React, Node.js, and cloud technologies.

**Live Site:** [Coming Soon]  
**Email:** yhusen636@gmail.com  
**GitHub:** [@yasinhusenwako](https://github.com/yasinhusenwako)  
**LinkedIn:** [Yasin Husen](https://www.linkedin.com/in/yasin-husen-79a3a5364/)

---

## ✨ Features

### Frontend
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Mobile-first approach
- 🌙 Clean UI with shadcn/ui components
- 🎯 SEO optimized

### Backend (Firebase)
- 🔥 Firestore database for projects, skills, and messages
- 🔐 Firebase Authentication with admin access
- ☁️ Cloud Functions for RESTful API
- 📧 Email notifications on contact form submission
- 🖼️ Firebase Storage for images
- 🛡️ Comprehensive security rules
- 📊 Real-time data synchronization

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router
- **Icons:** Lucide React

### Backend
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage
- **Functions:** Cloud Functions (Node.js/TypeScript)
- **Email:** Nodemailer with Gmail
- **API:** RESTful API with Express

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase CLI (for backend deployment)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yasinhusenwako/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup

See detailed instructions in:
- **Quick Start:** [`QUICK_START.md`](QUICK_START.md) - 10-minute setup
- **Full Guide:** [`BACKEND_DOCUMENTATION.md`](BACKEND_DOCUMENTATION.md) - Complete documentation

**Quick Backend Setup:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy backend
cd firebase
firebase deploy
```

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── PageLayout.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useFirebase.ts
│   ├── services/           # API services
│   │   └── adminService.ts
│   ├── lib/                # Utilities
│   │   ├── firebase.ts
│   │   └── utils.ts
│   └── assets/             # Images and static files
├── firebase/               # Firebase backend
│   ├── functions/          # Cloud Functions
│   ├── scripts/            # Utility scripts
│   ├── firestore.rules     # Database security
│   └── storage.rules       # Storage security
├── public/                 # Public assets
└── docs/                   # Documentation
```

---

## 🚀 Deployment

### Frontend Deployment

**Option 1: Firebase Hosting**
```bash
npm run build
firebase deploy --only hosting
```

**Option 2: Vercel**
```bash
npm run build
vercel --prod
```

**Option 3: Netlify**
```bash
npm run build
netlify deploy --prod
```

### Backend Deployment

```bash
cd firebase
firebase deploy
```

See [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) for complete deployment guide.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`BACKEND_DOCUMENTATION.md`](BACKEND_DOCUMENTATION.md) | Complete backend guide with API docs |
| [`QUICK_START.md`](QUICK_START.md) | 10-minute backend setup guide |
| [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) | Production deployment steps |
| [`BACKEND_SUMMARY.md`](BACKEND_SUMMARY.md) | Backend features overview |
| [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) | Firebase integration details |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_FIREBASE_FUNCTIONS_URL=your-functions-url
```

See `.env.example` for template.

---

## 🎯 Features Roadmap

### ✅ Completed
- [x] Responsive portfolio design
- [x] Firebase backend integration
- [x] Contact form with email notifications
- [x] Admin authentication
- [x] CRUD API for projects
- [x] Security rules implementation
- [x] Image upload functionality

### 🚧 In Progress
- [ ] Admin dashboard UI
- [ ] Blog functionality
- [ ] Project categories
- [ ] Dark mode toggle

### 📋 Planned
- [ ] Testimonials section
- [ ] Newsletter signup
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

**Yasin Husen**  
Full Stack Developer

- 📧 Email: yhusen636@gmail.com
- 💼 LinkedIn: [Yasin Husen](https://www.linkedin.com/in/yasin-husen-79a3a5364/)
- 🐙 GitHub: [@yasinhusenwako](https://github.com/yasinhusenwako)
- 📱 Telegram: [@uppdate](https://t.me/uppdate)
- 🐦 Twitter: [@YasinHusen71367](https://twitter.com/YasinHusen71367)
- 📍 Location: Addis Ababa, Ethiopia

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yasinhusenwako/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/yasinhusenwako/portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/yasinhusenwako/portfolio)
![GitHub license](https://img.shields.io/github/license/yasinhusenwako/portfolio)

---

**⭐ If you like this project, please give it a star!**

Made with ❤️ by Yasin Husen
