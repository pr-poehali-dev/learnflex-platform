import { useState } from "react";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";

interface CoursesPageProps {
  onNavigate: (page: string) => void;
  role?: string;
}

const allCourses = [
  { id: 1, title: "Full-Stack Web Development", subtitle: "React, Node.js & Cloud", category: "IT", skill: "Coding (React/Node)", level: "Средний", duration: "6 месяцев", durationMonths: 6, price: 45000, rating: 4.9, tags: ["React", "Node.js", "PostgreSQL"], img: "https://picsum.photos/seed/webdev42/400/220", students: 342, desc: "Освойте современные технологии React, Node.js и облачные вычисления для создания полноценных веб-приложений." },
  { id: 2, title: "UI/UX Design: Эстетика и Функциональность", subtitle: "Проектирование интерфейсов", category: "Дизайн", skill: "UI/UX Design", level: "Новичок", duration: "3 месяца", durationMonths: 3, price: 32000, rating: 4.8, tags: ["Figma", "Prototyping"], img: "https://picsum.photos/seed/uiux55/400/220", students: 189, desc: "Глубокое погружение в проектирование пользовательского опыта. Figma, прототипирование, UX-исследования." },
  { id: 3, title: "Data Science & ML: От Данных к Решениям", subtitle: "Машинное обучение", category: "IT", skill: "Data Science", level: "Продвинутый", duration: "8 месяцев", durationMonths: 8, price: 52000, rating: 4.7, tags: ["Python", "SQL", "Scikit-learn"], img: "https://picsum.photos/seed/datascience/400/220", students: 274, desc: "Изучите Python, статистику и машинное обучение для анализа больших данных и построения предсказательных моделей." },
  { id: 4, title: "Лидерство в Цифровую Эпоху", subtitle: "Управление командами", category: "Soft", skill: "Лидерство", level: "Средний", duration: "2 месяца", durationMonths: 2, price: 28000, rating: 4.9, tags: ["Strategy"], img: "https://picsum.photos/seed/leadership/400/220", students: 521, desc: "Развивайте навыки управления командами в условиях неопределённости и быстрых изменений." },
  { id: 5, title: "Cybersecurity: Защита и Этичный Хакинг", subtitle: "Безопасность систем", category: "IT", skill: "Cybersecurity", level: "Продвинутый", duration: "4 месяца", durationMonths: 4, price: 38000, rating: 4.6, tags: ["Ethical Hacking", "Networking"], img: "https://picsum.photos/seed/cybersec/400/220", students: 98, desc: "Практический курс по поиску уязвимостей, этичному хакингу и обеспечению кибербезопасности." },
  { id: 6, title: "Project Management: Agile & Scrum", subtitle: "Управление проектами", category: "Soft", skill: "Критическое мышление", level: "Средний", duration: "3 месяца", durationMonths: 3, price: 30000, rating: 4.8, tags: ["Jira", "Agile", "Scrum"], img: "https://picsum.photos/seed/agilepm/400/220", students: 156, desc: "Научитесь эффективно планировать ресурсы и управлять проектами любой сложности по методологии Agile." },
  { id: 7, title: "DevOps: CI/CD и Автоматизация", subtitle: "Практика DevOps", category: "IT", skill: "DevOps", level: "Продвинутый", duration: "5 месяцев", durationMonths: 5, price: 42000, rating: 4.8, tags: ["Docker", "K8s", "GitHub Actions"], img: "https://picsum.photos/seed/devops/400/220", students: 134, desc: "CI/CD пайплайны, контейнеризация, оркестрация — полный стек DevOps инструментов." },
  { id: 8, title: "Коммуникации и Презентации", subtitle: "Деловое общение", category: "Soft", skill: "Коммуникации", level: "Новичок", duration: "1 месяц", durationMonths: 1, price: 15000, rating: 4.7, tags: ["Speaking", "Presentations"], img: "https://picsum.photos/seed/comm/400/220", students: 387, desc: "Научитесь убедительно доносить идеи, выступать перед аудиторией и вести деловые переговоры." },
  { id: 9, title: "Тайм-менеджмент и Продуктивность", subtitle: "Управление временем", category: "Soft", skill: "Тайм-менеджмент", level: "Новичок", duration: "1 месяц", durationMonths: 1, price: 12000, rating: 4.5, tags: ["GTD", "Pomodoro"], img: "https://picsum.photos/seed/time/400/220", students: 642, desc: "Системы управления временем, инструменты планирования и методики повышения личной продуктивности." },
];

