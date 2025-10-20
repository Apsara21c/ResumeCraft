import { ThemeProvider } from "@/lib/theme-provider";
import CareerTimeline from "../CareerTimeline";

const mockItems = [
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
];

export default function CareerTimelineExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <CareerTimeline items={mockItems} />
      </div>
    </ThemeProvider>
  );
}
