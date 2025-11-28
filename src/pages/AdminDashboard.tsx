import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, FolderKanban, Code, User, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const dashboardCards = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: FolderKanban,
      color: "from-blue-500/20 to-blue-500/5",
      link: "/admin/projects",
    },
    {
      title: "Skills",
      description: "Update your skills and technologies",
      icon: Code,
      color: "from-green-500/20 to-green-500/5",
      link: "/admin/skills",
    },
    {
      title: "About",
      description: "Edit your bio and experience",
      icon: User,
      color: "from-purple-500/20 to-purple-500/5",
      link: "/admin/about",
    },
    {
      title: "Messages",
      description: "View contact form submissions",
      icon: MessageSquare,
      color: "from-orange-500/20 to-orange-500/5",
      link: "/admin/messages",
    },
  ];

  return (
    <PageLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email || "Admin"}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </motion.button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(card.link)}
                className="group cursor-pointer bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-primary">-</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Skill Categories</p>
                <p className="text-3xl font-bold text-primary">-</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Unread Messages</p>
                <p className="text-3xl font-bold text-primary">-</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-primary">-</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Statistics will be available once you deploy Firebase Functions
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/admin/projects")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Add New Project
              </button>
              <button
                onClick={() => navigate("/admin/messages")}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium border border-border hover:bg-secondary/80 transition-all"
              >
                View Messages
              </button>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium border border-border hover:bg-secondary/80 transition-all"
              >
                Firebase Console
              </a>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium border border-border hover:bg-secondary/80 transition-all"
              >
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminDashboard;
