import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const ManageAbout = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    experience: [] as Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>,
  });

  useEffect(() => {
    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    if (!authLoading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = () => {
    const isDemoMode = sessionStorage.getItem("demoMode") === "true";
    
    if (isDemoMode) {
      const localAbout = JSON.parse(localStorage.getItem("demoAbout") || "{}");
      if (localAbout.bio) {
        setFormData(localAbout);
      } else {
        // Set default data
        setFormData({
          bio: "I'm a passionate Full Stack Developer with expertise in building modern web applications.",
          experience: [
            {
              title: "Full Stack Developer",
              company: "Freelance",
              period: "2020 - Present",
              description: "Building custom web applications for clients worldwide",
            },
          ],
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isDemoMode = sessionStorage.getItem("demoMode") === "true";
      
      if (isDemoMode) {
        localStorage.setItem("demoAbout", JSON.stringify(formData));
      }

      toast({
        title: "Success",
        description: "About information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { title: "", company: "", period: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
  };

  const isDemoMode = sessionStorage.getItem("demoMode") === "true";
  if (!isDemoMode && (authLoading || !user || !isAdmin)) return null;

  return (
    <PageLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold">
              Manage <span className="text-primary">About</span>
            </h1>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium">Experience</label>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    Add Experience
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-background border border-border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Experience {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, "title", e.target.value)}
                        placeholder="Job Title"
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder="Company"
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(index, "period", e.target.value)}
                        placeholder="Period (e.g., 2020 - Present)"
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />

                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                        placeholder="Description"
                        rows={3}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ManageAbout;
