import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create message object
      const messageData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        read: false
      };

      // Save to localStorage for demo mode
      const existingMessages = JSON.parse(localStorage.getItem("demoMessages") || "[]");
      existingMessages.unshift(messageData);
      localStorage.setItem("demoMessages", JSON.stringify(existingMessages));

      // Try to save to Firebase Firestore (if configured)
      try {
        await addDoc(collection(db, "messages"), {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: serverTimestamp(),
          read: false
        });
      } catch (firebaseError) {
        console.log("Firebase not configured, using local storage only");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "yhusen636@gmail.com",
      href: "mailto:yhusen636@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+251 920 493 921",
      href: "tel:+251920493921",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Addis Ababa, Ethiopia",
      href: "#",
    },
  ];

  const TelegramIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.886 1.524.182.082.359.17.532.264.316-.12.617-.245.904-.373 1.407-.629 2.815-1.26 4.222-1.889 1.102-.493 2.205-.986 3.308-1.479.468-.197.94-.396 1.413-.592.116-.049.277-.13.38-.169-.003.005-.007.009-.01.013-.003.003-.005.007-.008.01l-6.782 6.782c-.395.395-.791.79-1.186 1.186-.556.556-.556 1.455 0 2.011.556.556 1.455.556 2.011 0 .395-.395.79-.791 1.186-1.186l6.782-6.782c.003-.003.007-.005.01-.008.004-.003.008-.007.013-.01-.039.103-.12.264-.169.38-.196.473-.395.945-.592 1.413-.493 1.103-.986 2.206-1.479 3.308-.629 1.407-1.26 2.815-1.889 4.222-.128.287-.253.588-.373.904.094.173.182.35.264.532.515 1.611 1.008 3.276 1.524 4.886.488.726 1.318 1.647 2.286.919.569-.483.754-1.053.901-1.473a405.15 405.15 0 0 1 1.09-2.849c.612-1.591 1.41-3.656 2.21-5.724l3.33-8.609c.137-.354.22-.708.215-1.022-.01-.607-.432-1.098-.96-1.222z" />
    </svg>
  );

  const socialLinks = [
    { icon: Github, href: "https://github.com/yasinhusenwako", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yasin-husen-79a3a5364/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/YasinHusen71367", label: "Twitter" },
    { icon: TelegramIcon, href: "https://t.me/uppdate", label: "Telegram" },
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
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss your project and bring your ideas to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-hero text-hero-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-glass border border-glass-border rounded-lg hover:border-primary/50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        <div className="font-medium">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="w-12 h-12 bg-glass border border-glass-border rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-2">Available for Freelance</h3>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work. If you have a project you'd like to discuss,
                  feel free to reach out!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
