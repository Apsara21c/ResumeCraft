import { ThemeProvider } from "@/lib/theme-provider";
import AIChat from "../AIChat";

export default function AIChatExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen p-8">
        <AIChat
          userName="Apsara"
          onUpdateResume={(field, value) => console.log(`Update ${field}:`, value)}
        />
      </div>
    </ThemeProvider>
  );
}
