import { ThemeProvider } from "@/lib/theme-provider";
import EditModal from "../EditModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const fields = [
    { name: "title", label: "Course Title", placeholder: "e.g., Computer Science" },
    { name: "institution", label: "Institution", placeholder: "e.g., MIT" },
    { name: "year", label: "Year", placeholder: "e.g., 2020-2024" },
  ];

  return (
    <ThemeProvider>
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <EditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add Course"
          fields={fields}
          onSave={(data) => console.log("Saved:", data)}
        />
      </div>
    </ThemeProvider>
  );
}
