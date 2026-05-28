import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CoursesPageProps {
  onNavigate: (page: string) => void;
}

const categories = ["Все", "IT и программирование", "Дизайн", "Бизнес", "Soft Skills", "Инженерия"];

const courses = [
  {
    id: 1,
    title: "Python: от нуля до уверенного",
    category: "IT и программирование",
    level: "Начинающий",
    modules: 12,
    hours: 48,
    students: 342,
    rating: 4.9,
    tags: ["Python", "Backend", "Hard Skill"],
    teacher: "Орлов А.В.",
    color: "from-neon-grass/20 to-bright-fern/5",
    border: "border-neon-grass/25",
    accent: "text-neon-grass",
  },
  {
    id: 2,
    title: "UI/UX Design: Figma + Принципы",
    category: "Дизайн",
    level: "Средний",
    modules: 9,
    hours: 36,
    students: 189,
    rating: 4.8,
    tags: ["Figma", "Design", "Soft Skill"],
    teacher: "Петрова М.С.",
    color: "from-bright-fern/15 to-olive-leaf/5",
    border: "border-bright-fern/25",
    accent: "text-bright-fern",
  },
  {
    id: 3,
    title: "Командная работа и лидерство",
    category: "Soft Skills",
    level: "Любой",
    modules: 6,
    hours: 18,
    students: 521,
    rating: 4.7,
    tags: ["Teamwork", "Leadership", "Soft Skill"],
    teacher: "Климова Е.Р.",
    color: "from-radioactive/15 to-bright-fern/5",
    border: "border-radioactive/25",
    accent: "text-radioactive",
  },
  {
    id: 4,
    title: "Web-разработка: HTML, CSS, JS",
    category: "IT и программирование",
    level: "Начинающий",
    modules: 15,
    hours: 60,
    students: 274,
    rating: 4.9,
    tags: ["HTML", "CSS", "JavaScript", "Hard Skill"],
    teacher: "Захаров П.И.",
    color: "from-neon-grass/20 to-bright-fern/5",
    border: "border-neon-grass/25",
    accent: "text-neon-grass",
  },
  {
    id: 5,
    title: "Основы бизнес-аналитики",
    category: "Бизнес",
    level: "Средний",
    modules: 8,
    hours: 24,
    students: 156,
    rating: 4.6,
    tags: ["Analytics", "Excel", "Hard Skill"],
    teacher: "Соколова Н.В.",
    color: "from-bright-fern/15 to-olive-leaf/5",
    border: "border-bright-fern/25",
    accent: "text-bright-fern",
  },
  {
    id: 6,
    title: "Сетевые технологии и протоколы",
    category: "Инженерия",
    level: "Продвинутый",
    modules: 11,
    hours: 44,
    students: 98,
    rating: 4.8,
    tags: ["Network", "Cisco", "Hard Skill"],
    teacher: "Морозов К.Л.",
    color: "from-radioactive/15 to-bright-fern/5",
    border: "border-radioactive/25",
    accent: "text-radioactive",
  },
];

const levelColors: Record<string, string> = {
  "Начинающий": "text-neon-grass bg-neon-grass/10 border-neon-grass/25",
  "Средний": "text-bright-fern bg-bright-fern/10 border-bright-fern/25",
  "Продвинутый": "text-radioactive bg-radioactive/10 border-radioactive/25",
  "Любой": "text-white/60 bg-white/5 border-white/15",
};

