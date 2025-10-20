import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  courses: Array<{ id: string; title: string; institution: string; year: string }>;
  internships: Array<{ id: string; title: string; company: string; duration: string }>;
  projects: Array<{ id: string; title: string; description: string; tech: string }>;
  hackathons: Array<{ id: string; name: string; achievement: string; date: string }>;
}

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const handleDownload = () => {
    console.log("Download resume");
  };

  return (
    <div className="sticky top-24 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Preview</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          data-testid="button-download-resume"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <Card className="p-8 bg-white dark:bg-card shadow-lg min-h-[600px]">
        <motion.div
          key={JSON.stringify(data)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {data.personalInfo.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.location}
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {data.courses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-3">Education</h2>
                <div className="space-y-3">
                  {data.courses.map((course) => (
                    <div key={course.id}>
                      <div className="font-semibold text-foreground">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.institution} • {course.year}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {data.internships.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-3">Experience</h2>
                <div className="space-y-3">
                  {data.internships.map((internship) => (
                    <div key={internship.id}>
                      <div className="font-semibold text-foreground">{internship.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {internship.company} • {internship.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {data.projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-3">Projects</h2>
                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <div className="font-semibold text-foreground">{project.title}</div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {project.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tech: {project.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {data.hackathons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Hackathons & Achievements
                </h2>
                <div className="space-y-3">
                  {data.hackathons.map((hackathon) => (
                    <div key={hackathon.id}>
                      <div className="font-semibold text-foreground">{hackathon.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {hackathon.achievement} • {hackathon.date}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </div>
  );
}
