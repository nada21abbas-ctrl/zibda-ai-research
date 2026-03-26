import mascotImg from "@/assets/zubda-mascot.png";

const Footer = () => (
  <footer className="bg-cream-dark border-t border-gold-light py-8 mt-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <img src={mascotImg} alt="زبِدة" className="w-8 h-8" width={32} height={32} />
        <span className="font-amiri text-xl font-bold text-gold-dark">زبِدة</span>
      </div>
      <p className="text-muted-foreground text-sm">
        مساعدك الذكي للبحث العلمي باللغة العربية
      </p>
      <p className="text-muted-foreground text-xs mt-2">
        © {new Date().getFullYear()} زبِدة — جميع الحقوق محفوظة
      </p>
    </div>
  </footer>
);

export default Footer;
