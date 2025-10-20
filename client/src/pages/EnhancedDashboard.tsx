import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Settings as SettingsIcon, FileText } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun } from "lucide-react";
import ProfileOverview from "@/components/ProfileOverview";
import CareerTimeline from "@/components/CareerTimeline";
import DashboardCard from "@/components/DashboardCard";
import { BookOpen, Briefcase, Code, Trophy } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";
import EditModal from "@/components/EditModal";
import AIChat from "@/components/AIChat";
import { useToast } from "@/hooks/use-toast";

type ModalType = "courses" | "internships" | "projects" | "hackathons" | null;

export default function EnhancedDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [profileData] = useState({
    name: "Apsara Kumar",
    email: "apsara@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about building innovative solutions",
    badges: [
      { label: "Profile Complete", status: "verified" as const },
      { label: "Email Verified", status: "verified" as const },
      { label: "Identity Verification", status: "pending" as const },
      { label: "Resume Published", status: "completed" as const },
    ],
  });

  const [timelineItems] = useState([
    {
      id: "1",
      title: "Software Engineer at Google",
      description: "Working on cloud infrastructure and scalability",
      date: "2023 - Present",
      status: "in-progress" as const,
      category: "work" as const,
    },
    {
      id: "2",
      title: "HackMIT Winner",
      description: "1st Place - Built an AI-powered study assistant",
      date: "Sep 2023",
      status: "completed" as const,
      category: "achievement" as const,
    },
    {
      id: "3",
      title: "BS in Computer Science",
      description: "Stanford University - GPA 3.9/4.0",
      date: "2020 - 2024",
      status: "completed" as const,
      category: "education" as const,
    },
  ]);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "Apsara Kumar",
      email: "apsara@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    courses: [] as Array<{ id: string; title: string; institution: string; year: string }>,
    internships: [] as Array<{ id: string; title: string; company: string; duration: string }>,
    projects: [] as Array<{ id: string; title: string; description: string; tech: string }>,
    hackathons: [] as Array<{ id: string; name: string; achievement: string; date: string }>,
  });

  const handleUpdateFromChat = (field: string, value: any) => {
    console.log(`Updating ${field} with:`, value);
    
    if (field === "name") {
      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, name: value },
      });
    } else if (field === "email") {
      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, email: value },
      });
    } else if (field === "phone") {
      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, phone: value },
      });
    } else if (field === "location") {
      setResumeData({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, location: value },
      });
    }
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

  const handleGeneratePDF = () => {
    toast({
      title: "Generating PDF...",
      description: "Your resume will be downloaded shortly.",
    });
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGeneratePDF}
              data-testid="button-generate-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF Resume
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <SettingsIcon className="w-5 h-5" />
              </Button>
            </Link>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview" data-testid="tab-overview">
              Profile Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" data-testid="tab-achievements">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="builder" data-testid="tab-builder">
              <FileText className="w-4 h-4 mr-2" />
              Resume Builder
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProfileOverview
                profile={profileData}
                onEdit={() => console.log("Edit profile")}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CareerTimeline items={timelineItems} />
            </motion.div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Build Your Resume</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardCard
                    icon={BookOpen}
                    title="Courses"
                    description="Add your educational achievements"
                    count={resumeData.courses.length}
                    onAdd={() => setActiveModal("courses")}
                    onEdit={() => setActiveModal("courses")}
                    color="text-blue-500"
                  />
                  <DashboardCard
                    icon={Briefcase}
                    title="Internships"
                    description="Highlight professional experience"
                    count={resumeData.internships.length}
                    onAdd={() => setActiveModal("internships")}
                    onEdit={() => setActiveModal("internships")}
                    color="text-purple-500"
                  />
                  <DashboardCard
                    icon={Code}
                    title="Projects"
                    description="Showcase technical projects"
                    count={resumeData.projects.length}
                    onAdd={() => setActiveModal("projects")}
                    onEdit={() => setActiveModal("projects")}
                    color="text-green-500"
                  />
                  <DashboardCard
                    icon={Trophy}
                    title="Hackathons"
                    description="Display competitive achievements"
                    count={resumeData.hackathons.length}
                    onAdd={() => setActiveModal("hackathons")}
                    onEdit={() => setActiveModal("hackathons")}
                    color="text-orange-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeModal && modalConfigs[activeModal] && (
        <EditModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={modalConfigs[activeModal].title}
          fields={modalConfigs[activeModal].fields}
          onSave={(data) => handleSave(activeModal, data)}
        />
      )}

      <AIChat userName="Apsara" onUpdateResume={handleUpdateFromChat} />
    </div>
  );
}
