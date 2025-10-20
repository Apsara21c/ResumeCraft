import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, Code, Trophy, ArrowLeft } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import ResumePreview from "@/components/ResumePreview";
import EditModal from "@/components/EditModal";
import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun } from "lucide-react";

type ModalType = "courses" | "internships" | "projects" | "hackathons" | null;
type ModalMode = "add" | "edit";

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add");

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "Your Name",
      email: "your@email.com",
      phone: "+1 (555) 000-0000",
      location: "City, State",
    },
    courses: [] as Array<{ id: string; title: string; institution: string; year: string }>,
    internships: [] as Array<{ id: string; title: string; company: string; duration: string }>,
    projects: [] as Array<{ id: string; title: string; description: string; tech: string }>,
    hackathons: [] as Array<{ id: string; name: string; achievement: string; date: string }>,
  });

  const openModal = (type: ModalType, mode: ModalMode) => {
    setActiveModal(type);
    setModalMode(mode);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSave = (type: string, data: Record<string, string>) => {
    const id = Date.now().toString();
    
    switch (type) {
      case "courses":
        setResumeData({
          ...resumeData,
          courses: [...resumeData.courses, { id, ...data } as any],
        });
        break;
      case "internships":
        setResumeData({
          ...resumeData,
          internships: [...resumeData.internships, { id, ...data } as any],
        });
        break;
      case "projects":
        setResumeData({
          ...resumeData,
          projects: [...resumeData.projects, { id, ...data } as any],
        });
        break;
      case "hackathons":
        setResumeData({
          ...resumeData,
          hackathons: [...resumeData.hackathons, { id, ...data } as any],
        });
        break;
    }
  };

  const modalConfigs = {
    courses: {
      title: "Add Course",
      fields: [
        { name: "title", label: "Course Title", placeholder: "e.g., Computer Science" },
        { name: "institution", label: "Institution", placeholder: "e.g., MIT" },
        { name: "year", label: "Year", placeholder: "e.g., 2020-2024" },
      ],
    },
    internships: {
      title: "Add Internship",
      fields: [
        { name: "title", label: "Position", placeholder: "e.g., Software Engineer Intern" },
        { name: "company", label: "Company", placeholder: "e.g., Google" },
        { name: "duration", label: "Duration", placeholder: "e.g., Summer 2023" },
      ],
    },
    projects: {
      title: "Add Project",
      fields: [
        { name: "title", label: "Project Title", placeholder: "e.g., E-commerce Platform" },
        { name: "description", label: "Description", type: "textarea" as const, placeholder: "Brief description" },
        { name: "tech", label: "Technologies", placeholder: "e.g., React, Node.js" },
      ],
    },
    hackathons: {
      title: "Add Hackathon",
      fields: [
        { name: "name", label: "Hackathon Name", placeholder: "e.g., HackMIT 2023" },
        { name: "achievement", label: "Achievement", placeholder: "e.g., 1st Place" },
        { name: "date", label: "Date", placeholder: "e.g., Sep 2023" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Build Your Resume</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  icon={BookOpen}
                  title="Courses"
                  description="Add your educational achievements and certifications"
                  count={resumeData.courses.length}
                  onAdd={() => openModal("courses", "add")}
                  onEdit={() => openModal("courses", "edit")}
                  color="text-blue-500"
                />
                <DashboardCard
                  icon={Briefcase}
                  title="Internships"
                  description="Highlight your professional experience"
                  count={resumeData.internships.length}
                  onAdd={() => openModal("internships", "add")}
                  onEdit={() => openModal("internships", "edit")}
                  color="text-purple-500"
                />
                <DashboardCard
                  icon={Code}
                  title="Projects"
                  description="Showcase your technical projects"
                  count={resumeData.projects.length}
                  onAdd={() => openModal("projects", "add")}
                  onEdit={() => openModal("projects", "edit")}
                  color="text-green-500"
                />
                <DashboardCard
                  icon={Trophy}
                  title="Hackathons"
                  description="Display your competitive achievements"
                  count={resumeData.hackathons.length}
                  onAdd={() => openModal("hackathons", "add")}
                  onEdit={() => openModal("hackathons", "edit")}
                  color="text-orange-500"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <ResumePreview data={resumeData} />
          </motion.div>
        </div>
      </div>

      {activeModal && modalConfigs[activeModal] && (
        <EditModal
          isOpen={true}
          onClose={closeModal}
          title={modalConfigs[activeModal].title}
          fields={modalConfigs[activeModal].fields}
          onSave={(data) => handleSave(activeModal, data)}
        />
      )}
    </div>
  );
}
