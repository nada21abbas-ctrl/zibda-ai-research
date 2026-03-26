import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import chatImg from "@/assets/zubda-chat.png";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "أهلاً بك! أنا زبِدة، مساعدك الذكي للبحث العلمي. اطرح عليّ أي سؤال بحثي وسأساعدك في العثور على إجابات مدعّمة بالمصادر الأكاديمية. 📚",
  },
];

const sampleResponses: Record<string, { content: string; sources: string[] }> = {
  default: {
    content: "شكراً لسؤالك! بناءً على الأبحاث المتوفرة، يمكنني القول إن هذا الموضوع يحظى باهتمام أكاديمي واسع. تشير الدراسات الحديثة إلى عدة نتائج مهمة في هذا المجال. هل تودّ أن أتعمق في جانب معين من الموضوع؟",
    sources: ["المجلة العربية للبحث العلمي، 2024", "مجلة الدراسات الأكاديمية، المجلد 15"],
  },
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = sampleResponses.default;
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: resp.content,
        sources: resp.sources,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="gradient-cream py-6 text-center border-b border-gold-light">
        <img src={chatImg} alt="" className="w-16 h-16 mx-auto mb-2" width={64} height={64} />
        <h1 className="font-amiri text-2xl font-bold text-gold-dark">المحادثة الذكية</h1>
        <p className="text-muted-foreground text-sm">اطرح أسئلتك البحثية واحصل على إجابات مدعّمة بالمصادر</p>
      </div>

      {/* Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" ? "gradient-gold" : "bg-secondary border border-gold-light"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot size={20} className="text-primary-foreground" />
                ) : (
                  <User size={20} className="text-secondary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "assistant"
                    ? "bg-card border border-gold-light"
                    : "gradient-gold text-primary-foreground"
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
                {msg.sources && (
                  <div className="mt-3 pt-3 border-t border-gold-light">
                    <p className="text-xs font-bold mb-1 text-muted-foreground">المصادر:</p>
                    {msg.sources.map((s, i) => (
                      <p key={i} className="text-xs text-muted-foreground">• {s}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Bot size={20} className="text-primary-foreground" />
              </div>
              <div className="bg-card border border-gold-light rounded-2xl p-4">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gold-light bg-cream p-4">
        <form onSubmit={handleSend} className="container mx-auto max-w-3xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك البحثي هنا..."
              className="w-full py-3.5 px-5 pr-5 pl-14 rounded-2xl border-2 border-gold-light bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute left-2 top-1/2 -translate-y-1/2 gradient-gold text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
