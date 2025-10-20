import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count: number;
  onAdd: () => void;
  onEdit: () => void;
  color: string;
}

export default function DashboardCard({
  icon: Icon,
  title,
  description,
  count,
  onAdd,
  onEdit,
  color,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover-elevate active-elevate-2 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-muted">
            {count} {count === 1 ? "item" : "items"}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-1">
          {description}
        </p>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={onAdd}
            data-testid={`button-add-${title.toLowerCase()}`}
          >
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onEdit}
            data-testid={`button-edit-${title.toLowerCase()}`}
          >
            Edit
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
