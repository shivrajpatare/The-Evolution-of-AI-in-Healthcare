import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const SYSTEM_PROMPT = `You are a highly advanced, expert AI historian and clinical analyst specializing EXCLUSIVELY in the evolution of Artificial Intelligence in Healthcare. 
Your tone is intellectual, precise, and cinematic. You provide deep, accurate insights about medical AI, neural networks in medicine, diagnostic models, and bioinformatics.
CRITICAL RULE: If the user asks about ANY topic outside of AI, healthcare, biology, or medical technology, you must politely refuse to answer and state that your parameters are strictly limited to medical AI analysis. Keep responses relatively concise.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System initialized. I am your Medical AI Historian. Query me on any aspect of healthcare AI evolution." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Updated model ID
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errText}`);
      }
      const data = await response.json();
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: `[SYSTEM ERROR] ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors",
          "bg-[#0a0a0a] border border-white/20 text-white/80 hover:bg-white/10 hover:text-white",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-white/60" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-white/90 font-display uppercase">Oracle.AI</h3>
                  <p className="text-[9px] font-mono tracking-widest text-blue-400 uppercase">Healthcare Protocol</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 transition-colors rounded-full text-white/40 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col max-w-[85%]", m.role === "user" ? "ml-auto items-end" : "mr-auto items-start")}>
                  <span className="mb-1 text-[9px] font-mono tracking-widest text-white/30 uppercase">
                    {m.role === "user" ? "Guest" : "Oracle"}
                  </span>
                  <div className={cn(
                    "px-4 py-3 text-sm font-sans tracking-tight",
                    m.role === "user" 
                      ? "bg-white/10 text-white rounded-2xl rounded-tr-sm" 
                      : "bg-[#0a0a0a] border border-white/10 text-white/80 rounded-2xl rounded-tl-sm w-full"
                  )}>
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <div 
                        className="leading-relaxed [&>li]:ml-4 [&>li]:mb-2 [&>br]:mb-2"
                        dangerouslySetInnerHTML={{ 
                          __html: m.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                            .replace(/^\s*\d+\.\s+(.*)/gm, '<li class="list-decimal marker:text-white/40">$1</li>')
                            .replace(/^\s*[\-\*]\s+(.*)/gm, '<li class="list-disc marker:text-white/40">$1</li>')
                            .replace(/\n/g, '<br />') 
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col max-w-[85%] mr-auto items-start">
                  <span className="mb-1 text-[9px] font-mono tracking-widest text-white/30 uppercase">Oracle</span>
                  <div className="px-4 py-4 border bg-[#0a0a0a] border-white/10 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                    <span className="text-xs font-mono text-white/40 animate-pulse">Synthesizing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/50">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about medical AI..."
                  className="w-full py-3 pl-4 pr-12 text-sm text-white transition-colors border rounded-xl bg-white/5 border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/10 placeholder:text-white/30 font-sans"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute p-2 transition-colors -translate-y-1/2 rounded-lg right-2 top-1/2 text-white/40 hover:text-white disabled:opacity-50 disabled:hover:text-white/40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
