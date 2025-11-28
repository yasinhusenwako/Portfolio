import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Wrench,
  Cloud,
  Globe,
  Smartphone,
  GitBranch,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        
        const querySnapshot = await getDocs(collection(db, "skills"));
        const fetchedSkills = querySnapshot.docs.map(doc => doc.data());
        
        if (fetchedSkills.length > 0) {
          const mappedSkills = fetchedSkills.map((skill: any, index: number) => ({
            title: skill.category,
            icon: getIconForCategory(index),
            color: getColorForCategory(index),
            skills: (skill.skills || []).map((s: string) => ({ 
              name: s, 
              level: 85 + Math.floor(Math.random() * 15)
            })),
          }));
          setSkillCategories(mappedSkills);
        } else {
          setSkillCategories(defaultSkillCategories);
        }
      } catch (error) {
        console.log("Using default skills");
        setSkillCategories(defaultSkillCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getIconForCategory = (index: number) => {
    const icons = [Globe, Server, Database, Cloud, Code2, Wrench, Smartphone, GitBranch];
    return icons[index % icons.length];
  };

  const getColorForCategory = (index: number) => {
    const colors = [
      "text-blue-500",
      "text-green-500",
      "text-purple-500",
      "text-orange-500",
      "text-pink-500",
      "text-yellow-500",
      "text-cyan-500",
      "text-red-500",
    ];
    return colors[index % colors.length];
  };

  const defaultSkillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      color: "text-blue-500",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 92 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Vue.js", level: 85 },
        { name: "HTML/CSS", level: 98 },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "text-green-500",
      skills: [
        { name: "Node.js", level: 93 },
        { name: "Express.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "Django", level: 80 },
        { name: "GraphQL", level: 88 },
        { name: "REST APIs", level: 95 },
      ],
    },
    {
      title: "Databases",
      icon: Database,
      color: "text-purple-500",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 92 },
        { name: "MySQL", level: 88 },
        { name: "Redis", level: 85 },
        { name: "Firebase", level: 87 },
      ],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      color: "text-pink-500",
      skills: [
        { name: "React Native", level: 88 },
        { name: "Flutter", level: 82 },
        { name: "Expo", level: 90 },
        { name: "Mobile UI/UX", level: 85 },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: Cloud,
      color: "text-orange-500",
      skills: [
        { name: "Docker", level: 87 },
        { name: "AWS", level: 85 },
        { name: "CI/CD", level: 88 },
        { name: "Nginx", level: 82 },
        { name: "Kubernetes", level: 78 },
      ],
    },
    {
      title: "Version Control & Collaboration",
      icon: GitBranch,
      color: "text-teal-500",
      skills: [
        { name: "Git", level: 95 },
        { name: "GitHub", level: 93 },
        { name: "GitLab", level: 88 },
        { name: "Agile/Scrum", level: 90 },
      ],
    },
  ];

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
              My <span className="text-primary">Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className={`${category.color}`} size={24} />
                  </div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                          }}
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Other Tools & Technologies</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "VS Code",
                "Figma",
                "Postman",
                "Jest",
                "Webpack",
                "Vite",
                "Prisma",
                "Socket.io",
                "Stripe",
                "Vercel",
                "Netlify",
                "Linux",
              ].map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="px-6 py-3 bg-glass border border-glass-border rounded-lg text-sm font-medium hover:border-primary/50 transition-colors backdrop-blur-sm"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Skills;
