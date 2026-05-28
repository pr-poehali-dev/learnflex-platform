import { useState } from "react";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Icon from "@/components/ui/icon";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import TeamPage from "@/pages/TeamPage";
import ContactPage from "@/pages/ContactPage";
import DashboardPage from "@/pages/DashboardPage";

type Page = "home" | "courses" | "team" | "contact" | "dashboard";
type Role = "student" | "teacher" | "parent" | "employer";

const roles = [
  {
    id: "student" as Role,
    emoji: "🎓",
    label: "Студент",
    desc: "Расписание, материалы, рейтинг навыков, портфолио",
    color: "border-neon-grass/40 hover:bg-neon-grass/8",
    activeColor: "bg-neon-grass/12 border-neon-grass",
    badge: "text-neon-grass",
  },
  {
    id: "teacher" as Role,
    emoji: "📚",
    label: "Педагог",
    desc: "Управление курсами, оценки, аналитика группы",
    color: "border-bright-fern/40 hover:bg-bright-fern/8",
    activeColor: "bg-bright-fern/12 border-bright-fern",
    badge: "text-bright-fern",
  },
  {
    id: "parent" as Role,
    emoji: "❤️",
    label: "Родитель",
    desc: "Прогресс ребёнка, пропуски, уведомления",
    color: "border-radioactive/40 hover:bg-radioactive/8",
    activeColor: "bg-radioactive/12 border-radioactive",
    badge: "text-radioactive",
  },
  {
    id: "employer" as Role,
    emoji: "💼",
    label: "Работодатель",
    desc: "Поиск талантов, портфолио, верификация навыков",
    color: "border-white/20 hover:bg-white/5",
    activeColor: "bg-white/8 border-white/40",
    badge: "text-white/70",
  },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState<Role>("student");
  const [loginModal, setLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("student");

  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      setLoginModal(true);
      return;
    }
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnterDashboard = () => {
    setRole(selectedRole);
    setLoginModal(false);
    setCurrentPage("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateFromDashboard = (page: string) => {
    if (page === "home") {
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (page === "contact") {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    handleNavigate(page);
  };

  const isDashboard = currentPage === "dashboard";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-black text-white">
        {!isDashboard && (
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(!darkMode)}
          />
        )}

        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "courses" && <CoursesPage onNavigate={handleNavigate} role={role} />}
        {currentPage === "team" && <TeamPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "dashboard" && <DashboardPage onNavigate={handleNavigateFromDashboard} role={role} />}

        {/* Role selection login modal */}
        <Modal open={loginModal} onClose={() => setLoginModal(false)} size="md">
          <div className="p-6">
            <div className="text-center mb-6">
              <img
                src="https://cdn.poehali.dev/projects/db98e2fc-1415-4c9e-9d40-a51971e6dc4e/bucket/ba0ab2b3-d259-4a45-9c27-42e39429d6e6.png"
                alt="LearnFlex"
                className="h-10 object-contain mx-auto mb-3"
              />
              <h2 className="font-display font-800 text-xl mb-1">Выберите роль</h2>
              <p className="font-body text-sm text-white/45">Каждая роль открывает своё пространство в платформе</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 text-left hover:scale-[1.02] active:scale-[0.98] ${selectedRole === r.id ? r.activeColor : `bg-white/3 ${r.color}`}`}
                >
                  <div className="text-2xl mb-2">{r.emoji}</div>
                  <div className={`font-display font-700 text-sm mb-1 ${selectedRole === r.id ? r.badge : "text-white/80"}`}>
                    {r.label}
                  </div>
                  <div className="font-body text-xs text-white/40 leading-snug">{r.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleEnterDashboard}
              className="w-full h-12 bg-neon-grass text-black font-display font-700 text-base rounded-xl hover:bg-radioactive transition-all active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <Icon name="LogIn" size={18} />
              Войти как {roles.find(r => r.id === selectedRole)?.label}
            </button>

            <p className="font-body text-xs text-white/25 text-center mt-3">
              Это демо-версия. Авторизация в разработке.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
