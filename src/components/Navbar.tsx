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
          ? "bg-black/96 backdrop-blur-md border-b border-neon-grass/15 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group press-effect flex-shrink-0"
            aria-label="На главную"
          >
            <img
              src="https://cdn.poehali.dev/projects/db98e2fc-1415-4c9e-9d40-a51971e6dc4e/bucket/ba0ab2b3-d259-4a45-9c27-42e39429d6e6.png"
              alt="LearnFlex"
              className="h-9 object-contain group-hover:opacity-85 transition-opacity"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-500 transition-all duration-200 press-effect ${
                  currentPage === link.id
                    ? "text-neon-grass bg-neon-grass/10"
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
              className="p-2 rounded-lg text-white/50 hover:text-neon-grass hover:bg-white/5 transition-all duration-200 press-effect"
              aria-label="Переключить тему"
            >
              <Icon name={darkMode ? "Sun" : "Moon"} size={18} />
            </button>

            <button
              onClick={() => onNavigate("dashboard")}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive glow-neon-sm transition-all duration-200 press-effect hover:scale-[1.03] active:scale-[0.97]"
            >
              <Icon name="LogIn" size={15} />
              Войти
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all press-effect"
              aria-label="Открыть меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-b border-neon-grass/15 animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-body text-sm font-500 transition-all ${
                  currentPage === link.id
                    ? "text-neon-grass bg-neon-grass/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/8">
              <button
                onClick={() => { onNavigate("dashboard"); setMenuOpen(false); }}
                className="w-full h-12 px-4 bg-neon-grass text-black font-display font-700 text-sm rounded-xl press-effect hover:bg-radioactive transition-all"
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
