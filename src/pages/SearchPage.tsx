import { useState } from "react";
import { Search, Filter, Calendar, User, BookOpen, ExternalLink, ArrowRight, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import searchIcon from "@/assets/zubda-search-icon.png";

interface Paper {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  citations: number;
  field: string;
  doi?: string;
  keywords?: string[];
}

const samplePapers: Paper[] = [
  {
    id: 1,
    title: "أثر استخدام الذكاء الاصطناعي في تطوير المناهج التعليمية العربية",
    authors: "د. أحمد محمود، د. سارة الخطيب",
    journal: "المجلة العربية للتربية والتعليم",
    year: 2024,
    abstract: "تهدف هذه الدراسة إلى استكشاف كيفية توظيف تقنيات الذكاء الاصطناعي في تصميم وتطوير المناهج الدراسية للمرحلة الجامعية في العالم العربي، مع التركيز على تحسين جودة المخرجات التعليمية وتطوير أساليب التقييم المعتمدة على البيانات.",
    citations: 45,
    field: "التربية والتعليم",
    doi: "10.1234/ajer.2024.001",
    keywords: ["ذكاء اصطناعي", "مناهج تعليمية", "تعليم جامعي"],
  },
  {
    id: 2,
    title: "معالجة اللغة العربية الطبيعية: تحديات وحلول معاصرة",
    authors: "د. فاطمة الزهراء، د. عمر بن سعيد",
    journal: "مجلة البحوث اللغوية والحاسوبية",
    year: 2024,
    abstract: "تستعرض هذه الورقة البحثية أبرز التحديات التي تواجه معالجة اللغة العربية حاسوبياً، بما في ذلك التشكيل والصرف والنحو، وتقدم حلولاً مبتكرة باستخدام نماذج التعلم العميق والشبكات العصبية التحويلية.",
    citations: 78,
    field: "علوم الحاسوب",
    doi: "10.1234/jlcr.2024.015",
    keywords: ["معالجة لغة طبيعية", "تعلم عميق", "لغة عربية"],
  },
  {
    id: 3,
    title: "التنمية المستدامة في المنطقة العربية: رؤية 2030 وما بعدها",
    authors: "د. خالد العتيبي، د. نورة الشمري",
    journal: "مجلة الدراسات الاقتصادية العربية",
    year: 2023,
    abstract: "تحلل هذه الدراسة مسارات التنمية المستدامة في الدول العربية وفقاً لأهداف الأمم المتحدة للتنمية المستدامة 2030، مع تقييم التقدم المحرز والتحديات المتبقية في المجالات الاقتصادية والاجتماعية والبيئية.",
    citations: 92,
    field: "الاقتصاد",
    doi: "10.1234/aesj.2023.042",
    keywords: ["تنمية مستدامة", "رؤية 2030", "اقتصاد عربي"],
  },
  {
    id: 4,
    title: "الطب الدقيق وتطبيقاته في علاج الأمراض الوراثية في المجتمعات العربية",
    authors: "د. ليلى حسن، د. يوسف الأنصاري",
    journal: "المجلة العربية للعلوم الطبية",
    year: 2024,
    abstract: "تبحث هذه الدراسة في تطبيقات الطب الدقيق والجينومي في تشخيص وعلاج الأمراض الوراثية الشائعة في المنطقة العربية، مع عرض لأحدث التقنيات المستخدمة والنتائج السريرية.",
    citations: 34,
    field: "الطب",
    doi: "10.1234/ajms.2024.007",
    keywords: ["طب دقيق", "أمراض وراثية", "جينوم"],
  },
  {
    id: 5,
    title: "تأثير وسائل التواصل الاجتماعي على الهوية الثقافية للشباب العربي",
    authors: "د. منى الحربي، د. سامي الرفاعي",
    journal: "مجلة العلوم الاجتماعية العربية",
    year: 2023,
    abstract: "تدرس هذه الورقة تأثير منصات التواصل الاجتماعي على تشكيل الهوية الثقافية واللغوية لدى الشباب العربي، مع تحليل لأنماط الاستخدام والمحتوى المتداول.",
    citations: 56,
    field: "العلوم الاجتماعية",
    doi: "10.1234/ajss.2023.019",
    keywords: ["وسائل تواصل", "هوية ثقافية", "شباب عربي"],
  },
  {
    id: 6,
    title: "الطاقة المتجددة في الوطن العربي: الواقع والآفاق المستقبلية",
    authors: "د. عبدالله المنصور، د. هند الجابري",
    journal: "مجلة الطاقة والبيئة العربية",
    year: 2024,
    abstract: "تستعرض هذه الدراسة واقع قطاع الطاقة المتجددة في الدول العربية وتحلل الفرص والتحديات المرتبطة بالتحول نحو مصادر الطاقة النظيفة.",
    citations: 41,
    field: "الهندسة",
    doi: "10.1234/ajee.2024.003",
    keywords: ["طاقة متجددة", "طاقة شمسية", "استدامة"],
  },
];

const fields = ["الكل", "التربية والتعليم", "علوم الحاسوب", "الاقتصاد", "الطب", "العلوم الاجتماعية", "الهندسة"];

// Featured topics for initial state
const featuredTopics = [
  { label: "الذكاء الاصطناعي والتعليم", query: "ذكاء اصطناعي تعليم" },
  { label: "معالجة اللغة العربية", query: "معالجة لغة عربية" },
  { label: "التنمية المستدامة", query: "تنمية مستدامة" },
  { label: "الطب الدقيق", query: "طب دقيق" },
  { label: "الطاقة المتجددة", query: "طاقة متجددة" },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedField, setSelectedField] = useState("الكل");
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const filteredPapers = samplePapers.filter((p) => {
    const matchesQuery = !query || p.title.includes(query) || p.abstract.includes(query) || p.authors.includes(query) || p.keywords?.some(k => k.includes(query));
    const matchesField = selectedField === "الكل" || p.field === selectedField;
    return matchesQuery && matchesField;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setSelectedPaper(null);
  };

  const handleTopicClick = (topicQuery: string) => {
    setQuery(topicQuery);
    setHasSearched(true);
    setSelectedPaper(null);
  };

  return (
    <div className="min-h-screen bg-beige-lightest">
      {/* Search Header */}
      <section className="bg-navy py-14">
        <div className="container mx-auto px-4 text-center">
          <img src={searchIcon} alt="" className="w-20 h-20 mx-auto mb-4" width={80} height={80} />
          <h1 className="font-amiri text-3xl font-bold text-white mb-2">محرك البحث العلمي</h1>
          <p className="text-white/50 text-sm mb-8">ابحث في ملايين الأوراق البحثية العربية والعالمية</p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex bg-white/5 border border-gold/25 rounded-xl overflow-hidden transition-all focus-within:border-gold/60 focus-within:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن أوراق بحثية، مواضيع، أو باحثين..."
                className="flex-1 bg-transparent border-none outline-none px-5 py-4 text-white text-[15px] placeholder:text-white/35 font-tajawal"
              />
              <button type="submit" className="gradient-gold px-7 py-4 text-navy font-bold text-[15px] flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Search size={18} />
                ابحث
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => { setSelectedField(field); setHasSearched(true); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedField === field
                    ? "gradient-gold text-navy shadow-gold"
                    : "bg-white/5 text-white/60 border border-gold/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 py-10">
        {selectedPaper ? (
          /* Paper Detail View */
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setSelectedPaper(null)} className="flex items-center gap-2 text-gold-dark font-medium mb-6 hover:text-gold transition-colors">
              <ArrowRight size={18} />
              العودة إلى النتائج
            </button>
            <article className="bg-white rounded-2xl p-8 border border-beige-dark shadow-lg">
              <div className="mb-6">
                <span className="inline-block bg-navy/5 text-navy px-3 py-1 rounded text-xs font-bold mb-4">{selectedPaper.field}</span>
                <h2 className="font-amiri text-2xl font-bold text-navy leading-relaxed mb-4">{selectedPaper.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><User size={14} />{selectedPaper.authors}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} />{selectedPaper.journal}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} />{selectedPaper.year}</span>
                </div>
                {selectedPaper.doi && (
                  <p className="text-xs text-muted-foreground" dir="ltr">DOI: {selectedPaper.doi}</p>
                )}
              </div>

              <div className="border-t border-beige pt-6 mb-6">
                <h3 className="font-bold text-navy mb-3">الملخص</h3>
                <p className="text-foreground/80 leading-[1.9] text-[15px]">{selectedPaper.abstract}</p>
              </div>

              {selectedPaper.keywords && (
                <div className="border-t border-beige pt-6 mb-6">
                  <h3 className="font-bold text-navy mb-3">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.keywords.map((kw, i) => (
                      <span key={i} className="bg-beige-light border border-beige-dark text-navy-muted text-xs px-3 py-1 rounded font-medium">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-beige pt-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{selectedPaper.citations} اقتباس</span>
                <button className="gradient-gold text-navy px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-gold flex items-center gap-2">
                  <ExternalLink size={16} />
                  عرض النص الكامل
                </button>
              </div>
            </article>
          </div>
        ) : !hasSearched ? (
          /* Featured Topics */
          <div className="max-w-4xl mx-auto">
            <h2 className="font-amiri text-2xl font-bold text-navy mb-8 text-center">مواضيع بحثية مقترحة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleTopicClick(topic.query)}
                  className="group bg-white rounded-xl p-6 border border-beige-dark text-right hover:border-gold/50 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-navy mb-2 group-hover:text-gold-dark transition-colors">{topic.label}</h3>
                  <p className="text-muted-foreground text-sm">اضغط للبحث عن أحدث الأبحاث</p>
                  <ChevronDown size={16} className="text-gold mt-3 rotate-[-90deg]" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6">
              تم العثور على <span className="font-bold text-gold-dark">{filteredPapers.length}</span> نتيجة
            </p>
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <article
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className="bg-white rounded-xl p-6 border border-beige-dark cursor-pointer hover:border-gold/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-navy mb-2 leading-relaxed group-hover:text-gold-dark transition-colors">
                        {paper.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><User size={14} />{paper.authors}</span>
                        <span className="flex items-center gap-1"><BookOpen size={14} />{paper.journal}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} />{paper.year}</span>
                      </div>
                      <p className="text-foreground/60 leading-relaxed text-sm line-clamp-2 mb-3">{paper.abstract}</p>
                      <div className="flex items-center gap-3">
                        <span className="bg-navy/5 text-navy text-xs px-3 py-1 rounded font-medium">{paper.field}</span>
                        <span className="text-xs text-muted-foreground">{paper.citations} اقتباس</span>
                      </div>
                    </div>
                    <ExternalLink size={18} className="text-gold/50 group-hover:text-gold transition-colors mt-1 flex-shrink-0" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
