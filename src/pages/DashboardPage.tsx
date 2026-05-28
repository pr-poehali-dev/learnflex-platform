import { useState } from "react";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  role?: string;
}

// ====== DATA ======
const scheduleData = [
  { id: 1, time: "09:00", end: "10:30", subject: "Python: Функции и ООП", room: "Ауд. 301", teacher: "Орлов А.В.", type: "Лекция", hw: "Написать класс Animal с наследованием", material: "Python_OOP_Lecture3.pdf" },
  { id: 2, time: "10:45", end: "12:15", subject: "Английский язык", room: "Ауд. 105", teacher: "Смирнова В.П.", type: "Практика", hw: "Стр. 45-47, упр. 3-5", material: null },
  { id: 3, time: "12:30", end: "14:00", subject: "Web-разработка: React", room: "Лаб. 201", teacher: "Захаров П.И.", type: "Лаб. работа", hw: "Сдать компонент TodoList до 18:00 ⚠️", material: "React_Components.pdf", deadline: true },
  { id: 4, time: "14:15", end: "15:45", subject: "Командная работа", room: "Ауд. 404", teacher: "Климова Е.Р.", type: "Семинар", hw: "Подготовить кейс-презентацию", material: null },
];

const weekDays = [
  { short: "Пн", date: 26, lessons: 4, isToday: false },
  { short: "Вт", date: 27, lessons: 3, isToday: false },
  { short: "Ср", date: 28, lessons: 4, isToday: true },
  { short: "Чт", date: 29, lessons: 2, isToday: false },
  { short: "Пт", date: 30, lessons: 3, isToday: false },
];

const materialsData = [
  {
    id: 1, title: "Python: от нуля до уверенного", icon: "Code", expanded: false,
    modules: [
      { id: 11, title: "Модуль 1: Основы Python", items: [
        { id: 111, title: "Лекция 1.1 — Введение в Python", type: "PDF", size: "2.4 МБ" },
        { id: 112, title: "Видео 1.2 — Переменные и типы данных", type: "Video", size: "45 мин" },
        { id: 113, title: "Тест 1.3 — Проверка знаний", type: "Test", size: "20 вопросов" },
      ]},
      { id: 12, title: "Модуль 2: ООП и классы", items: [
        { id: 121, title: "Лекция 2.1 — Принципы ООП", type: "PDF", size: "3.1 МБ" },
        { id: 122, title: "Практика 2.2 — Наследование", type: "PDF", size: "1.8 МБ" },
        { id: 123, title: "Видео 2.3 — Полиморфизм", type: "Video", size: "38 мин" },
      ]},
    ]
  },
  {
    id: 2, title: "Web-разработка: React & Node.js", icon: "Globe", expanded: false,
    modules: [
      { id: 21, title: "Модуль 1: HTML & CSS основы", items: [
        { id: 211, title: "Лекция 1.1 — Семантический HTML", type: "PDF", size: "1.9 МБ" },
        { id: 212, title: "Видео 1.2 — Flexbox и Grid", type: "Video", size: "52 мин" },
      ]},
      { id: 22, title: "Модуль 2: React компоненты", items: [
        { id: 221, title: "Лекция 2.1 — JSX и компоненты", type: "PDF", size: "2.7 МБ" },
        { id: 222, title: "Тест 2.2 — Hooks и state", type: "Test", size: "15 вопросов" },
        { id: 223, title: "Ссылка 2.3 — React документация", type: "Link", size: null },
      ]},
    ]
  },
  {
    id: 3, title: "Командная работа и лидерство", icon: "Users", expanded: false,
    modules: [
      { id: 31, title: "Модуль 1: Основы командной работы", items: [
        { id: 311, title: "Лекция 1.1 — Роли в команде", type: "PDF", size: "1.2 МБ" },
        { id: 312, title: "Видео 1.2 — Конфликт-менеджмент", type: "Video", size: "28 мин" },
        { id: 313, title: "Тест 1.3 — Стили лидерства", type: "Test", size: "10 вопросов" },
      ]},
    ]
  },
];

const hardSkills = [
  { name: "Python", level: 4, verified: true, verifiedDate: "12.04.2025", teacher: "Орлов А.В." },
  { name: "JavaScript", level: 3, verified: false, verifiedDate: null, teacher: null },
  { name: "HTML/CSS", level: 5, verified: true, verifiedDate: "01.03.2025", teacher: "Захаров П.И." },
  { name: "SQL", level: 2, verified: false, verifiedDate: null, teacher: null },
  { name: "React", level: 3, verified: false, verifiedDate: null, teacher: null },
];

const softSkills = [
  { name: "Teamwork", level: 4, verified: true, verifiedDate: "15.04.2025", teacher: "Климова Е.Р." },
  { name: "Communication", level: 3, verified: false, verifiedDate: null, teacher: null },
  { name: "Leadership", level: 2, verified: false, verifiedDate: null, teacher: null },
  { name: "Time Management", level: 4, verified: true, verifiedDate: "20.03.2025", teacher: "Климова Е.Р." },
];

const topStudents = [
  { rank: 1, name: "Алина Козлова", xp: 1240, specialty: "IT-разработка", badge: "🥇" },
  { rank: 2, name: "Дмитрий Лебедев", xp: 1105, specialty: "IT-разработка", badge: "🥈" },
  { rank: 3, name: "Иван Иванов", xp: 847, specialty: "IT-разработка", badge: "🥉", isMe: true },
  { rank: 4, name: "Ольга Сидорова", xp: 790, specialty: "IT-разработка", badge: "" },
  { rank: 5, name: "Артём Новиков", xp: 715, specialty: "IT-разработка", badge: "" },
];

const badges = [
  { emoji: "🏆", label: "Топ-5 Python", desc: "Вошёл в топ-5 группы по навыку Python. Верифицировано педагогом.", earned: true },
  { emoji: "⚡", label: "Speedcoder", desc: "Сдал 3 задания раньше дедлайна подряд. Ты быстрее молнии!", earned: true },
  { emoji: "🎯", label: "100% посещаемость", desc: "Ни одного пропуска за месяц. Настоящая дисциплина!", earned: true },
  { emoji: "🤝", label: "Командный игрок", desc: "Участие в 5+ командных проектах. В процессе...", earned: false },
  { emoji: "🚀", label: "Первый проект", desc: "Опубликовал первый учебный проект в портфолио.", earned: false },
  { emoji: "💡", label: "Инноватор", desc: "Предложил идею улучшения платформы, которая была принята.", earned: false },
];

