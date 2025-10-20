import { ThemeProvider } from "@/lib/theme-provider";
import DashboardCard from "../DashboardCard";
import { BookOpen } from "lucide-react";

export default function DashboardCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <DashboardCard
          icon={BookOpen}
          title="Courses"
          description="Add and showcase your educational achievements"
          count={3}
          onAdd={() => console.log("Add clicked")}
          onEdit={() => console.log("Edit clicked")}
          color="text-blue-500"
        />
      </div>
    </ThemeProvider>
  );
}
