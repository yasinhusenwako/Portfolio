import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { messagesAPI } from "@/services/adminService";
import PageLayout from "@/components/PageLayout";

const ViewMessages = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    if (!authLoading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Load from localStorage in demo mode
        const localMessages = JSON.parse(localStorage.getItem("demoMessages") || "[]");
        setMessages(localMessages);
      } else {
        // Load from Firebase
        const response = await messagesAPI.getAll();
        setMessages(response.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Update in localStorage
        const localMessages = JSON.parse(localStorage.getItem("demoMessages") || "[]");
        const updatedMessages = localMessages.map((msg: any) =>
          msg.id === id ? { ...msg, read: true, readAt: new Date().toISOString() } : msg
        );
        localStorage.setItem("demoMessages", JSON.stringify(updatedMessages));
      } else {
        await messagesAPI.markAsRead(id);
      }
      
      toast({
        title: "Success",
        description: "Message marked as read",
      });
      fetchMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Delete from localStorage
        const localMessages = JSON.parse(localStorage.getItem("demoMessages") || "[]");
        const updatedMessages = localMessages.filter((msg: any) => msg.id !== id);
        localStorage.setItem("demoMessages", JSON.stringify(updatedMessages));
      } else {
        await messagesAPI.delete(id);
      }
      
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch {
      return "N/A";
    }
  };

  const isDemoMode = sessionStorage.getItem("demoMode") === "true";
  if (!isDemoMode && (authLoading || !user || !isAdmin)) return null;

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <PageLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
              <h1 className="text-4xl font-bold">
                Contact <span className="text-primary">Messages</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Message Detail Modal */}
          {selectedMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMessage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">{selectedMessage.subject}</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                    <p className="text-sm text-primary">{selectedMessage.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDate(selectedMessage.timestamp)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Message</p>
                    <div className="bg-background border border-border rounded-lg p-4">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      <Check size={20} />
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all"
                  >
                    <Mail size={20} />
                    Reply
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Messages List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedMessage(message)}
                  className={`bg-card border rounded-2xl p-6 cursor-pointer hover:border-primary/50 transition-all ${
                    message.read ? "border-border" : "border-primary/30 bg-primary/5"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{message.name}</h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-primary">{message.email}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(message.timestamp)}
                    </p>
                  </div>
                  <h4 className="font-semibold mb-2">{message.subject}</h4>
                  <p className="text-muted-foreground line-clamp-2">{message.message}</p>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && messages.length === 0 && (
            <div className="text-center py-20">
              <Mail size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ViewMessages;
