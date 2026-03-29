import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import chatIcon from "@/assets/zubda-chat-icon.png";

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
    content: "أهلاً بك! أنا زِبدة، مساعدك الذكي للبحث العلمي. 📚\n\nيمكنني مساعدتك في:\n• البحث عن أوراق بحثية ودراسات علمية\n• تلخيص الأبحاث واستخلاص النقاط المهمة\n• الإجابة على أسئلتك الأكاديمية\n• التحقق من المعلومات والمصادر\n\nاطرح عليّ أي سؤال بحثي وسأساعدك!",
  },
];

const botResponses: Record<string, { content: string; sources: string[] }> = {
  "بحث": {
    content: "بناءً على بحثي في قواعد البيانات العلمية، وجدت عدة دراسات حديثة ذات صلة بموضوعك. تشير الأبحاث المنشورة في المجلات المحكّمة إلى تطورات مهمة في هذا المجال.\n\nأبرز النتائج:\n• هناك زيادة ملحوظة في الأبحاث العربية المتعلقة بهذا الموضوع\n• تُظهر الدراسات الحديثة نتائج واعدة\n• يوصي الباحثون بمزيد من الدراسات التطبيقية\n\nهل تريد أن أتعمق في جانب معين؟",
    sources: ["المجلة العربية للبحث العلمي، 2024", "مجلة الدراسات الأكاديمية، المجلد 15", "قاعدة بيانات Scopus"],
  },
  "ذكاء": {
    content: "الذكاء الاصطناعي في البحث العلمي العربي يشهد نمواً متسارعاً. وفقاً لأحدث الإحصائيات:\n\n• ارتفع عدد الأبحاث العربية في مجال AI بنسبة 340% خلال السنوات الخمس الأخيرة\n• تتصدر مصر والسعودية والإمارات في عدد المنشورات\n• أبرز المجالات: معالجة اللغة العربية، الرؤية الحاسوبية، والتعلم الآلي\n\nأستطيع البحث عن أبحاث محددة في أي من هذه المجالات.",
    sources: ["تقرير الذكاء الاصطناعي العربي 2024", "IEEE Xplore Database", "Google Scholar Arabic Index"],
  },
  "تلخيص": {
    content: "بالتأكيد! يمكنني تلخيص أي ورقة بحثية لك. فقط أرسل لي:\n\n• عنوان الورقة البحثية\n• أو رابط الورقة\n• أو الموضوع الذي تريد ملخصاً عنه\n\nسأقوم باستخراج النقاط الرئيسية والمنهجية والنتائج والتوصيات بشكل منظم ومختصر.",
    sources: [],
  },
  default: {
    content: "شكراً لسؤالك! بناءً على الأبحاث المتوفرة في قواعد البيانات العلمية، هذا الموضوع يحظى باهتمام أكاديمي واسع.\n\nتشير الدراسات الحديثة إلى عدة نتائج مهمة في هذا المجال. يمكنني مساعدتك بشكل أفضل إذا حددت:\n\n• المجال العلمي المحدد\n• الفترة الزمنية المطلوبة\n• نوع المصادر المفضلة\n\nهل تودّ أن أتعمق في جانب معين؟",
    sources: ["المجلة العربية للبحث العلمي، 2024", "مجلة الدراسات الأكاديمية، المجلد 15"],
  },
};

function getBotResponse(input: string) {
  const lower = input.toLowerCase();
  for (const key of Object.keys(botResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return botResponses[key];
    }
  }
  return botResponses.default;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = getBotResponse(currentInput);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: resp.content,
        sources: resp.sources.length > 0 ? resp.sources : undefined,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      {/* Header */}
      <div className="bg-navy-mid py-5 text-center border-b border-gold/15">
        <img src={chatIcon} alt="" className="w-14 h-14 mx-auto mb-2" width={56} height={56} />
        <h1 className="font-amiri text-2xl font-bold text-white">محادثة زِبدة الذكية</h1>
        <p className="text-white/40 text-sm">اطرح أسئلتك البحثية واحصل على إجابات مدعّمة بالمصادر</p>
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
                <p className="whitespace-pre-line">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-3 pt-3 border-t border-white/10">
                    <span className="text-[10px] text-white/40 font-bold ml-1">المصادر:</span>
                    {msg.sources.map((s, i) => (
                      <span key={i} className="bg-gold/10 border border-gold/25 text-gold-light text-[10px] px-2 py-0.5 rounded font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
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
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
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
