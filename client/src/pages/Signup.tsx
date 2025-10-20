import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    console.log("Signup:", formData);
    toast({
      title: "Account Created!",
      description: "Redirecting to dashboard...",
    });
    setTimeout(() => setLocation("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10" />
      
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 glass-strong">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Start building your professional resume today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              animate={{ scale: isFocused.name ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onFocus={() => setIsFocused({ ...isFocused, name: true })}
                onBlur={() => setIsFocused({ ...isFocused, name: false })}
                required
                data-testid="input-name"
              />
            </motion.div>

            <motion.div
              animate={{ scale: isFocused.email ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                required
                data-testid="input-email"
              />
            </motion.div>

            <motion.div
              animate={{ scale: isFocused.password ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                required
                data-testid="input-password"
              />
            </motion.div>

            <motion.div
              animate={{ scale: isFocused.confirmPassword ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                onFocus={() =>
                  setIsFocused({ ...isFocused, confirmPassword: true })
                }
                onBlur={() =>
                  setIsFocused({ ...isFocused, confirmPassword: false })
                }
                required
                data-testid="input-confirm-password"
              />
            </motion.div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              data-testid="button-signup"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login">
              <a className="text-primary hover:underline font-medium" data-testid="link-login">
                Sign In
              </a>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
