import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import profileImage from "@/assets/yasin-profile.jpg";

const Home = () => {
  return (
    <PageLayout>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 ml-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-glass border border-glass-border rounded-full text-sm text-muted-foreground backdrop-blur-sm"
              >
                <Sparkles size={16} className="text-primary" />
                Welcome to my portfolio
              </motion.div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                >
                  Hello<span className="text-primary">.</span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-semibold text-muted-foreground mb-2"
                >
                  I'm <span className="text-foreground">Yasin Husen</span>
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-primary"
                >
                  Full Stack Developer
                </motion.h3>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground max-w-xl"
              >
                Crafting elegant solutions through code. Passionate about building scalable web applications
                that make a difference.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/projects">
                  <button className="group px-8 py-3 bg-hero text-hero-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2">
                    View Projects
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all duration-300 flex items-center gap-2">
                    <Code2 size={18} />
                    Get in Touch
                  </button>
                </Link>
              </motion.div>

              {/* Tech stack preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {["React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"].map((tech, index) => (
                  <span
                    key={tech}
                    className="text-sm text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right content - Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end mr-8"
            >
              <div className="relative">
                {/* Geometric elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-8 -left-8 w-32 h-32 border-2 border-primary/30 rounded-full"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-8 -right-8 w-40 h-40 border-2 border-primary/20"
                  style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                />

                {/* Profile image with glow effect */}
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/40 backdrop-blur-sm">
                    <img
                      src={profileImage}
                      alt="Yasin Husen - Full Stack Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { value: "20+", label: "Projects Completed", icon: "📊" },
              { value: "15+", label: "Happy Clients", icon: "😊" },
              { value: "5+", label: "Years Experience", icon: "⚡" },
              { value: "95%", label: "Success Rate", icon: "🎯" },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-glass border border-glass-border rounded-xl p-6 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {highlight.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{highlight.value}</div>
                <div className="text-sm text-muted-foreground">{highlight.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Let's Work Together Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/contact">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  Get In Touch
                </button>
              </Link>
              <a href="/cv.pdf" download>
                <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all duration-300 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
