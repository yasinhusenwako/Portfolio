import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { skillsAPI } from "@/services/adminService";
import PageLayout from "@/components/PageLayout";

const ManageSkills = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [formData, setFormData] = useState({
    category: "",
    skills: "",
  });

  useEffect(() => {
    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    if (!authLoading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Load from localStorage in demo mode
        const localSkills = JSON.parse(localStorage.getItem("demoSkills") || "[]");
        setSkills(localSkills);
      } else {
        // Load from Firebase
        const response = await skillsAPI.getAll();
        setSkills(response.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      const skillData = {
        category: formData.category,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      if (isDemoMode) {
        // Save to localStorage
        const localSkills = JSON.parse(localStorage.getItem("demoSkills") || "[]");
        
        if (editingSkill) {
          const updatedSkills = localSkills.map((s: any) =>
            s.id === editingSkill.id ? { ...skillData, id: editingSkill.id } : s
          );
          localStorage.setItem("demoSkills", JSON.stringify(updatedSkills));
        } else {
          const newSkill = {
            ...skillData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };
          localSkills.push(newSkill);
          localStorage.setItem("demoSkills", JSON.stringify(localSkills));
        }
      } else {
        // Save to Firebase
        if (editingSkill) {
          await skillsAPI.update(editingSkill.id, skillData);
        } else {
          await skillsAPI.create(skillData);
        }
      }

      toast({
        title: "Success",
        description: editingSkill ? "Skill category updated successfully" : "Skill category created successfully",
      });

      setShowForm(false);
      setEditingSkill(null);
      resetForm();
      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save skill category",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      category: skill.category,
      skills: skill.skills.join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Delete from localStorage
        const localSkills = JSON.parse(localStorage.getItem("demoSkills") || "[]");
        const updatedSkills = localSkills.filter((s: any) => s.id !== id);
        localStorage.setItem("demoSkills", JSON.stringify(updatedSkills));
      } else {
        await skillsAPI.delete(id);
      }
      
      toast({
        title: "Success",
        description: "Skill category deleted successfully",
      });
      fetchSkills();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill category",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      category: "",
      skills: "",
    });
  };

  const isDemoMode = sessionStorage.getItem("demoMode") === "true";
  if (!isDemoMode && (authLoading || !user || !isAdmin)) return null;

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
                Manage <span className="text-primary">Skills</span>
              </h1>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingSkill(null);
                resetForm();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-6">
                  {editingSkill ? "Edit Skill Category" : "Add New Skill Category"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category Name</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Frontend, Backend, DevOps"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Skills (comma-separated)
                    </label>
                    <textarea
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="React, TypeScript, Next.js, Tailwind CSS"
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Separate each skill with a comma
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : editingSkill ? "Update" : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingSkill(null);
                        resetForm();
                      }}
                      className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:bg-secondary/80 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Skills List */}
          {loading && !showForm ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.skills?.map((s: string) => (
                      <span
                        key={s}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && skills.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No skill categories yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Add Your First Category
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ManageSkills;
