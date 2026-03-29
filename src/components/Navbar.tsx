import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, Home, BookOpen } from "lucide-react";

const navItems = [
  { path: "/", label: "الرئيسية", icon: Home },
  { path: "/search", label: "البحث", icon: Search },
  { path: "/chat", label: "المحادثة الذكية", icon: MessageCircle },
  { path: "/about", label: "عن زِبدة", icon: BookOpen },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-navy/[0.97] backdrop-blur-xl border-b border-gold/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-[42px] h-[42px] gradient-gold rounded-[10px] flex items-center justify-center font-amiri text-[22px] font-bold text-navy shadow-gold">
            ز
          </div>
          <span className="text-[26px] font-amiri text-white">
            زِبْ<span className="text-gold-light">دة</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <item.icon size={16} />
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 right-0 w-full h-[1px] bg-gold-light" />
                )}
              </Link>
            );
          })}
          <Link
            to="/search"
            className="gradient-gold text-navy px-5 py-2 rounded-md font-bold text-sm hover:opacity-90 transition-opacity shadow-gold"
          >
            ابدأ البحث
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
