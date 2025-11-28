import { motion } from "framer-motion";
import { Code, Smartphone, Server, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const About = () => {
  const stats = [
    { value: "50+", label: "Completed Projects", icon: TrendingUp },
    { value: "95%", label: "Client Satisfaction", icon: TrendingUp },
    { value: "5+", label: "Years Experience", icon: TrendingUp },
  ];

  const journey = [
    {
      year: "2022",
      title: "Started Development Journey",
      description: "Began learning web development with HTML, CSS, and JavaScript",
    },
    {
      year: "2023",
      title: "Full Stack Developer",
      description: "Mastered MERN stack and started building production applications",
    },
    {
      year: "2024",
      title: "Freelance Success",
      description: "Successfully delivered 50+ projects for clients worldwide",
    },
    {
      year: "2025",
      title: "Tech Lead",
      description: "Leading development teams and architecting scalable solutions",
    },
  ];

  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Building responsive, performant websites with modern technologies",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Creating mobile-first applications with seamless user experiences",
    },
    {
      icon: Server,
      title: "Backend Solutions",
      description: "Developing robust APIs and server architectures for scalability",
    },
  ];

  return (
    <PageLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transforming ideas into elegant digital solutions
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 mb-12 backdrop-blur-sm"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a passionate fullstack web developer with over 5 years of experience building modern, 
              responsive, and user-friendly web applications. My journey in web development started with 
              a curiosity about how websites work, and it has evolved into a fulfilling career creating 
              digital solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I specialize in building scalable applications using the latest technologies, with a strong 
              focus on performance, accessibility, and user experience. My approach combines technical 
              expertise with creative problem-solving to deliver exceptional results.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, I enjoy staying up-to-date with the latest web technologies, contributing 
              to open-source projects, and sharing knowledge with the developer community.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-glass border border-glass-border rounded-xl p-6 backdrop-blur-sm text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

              <div className="space-y-8">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:-ml-2 z-10" />

                    {/* Content */}
                    <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                        <div className="text-primary font-bold text-sm mb-2">{item.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