const notifications = [
  { id: 1, icon: "CheckCircle", text: "Оценка за Python ООП: 5/5", time: "5 мин назад", color: "text-neon-grass", bg: "bg-neon-grass/8 border-neon-grass/20" },
  { id: 2, icon: "AlertCircle", text: "Дедлайн: React TodoList через 3 ч ⚠️", time: "1 час назад", color: "text-radioactive", bg: "bg-radioactive/8 border-radioactive/20" },
  { id: 3, icon: "Calendar", text: "Хакатон «ИИ за выходные» — 1 июня", time: "2 часа назад", color: "text-bright-fern", bg: "bg-bright-fern/8 border-bright-fern/20" },
  { id: 4, icon: "Trophy", text: "Ты вошёл в топ-3 по HTML/CSS!", time: "Вчера", color: "text-neon-grass", bg: "bg-neon-grass/8 border-neon-grass/20" },
];

const eventsData = [
  {
    id: 1, type: "Хакатон", title: "CyberCode Hackathon 2024", date: "20 ноября", place: "Tech Hall", prize: "Призовой фонд 50к",
    img: "https://picsum.photos/seed/hackathon/600/260",
    desc: "Прими вызов в главном IT-событии семестра! Мы ищем инновационные решения на стыке образования и технологий. Команды от 2 до 4 человек. Менторская поддержка от лидеров индустрии обеспечена.",
    requirements: ["Студенты 2–4 курсов технических специальностей.", "Базовые знания React или Node.js.", "Наличие собственного ноутбука."],
    color: "border-neon-grass/35 text-neon-grass", badge: "bg-neon-grass/15 text-neon-grass border-neon-grass/30",
  },
  {
    id: 2, type: "Гость-лекция", title: "CTO Яндекс — Архитектура высоконагруженных систем", date: "22 ноября", place: "Design Lab", prize: null,
    img: "https://picsum.photos/seed/lecture/600/260",
    desc: "Технический директор Яндекс расскажет о принципах построения систем с нагрузкой 100 млн запросов в день. Живые примеры, Q&A сессия.",
    requirements: ["Открыто для всех студентов.", "Регистрация обязательна."],
    color: "border-bright-fern/35 text-bright-fern", badge: "bg-bright-fern/15 text-bright-fern border-bright-fern/30",
  },
  {
    id: 3, type: "Дедлайн", title: "Аттестация по Python — Модуль 3", date: "1 декабря", place: "Онлайн", prize: null,
    img: "https://picsum.photos/seed/exam/600/260",
    desc: "Итоговая аттестация по Python: ООП, генераторы, декораторы. 3 практических задания за 90 минут.",
    requirements: ["Обязательно для всех студентов группы.", "Прогресс модуля > 80%."],
    color: "border-radioactive/35 text-radioactive", badge: "bg-radioactive/15 text-radioactive border-radioactive/30",
  },
  {
    id: 4, type: "Собрание", title: "Родительское собрание — IT-21", date: "5 декабря", place: "Ауд. 301", prize: null,
    img: "https://picsum.photos/seed/meeting/600/260",
    desc: "Итоги полугодия, обсуждение успеваемости, план на второй семестр. Приглашены родители студентов группы ИТ-21.",
    requirements: ["Для родителей студентов ИТ-21."],
    color: "border-white/20 text-white/50", badge: "bg-white/8 text-white/50 border-white/20",
  },
];

const navItems = [
  { id: "dashboard", icon: "LayoutDashboard", label: "Дашборд" },
  { id: "schedule", icon: "Calendar", label: "Расписание" },
  { id: "materials", icon: "FileText", label: "Материалы" },
  { id: "ratings", icon: "Trophy", label: "Рейтинги" },
  { id: "events", icon: "Zap", label: "События" },
  { id: "profile", icon: "User", label: "Профиль" },
];

// ====== HELPERS ======
const typeConfig: Record<string, { icon: string; color: string; action: string; bg: string }> = {
  PDF: { icon: "FileText", color: "text-radioactive", action: "Скачать", bg: "bg-radioactive/10" },
  Video: { icon: "Play", color: "text-neon-grass", action: "Смотреть", bg: "bg-neon-grass/10" },
  Test: { icon: "ClipboardCheck", color: "text-bright-fern", action: "Пройти тест", bg: "bg-bright-fern/10" },
  Link: { icon: "ExternalLink", color: "text-white/60", action: "Открыть", bg: "bg-white/5" },
};

function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name="Star" size={14} className={i < count ? "text-neon-grass" : "text-white/15"} />
      ))}
    </div>
  );
}

