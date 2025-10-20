import { ThemeProvider } from "@/lib/theme-provider";
import ResumePreview from "../ResumePreview";

const mockData = {
  personalInfo: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  courses: [
    {
      id: "1",
      title: "Computer Science",
      institution: "Stanford University",
      year: "2020-2024",
    },
  ],
  internships: [
    {
      id: "1",
      title: "Software Engineer Intern",
      company: "Google",
      duration: "Summer 2023",
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform",
      tech: "React, Node.js, MongoDB",
    },
  ],
  hackathons: [
    {
      id: "1",
      name: "HackMIT 2023",
      achievement: "1st Place Winner",
      date: "Sep 2023",
    },
  ],
};

export default function ResumePreviewExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <ResumePreview data={mockData} />
      </div>
    </ThemeProvider>
  );
}
