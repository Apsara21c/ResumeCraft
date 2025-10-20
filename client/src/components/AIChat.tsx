import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  onUpdateResume: (field: string, value: any) => void;
  userName?: string;
}

export default function AIChat({ onUpdateResume, userName = "there" }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi ${userName}! 👋 Let's build your resume together. I'll guide you through the process step by step. First, what's your full name?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      question: "Great! What's your email address?",
      field: "email",
    },
    {
      question: "And your phone number?",
      field: "phone",
    },
    {
      question: "Where are you located?",
      field: "location",
    },
    {
      question: "Perfect! Now tell me about your education. What degree are you pursuing or have completed?",
      field: "education",
    },
    {
      question: "Which institution?",
      field: "institution",
    },
    {
      question: "What year (e.g., 2020-2024)?",
      field: "year",
    },
    {
      question: "Awesome! Tell me about a project you've worked on.",
      field: "project",
    },
    {
      question: "What technologies did you use?",
      field: "tech",
    },
    {
      question: "Great work! Your resume is taking shape. Would you like to add more details or are we done for now?",
      field: "done",
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    if (currentStep === 0) {
      onUpdateResume("name", input);
    } else if (currentStep > 0 && currentStep < steps.length) {
      const step = steps[currentStep - 1];
      onUpdateResume(step.field, input);
    }

    setTimeout(() => {
      if (currentStep < steps.length) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: steps[currentStep].question,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setCurrentStep(currentStep + 1);
      } else {
        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Your resume looks fantastic! 🎉 You can continue editing in the dashboard or download it as a PDF.",
        };
        setMessages((prev) => [...prev, finalMessage]);
      }
    }, 800);

    setInput("");
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full h-16 w-16 shadow-lg shadow-primary/50"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className={`fixed z-50 ${
        isMinimized
          ? "bottom-6 right-6 w-80"
          : "bottom-6 right-6 w-96 h-[600px]"
      }`}
    >
      <Card className="glass-strong flex flex-col h-full shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Resume Assistant</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              data-testid="button-minimize-chat"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "assistant"
                            ? "bg-gradient-to-br from-primary to-primary/50"
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                          message.role === "assistant"
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}
