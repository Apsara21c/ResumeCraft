import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type?: "text" | "textarea";
    placeholder?: string;
  }>;
  onSave: (data: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

export default function EditModal({
  isOpen,
  onClose,
  title,
  fields,
  onSave,
  initialData = {},
}: EditModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    onSave(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 glass-strong" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  data-testid="button-close-modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        defaultValue={initialData[field.name]}
                        rows={3}
                        required
                        data-testid={`input-${field.name}`}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        defaultValue={initialData[field.name]}
                        required
                        data-testid={`input-${field.name}`}
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    data-testid="button-save"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
