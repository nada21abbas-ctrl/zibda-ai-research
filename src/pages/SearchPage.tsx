import { useState } from "react";
import { Search, Filter, Calendar, User, BookOpen, ExternalLink } from "lucide-react";
import mascotImg from "@/assets/zubda-mascot.png";
import OrnamentDivider from "@/components/OrnamentDivider";

interface Paper {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  citations: number;
  field: string;
}

const samplePapers: Paper[] = [
  {
    id: 1,
    title: "أثر استخدام الذكاء الاصطناعي في تطوير المناهج التعليمية العربية",
    authors: "د. أحمد محمود، د. سارة الخطيب",
    journal: "المجلة العربية للتربية والتعليم",
    year: 2024,
    abstract: "تهدف هذه الدراسة إلى استكشاف كيفية توظيف تقنيات الذكاء الاصطناعي في تصميم وتطوير المناهج الدراسية للمرحلة الجامعية في العالم العربي، مع التركيز على تحسين جودة المخرجات التعليمية.",
    citations: 45,
    field: "التربية والتعليم",
  },
  {
    id: 2,
    title: "معالجة اللغة العربية الطبيعية: تحديات وحلول معاصرة",
    authors: "د. فاطمة الزهراء، د. عمر بن سعيد",
    journal: "مجلة البحوث اللغوية والحاسوبية",
    year: 2024,
    abstract: "تستعرض هذه الورقة البحثية أبرز التحديات التي تواجه معالجة اللغة العربية حاسوبياً، بما في ذلك التشكيل والصرف والنحو، وتقدم حلولاً مبتكرة باستخدام نماذج التعلم العميق.",
    citations: 78,
    field: "علوم الحاسوب",
  },
  {
    id: 3,
    title: "التنمية المستدامة في المنطقة العربية: رؤية 2030 وما بعدها",
    authors: "د. خالد العتيبي، د. نورة الشمري",
    journal: "مجلة الدراسات الاقتصادية العربية",
    year: 2023,
    abstract: "تحلل هذه الدراسة مسارات التنمية المستدامة في الدول العربية وفقاً لأهداف الأمم المتحدة للتنمية المستدامة 2030، مع تقييم التقدم المحرز والتحديات المتبقية.",
    citations: 92,
    field: "الاقتصاد",
  },
  {
    id: 4,
    title: "الطب الدقيق وتطبيقاته في علاج الأمراض الوراثية في المجتمعات العربية",
    authors: "د. ليلى حسن، د. يوسف الأنصاري",
    journal: "المجلة العربية للعلوم الطبية",
    year: 2024,
    abstract: "تبحث هذه الدراسة في تطبيقات الطب الدقيق والجينومي في تشخيص وعلاج الأمراض الوراثية الشائعة في المنطقة العربية، مع عرض لأحدث التقنيات المستخدمة.",
    citations: 34,
    field: "الطب",
  },
];

const fields = ["الكل", "التربية والتعليم", "علوم الحاسوب", "الاقتصاد", "الطب", "العلوم الاجتماعية"];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedField, setSelectedField] = useState("الكل");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredPapers = samplePapers.filter((p) => {
    const matchesQuery = !query || p.title.includes(query) || p.abstract.includes(query) || p.authors.includes(query);
    const matchesField = selectedField === "الكل" || p.field === selectedField;
    return matchesQuery && matchesField;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <section className="gradient-cream py-12">
        <div className="container mx-auto px-4 text-center">
          <img src={mascotImg} alt="" className="w-20 h-20 mx-auto mb-4" width={80} height={80} />
          <h1 className="font-amiri text-3xl font-bold text-gold-dark mb-6">محرك البحث العلمي</h1>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن أوراق بحثية، مواضيع، أو باحثين..."
                className="w-full py-4 px-6 pr-14 rounded-2xl border-2 border-gold-light bg-background text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 shadow-gold"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 gradient-gold text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Search size={22} />
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Filter size={18} className="text-muted-foreground mt-1.5" />
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => { setSelectedField(field); setHasSearched(true); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedField === field
                    ? "gradient-gold text-primary-foreground shadow-gold"
                    : "bg-secondary text-secondary-foreground border border-gold-light hover:bg-cream-dark"
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </section>

      <OrnamentDivider className="my-4" />

      {/* Results */}
      <section className="container mx-auto px-4 py-8">
        {!hasSearched ? (
          <div className="text-center py-16">
            <img src={mascotImg} alt="" className="w-32 h-32 mx-auto mb-4 opacity-50" loading="lazy" width={128} height={128} />
            <p className="text-muted-foreground text-lg">ابدأ البحث للعثور على الأوراق البحثية</p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              تم العثور على <span className="font-bold text-gold-dark">{filteredPapers.length}</span> نتيجة
            </p>
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <article
                  key={paper.id}
                  className="bg-card rounded-2xl p-6 border border-gold-light shadow-gold hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2 leading-relaxed">
                        {paper.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {paper.authors}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={14} />
                          {paper.journal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {paper.year}
                        </span>
                      </div>
                      <p className="text-foreground/70 leading-relaxed text-sm mb-3">
                        {paper.abstract}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground border border-gold-light">
                          {paper.field}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {paper.citations} اقتباس
                        </span>
                      </div>
                    </div>
                    <button className="text-primary hover:text-accent transition-colors p-2">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
