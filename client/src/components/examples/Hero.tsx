import { ThemeProvider } from "@/lib/theme-provider";
import Hero from "../Hero";

export default function HeroExample() {
  return (
    <ThemeProvider>
      <Hero />
    </ThemeProvider>
  );
}
