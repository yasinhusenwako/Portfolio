import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, ExternalLink, Github, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { projectsAPI, storageAPI } from "@/services/adminService";
import PageLayout from "@/components/PageLayout";

const ManageProjects = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    imageURL: "",
    githubURL: "",
    liveDemoURL: "",
    featured: false,
  });

  useEffect(() => {
    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    if (!authLoading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Load from localStorage in demo mode
        const localProjects = JSON.parse(localStorage.getItem("demoProjects") || "[]");
        setProjects(localProjects);
      } else {
        // Load from Firebase
        const response = await projectsAPI.getAll();
        setProjects(response.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "File upload is disabled in demo mode. Please use an image URL instead.",
        variant: "destructive",
      });
      e.target.value = ""; // Clear the file input
      return;
    }

    setUploading(true);
    try {
      const imageURL = await storageAPI.uploadImage(
        file,
        `projects/${Date.now()}_${file.name}`
      );
      setFormData((prev) => ({ ...prev, imageURL }));
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.techStack || !formData.imageURL || !formData.githubURL || !formData.liveDemoURL) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(",").map((s) => s.trim()),
      };

      if (isDemoMode) {
        // Save to localStorage
        const localProjects = JSON.parse(localStorage.getItem("demoProjects") || "[]");
        
        if (editingProject) {
          const updatedProjects = localProjects.map((p: any) =>
            p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
          );
          localStorage.setItem("demoProjects", JSON.stringify(updatedProjects));
        } else {
          const newProject = {
            ...projectData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          localProjects.unshift(newProject);
          localStorage.setItem("demoProjects", JSON.stringify(localProjects));
        }
      } else {
        // Save to Firebase
        if (editingProject) {
          await projectsAPI.update(editingProject.id, projectData);
        } else {
          await projectsAPI.create(projectData);
        }
      }

      toast({
        title: "Success",
        description: editingProject ? "Project updated successfully" : "Project created successfully",
      });

      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      imageURL: project.imageURL,
      githubURL: project.githubURL,
      liveDemoURL: project.liveDemoURL,
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        // Delete from localStorage
        const localProjects = JSON.parse(localStorage.getItem("demoProjects") || "[]");
        const updatedProjects = localProjects.filter((p: any) => p.id !== id);
        localStorage.setItem("demoProjects", JSON.stringify(updatedProjects));
      } else {
        await projectsAPI.delete(id);
      }
      
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      techStack: "",
      imageURL: "",
      githubURL: "",
      liveDemoURL: "",
      featured: false,
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
                Manage <span className="text-primary">Projects</span>
              </h1>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingProject(null);
                resetForm();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Plus size={20} />
              Add Project
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
                className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-6">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="React, Node.js, MongoDB"
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Image</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.imageURL}
                        onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                        placeholder="https://example.com/image.jpg or upload below"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="text-sm text-muted-foreground text-center">OR</div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading || isDemoMode}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      />
                      {isDemoMode && (
                        <p className="text-xs text-muted-foreground">
                          File upload disabled in demo mode. Use image URL instead.
                        </p>
                      )}
                      {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                      {formData.imageURL && (
                        <img
                          src={formData.imageURL}
                          alt="Preview"
                          className="mt-2 w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.githubURL}
                      onChange={(e) => setFormData({ ...formData, githubURL: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                    <input
                      type="text"
                      value={formData.liveDemoURL}
                      onChange={(e) => setFormData({ ...formData, liveDemoURL: e.target.value })}
                      placeholder="https://your-project.com"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Project
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading || uploading}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : editingProject ? "Update" : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
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

          {/* Projects List */}
          {loading && !showForm ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                >
                  <img
                    src={project.imageURL}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Add Your First Project
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ManageProjects;
