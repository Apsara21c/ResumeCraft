import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "in-progress";
  category: "education" | "work" | "achievement";
}

interface CareerTimelineProps {
  items: TimelineItem[];
}

export default function CareerTimeline({ items }: CareerTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "work":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "achievement":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Career Timeline</h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              <div className="absolute left-4 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                {getStatusIcon(item.status)}
              </div>

              <Card className="p-4 hover-elevate">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getCategoryColor(item.category)}`}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {item.date}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
