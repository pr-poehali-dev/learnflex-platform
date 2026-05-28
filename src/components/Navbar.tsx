import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "courses", label: "Курсы" },
  { id: "team", label: "Команда" },
  { id: "contact", label: "Связаться" },
];

export default function Navbar({ currentPage, onNavigate, darkMode, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-neon-grass/20 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group press-effect"
          >
            <div className="w-9 h-9 rounded-lg bg-neon-grass flex items-center justify-center glow-neon-sm group-hover:glow-neon transition-all duration-300">
              <span className="font-display font-900 text-black text-sm leading-none">LF</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-800 text-white text-lg tracking-tight">Learn</span>
              <span className="font-display font-800 text-neon-grass text-lg tracking-tight">Flex</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-500 transition-all duration-200 press-effect ${
                  currentPage === link.id
                    ? "text-neon-grass bg-neon-grass/10 glow-neon-sm"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg text-white/60 hover:text-neon-grass hover:bg-white/5 transition-all duration-200 press-effect"
              aria-label="Переключить тему"
            >
              <Icon name={darkMode ? "Sun" : "Moon"} size={18} />
            </button>

            <button
              onClick={() => onNavigate("dashboard")}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-neon-grass text-black font-display font-700 text-sm rounded-lg hover:bg-radioactive glow-neon-sm hover:glow-neon transition-all duration-200 press-effect"
            >
              <Icon name="LogIn" size={16} />
              Войти
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-b border-neon-grass/20 animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-body text-sm font-500 transition-all ${
                  currentPage === link.id
                    ? "text-neon-grass bg-neon-grass/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => { onNavigate("dashboard"); setMenuOpen(false); }}
                className="w-full px-4 py-3 bg-neon-grass text-black font-display font-700 text-sm rounded-lg press-effect"
              >
                Войти в платформу
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
