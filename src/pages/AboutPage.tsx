import { Target, Eye, Lightbulb, GraduationCap } from "lucide-react";
import mascotImg from "@/assets/zubda-mascot.png";
import researchImg from "@/assets/zubda-research.png";
import chatImg from "@/assets/zubda-chat.png";
import OrnamentDivider from "@/components/OrnamentDivider";

const values = [
  {
    icon: Target,
    title: "رسالتنا",
    description: "تمكين الباحث العربي من الوصول إلى المعرفة العلمية بلغته الأم، وتقديم أدوات بحثية ذكية تختصر الوقت وتعزز جودة البحث.",
  },
  {
    icon: Eye,
    title: "رؤيتنا",
    description: "أن نكون المنصة الأولى للبحث العلمي باللغة العربية، ونسهم في بناء مجتمع معرفي عربي متقدم.",
  },
  {
    icon: Lightbulb,
    title: "قيمنا",
    description: "الدقة العلمية، الشفافية في المصادر، وسهولة الوصول للمعرفة للجميع.",
  },
];

const team = [
  { img: mascotImg, name: "البحث الذكي", desc: "محرك بحث متقدم يفهم السياق العربي ويقدم نتائج دقيقة." },
  { img: chatImg, name: "المحادثة التفاعلية", desc: "اسأل وتابع الحوار مع مساعد ذكي يفهم أسئلتك البحثية." },
  { img: researchImg, name: "التلخيص والتحليل", desc: "احصل على ملخصات فورية وتحليلات معمّقة للأوراق البحثية." },
];

const AboutPage = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="gradient-cream py-16 text-center">
      <img src={mascotImg} alt="" className="w-28 h-28 mx-auto mb-4 animate-float" width={112} height={112} />
      <h1 className="font-amiri text-4xl font-bold text-gold-dark mb-4">عن زبِدة</h1>
      <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed text-lg">
        زبِدة هي منصة بحث علمي ذكية مصمّمة خصيصاً للباحثين الناطقين بالعربية.
        نجمع بين قوة الذكاء الاصطناعي وثراء المحتوى الأكاديمي لنقدّم تجربة بحثية فريدة ومتكاملة.
      </p>
    </section>

    <OrnamentDivider />

    {/* Mission/Vision/Values */}
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <div key={i} className="bg-card rounded-2xl p-8 border border-gold-light shadow-gold text-center">
            <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <v.icon size={28} className="text-primary-foreground" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-foreground">{v.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>
    </section>

    <OrnamentDivider />

    {/* Capabilities */}
    <section className="bg-cream-dark py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-amiri text-3xl font-bold text-center text-gold-dark mb-12">
          <GraduationCap className="inline-block ml-2 mb-1" size={32} />
          إمكانيات المنصة
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <div key={i} className="text-center">
              <img src={t.img} alt="" className="w-24 h-24 mx-auto mb-4" loading="lazy" width={96} height={96} />
              <h3 className="font-bold text-lg mb-2 text-foreground">{t.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