const programDetails: Record<number, string[]> = {
  1: ["HTML, CSS, JavaScript основы", "React и state management", "Node.js + Express API", "PostgreSQL и ORM", "Деплой в облако", "Финальный проект"],
  2: ["Основы UX и user research", "Работа в Figma", "Прототипирование", "Тестирование интерфейсов", "Design system", "Кейс-проект"],
  3: ["Python для анализа данных", "Pandas и NumPy", "Визуализация данных", "Машинное обучение", "Deep learning основы", "ML-проект"],
  4: ["Стили лидерства", "Мотивация команды", "Принятие решений", "Коммуникации лидера", "Управление конфликтами", "Стратегическое мышление"],
  5: ["Основы информационной безопасности", "Сетевые атаки", "Pen testing", "OWASP Top 10", "CTF задачи", "Bug bounty"],
  6: ["Agile манифест", "Scrum фреймворк", "Kanban доски", "OKR и метрики", "Jira на практике", "Ретроспективы"],
};

const skillFilters = ["Coding (React/Node)", "UI/UX Design", "Data Science", "Cybersecurity", "DevOps"];
const softFilters = ["Лидерство", "Коммуникации", "Тайм-менеджмент", "Критическое мышление"];
const levelFilters = ["Новичок", "Средний", "Продвинутый", "Эксперт"];
const durationFilters = ["1-3 месяца", "3-6 месяцев", "6+ месяцев"];

const levelColor: Record<string, string> = {
  "Новичок": "text-neon-grass bg-neon-grass/15",
  "Средний": "text-bright-fern bg-bright-fern/15",
  "Продвинутый": "text-radioactive bg-radioactive/15",
  "Эксперт": "text-white/70 bg-white/10",
};

type Course = typeof allCourses[0];

