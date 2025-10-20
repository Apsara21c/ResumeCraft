import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Edit, Award } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  bio?: string;
  badges: Array<{ label: string; status: "verified" | "pending" | "completed" }>;
}

interface ProfileOverviewProps {
  profile: ProfileData;
  onEdit: () => void;
}

export default function ProfileOverview({ profile, onEdit }: ProfileOverviewProps) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6">
        <div className="flex items-start gap-6 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/50 text-white">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                {profile.bio && (
                  <p className="text-muted-foreground mt-1">{profile.bio}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={onEdit}
                data-testid="button-edit-profile"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold">Progress & Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant={getBadgeVariant(badge.status) as any}>
                  {badge.label}
                  {badge.status === "pending" && " (Pending)"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
