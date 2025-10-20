import { ThemeProvider } from "@/lib/theme-provider";
import ProfileOverview from "../ProfileOverview";

const mockProfile = {
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
};

export default function ProfileOverviewExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        <ProfileOverview
          profile={mockProfile}
          onEdit={() => console.log("Edit profile")}
        />
      </div>
    </ThemeProvider>
  );
}
