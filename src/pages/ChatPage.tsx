import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import chatIcon from "@/assets/zubda-chat-icon.png";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: 1,
  role: "assistant",
  content:
    "أهلاً بك! أنا **زِبدة**، مساعدك الذكي للبحث العلمي 📚\n\nيمكنني مساعدتك في:\n- البحث عن أوراق بحثية ودراسات علمية\n- تلخيص الأبحاث واستخلاص النقاط المهمة\n- الإجابة على أسئلتك الأكاديمية\n- التحقق من المعلومات والمصادر\n\nاطرح عليّ أي سؤال بحثي وسأساعدك!",
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // Build conversation history (skip welcome message id=1 from context, but keep others)
    const historyForApi = [...messages.filter((m) => m.id !== 1), userMsg].map(
      (m) => ({ role: m.role, content: m.content })
    );

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id === -1) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { id: -1, role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: historyForApi }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "حدث خطأ في الاتصال");
      }

      if (!resp.body) throw new Error("لا يوجد استجابة");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Finalize: give it a real id
      setMessages((prev) =>
        prev.map((m) => (m.id === -1 ? { ...m, id: Date.now() + 1 } : m))
      );
    } catch (err: any) {
      console.error("Chat error:", err);
      toast.error(err.message || "حدث خطأ في الاتصال بالمساعد الذكي");
      // Remove the partial assistant message if any
      setMessages((prev) => prev.filter((m) => m.id !== -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      {/* Header */}
      <div className="bg-navy-mid py-5 text-center border-b border-gold/15">
        <img src={chatIcon} alt="" className="w-14 h-14 mx-auto mb-2" width={56} height={56} />
        <h1 className="font-amiri text-2xl font-bold text-white">محادثة زِبدة الذكية</h1>
        <p className="text-white/40 text-sm">اطرح أسئلتك البحثية واحصل على إجابات مدعّمة بالذكاء الاصطناعي</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-amiri text-sm ${
                  msg.role === "assistant"
                    ? "bg-gold/20 text-gold-light"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {msg.role === "assistant" ? "ز" : "أ"}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 text-[14px] leading-[1.7] ${
                  msg.role === "assistant"
                    ? "bg-navy-light text-white/80 rounded-[12px_4px_12px_12px]"
                    : "bg-gold/15 border border-gold/20 text-white/85 rounded-[4px_12px_12px_12px]"
                }`}
              >
                <div className="prose prose-sm prose-invert max-w-none [&_p]:mb-1 [&_ul]:mt-1 [&_li]:my-0.5">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold-light font-amiri text-sm">ز</div>
              <div className="bg-navy-light rounded-[12px_4px_12px_12px] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gold/20 bg-navy-mid p-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex bg-white/5 border border-gold/20 rounded-xl overflow-hidden focus-within:border-gold/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك البحثي هنا..."
              className="flex-1 bg-transparent border-none outline-none px-5 py-3.5 text-white text-sm placeholder:text-white/30 font-tajawal"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="gradient-gold px-5 py-3.5 text-navy hover:opacity-90 transition-opacity disabled:opacity-40"
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
