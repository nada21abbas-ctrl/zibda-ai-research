import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";
import heroImg from "@/assets/zubda-hero.png";
import searchIcon from "@/assets/zubda-search-icon.png";
import chatIcon from "@/assets/zubda-chat-icon.png";
import summaryIcon from "@/assets/zubda-summary-icon.png";
import verifyIcon from "@/assets/zubda-verify-icon.png";
import exportIcon from "@/assets/zubda-export-icon.png";
import globeIcon from "@/assets/zubda-globe-icon.png";

const features = [
  {
    icon: searchIcon,
    title: "بحث متعدد المصادر",
    description: "بحث شامل في قواعد البيانات العلمية العربية والدولية مع دعم الترجمة التلقائية",
  },
  {
    icon: summaryIcon,
    title: "تلخيص ذكي",
    description: "تلخيص تلقائي للأبحاث مع إبراز النقاط الرئيسية والاستنتاجات المهمة",
  },
  {
    icon: verifyIcon,
    title: "تحقق من المصادر",
    description: "التحقق من دقة المعلومات وعرض المصادر الأصلية مع تقييم الموثوقية",
  },
  {
    icon: chatIcon,
    title: "دردشة تفاعلية",
    description: "محادثة مع مساعد ذكي للإجابة على الأسئلة والاستفسارات المتابعة",
  },
  {
    icon: exportIcon,
    title: "تصدير احترافي",
    description: "تصدير بصيغ متعددة (PDF, Word, BibTeX) مع التوثيق التلقائي",
  },
  {
    icon: globeIcon,
    title: "دعم ثنائي اللغة",
    description: "دعم كامل للغتين العربية والإنجليزية مع ترجمة تلقائية متقدمة",
  },
];

