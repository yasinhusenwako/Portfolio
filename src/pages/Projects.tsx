import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const defaultProjects = [
  {
    title: "AI-Powered Analytics Platform",
    description:
      "A comprehensive analytics dashboard with AI-driven insights for business intelligence and data visualization.",
    image: project1,
    tags: ["React", "Node.js", "MongoDB", "TensorFlow"],
    github: "https://github.com/yasinhusenwako/analytics-platform",
    demo: "https://analytics-demo.example.com",
  },
  {
    title: "E-Commerce Marketplace",
    description:
      "Full-stack e-commerce platform with payment integration, inventory management, and real-time order tracking.",
    image: project2,
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    github: "https://github.com/yasinhusenwako/ecommerce-app",
    demo: "https://ecommerce-demo.example.com",
  },
  {
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile app for fitness tracking with workout plans, progress analytics, and social features.",
    image: project3,
    tags: ["React Native", "Firebase", "TypeScript"],
    github: "https://github.com/yasinhusenwako/fitness-tracker",
    demo: "https://fitness-demo.example.com",
  },
  {
    title: "Project Management Suite",
    description:
      "Collaborative project management tool with kanban boards, time tracking, and team communication features.",
    image: project4,
    tags: ["Vue.js", "Express", "Socket.io", "MySQL"],
    github: "https://github.com/yasinhusenwako/project-suite",
    demo: "https://project-demo.example.com",
  },
  {
    title: "Social Media Dashboard",
    description:
      "Unified dashboard for managing multiple social media accounts with analytics and scheduling capabilities.",
    image: project5,
    tags: ["React", "GraphQL", "PostgreSQL", "AWS"],
    github: "https://github.com/yasinhusenwako/social-dashboard",
    demo: "https://social-demo.example.com",
  },
  {
    title: "Task Automation Platform",
    description:
      "No-code automation platform for connecting apps and automating workflows with a visual builder interface.",
    image: project6,
    tags: ["Angular", "Python", "Docker", "Kubernetes"],
    github: "https://github.com/yasinhusenwako/automation-platform",
    demo: "https://automation-demo.example.com",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        const querySnapshot = await getDocs(collection(db, "projects"));
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        }
      } catch (error) {
        console.log("Using default projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              My <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing recent work and technical expertise
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.imageURL || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.techStack || project.tags).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.githubURL || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.liveDemoURL || project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
