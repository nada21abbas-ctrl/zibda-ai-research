import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, Home, BookOpen } from "lucide-react";
import mascotImg from "@/assets/zubda-mascot.png";

const navItems = [
  { path: "/", label: "الرئيسية", icon: Home },
  { path: "/search", label: "البحث", icon: Search },
  { path: "/chat", label: "المحادثة الذكية", icon: MessageCircle },
  { path: "/about", label: "عن زبِدة", icon: BookOpen },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-gold-light">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={mascotImg} alt="زبِدة" className="w-10 h-10 group-hover:animate-float" width={40} height={40} />
          <span className="text-2xl font-bold font-amiri text-gold-dark">زبِدة</span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "gradient-gold text-primary-foreground shadow-gold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon size={18} />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
