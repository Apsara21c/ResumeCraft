import { ThemeProvider } from "@/lib/theme-provider";
import Features from "../Features";

export default function FeaturesExample() {
  return (
    <ThemeProvider>
      <Features />
    </ThemeProvider>
  );
}