// ====== MAIN ======
export default function DashboardPage({ onNavigate, role = "student" }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [scheduleView, setScheduleView] = useState<"day" | "week" | "month">("day");
  const [selectedLesson, setSelectedLesson] = useState<typeof scheduleData[0] | null>(null);
  const [matSearch, setMatSearch] = useState("");
  const [matFilter, setMatFilter] = useState("Все");
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [skillTab, setSkillTab] = useState<"hard" | "soft">("hard");
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof topStudents[0] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "teacher", text: "Привет! Твоя работа по Python получена. Несколько вопросов по 3-му заданию.", time: "10:15" },
    { from: "me", text: "Здравствуйте, Андрей Викторович! Жду ваших комментариев.", time: "10:22" },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [currentDay, setCurrentDay] = useState(2); // Ср

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChatHistory(prev => [...prev, { from: "me", text: chatMsg, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]);
    setChatMsg("");
    setTimeout(() => setChatHistory(prev => [...prev, { from: "teacher", text: "Понял, дам обратную связь сегодня вечером.", time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]), 1000);
  };

  const toggleCourse = (id: number) => setExpandedCourses(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleModule = (id: number) => setExpandedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-white/8 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Icon name="Menu" size={20} />
        </button>
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 flex-shrink-0 group">
          <img src="https://cdn.poehali.dev/projects/db98e2fc-1415-4c9e-9d40-a51971e6dc4e/bucket/ba0ab2b3-d259-4a45-9c27-42e39429d6e6.png" alt="LearnFlex" className="h-7 object-contain group-hover:opacity-80 transition-opacity" />
        </button>
        <span className="hidden md:block font-body text-xs text-white/30 border-l border-white/10 pl-3 ml-1">Build your future. Bridge the skills.</span>
        <div className="flex-1 max-w-xs mx-auto hidden sm:block">
          <div className="relative">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input type="text" placeholder="Поиск навыков или материалов..." className="w-full h-9 pl-9 pr-3 bg-white/5 border border-white/10 rounded-lg font-body text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all" />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all" onClick={() => setActiveTab("dashboard")}>
            <Icon name="Bell" size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-radioactive rounded-full" />
          </button>
          <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/5 transition-all" onClick={() => setActiveTab("profile")}>
            <div className="w-7 h-7 rounded-full bg-neon-grass/20 border border-neon-grass/40 flex items-center justify-center text-xs font-display font-700 text-neon-grass flex-shrink-0">АИ</div>
            <div className="hidden sm:block text-left">
              <div className="font-display font-600 text-xs">Алексей Иванов</div>
              <div className="font-code text-[9px] text-neon-grass/70 uppercase tracking-wider">студент</div>
            </div>
          </button>
        </div>
      </header>

      <div className="flex pt-14 flex-1">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-[#0d0d0d] border-r border-white/8 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${activeTab === item.id ? "bg-neon-grass/12 text-neon-grass border-l-2 border-neon-grass pl-2.5" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                <Icon name={item.icon} size={18} className={activeTab === item.id ? "text-neon-grass" : "text-white/35 group-hover:text-white/70"} />
                <span className="font-body text-sm font-500">{item.label}</span>
                {item.id === "dashboard" && <span className="ml-auto w-5 h-5 bg-radioactive/20 border border-radioactive/30 rounded-full flex items-center justify-center flex-shrink-0"><span className="font-code text-[9px] text-radioactive">4</span></span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-white/8 space-y-1">
            <button onClick={() => onNavigate("contact")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <Icon name="MessageSquare" size={17} className="text-white/30" />
              <span className="font-body text-sm">Обратная связь</span>
            </button>
            <button onClick={() => onNavigate("home")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-radioactive hover:bg-radioactive/5 transition-all">
              <Icon name="LogOut" size={17} className="text-white/30" />
              <span className="font-body text-sm">Выйти</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="p-4 md:p-6 max-w-5xl mx-auto">

            {/* ====== DASHBOARD ====== */}
            {activeTab === "dashboard" && (
              <div className="animate-fade-in space-y-5">
                {/* Welcome */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-neon-grass/8 to-transparent border border-neon-grass/15">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-code text-neon-grass text-xs tracking-widest mb-1">// ср, 28 мая 2025</p>
                      <h1 className="font-display font-800 text-2xl">Привет, Алексей! 👋</h1>
                      <p className="font-body text-sm text-white/50 mt-1">Сегодня 4 занятия · 1 дедлайн · 3-е место в рейтинге</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="font-code text-neon-grass text-3xl font-700">847</div>
                      <div className="font-body text-xs text-white/35">очков опыта</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-body text-xs text-white/50">Прогресс семестра</span>
                      <span className="font-code text-xs text-neon-grass">68%</span>
                    </div>
                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-neon-grass to-bright-fern rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: "BookOpen", val: "3", label: "Курсов активно", color: "text-neon-grass" },
                    { icon: "Clock", val: "1", label: "Дедлайн сегодня", color: "text-radioactive" },
                    { icon: "Trophy", val: "#3", label: "Место в рейтинге", color: "text-bright-fern" },
                    { icon: "Star", val: "4", label: "Оценок за неделю", color: "text-neon-grass" },
                  ].map(stat => (
                    <button key={stat.label} onClick={() => setActiveTab(stat.label === "Место в рейтинге" ? "ratings" : "schedule")} className="p-4 bg-white/3 border border-white/8 rounded-2xl text-center hover:border-neon-grass/25 hover:bg-neon-grass/3 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <Icon name={stat.icon} size={22} className={`${stat.color} mx-auto mb-2`} />
                      <div className={`font-display font-800 text-2xl ${stat.color}`}>{stat.val}</div>
                      <div className="font-body text-xs text-white/40 mt-0.5">{stat.label}</div>
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                  {/* Today's schedule */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-display font-700 text-sm">Сегодня, 28 мая</h2>
                      <button onClick={() => setActiveTab("schedule")} className="font-body text-xs text-neon-grass hover:text-radioactive transition-colors">Всё расписание →</button>
                    </div>
                    {scheduleData.map(item => (
                      <button key={item.id} onClick={() => { setSelectedLesson(item); }} className="w-full p-3.5 bg-[#111] border border-white/8 rounded-xl hover:border-neon-grass/25 hover:bg-neon-grass/3 transition-all text-left hover:scale-[1.01] active:scale-[0.99]">
                        <div className="flex items-start gap-3">
                          <div className="text-center flex-shrink-0 w-12">
                            <div className="font-code text-neon-grass text-sm">{item.time}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-700 text-sm truncate">{item.subject}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-body text-xs text-white/35 flex items-center gap-1"><Icon name="MapPin" size={10} />{item.room}</span>
                              <span className="font-body text-xs text-white/35">{item.teacher}</span>
                            </div>
                            {item.deadline && <div className="mt-1 flex items-center gap-1"><Icon name="AlertCircle" size={11} className="text-radioactive" /><span className="font-body text-xs text-radioactive">{item.hw}</span></div>}
                          </div>
                          <span className="font-code text-[10px] text-white/35 bg-white/5 px-2 py-0.5 rounded-md flex-shrink-0">{item.type}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Notifications + actions */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display font-700 text-sm">Уведомления</h2>
                      <div className="w-5 h-5 bg-radioactive/15 border border-radioactive/30 rounded-full flex items-center justify-center"><span className="font-code text-[9px] text-radioactive">4</span></div>
                    </div>
                    {notifications.map(n => (
                      <button key={n.id} className={`w-full p-3 rounded-xl border ${n.bg} text-left hover:scale-[1.01] active:scale-[0.99] transition-all`}>
                        <div className="flex items-start gap-2">
                          <Icon name={n.icon} size={14} className={`${n.color} mt-0.5 flex-shrink-0`} />
                          <div>
                            <div className="font-body text-xs text-white/80 leading-snug">{n.text}</div>
                            <div className="font-body text-[10px] text-white/30 mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="space-y-2 pt-1">
                      <button onClick={() => setUploadModal(true)} className="w-full h-11 flex items-center gap-2.5 px-4 border border-neon-grass/30 text-neon-grass rounded-xl hover:bg-neon-grass/8 transition-all hover:scale-[1.01] active:scale-[0.99]">
                        <Icon name="Upload" size={15} /><span className="font-body text-sm font-500">Загрузить работу</span>
                      </button>
                      <button onClick={() => setChatModal(true)} className="w-full h-11 flex items-center gap-2.5 px-4 border border-bright-fern/30 text-bright-fern rounded-xl hover:bg-bright-fern/8 transition-all hover:scale-[1.01] active:scale-[0.99]">
                        <Icon name="MessageCircle" size={15} /><span className="font-body text-sm font-500">Написать педагогу</span>
                      </button>
                      <button onClick={() => setActiveTab("materials")} className="w-full h-11 flex items-center gap-2.5 px-4 border border-white/12 text-white/60 rounded-xl hover:border-white/25 hover:text-white transition-all hover:scale-[1.01] active:scale-[0.99]">
                        <Icon name="BookOpen" size={15} /><span className="font-body text-sm font-500">Материалы урока</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ====== SCHEDULE ====== */}
            {activeTab === "schedule" && (
              <div className="animate-fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-code text-neon-grass text-xs tracking-widest">// schedule</p>
                    <h2 className="font-display font-800 text-2xl mt-0.5">Расписание</h2>
                  </div>
                  <div className="flex gap-2">
                    {(["day", "week", "month"] as const).map(v => (
                      <button key={v} onClick={() => setScheduleView(v)} className={`h-9 px-4 rounded-xl font-body text-sm border transition-all active:scale-[0.97] ${scheduleView === v ? "bg-neon-grass text-black border-neon-grass font-600" : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"}`}>
                        {{ day: "День", week: "Неделя", month: "Месяц" }[v]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nav bar */}
                <div className="flex items-center gap-2">
                  <button onClick={() => { if (scheduleView === "week") setWeekOffset(o => o - 1); else if (scheduleView === "month") setMonthOffset(o => o - 1); }} className="h-9 w-9 rounded-xl border border-white/15 flex items-center justify-center text-white/50 hover:border-neon-grass/40 hover:text-neon-grass transition-all active:scale-[0.95]"><Icon name="ChevronLeft" size={18} /></button>
                  <button onClick={() => { setWeekOffset(0); setMonthOffset(0); }} className="h-9 px-4 rounded-xl border border-white/15 font-body text-sm text-white/60 hover:border-neon-grass/40 hover:text-neon-grass transition-all active:scale-[0.97]">Сегодня</button>
                  <button onClick={() => { if (scheduleView === "week") setWeekOffset(o => o + 1); else if (scheduleView === "month") setMonthOffset(o => o + 1); }} className="h-9 w-9 rounded-xl border border-white/15 flex items-center justify-center text-white/50 hover:border-neon-grass/40 hover:text-neon-grass transition-all active:scale-[0.95]"><Icon name="ChevronRight" size={18} /></button>
                  <div className="flex gap-2 ml-auto flex-wrap">
                    {[{ label: "Группа", opt: ["ИТ-21", "ИТ-22"] }, { label: "Педагог", opt: ["Орлов", "Захаров", "Климова"] }, { label: "Аудитория", opt: ["Ауд. 301", "Лаб. 201", "Ауд. 404"] }].map(f => (
                      <select key={f.label} className="h-9 px-3 bg-white/5 border border-white/12 rounded-xl font-body text-xs text-white/60 focus:outline-none focus:border-neon-grass/40 cursor-pointer">
                        <option value="">{f.label}: все</option>
                        {f.opt.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ))}
                  </div>
                </div>

                {scheduleView === "day" && (
                  <div className="space-y-2">
                    {scheduleData.map(item => (
                      <button key={item.id} onClick={() => setSelectedLesson(item)} className="w-full p-4 bg-[#111] border border-white/8 rounded-xl hover:border-neon-grass/30 hover:bg-neon-grass/3 transition-all text-left hover:scale-[1.005] active:scale-[0.998]">
                        <div className="flex items-center gap-4">
                          <div className="w-20 text-center flex-shrink-0">
                            <div className="font-code text-neon-grass text-lg font-500">{item.time}</div>
                            <div className="font-body text-[10px] text-white/30">{item.end}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-700 text-base">{item.subject}</div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="font-body text-xs text-white/40 flex items-center gap-1"><Icon name="MapPin" size={11} />{item.room}</span>
                              <span className="font-body text-xs text-white/40">{item.teacher}</span>
                            </div>
                            {item.hw && <div className="mt-1.5 flex items-center gap-1.5"><Icon name="BookMarked" size={12} className="text-white/30" /><span className="font-body text-xs text-white/50 line-clamp-1">{item.hw}</span></div>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-code text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-lg block">{item.type}</span>
                            {item.deadline && <span className="font-body text-[10px] text-radioactive flex items-center gap-1 justify-end mt-1"><Icon name="Clock" size={10} />Дедлайн</span>}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {scheduleView === "week" && (
                  <div>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {weekDays.map((d, i) => (
                        <button key={d.short} onClick={() => setCurrentDay(i)} className={`p-3 rounded-xl border text-center transition-all hover:scale-[1.03] active:scale-[0.97] ${currentDay === i ? "bg-neon-grass/12 border-neon-grass/40" : "bg-white/3 border-white/8 hover:border-white/20"}`}>
                          <div className={`font-code text-sm ${currentDay === i ? "text-neon-grass" : "text-white/50"}`}>{d.short}</div>
                          <div className={`font-display font-700 text-lg ${d.isToday ? "text-neon-grass" : "text-white"}`}>{d.date + weekOffset * 7}</div>
                          <div className={`font-body text-[10px] ${currentDay === i ? "text-neon-grass/60" : "text-white/25"}`}>{d.lessons} пары</div>
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {scheduleData.slice(0, currentDay === 0 ? 3 : currentDay === 1 ? 4 : 4).map(item => (
                        <button key={item.id} onClick={() => setSelectedLesson(item)} className="w-full p-3.5 bg-[#111] border border-white/8 rounded-xl hover:border-neon-grass/25 transition-all text-left hover:scale-[1.005]">
                          <div className="flex items-center gap-3">
                            <span className="font-code text-neon-grass text-sm w-12">{item.time}</span>
                            <div className="flex-1 min-w-0"><div className="font-display font-700 text-sm truncate">{item.subject}</div><div className="font-body text-xs text-white/35">{item.room} · {item.teacher}</div></div>
                            <span className="font-code text-[10px] text-white/35 bg-white/5 px-2 py-0.5 rounded-md">{item.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {scheduleView === "month" && (
                  <div>
                    <div className="text-center mb-3"><span className="font-display font-700 text-base">Май {2025 + monthOffset}</span></div>
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => <div key={d} className="text-center font-code text-[10px] text-white/30 py-1">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {[null,null,null,null,null,...Array.from({ length: 31 }, (_, i) => i + 1)].map((day, idx) => (
                        <button key={idx} onClick={() => day && setCurrentDay((day % 5))} disabled={!day}
                          className={`aspect-square rounded-lg text-center text-xs transition-all ${!day ? "opacity-0" : day === 28 ? "bg-neon-grass/15 border border-neon-grass/40 text-neon-grass font-700" : [1,5,8,12,15,19,22,26,29].includes(day) ? "bg-white/5 hover:bg-neon-grass/8 hover:border-neon-grass/25 border border-transparent text-white/70" : "hover:bg-white/5 text-white/35 border border-transparent"} ${day ? "hover:scale-[1.05] active:scale-[0.95]" : ""}`}>
                          <span className="font-body text-xs">{day}</span>
                          {day && [1,5,8,12,15,19,22,26,29].includes(day) && <div className="w-1.5 h-1.5 bg-neon-grass rounded-full mx-auto mt-0.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-neon-grass/5 border border-neon-grass/15 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-grass pulse-neon" />
                  <span className="font-body text-xs text-white/60">PWA-уведомления об изменениях расписания включены</span>
                </div>
              </div>
            )}

            {/* ====== MATERIALS ====== */}
            {activeTab === "materials" && (
              <div className="animate-fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-code text-neon-grass text-xs tracking-widest">// materials.library</p>
                    <h2 className="font-display font-800 text-2xl mt-0.5">База материалов</h2>
                  </div>
                  {role === "teacher" && (
                    <button className="h-10 px-4 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97] flex items-center gap-2">
                      <Icon name="Plus" size={16} />Добавить материал
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input value={matSearch} onChange={e => setMatSearch(e.target.value)} placeholder="Поиск по материалам..." className="w-full h-10 pl-9 pr-3 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all" />
                  </div>
                  <div className="flex gap-1">
                    {["Все", "PDF", "Video", "Test", "Link"].map(f => (
                      <button key={f} onClick={() => setMatFilter(f)} className={`h-10 px-3 rounded-xl font-body text-sm border transition-all active:scale-[0.97] ${matFilter === f ? "bg-neon-grass/15 border-neon-grass/40 text-neon-grass" : "border-white/12 text-white/45 hover:border-white/25 hover:text-white"}`}>{f}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {materialsData.map(course => {
                    const isOpen = expandedCourses.includes(course.id);
                    return (
                      <div key={course.id} className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
                        <button onClick={() => toggleCourse(course.id)} className="w-full flex items-center gap-3 p-4 hover:bg-white/3 transition-all">
                          <div className="w-8 h-8 rounded-lg bg-neon-grass/10 border border-neon-grass/20 flex items-center justify-center flex-shrink-0">
                            <Icon name={course.icon} size={16} className="text-neon-grass" />
                          </div>
                          <span className="font-display font-700 text-sm flex-1 text-left">{course.title}</span>
                          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/30" />
                        </button>

                        {isOpen && (
                          <div className="border-t border-white/8">
                            {course.modules.map(mod => {
                              const modOpen = expandedModules.includes(mod.id);
                              return (
                                <div key={mod.id} className="border-b border-white/5 last:border-b-0">
                                  <button onClick={() => toggleModule(mod.id)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-all">
                                    <Icon name="Folder" size={15} className="text-white/30 ml-4" />
                                    <span className="font-body text-sm font-600 text-white/70 flex-1 text-left">{mod.title}</span>
                                    <span className="font-code text-[10px] text-white/30">{mod.items.length} материалов</span>
                                    <Icon name={modOpen ? "ChevronUp" : "ChevronDown"} size={14} className="text-white/20" />
                                  </button>

                                  {modOpen && (
                                    <div className="ml-8 mr-3 mb-2 space-y-1">
                                      {mod.items
                                        .filter(item => matFilter === "Все" || item.type === matFilter)
                                        .filter(item => !matSearch || item.title.toLowerCase().includes(matSearch.toLowerCase()))
                                        .map(item => {
                                          const tc = typeConfig[item.type] || typeConfig.Link;
                                          return (
                                            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-all group">
                                              <div className={`w-7 h-7 rounded-lg ${tc.bg} flex items-center justify-center flex-shrink-0`}>
                                                <Icon name={tc.icon} size={14} className={tc.color} />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="font-body text-sm text-white/70 group-hover:text-white transition-colors truncate">{item.title}</div>
                                                {item.size && <div className="font-code text-[10px] text-white/30">{item.size}</div>}
                                              </div>
                                              <button className={`h-8 px-3 rounded-lg border font-body text-xs ${tc.color} border-current/30 hover:bg-current/10 transition-all active:scale-[0.96] flex-shrink-0 opacity-0 group-hover:opacity-100`}>
                                                {tc.action}
                                              </button>
                                              <button className={`h-8 px-3 rounded-lg border font-body text-xs ${tc.color} border-current/30 hover:bg-current/10 transition-all active:scale-[0.96] flex-shrink-0`}>
                                                {tc.action}
                                              </button>
                                            </div>
                                          );
                                        })}
                                      {role === "teacher" && (
                                        <button className="w-full p-2.5 border border-dashed border-white/15 rounded-xl text-xs text-white/30 hover:border-neon-grass/30 hover:text-neon-grass transition-all flex items-center justify-center gap-2">
                                          <Icon name="Plus" size={13} />Добавить материал в модуль
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ====== RATINGS ====== */}
            {activeTab === "ratings" && (
              <div className="animate-fade-in space-y-5">
                <div>
                  <p className="font-code text-neon-grass text-xs tracking-widest">// skills.rating</p>
                  <h2 className="font-display font-800 text-2xl mt-0.5">Рейтинг достижений</h2>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setSkillTab("hard")} className={`h-10 px-5 rounded-xl font-body text-sm border transition-all ${skillTab === "hard" ? "bg-neon-grass text-black border-neon-grass font-600" : "border-white/15 text-white/50 hover:border-white/30"}`}>Hard Skills</button>
                  <button onClick={() => setSkillTab("soft")} className={`h-10 px-5 rounded-xl font-body text-sm border transition-all ${skillTab === "soft" ? "bg-bright-fern text-black border-bright-fern font-600" : "border-white/15 text-white/50 hover:border-white/30"}`}>Soft Skills</button>
                </div>

                <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="text-left px-4 py-3 font-display font-600 text-xs text-white/40 uppercase tracking-wide">Навык</th>
                        <th className="text-left px-4 py-3 font-display font-600 text-xs text-white/40 uppercase tracking-wide">Уровень</th>
                        <th className="text-left px-4 py-3 font-display font-600 text-xs text-white/40 uppercase tracking-wide hidden sm:table-cell">Верификация</th>
                        {role === "teacher" && <th className="text-left px-4 py-3 font-display font-600 text-xs text-white/40 uppercase tracking-wide">Действие</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {(skillTab === "hard" ? hardSkills : softSkills).map(skill => (
                        <tr key={skill.name} className="border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3">
                            <button className="font-display font-700 text-sm hover:text-neon-grass transition-colors" onClick={() => setSelectedBadge({ emoji: "📊", label: skill.name, desc: `Уровень ${skill.level}/5. ${skill.verified ? "Верифицировано: " + skill.verifiedDate : "Ожидает верификации педагогом."}`, earned: skill.verified })}>
                              {skill.name}
                            </button>
                          </td>
                          <td className="px-4 py-3"><Stars count={skill.level} /></td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            {skill.verified ? (
                              <div className="flex items-center gap-1.5">
                                <Icon name="BadgeCheck" size={15} className="text-neon-grass" />
                                <span className="font-body text-xs text-neon-grass">{skill.teacher}</span>
                              </div>
                            ) : (
                              <span className="font-body text-xs text-white/30">Ожидает верификации</span>
                            )}
                          </td>
                          {role === "teacher" && (
                            <td className="px-4 py-3">
                              <button className="h-8 px-3 border border-neon-grass/30 text-neon-grass font-body text-xs rounded-lg hover:bg-neon-grass/10 transition-all active:scale-[0.96]">Верифицировать</button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="font-display font-700 text-sm mb-3">Бейджи и достижения</h3>
                  <div className="flex flex-wrap gap-3">
                    {badges.map(badge => (
                      <button key={badge.label} onClick={() => setSelectedBadge(badge)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-[1.03] active:scale-[0.97] ${badge.earned ? "bg-neon-grass/8 border-neon-grass/25 hover:border-neon-grass/50" : "bg-white/3 border-white/8 opacity-50 hover:opacity-70"}`}>
                        <span className="text-lg">{badge.emoji}</span>
                        <span className={`font-body text-xs ${badge.earned ? "text-neon-grass" : "text-white/40"}`}>{badge.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top students */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-700 text-sm">Топ группы — IT-разработка</h3>
                    <div className="flex gap-2">
                      {["ИТ-21", "ИТ-22"].map(g => <button key={g} className="h-7 px-3 border border-white/12 text-white/40 font-body text-xs rounded-lg hover:border-neon-grass/30 hover:text-neon-grass transition-all">{g}</button>)}
                    </div>
                  </div>
                  <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
                    {topStudents.map(s => (
                      <button key={s.rank} onClick={() => setSelectedStudent(s)} className={`w-full flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 text-left transition-all hover:bg-white/3 hover:scale-[1.005] active:scale-[0.998] ${s.isMe ? "bg-neon-grass/5" : ""}`}>
                        <span className="font-code text-base w-6 text-center">{s.badge || s.rank}</span>
                        <span className={`font-display font-700 text-sm flex-1 ${s.isMe ? "text-neon-grass" : "text-white/80"}`}>{s.name}</span>
                        {s.isMe && <span className="font-code text-[10px] text-neon-grass bg-neon-grass/10 px-2 py-0.5 rounded-full">Это я</span>}
                        <span className={`font-code text-sm ${s.isMe ? "text-neon-grass" : "text-white/40"}`}>{s.xp} XP</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== EVENTS ====== */}
            {activeTab === "events" && (
              <div className="animate-fade-in space-y-4">
                <div>
                  <p className="font-code text-neon-grass text-xs tracking-widest">// events.calendar</p>
                  <h2 className="font-display font-800 text-2xl mt-0.5">Календарь событий</h2>
                </div>
                <div className="space-y-3">
                  {eventsData.map(event => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full p-5 rounded-2xl bg-[#111] border ${event.color.split(" ")[0]} text-left hover:scale-[1.01] active:scale-[0.99] transition-all hover:shadow-lg group`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 text-center w-16 p-2 rounded-xl bg-black/40 border ${event.color.split(" ")[0]}`}>
                          <div className={`font-display font-800 text-xl ${event.color.split(" ")[1]}`}>{event.date.split(" ")[0]}</div>
                          <div className={`font-body text-[10px] ${event.color.split(" ")[1]} opacity-60`}>{event.date.split(" ")[1]}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-code text-[10px] px-2 py-0.5 rounded-full border ${event.badge}`}>{event.type}</span>
                            {event.prize && <span className="font-code text-[10px] text-neon-grass">🏆 {event.prize}</span>}
                          </div>
                          <h3 className={`font-display font-700 text-base group-hover:${event.color.split(" ")[1]} transition-colors`}>{event.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="font-body text-xs text-white/35 flex items-center gap-1"><Icon name="MapPin" size={11} />{event.place}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-auto flex-shrink-0">
                          <div className={`h-8 px-3 rounded-lg border font-body text-xs flex items-center gap-1.5 ${registeredEvents.includes(event.id) ? "bg-neon-grass/15 border-neon-grass/40 text-neon-grass" : `${event.color} border-current/30`}`}>
                            {registeredEvents.includes(event.id) ? <><Icon name="Check" size={12} />Записан</> : <><Icon name="Plus" size={12} />Записаться</>}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {/* Calendar sync */}
                <div className="p-4 rounded-xl bg-white/3 border border-white/8 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={15} className="text-neon-grass" />
                    <span className="font-body text-sm text-white/60">Синхронизировать с:</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-9 px-4 border border-white/15 rounded-xl font-body text-xs text-white/50 hover:border-neon-grass/30 hover:text-neon-grass transition-all active:scale-[0.97]">Google Calendar</button>
                    <button className="h-9 px-4 border border-white/15 rounded-xl font-body text-xs text-white/50 hover:border-neon-grass/30 hover:text-neon-grass transition-all active:scale-[0.97]">Яндекс</button>
                  </div>
                </div>
              </div>
            )}

            {/* ====== PROFILE ====== */}
            {activeTab === "profile" && (
              <div className="animate-fade-in space-y-5">
                <div className="p-6 bg-[#111] border border-white/8 rounded-2xl">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-neon-grass/15 border border-neon-grass/30 flex items-center justify-center text-2xl font-display font-800 text-neon-grass flex-shrink-0">АИ</div>
                    <div className="flex-1">
                      <h2 className="font-display font-800 text-xl">Алексей Иванов</h2>
                      <p className="font-body text-sm text-white/50">Студент · ИТ-разработка · 3 курс</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Python", "React", "HTML/CSS"].map(s => <span key={s} className="font-code text-xs text-neon-grass bg-neon-grass/10 border border-neon-grass/20 px-2 py-0.5 rounded-md">{s}</span>)}
                      </div>
                    </div>
                    <button className="h-9 px-4 border border-white/20 text-white/60 font-body text-sm rounded-xl hover:border-neon-grass/40 hover:text-neon-grass transition-all active:scale-[0.97]">
                      Редактировать
                    </button>
                  </div>
                </div>
                <div className="p-5 bg-[#111] border border-white/8 rounded-2xl">
                  <h3 className="font-display font-700 text-base mb-4">Портфолио</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { title: "Todo App на React", tech: "React, CSS", img: "https://picsum.photos/seed/proj1/300/180" },
                      { title: "Python парсер данных", tech: "Python, BeautifulSoup", img: "https://picsum.photos/seed/proj2/300/180" },
                    ].map(p => (
                      <button key={p.title} onClick={() => setSelectedBadge({ emoji: "🚀", label: p.title, desc: `Стек: ${p.tech}. Учебный проект в рамках курса.`, earned: true })} className="text-left group bg-white/3 border border-white/8 rounded-xl overflow-hidden hover:border-neon-grass/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <img src={p.img} alt={p.title} className="w-full h-28 object-cover" />
                        <div className="p-3">
                          <div className="font-display font-700 text-sm group-hover:text-neon-grass transition-colors">{p.title}</div>
                          <div className="font-code text-xs text-white/35 mt-0.5">{p.tech}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ====== MODALS ====== */}
      {/* Lesson Modal */}
      <Modal open={!!selectedLesson} onClose={() => setSelectedLesson(null)} title={selectedLesson?.subject || ""} size="md">
        {selectedLesson && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "Clock", label: "Время", val: `${selectedLesson.time} — ${selectedLesson.end}` },
                { icon: "MapPin", label: "Аудитория", val: selectedLesson.room },
                { icon: "User", label: "Педагог", val: selectedLesson.teacher },
                { icon: "Tag", label: "Тип", val: selectedLesson.type },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-2">
                  <Icon name={row.icon} size={15} className="text-neon-grass mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-body text-[10px] text-white/35">{row.label}</div>
                    <div className="font-body text-sm text-white/80">{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
            {selectedLesson.hw && (
              <div className="p-3 bg-neon-grass/5 border border-neon-grass/15 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name="BookMarked" size={14} className="text-neon-grass" />
                  <span className="font-display font-600 text-xs text-neon-grass">Домашнее задание</span>
                </div>
                <p className="font-body text-sm text-white/70">{selectedLesson.hw}</p>
              </div>
            )}
            <div className="flex gap-2">
              {selectedLesson.material && (
                <button className="flex-1 h-11 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97]" onClick={() => { setSelectedLesson(null); setActiveTab("materials"); }}>
                  Перейти к материалам
                </button>
              )}
              <button className="flex-1 h-11 border border-white/15 text-white/60 font-body text-sm rounded-xl hover:border-white/30 transition-all active:scale-[0.97]" onClick={() => setSelectedLesson(null)}>Закрыть</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Event Modal — as in the mockup */}
      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)} size="md">
        {selectedEvent && (
          <div>
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/70 hover:text-white transition-all">
                <Icon name="X" size={15} />
              </button>
              <span className={`absolute top-3 left-3 font-code text-[11px] px-2.5 py-1 rounded-full border ${selectedEvent.badge}`}>{selectedEvent.type}</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h2 className="font-display font-800 text-xl mb-2">{selectedEvent.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                  <span className="flex items-center gap-1.5 font-body"><Icon name="Calendar" size={14} className="text-neon-grass" />{selectedEvent.date}</span>
                  <span className="flex items-center gap-1.5 font-body"><Icon name="MapPin" size={14} className="text-neon-grass" />{selectedEvent.place}</span>
                  {selectedEvent.prize && <span className="flex items-center gap-1.5 font-body text-neon-grass"><Icon name="Trophy" size={14} />{selectedEvent.prize}</span>}
                </div>
              </div>
              <p className="font-body text-sm text-white/65 leading-relaxed">{selectedEvent.desc}</p>
              {selectedEvent.requirements && (
                <div className="p-3.5 bg-white/4 border border-white/8 rounded-xl">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon name="Info" size={14} className="text-neon-grass" />
                    <span className="font-display font-600 text-xs text-white/70">Требования к участникам:</span>
                  </div>
                  <ul className="space-y-1">
                    {selectedEvent.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-xs text-white/55">
                        <span className="text-white/30 mt-0.5">•</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 h-11 border border-white/15 text-white/60 font-body text-sm rounded-xl hover:border-white/30 transition-all active:scale-[0.97]"
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    setRegisteredEvents(prev => prev.includes(selectedEvent.id) ? prev.filter(x => x !== selectedEvent.id) : [...prev, selectedEvent.id]);
                    setSelectedEvent(null);
                  }}
                  className={`flex-1 h-11 font-display font-700 text-sm rounded-xl transition-all active:scale-[0.97] ${registeredEvents.includes(selectedEvent.id) ? "bg-neon-grass/15 border border-neon-grass text-neon-grass" : "bg-neon-grass text-black hover:bg-radioactive"}`}
                >
                  {registeredEvents.includes(selectedEvent.id) ? "✓ Отменить запись" : "Подтвердить участие"}
                </button>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/8">
                <span className="font-body text-xs text-white/35">Добавить в календарь:</span>
                <div className="flex gap-2">
                  <button className="h-8 px-3 border border-white/12 text-white/40 font-body text-xs rounded-lg hover:border-neon-grass/30 hover:text-neon-grass transition-all active:scale-[0.96]">Google</button>
                  <button className="h-8 px-3 border border-white/12 text-white/40 font-body text-xs rounded-lg hover:border-neon-grass/30 hover:text-neon-grass transition-all active:scale-[0.96]">Яндекс</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Badge Modal */}
      <Modal open={!!selectedBadge} onClose={() => setSelectedBadge(null)} size="sm">
        {selectedBadge && (
          <div className="p-6 text-center">
            <div className="text-5xl mb-4">{selectedBadge.emoji}</div>
            <h3 className="font-display font-700 text-lg mb-2">{selectedBadge.label}</h3>
            <p className="font-body text-sm text-white/55 mb-5 leading-relaxed">{selectedBadge.desc}</p>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-code text-xs border ${selectedBadge.earned ? "text-neon-grass border-neon-grass/30 bg-neon-grass/8" : "text-white/40 border-white/15"}`}>
              {selectedBadge.earned ? "✓ Получен" : "В процессе..."}
            </div>
            <button onClick={() => setSelectedBadge(null)} className="mt-4 w-full h-10 border border-white/15 text-white/50 font-body text-sm rounded-xl hover:border-white/30 transition-all">Закрыть</button>
          </div>
        )}
      </Modal>

      {/* Student Profile Modal */}
      <Modal open={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="Профиль студента" size="sm">
        {selectedStudent && (
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neon-grass/15 border border-neon-grass/25 flex items-center justify-center font-display font-700 text-neon-grass text-sm">{selectedStudent.name.slice(0, 2)}</div>
              <div>
                <div className="font-display font-700 text-base">{selectedStudent.name}</div>
                <div className="font-body text-xs text-white/40">{selectedStudent.specialty}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="font-code text-neon-grass text-xl font-700">{selectedStudent.rank === 3 ? "🥉" : selectedStudent.rank === 2 ? "🥈" : selectedStudent.rank === 1 ? "🥇" : `#${selectedStudent.rank}`}</div>
                <div className="font-code text-xs text-white/40">{selectedStudent.xp} XP</div>
              </div>
            </div>
            <button onClick={() => setSelectedStudent(null)} className="w-full h-11 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97]">
              Просмотреть портфолио
            </button>
          </div>
        )}
      </Modal>

      {/* Upload Modal */}
      <Modal open={uploadModal} onClose={() => { setUploadModal(false); setUploadDone(false); }} title="Загрузить работу" size="sm">
        <div className="p-5 space-y-4">
          {uploadDone ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-neon-grass/15 border border-neon-grass/30 rounded-2xl flex items-center justify-center mx-auto mb-3"><Icon name="CheckCircle" size={28} className="text-neon-grass" /></div>
              <p className="font-display font-700 text-base text-neon-grass mb-1">Работа загружена!</p>
              <p className="font-body text-sm text-white/50">Педагог получит уведомление и проверит в течение 24 часов.</p>
              <button onClick={() => { setUploadModal(false); setUploadDone(false); }} className="mt-4 w-full h-11 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all">Отлично!</button>
            </div>
          ) : (
            <>
              <select className="w-full h-11 px-3 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white focus:outline-none focus:border-neon-grass/40 cursor-pointer">
                {scheduleData.map(s => <option key={s.id}>{s.subject}</option>)}
              </select>
              <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-white/15 rounded-xl hover:border-neon-grass/30 cursor-pointer transition-all">
                <Icon name="Upload" size={22} className="text-white/30 mb-2" />
                <span className="font-body text-sm text-white/40">Перетащи файл или нажми</span>
                <span className="font-code text-xs text-white/25 mt-0.5">PDF, ZIP до 50 МБ</span>
                <input type="file" className="hidden" />
              </label>
              <button onClick={() => setUploadDone(true)} className="w-full h-11 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97]">Отправить работу</button>
            </>
          )}
        </div>
      </Modal>

      {/* Chat Modal */}
      <Modal open={chatModal} onClose={() => setChatModal(false)} title="Чат с педагогом — Орлов А.В." size="md">
        <div className="flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-xl font-body text-sm leading-relaxed ${msg.from === "me" ? "bg-neon-grass text-black rounded-br-sm" : "bg-white/8 text-white/80 rounded-bl-sm"}`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.from === "me" ? "text-black/50 text-right" : "text-white/30"}`}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/8 flex gap-2">
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Написать сообщение..." className="flex-1 h-10 px-3 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all" />
            <button onClick={sendChat} className="w-10 h-10 bg-neon-grass rounded-xl flex items-center justify-center text-black hover:bg-radioactive transition-all active:scale-[0.95]">
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}