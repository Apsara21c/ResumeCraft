import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "../Navbar";

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 px-4 text-center">
          <p className="text-muted-foreground">Scroll down to see the navbar in action</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
