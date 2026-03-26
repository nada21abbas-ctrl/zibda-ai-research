import { Link } from "react-router-dom";
import { Search, MessageCircle, BookOpen, FileText, Globe, Brain } from "lucide-react";
import mascotImg from "@/assets/zubda-mascot.png";
import chatImg from "@/assets/zubda-chat.png";
import researchImg from "@/assets/zubda-research.png";
import OrnamentDivider from "@/components/OrnamentDivider";

const features = [
  {
    icon: researchImg,
    title: "بحث علمي متقدّم",
    description: "استعرض آلاف الأبحاث والأوراق العلمية المحكّمة باللغة العربية والإنجليزية.",
  },
  {
    icon: chatImg,
    title: "محادثة ذكية",
    description: "اطرح أسئلتك البحثية واحصل على إجابات مدعّمة بالمصادر الأكاديمية.",
  },
  {
    icon: mascotImg,
    title: "تلخيص واستخلاص",
    description: "احصل على ملخصات دقيقة وكيانات مستخلصة من الأوراق البحثية.",
  },
];

const stats = [
  { icon: FileText, label: "ورقة بحثية", value: "+500,000" },
  { icon: Globe, label: "مصدر أكاديمي", value: "+120" },
  { icon: Brain, label: "لغة مدعومة", value: "عربي وإنجليزي" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-cream py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <img
            src={mascotImg}
            alt="زبِدة - مساعد البحث العلمي"
            className="mx-auto w-36 h-36 md:w-48 md:h-48 animate-float drop-shadow-lg"
            width={192}
            height={192}
          />
          <h1 className="font-amiri text-4xl md:text-6xl font-bold text-gold-dark mt-6 mb-4">
            زبِدة
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            مساعدك الذكي للبحث العلمي — ابحث، اسأل، واستخلص المعرفة من أبرز قواعد البيانات الأكاديمية العربية والعالمية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg shadow-gold hover:opacity-90 transition-opacity"
            >
              <Search size={22} />
              ابدأ البحث
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-xl font-bold text-lg border border-gold-light hover:bg-cream-dark transition-colors"
            >
              <MessageCircle size={22} />
              المحادثة الذكية
            </Link>
          </div>
        </div>
      </section>

      <OrnamentDivider />

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-amiri text-3xl font-bold text-center text-gold-dark mb-12">
          كيف تساعدك زبِدة؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 border border-gold-light shadow-gold text-center hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img src={f.icon} alt="" className="w-24 h-24 mx-auto mb-4" loading="lazy" width={96} height={96} />
              <h3 className="font-bold text-xl mb-3 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <OrnamentDivider />

      {/* Stats */}
      <section className="bg-cream-dark py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center shadow-gold">
                  <s.icon size={26} className="text-primary-foreground" />
                </div>
                <span className="font-amiri text-2xl font-bold text-gold-dark">{s.value}</span>
                <span className="text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-amiri text-3xl font-bold text-gold-dark mb-4">
          ابدأ رحلتك البحثية الآن
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          اكتشف أحدث الأبحاث والدراسات العلمية بسهولة وسرعة مع زبِدة.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg shadow-gold hover:opacity-90 transition-opacity"
        >
          <Search size={22} />
          ابحث الآن
        </Link>
      </section>
    </div>
  );
};

export default Index;