function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  return (
    <div
      className="group bg-[#111] border border-white/8 rounded-2xl overflow-hidden cursor-pointer hover:border-neon-grass/40 hover:shadow-lg hover:shadow-neon-grass/5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="relative overflow-hidden h-44 flex-shrink-0">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Icon name="Star" size={12} className="text-neon-grass" />
          <span className="font-code text-xs text-white font-500">{course.rating}</span>
        </div>
        <span className={`absolute top-3 left-3 font-code text-[10px] px-2 py-0.5 rounded-full ${levelColor[course.level] || "text-white/60 bg-white/10"}`}>
          {course.level}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {course.tags.slice(0, 3).map(tag => (
            <span key={tag} className="font-code text-[10px] text-neon-grass/80 bg-neon-grass/8 border border-neon-grass/15 px-2 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
        <h3 className="font-display font-700 text-sm mb-1 group-hover:text-neon-grass transition-colors leading-snug line-clamp-2">{course.title}</h3>
        <p className="font-body text-xs text-white/45 leading-relaxed mb-3 flex-1 line-clamp-2">{course.desc}</p>
        <div className="flex items-center gap-3 mb-3 text-white/40">
          <span className="flex items-center gap-1 font-body text-xs"><Icon name="Clock" size={12} />{course.duration}</span>
          <span className="flex items-center gap-1 font-body text-xs"><Icon name="Users" size={12} />{course.students}</span>
        </div>
        <div className="font-display font-800 text-lg mb-3">₽{course.price.toLocaleString()}</div>
        <div className="flex gap-2">
          <button className="flex-1 h-11 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all duration-200 active:scale-[0.97]" onClick={e => { e.stopPropagation(); onClick(); }}>
            Записаться
          </button>
          <button className="flex-1 h-11 border border-white/20 text-white/70 font-body text-sm rounded-xl hover:border-neon-grass/40 hover:text-white transition-all duration-200 active:scale-[0.97]" onClick={e => { e.stopPropagation(); onClick(); }}>
            Просмотреть
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage({ onNavigate, role }: CoursesPageProps) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Популярности");
  const [checkedSkills, setCheckedSkills] = useState<string[]>([]);
  const [checkedSoft, setCheckedSoft] = useState<string[]>([]);
  const [checkedLevels, setCheckedLevels] = useState<string[]>([]);
  const [checkedDur, setCheckedDur] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [subModal, setSubModal] = useState(false);
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    setPage(1);
  };

  const filtered = allCourses.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q)) || c.skill.toLowerCase().includes(q);
    const matchSkill = checkedSkills.length === 0 || checkedSkills.includes(c.skill);
    const matchSoft = checkedSoft.length === 0 || checkedSoft.includes(c.skill);
    const matchLevel = checkedLevels.length === 0 || checkedLevels.includes(c.level);
    const matchDur = checkedDur.length === 0 || checkedDur.some(d => {
      const m = c.durationMonths;
      if (d === "1-3 месяца") return m >= 1 && m <= 3;
      if (d === "3-6 месяцев") return m >= 3 && m <= 6;
      if (d === "6+ месяцев") return m > 6;
      return true;
    });
    return matchSearch && (checkedSkills.length === 0 && checkedSoft.length === 0 ? true : (matchSkill || matchSoft)) && matchLevel && matchDur;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Рейтингу") return b.rating - a.rating;
    if (sortBy === "Цене (↑)") return a.price - b.price;
    if (sortBy === "Цене (↓)") return b.price - a.price;
    return b.students - a.students;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const visible = sorted.slice(0, page * perPage);

  const clearAll = () => { setCheckedSkills([]); setCheckedSoft([]); setCheckedLevels([]); setCheckedDur([]); setPage(1); };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-6 px-4 md:px-8 bg-black border-b border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-3 font-body">
            <button onClick={() => onNavigate("home")} className="hover:text-neon-grass transition-colors">Главная</button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-white/70">Курсы</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display font-900 text-3xl sm:text-4xl mb-2">Каталог курсов</h1>
              <p className="font-body text-sm text-white/50 max-w-md">Выбирайте из более чем 200+ профессиональных программ, разработанных ведущими экспертами индустрии.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-1">
              <button onClick={() => setViewMode("grid")} className={`h-9 w-9 rounded-lg flex items-center justify-center border transition-all ${viewMode === "grid" ? "bg-neon-grass/15 border-neon-grass/40 text-neon-grass" : "border-white/15 text-white/40 hover:border-white/30"}`} aria-label="Сетка">
                <Icon name="Grid3x3" size={16} />
              </button>
              <button onClick={() => setViewMode("list")} className={`h-9 w-9 rounded-lg flex items-center justify-center border transition-all ${viewMode === "list" ? "bg-neon-grass/15 border-neon-grass/40 text-neon-grass" : "border-white/15 text-white/40 hover:border-white/30"}`} aria-label="Список">
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1">
              <Icon name="Search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" placeholder="Поиск по названию, тегам или навыкам..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-grass/50 transition-all" />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-body text-sm text-white/40 whitespace-nowrap hidden sm:block">Сортировать по:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="h-12 px-4 bg-[#111] border border-white/15 rounded-xl font-body text-sm text-white focus:outline-none focus:border-neon-grass/50 transition-all cursor-pointer">
                {["Популярности", "Рейтингу", "Цене (↑)", "Цене (↓)"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:flex lg:flex-col w-56 flex-shrink-0 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Icon name="SlidersHorizontal" size={15} className="text-neon-grass" />
                <span className="font-display font-700 text-sm">Фильтры</span>
              </div>
              <button onClick={clearAll} className="font-body text-xs text-neon-grass hover:text-radioactive transition-colors">Сбросить всё</button>
            </div>

            {[
              { label: "Профессиональные навыки", items: skillFilters, checked: checkedSkills, setter: setCheckedSkills },
              { label: "Гибкие навыки", items: softFilters, checked: checkedSoft, setter: setCheckedSoft },
              { label: "Сложность", items: levelFilters, checked: checkedLevels, setter: setCheckedLevels },
              { label: "Длительность", items: durationFilters, checked: checkedDur, setter: setCheckedDur },
            ].map(group => (
              <div key={group.label} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-display font-600 text-xs text-white/60 uppercase tracking-wide">{group.label}</span>
                  <Icon name="ChevronDown" size={14} className="text-white/25" />
                </div>
                {group.items.map(item => (
                  <button
                    key={item}
                    onClick={() => toggle(group.checked, item, group.setter)}
                    className="flex items-center gap-2.5 w-full cursor-pointer group text-left"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${group.checked.includes(item) ? "bg-neon-grass border-neon-grass" : "border-white/25 group-hover:border-neon-grass/50"}`}>
                      {group.checked.includes(item) && <Icon name="Check" size={10} className="text-black" />}
                    </div>
                    <span className={`font-body text-xs transition-colors ${group.checked.includes(item) ? "text-neon-grass" : "text-white/55 group-hover:text-white/80"}`}>{item}</span>
                  </button>
                ))}
              </div>
            ))}

            {/* Promo */}
            <div className="p-4 rounded-2xl bg-neon-grass/8 border border-neon-grass/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-neon-grass flex items-center justify-center">
                  <Icon name="Zap" size={13} className="text-black" />
                </div>
                <span className="font-display font-700 text-xs text-neon-grass">Не пропустите скидки!</span>
              </div>
              <p className="font-body text-xs text-white/50 mb-3">Подпишитесь на нашу рассылку и получайте эксклюзивные предложения до 40%.</p>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full h-9 px-3 bg-black/40 border border-white/15 rounded-lg font-body text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-neon-grass/50 mb-2" />
              <button onClick={() => { if (email) setEmailSent(true); }}
                className="w-full h-9 bg-neon-grass text-black font-display font-700 text-xs rounded-lg hover:bg-radioactive transition-all active:scale-[0.97]">
                {emailSent ? "✓ Готово!" : "Подписаться"}
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-sm text-white/40">
                Найдено: <span className="text-neon-grass font-600">{filtered.length}</span> курсов
              </span>
              {(checkedSkills.length + checkedSoft.length + checkedLevels.length + checkedDur.length > 0 || search) && (
                <button onClick={() => { clearAll(); setSearch(""); }} className="flex items-center gap-1.5 font-body text-xs text-radioactive hover:text-white transition-colors">
                  <Icon name="X" size={13} /> Сбросить фильтры
                </button>
              )}
            </div>

            {viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {visible.map(course => <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {visible.map(course => (
                  <div key={course.id} className="flex gap-4 p-4 bg-[#111] border border-white/8 rounded-2xl cursor-pointer hover:border-neon-grass/35 hover:scale-[1.01] active:scale-[0.99] transition-all" onClick={() => setSelectedCourse(course)} tabIndex={0} onKeyDown={e => e.key === "Enter" && setSelectedCourse(course)}>
                    <img src={course.img} alt={course.title} className="w-28 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-1">{course.tags.slice(0, 2).map(t => <span key={t} className="font-code text-[9px] text-neon-grass/70 bg-neon-grass/8 px-1.5 py-0.5 rounded">{t}</span>)}</div>
                      <h3 className="font-display font-700 text-sm line-clamp-1">{course.title}</h3>
                      <p className="font-body text-xs text-white/40 line-clamp-1 mt-0.5">{course.desc}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-code text-xs text-white/40 flex items-center gap-1"><Icon name="Clock" size={11} />{course.duration}</span>
                        <span className="font-display font-700 text-sm">{`₽${course.price.toLocaleString()}`}</span>
                        <button className="ml-auto h-9 px-4 bg-neon-grass text-black font-display font-700 text-xs rounded-xl hover:bg-radioactive transition-all active:scale-[0.97]" onClick={e => { e.stopPropagation(); setSelectedCourse(course); }}>Записаться</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visible.length === 0 && (
              <div className="text-center py-20">
                <Icon name="SearchX" size={40} className="text-white/15 mx-auto mb-3" />
                <p className="font-body text-sm text-white/35">Ничего не найдено. Попробуй другой запрос или сбрось фильтры.</p>
                <button onClick={() => { clearAll(); setSearch(""); }} className="mt-3 font-body text-sm text-neon-grass hover:text-radioactive transition-colors">Сбросить всё</button>
              </div>
            )}

            {/* Pagination */}
            {sorted.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg font-code text-sm transition-all ${page === p ? "bg-neon-grass text-black font-700" : "border border-white/15 text-white/50 hover:border-neon-grass/40 hover:text-white"}`}>{p}</button>
                  ))}
                  {totalPages > 5 && <><span className="text-white/30 px-1">...</span><button onClick={() => setPage(totalPages)} className="w-9 h-9 rounded-lg font-code text-sm border border-white/15 text-white/50 hover:border-neon-grass/40">{totalPages}</button></>}
                </div>
                <p className="font-body text-xs text-white/35">Показано {visible.length} из {sorted.length} курсов</p>
                {visible.length < sorted.length && (
                  <button onClick={() => setPage(p => p + 1)} className="flex items-center gap-2 font-body text-sm text-neon-grass hover:text-radioactive transition-colors">
                    Показать больше <Icon name="ArrowRight" size={15} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pro promo */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[#0a1400] border border-neon-grass/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-grass/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <span className="font-code text-[10px] text-neon-grass tracking-widest uppercase bg-neon-grass/10 border border-neon-grass/25 px-2.5 py-1 rounded-full">LearnFlex Pro</span>
              <h2 className="font-display font-900 text-2xl sm:text-3xl mt-3 mb-4">Готовы к полному погружению в обучение?</h2>
              <ul className="space-y-2 mb-6">
                {["Безлимитный доступ к 500+ курсам", "Прямые сессии с экспертами (Office Hours)", "Карьерные консультации и разбор резюме"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 font-body text-sm text-white/70">
                    <Icon name="CircleCheck" size={16} className="text-neon-grass flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setSubModal(true)} className="h-12 px-7 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all hover:scale-[1.02] active:scale-[0.98]">
                Узнать о подписке
              </button>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <img src="https://picsum.photos/seed/promo1/160/120" alt="pro" className="w-32 h-24 rounded-2xl object-cover" />
              <img src="https://picsum.photos/seed/promo2/160/120" alt="pro2" className="w-32 h-24 rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/8 bg-black py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://cdn.poehali.dev/projects/db98e2fc-1415-4c9e-9d40-a51971e6dc4e/bucket/ba0ab2b3-d259-4a45-9c27-42e39429d6e6.png" alt="LearnFlex" className="h-8 object-contain" />
            </div>
            <p className="font-body text-xs text-white/40 leading-relaxed mb-4">Building the next generation of digital leaders. Bridge the skill gap with our expert-led college platform.</p>
            <div className="flex gap-3">
              {["Twitter", "Linkedin", "Github"].map(s => (
                <button key={s} className="w-8 h-8 rounded-lg border border-white/12 flex items-center justify-center text-white/40 hover:text-neon-grass hover:border-neon-grass/30 transition-all">
                  <Icon name={s} size={14} />
                </button>
              ))}
            </div>
          </div>
          {[
            { title: "PLATFORM", links: ["All Courses", "Learning Paths", "Certifications"] },
            { title: "INSTITUTION", links: ["Our Team", "Mission", "Careers"] },
            { title: "CONNECT", links: ["hello@learnflex.edu", "+1 (555) 000-0000", "123 Campus Way, Tech City"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-display font-700 text-xs text-white/50 tracking-widest uppercase mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><button className="font-body text-sm text-white/55 hover:text-neon-grass transition-colors text-left">{link}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body text-xs text-white/25">© 2026 LearnFlex. All rights reserved.</span>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(l => (
              <button key={l} className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* Course Modal */}
      <Modal open={!!selectedCourse} onClose={() => setSelectedCourse(null)} size="lg">
        {selectedCourse && (
          <div>
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img src={selectedCourse.img} alt={selectedCourse.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all">
                <Icon name="X" size={16} />
              </button>
              <div className="absolute bottom-4 left-4 right-12">
                <div className="flex flex-wrap gap-1.5 mb-1.5">{selectedCourse.tags.map(t => <span key={t} className="font-code text-[10px] text-neon-grass bg-neon-grass/15 px-2 py-0.5 rounded-md">{t}</span>)}</div>
                <h2 className="font-display font-800 text-xl text-white">{selectedCourse.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ icon: "Clock", val: selectedCourse.duration, label: "Длительность" }, { icon: "Users", val: `${selectedCourse.students}`, label: "Студентов" }, { icon: "Star", val: `${selectedCourse.rating}`, label: "Рейтинг" }].map(s => (
                  <div key={s.label} className="text-center p-3 bg-white/3 rounded-xl border border-white/8">
                    <Icon name={s.icon} size={18} className="text-neon-grass mx-auto mb-1" />
                    <div className="font-display font-700 text-sm">{s.val}</div>
                    <div className="font-body text-[10px] text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="font-body text-sm text-white/60 mb-5 leading-relaxed">{selectedCourse.desc}</p>
              <h3 className="font-display font-700 text-sm mb-3">Программа курса</h3>
              <ul className="space-y-2 mb-6">
                {(programDetails[selectedCourse.id] || ["Введение", "Основной блок", "Практика", "Итоговый проект"]).map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-neon-grass/15 border border-neon-grass/25 flex items-center justify-center flex-shrink-0">
                      <span className="font-code text-[9px] text-neon-grass">{i + 1}</span>
                    </div>
                    <span className="font-body text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="font-display font-800 text-2xl mb-4">₽{selectedCourse.price.toLocaleString()}</div>
              <div className="flex gap-3">
                <button onClick={() => { setEnrolled(prev => [...prev, selectedCourse.id]); setSelectedCourse(null); }}
                  className={`flex-1 h-12 font-display font-700 text-sm rounded-xl transition-all active:scale-[0.97] ${enrolled.includes(selectedCourse.id) ? "bg-neon-grass/20 border border-neon-grass text-neon-grass" : "bg-neon-grass text-black hover:bg-radioactive"}`}>
                  {enrolled.includes(selectedCourse.id) ? "✓ Уже записан" : "Записаться на курс"}
                </button>
                <button onClick={() => setSelectedCourse(null)} className="h-12 px-5 border border-white/20 text-white/60 font-body text-sm rounded-xl hover:border-white/40 transition-all">Закрыть</button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Subscription Modal */}
      <Modal open={subModal} onClose={() => setSubModal(false)} title="LearnFlex Pro — Подписка" size="md">
        <div className="p-6 space-y-4">
          {[
            { plan: "Базовый", price: "₽1,990/мес", features: ["50 курсов", "Сертификаты", "Email-поддержка"], recommended: false },
            { plan: "Про", price: "₽3,490/мес", features: ["500+ курсов", "Office Hours", "Карьерные консультации", "Приоритетная поддержка"], recommended: true },
          ].map(plan => (
            <div key={plan.plan} className={`p-5 rounded-2xl border ${plan.recommended ? "border-neon-grass/40 bg-neon-grass/5" : "border-white/10 bg-white/3"}`}>
              {plan.recommended && <div className="font-code text-[10px] text-neon-grass mb-2 tracking-widest">★ РЕКОМЕНДУЕМ</div>}
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-700 text-base">{plan.plan}</span>
                <span className="font-code text-neon-grass font-700">{plan.price}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map(f => <li key={f} className="flex items-center gap-2 font-body text-sm text-white/60"><Icon name="Check" size={13} className="text-neon-grass" />{f}</li>)}
              </ul>
              <button className={`w-full h-11 font-display font-700 text-sm rounded-xl transition-all active:scale-[0.97] ${plan.recommended ? "bg-neon-grass text-black hover:bg-radioactive" : "border border-white/20 text-white/70 hover:border-neon-grass/40"}`}>
                Выбрать {plan.plan}
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
