import { ThemeProvider } from "@/lib/theme-provider";
import Contact from "../Contact";

export default function ContactExample() {
  return (
    <ThemeProvider>
      <Contact />
    </ThemeProvider>
  );
}
