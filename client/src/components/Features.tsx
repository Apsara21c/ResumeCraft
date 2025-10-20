import { motion } from "framer-motion";
import { BookOpen, Briefcase, Code, Trophy, Zap, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Courses",
    description: "Add and showcase your educational achievements and certifications",
    color: "text-blue-500",
  },
  {
    icon: Briefcase,
    title: "Internships",
    description: "Highlight your professional experience and work history",
    color: "text-purple-500",
  },
  {
    icon: Code,
    title: "Projects",
    description: "Display your portfolio and technical projects",
    color: "text-green-500",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Showcase your competitive achievements and awards",
    color: "text-orange-500",
  },
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See your resume update instantly as you make changes",
    color: "text-yellow-500",
  },
  {
    icon: Eye,
    title: "Beautiful Design",
    description: "Professional templates with glassmorphic aesthetics",
    color: "text-pink-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you create the perfect resume
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