export default function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "Все" || c.category === activeCategory;
    const matchSearch = search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-28 pb-12 px-4 relative overflow-hidden bg-grid-dark">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] rounded-full bg-neon-grass/4 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Icon name="BookOpen" size={14} className="text-neon-grass" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">База знаний</span>
          </div>
          <h1 className="font-display font-900 text-4xl sm:text-5xl md:text-6xl mb-4 animate-fade-in delay-100">
            Курсы и{" "}
            <span className="gradient-text-hero">модули</span>
          </h1>
          <p className="font-body text-white/50 text-base max-w-xl mb-8 animate-fade-in delay-200">
            180+ курсов по Hard и Soft Skills. Структура курс → модуль → тема. PDF, видео, тесты.
          </p>

          {/* Search */}
          <div className="relative max-w-lg animate-fade-in delay-300">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Поиск по названию, тегам, навыкам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-grass/50 focus:bg-neon-grass/3 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-4 py-4 border-b border-white/8 bg-black/80 sticky top-16 md:top-20 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-body text-sm font-500 border transition-all duration-200 press-effect ${
                activeCategory === cat
                  ? "bg-neon-grass text-black border-neon-grass glow-neon-sm"
                  : "bg-white/3 border-white/15 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="font-body text-sm text-white/40">
              Найдено: <span className="text-neon-grass font-600">{filtered.length}</span> курсов
            </span>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-white/15 rounded-lg font-body text-xs text-white/50 hover:border-white/30 hover:text-white/80 transition-all">
              <Icon name="SlidersHorizontal" size={14} />
              Фильтры
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((course, i) => (
              <div
                key={course.id}
                className={`group p-5 rounded-2xl bg-gradient-to-br ${course.color} border ${course.border} hover:glow-neon-sm transition-all duration-300 hover-lift cursor-pointer animate-fade-in`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className={`font-code text-[10px] px-2 py-1 rounded-full border ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-neon-grass" />
                    <span className="font-code text-xs text-white/70">{course.rating}</span>
                  </div>
                </div>

                <h3 className="font-display font-700 text-base mb-2 group-hover:text-white transition-colors leading-snug">
                  {course.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={`font-code text-[10px] ${course.accent} bg-black/20 px-2 py-0.5 rounded-md`}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-4 text-white/50">
                  <div className="flex items-center gap-1">
                    <Icon name="Layers" size={13} />
                    <span className="font-body text-xs">{course.modules} модулей</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={13} />
                    <span className="font-body text-xs">{course.hours}ч</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={13} />
                    <span className="font-body text-xs">{course.students}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neon-grass/20 border border-neon-grass/30 flex items-center justify-center">
                      <Icon name="User" size={12} className="text-neon-grass" />
                    </div>
                    <span className="font-body text-xs text-white/50">{course.teacher}</span>
                  </div>
                  <button
                    onClick={() => onNavigate("dashboard")}
                    className={`flex items-center gap-1.5 font-display font-600 text-xs px-3 py-1.5 rounded-lg ${course.accent} border ${course.border} hover:bg-neon-grass hover:text-black hover:border-neon-grass transition-all duration-200 press-effect`}
                  >
                    Перейти
                    <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={40} className="text-white/20 mx-auto mb-4" />
              <p className="font-body text-white/40">Ничего не найдено. Попробуй другой запрос.</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills legend */}
      <section className="py-10 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neon-grass/5 border border-neon-grass/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neon-grass/15 border border-neon-grass/30 flex items-center justify-center">
                <Icon name="Code" size={16} className="text-neon-grass" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-neon-grass">Hard Skills</div>
                <div className="font-body text-xs text-white/40">Технические навыки</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "JavaScript", "HTML/CSS", "SQL", "Figma", "Network"].map(s => (
                <span key={s} className="font-code text-[10px] text-neon-grass bg-neon-grass/10 border border-neon-grass/20 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-bright-fern/5 border border-bright-fern/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-bright-fern/15 border border-bright-fern/30 flex items-center justify-center">
                <Icon name="Heart" size={16} className="text-bright-fern" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-bright-fern">Soft Skills</div>
                <div className="font-body text-xs text-white/40">Личностные навыки</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Teamwork", "Leadership", "Communication", "Time Mgmt", "Creativity"].map(s => (
                <span key={s} className="font-code text-[10px] text-bright-fern bg-bright-fern/10 border border-bright-fern/20 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