const steps = [
  { num: "١", title: "اطرح سؤالك بالعربية أو الإنجليزية", desc: "يفهم النظام استفسارك ويحوّله إلى تمثيل دلالي للبحث في قواعد البيانات العلمية." },
  { num: "٢", title: "استرجاع ذكي من المصادر العلمية", desc: "يبحث في ملايين الأوراق البحثية ويختار الأكثر صلةً بسؤالك." },
  { num: "٣", title: "توليد إجابة مدعّمة بالمصادر", desc: "يستخدم الذكاء الاصطناعي المستندات المسترجعة لصياغة إجابة دقيقة مع الاستشهاد بالمراجع." },
  { num: "٤", title: "أسئلة متابعة تفاعلية", desc: "تابع الحوار العلمي وعمّق فهمك بأسئلة إضافية في نفس الجلسة." },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Navy */}
      <section className="relative bg-navy min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_50%,_hsl(var(--gold)/0.08)_0%,_transparent_60%),_radial-gradient(ellipse_50%_60%_at_80%_30%,_hsl(var(--navy-light)/0.6)_0%,_transparent_60%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(hsl(var(--gold) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 font-amiri text-[300px] text-gold/[0.04] leading-none pointer-events-none select-none">ز</div>

        <div className="relative z-10 max-w-[800px] text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/[0.12] border border-gold/30 text-gold-light px-5 py-1.5 rounded-full text-[13px] font-semibold mb-9 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse-dot" />
            منصة بحث علمية ذكية بالذكاء الاصطناعي
          </div>

          <img src={heroImg} alt="زِبدة" className="w-32 h-32 mx-auto mb-6 animate-float" width={128} height={128} />

          <h1 className="font-amiri text-white text-[clamp(48px,8vw,80px)] leading-[1.1] mb-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            ابحث. افهم. اكتشف.
            <span className="block text-gold-light text-[clamp(32px,5vw,52px)] mt-1">بالعربية والإنجليزية</span>
          </h1>

          <p className="text-white/60 text-[clamp(15px,2vw,18px)] leading-relaxed max-w-[620px] mx-auto mb-12 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            منصة بحث علمية ذكية تجمع بين محركات البحث المتقدمة والذكاء الاصطناعي
            للوصول إلى أفضل الدراسات والأبحاث العربية والعالمية المحكمة
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex max-w-[580px] mx-auto bg-white/5 border border-gold/25 rounded-xl overflow-hidden transition-all focus-within:border-gold/60 focus-within:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="اسألني عن أي موضوع علمي..."
              className="flex-1 bg-transparent border-none outline-none px-5 py-4 text-white text-[15px] placeholder:text-white/35 font-tajawal"
            />
            <button type="submit" className="gradient-gold px-7 py-4 text-navy font-bold text-[15px] flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Search size={18} />
              ابحث
            </button>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <span className="font-amiri text-gold-light text-4xl font-bold block">+٥٠م</span>
              <span className="text-white/45 text-xs mt-1">ورقة بحثية مفهرسة</span>
            </div>
            <div className="w-px bg-gold/20 self-stretch" />
            <div className="text-center">
              <span className="font-amiri text-gold-light text-4xl font-bold block">٢</span>
              <span className="text-white/45 text-xs mt-1">لغة مدعومة</span>
            </div>
            <div className="w-px bg-gold/20 self-stretch" />
            <div className="text-center">
              <span className="font-amiri text-gold-light text-4xl font-bold block">RAG</span>
              <span className="text-white/45 text-xs mt-1">استرجاع معزّز بالتوليد</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-beige-lightest py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center max-w-[1200px] mx-auto">
            <div>
              <span className="text-gold text-xs font-bold tracking-[3px] uppercase mb-4 block">كيف يعمل</span>
              <h2 className="font-amiri text-navy text-[clamp(28px,4vw,44px)] leading-tight mb-5">من السؤال إلى الإجابة المدعومة</h2>
              <p className="text-muted-foreground leading-relaxed mb-12 max-w-[560px]">نظام متكامل يجمع بين قوة الاسترجاع الدلالي والذكاء الاصطناعي المتقدم.</p>

              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start relative pb-9 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center font-amiri text-gold-light text-lg font-bold flex-shrink-0 relative z-10">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute right-[19px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-beige-dark to-transparent" />
                    )}
                    <div>
                      <h3 className="text-[17px] font-bold text-navy mb-1.5 mt-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Mockup */}
            <div className="bg-navy rounded-[20px] overflow-hidden shadow-2xl border border-gold/15">
              <div className="bg-navy-mid px-5 py-3.5 flex items-center gap-2 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="flex-1 bg-white/5 rounded-md h-6 mr-3 flex items-center px-3">
                  <span className="text-[11px] text-white/30" dir="ltr">zubda.ai/chat</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-amiri text-sm">أ</div>
                  <div className="max-w-[80%] bg-gold/15 border border-gold/20 text-white/85 rounded-[4px_12px_12px_12px] px-4 py-3 text-[12.5px] leading-relaxed">
                    ما هي آخر الأبحاث في مجال معالجة اللغة العربية؟
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-light font-amiri text-sm">ز</div>
                  <div>
                    <div className="max-w-[80%] bg-navy-light text-white/80 rounded-[12px_4px_12px_12px] px-4 py-3 text-[12.5px] leading-relaxed">
                      استناداً إلى ٢٣ ورقة بحثية محدّثة، شهد عام ٢٠٢٤ تطورات بارزة في نماذج التحويل الخاصة بالعربية...
                      <div className="flex gap-1.5 flex-wrap mt-2">
                        <span className="bg-gold/10 border border-gold/25 text-gold-light text-[10px] px-2 py-0.5 rounded font-semibold" dir="ltr">ACL 2024</span>
                        <span className="bg-gold/10 border border-gold/25 text-gold-light text-[10px] px-2 py-0.5 rounded font-semibold" dir="ltr">EMNLP 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Navy */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,_hsl(var(--gold)/0.06)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold-light text-xs font-bold tracking-[3px] uppercase mb-4 block">المزايا الأساسية</span>
            <h2 className="font-amiri text-white text-[clamp(28px,4vw,44px)] leading-tight mb-5">أدوات البحث العلمي الاحترافي</h2>
            <p className="text-white/50 max-w-[560px] mx-auto">كل ما يحتاجه الباحث في منصة واحدة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-0.5 max-w-[1200px] mx-auto">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-white/[0.03] border border-gold/10 p-10 transition-all hover:bg-white/[0.06] hover:border-gold/25 relative overflow-hidden first:rounded-tr-2xl [&:nth-child(3)]:rounded-tl-2xl [&:nth-child(4)]:rounded-br-2xl last:rounded-bl-2xl"
              >
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-l from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={f.icon} alt="" className="w-16 h-16 mb-5" loading="lazy" width={64} height={64} />
                <h3 className="text-white text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,_hsl(var(--gold)/0.07)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-[700px] mx-auto text-center px-4">
          <h2 className="font-amiri text-white text-[clamp(32px,5vw,56px)] leading-tight mb-5">ابدأ رحلتك البحثية اليوم</h2>
          <p className="text-white/50 text-[17px] leading-relaxed mb-11 font-light">
            انضم إلى الباحثين الذين يستخدمون زِبدة للوصول إلى المعرفة العلمية بشكل أسرع وأدق.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/search" className="gradient-gold text-navy px-9 py-3.5 rounded-lg font-bold text-base hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-gold">
              جرّب زِبدة مجاناً
            </Link>
            <Link to="/about" className="bg-transparent text-white/75 border border-white/20 px-9 py-3.5 rounded-lg font-semibold text-base hover:border-white/50 hover:text-white hover:bg-white/5 transition-all">
              تعرّف على المشروع
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
