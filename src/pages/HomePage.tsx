import { useState } from "react";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: "2 400+", label: "студентов онлайн", icon: "Users" },
  { value: "180", label: "курсов и модулей", icon: "BookOpen" },
  { value: "94%", label: "трудоустройство", icon: "TrendingUp" },
  { value: "48", label: "педагогов-экспертов", icon: "GraduationCap" },
];

const features = [
  {
    icon: "Calendar",
    title: "Умное расписание",
    desc: "Недельный и месячный вид, PWA-уведомления об изменениях, автоподгрузка домашних заданий к каждому занятию.",
    tag: "Онлайн"
  },
  {
    icon: "BookOpen",
    title: "База материалов",
    desc: "PDF, видео, тесты, внешние ссылки. Поиск по названию, тегам и навыкам Hard/Soft. Структура: курс → модуль → тема.",
    tag: "Библиотека"
  },
  {
    icon: "Trophy",
    title: "Рейтинг достижений",
    desc: "Независимые рейтинги Hard Skills и Soft Skills. Бейджи, очки опыта, верификация педагогом, топ по специальности.",
    tag: "Геймификация"
  },
  {
    icon: "Zap",
    title: "Календарь событий",
    desc: "Хакатоны, гость-лекции, дедлайны и родительские собрания. Интеграция с Google и Яндекс Календарём.",
    tag: "События"
  },
  {
    icon: "MessageSquare",
    title: "Обратная связь",
    desc: "Тикетная система с выбором темы, приоритетом и статусом. Прикрепление скриншотов. Чат внутри тикета.",
    tag: "Поддержка"
  },
  {
    icon: "Search",
    title: "Поиск талантов",
    desc: "Работодатели фильтруют студентов по навыкам, просматривают анонимизированные портфолио, запрашивают верификацию.",
    tag: "Карьера"
  },
];

const roles = [
  { id: "student", icon: "GraduationCap", label: "Студент", color: "from-neon-grass/20 to-bright-fern/10", border: "border-neon-grass/30", iconColor: "text-neon-grass", desc: "Учёба, расписание, рейтинги, портфолио" },
  { id: "teacher", icon: "BookOpenCheck", label: "Педагог", color: "from-bright-fern/20 to-olive-leaf/10", border: "border-bright-fern/30", iconColor: "text-bright-fern", desc: "Курсы, оценки, аналитика группы" },
  { id: "parent", icon: "Heart", label: "Родитель", color: "from-radioactive/20 to-bright-fern/10", border: "border-radioactive/30", iconColor: "text-radioactive", desc: "Прогресс ребёнка, уведомления, чат" },
  { id: "employer", icon: "Briefcase", label: "Работодатель", color: "from-olive-leaf/30 to-bright-fern/10", border: "border-olive-leaf/40", iconColor: "text-bright-fern", desc: "Поиск талантов, портфолио, навыки" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [activeRole, setActiveRole] = useState("student");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-dark">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-neon-grass/5 blur-[120px]" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-bright-fern/8 blur-[80px] pointer-events-none" />

        {/* Floating badges */}
        <div className="absolute top-32 left-6 md:left-16 animate-fade-in delay-600 hidden sm:block">
          <div className="bg-black/80 border border-neon-grass/30 rounded-xl px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-grass pulse-neon" />
              <span className="font-body text-xs text-white/70">2 400+ студентов онлайн</span>
            </div>
          </div>
        </div>

        <div className="absolute top-44 right-6 md:right-20 animate-fade-in delay-500 hidden sm:block">
          <div className="bg-black/80 border border-bright-fern/30 rounded-xl px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={14} className="text-neon-grass" />
              <span className="font-body text-xs text-white/70">Рейтинг обновлён</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-grass pulse-neon" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">
              Образовательная платформа нового поколения
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6 animate-fade-in delay-100">
            Build your{" "}
            <span className="gradient-text-hero block">future.</span>
          </h1>
          <h2 className="font-display font-700 text-3xl sm:text-4xl md:text-5xl text-white/80 mb-4 animate-fade-in delay-200">
            Bridge the skills.
          </h2>

          <p className="font-body text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-300">
            LearnFlex — пространство, где студенты растут, педагоги вдохновляют,
            а работодатели находят лучших. Всё в одной платформе.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-400">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-8 py-4 bg-neon-grass text-black font-display font-700 text-base rounded-xl glow-neon hover:bg-radioactive hover:glow-neon transition-all duration-200 press-effect hover-lift"
            >
              Начать обучение
            </button>
            <button
              onClick={() => onNavigate("courses")}
              className="px-8 py-4 border border-white/20 text-white font-display font-600 text-base rounded-xl hover:border-neon-grass/50 hover:bg-white/5 transition-all duration-200 press-effect"
            >
              Смотреть курсы →
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex justify-center animate-fade-in delay-600">
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="font-body text-xs">Листай вниз</span>
              <Icon name="ChevronDown" size={18} className="animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 border-y border-white/5 bg-black/80">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl bg-white/3 border border-white/8 hover-lift transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon name={stat.icon} size={28} className="text-neon-grass mx-auto mb-3" />
              <div className="font-display font-800 text-3xl sm:text-4xl gradient-text mb-1">{stat.value}</div>
              <div className="font-body text-xs sm:text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-code text-neon-grass text-sm tracking-widest uppercase">// Роли</span>
            <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
              Платформа для каждого
            </h2>
            <p className="font-body text-white/50 text-base max-w-xl mx-auto">
              Четыре роли — один экосистем. Каждый получает своё пространство, инструменты и возможности.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 text-left press-effect hover-lift ${
                  activeRole === role.id
                    ? `bg-gradient-to-br ${role.color} ${role.border} glow-neon-sm`
                    : "bg-white/3 border-white/8 hover:border-white/20"
                }`}
              >
                <Icon name={role.icon} size={24} className={activeRole === role.id ? role.iconColor : "text-white/40"} />
                <div className={`font-display font-700 text-sm mt-3 mb-1 ${activeRole === role.id ? "text-white" : "text-white/60"}`}>
                  {role.label}
                </div>
                <div className="font-body text-xs text-white/40 leading-snug hidden md:block">{role.desc}</div>
              </button>
            ))}
          </div>

          {/* Role description panel */}
          <div className="bg-white/3 border border-neon-grass/20 rounded-2xl p-6 md:p-8 animate-scale-in">
            {activeRole === "student" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-code text-neon-grass text-xs mb-3 tracking-wider">// student.route</div>
                  <h3 className="font-display font-700 text-xl mb-3">Маршрут студента</h3>
                  <div className="space-y-2">
                    {[
                      "Дашборд → прогресс и уведомления",
                      "Расписание → пары и дедлайны",
                      "База материалов → лекции и задания",
                      "Загрузка работ → получение оценки",
                      "Рейтинг → Hard & Soft Skills",
                      "Календарь → запись на мастер-класс",
                      "Обратная связь → вопрос педагогу",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-neon-grass/20 border border-neon-grass/40 flex items-center justify-center flex-shrink-0">
                          <span className="font-code text-neon-grass text-[10px]">{i + 1}</span>
                        </div>
                        <span className="font-body text-sm text-white/70">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="font-code text-neon-grass text-xs mb-3 tracking-wider">// features.student</div>
                  {["Личный рейтинг навыков", "Загрузка домашних работ", "Чат с преподавателем", "Бейджи и очки опыта", "График прогресса"].map((f) => (
                    <div key={f} className="flex items-center gap-2 bg-neon-grass/5 rounded-lg px-3 py-2">
                      <Icon name="Check" size={14} className="text-neon-grass flex-shrink-0" />
                      <span className="font-body text-sm text-white/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeRole === "teacher" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-code text-bright-fern text-xs mb-3 tracking-wider">// teacher.route</div>
                  <h3 className="font-display font-700 text-xl mb-3">Маршрут педагога</h3>
                  <div className="space-y-2">
                    {[
                      "Дашборд → непроверенные работы",
                      "Материалы → создание нового урока",
                      "Расписание → редактирование занятий",
                      "Рейтинг → верификация навыков",
                      "Обратная связь → ответы студентам",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-bright-fern/20 border border-bright-fern/40 flex items-center justify-center flex-shrink-0">
                          <span className="font-code text-bright-fern text-[10px]">{i + 1}</span>
                        </div>
                        <span className="font-body text-sm text-white/70">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="font-code text-bright-fern text-xs mb-3 tracking-wider">// features.teacher</div>
                  {["Управление курсами", "Конструктор оценок", "Аналитика группы", "Верификация навыков студентов", "Ответы на тикеты"].map((f) => (
                    <div key={f} className="flex items-center gap-2 bg-bright-fern/5 rounded-lg px-3 py-2">
                      <Icon name="Check" size={14} className="text-bright-fern flex-shrink-0" />
                      <span className="font-body text-sm text-white/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeRole === "parent" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-code text-radioactive text-xs mb-3 tracking-wider">// parent.route</div>
                  <h3 className="font-display font-700 text-xl mb-3">Маршрут родителя</h3>
                  <div className="space-y-2">
                    {[
                      "Прогресс ребёнка → оценки и пропуски",
                      "Календарь → родительские собрания",
                      "Обратная связь → вопрос классному руководителю",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-radioactive/20 border border-radioactive/40 flex items-center justify-center flex-shrink-0">
                          <span className="font-code text-radioactive text-[10px]">{i + 1}</span>
                        </div>
                        <span className="font-body text-sm text-white/70">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="font-code text-radioactive text-xs mb-3 tracking-wider">// features.parent</div>
                  {["Прогресс и оценки", "Журнал посещаемости", "Уведомления об оценках", "Родительский чат", "Запись на собрания"].map((f) => (
                    <div key={f} className="flex items-center gap-2 bg-radioactive/5 rounded-lg px-3 py-2">
                      <Icon name="Check" size={14} className="text-radioactive flex-shrink-0" />
                      <span className="font-body text-sm text-white/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeRole === "employer" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-code text-bright-fern text-xs mb-3 tracking-wider">// employer.route</div>
                  <h3 className="font-display font-700 text-xl mb-3">Маршрут работодателя</h3>
                  <div className="space-y-2">
                    {[
                      "Поиск → фильтр по навыкам (Python, teamwork)",
                      "Портфолио → анонимизированный просмотр",
                      "Верификация → запрос подтверждения навыков",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-bright-fern/20 border border-bright-fern/40 flex items-center justify-center flex-shrink-0">
                          <span className="font-code text-bright-fern text-[10px]">{i + 1}</span>
                        </div>
                        <span className="font-body text-sm text-white/70">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="font-code text-bright-fern text-xs mb-3 tracking-wider">// features.employer</div>
                  {["Поиск по Hard & Soft Skills", "Публичные портфолио", "Верификация компетенций", "Публикация вакансий", "Контакт с выпускниками"].map((f) => (
                    <div key={f} className="flex items-center gap-2 bg-bright-fern/5 rounded-lg px-3 py-2">
                      <Icon name="Check" size={14} className="text-bright-fern flex-shrink-0" />
                      <span className="font-body text-sm text-white/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-black/90 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-code text-neon-grass text-sm tracking-widest uppercase">// Возможности</span>
            <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
              5 ключевых разделов
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-neon-grass/30 hover:bg-neon-grass/3 transition-all duration-300 group hover-lift"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-grass/10 border border-neon-grass/20 flex items-center justify-center group-hover:bg-neon-grass/20 group-hover:border-neon-grass/40 transition-all">
                    <Icon name={feature.icon} size={20} className="text-neon-grass" />
                  </div>
                  <span className="font-code text-[10px] text-neon-grass/60 bg-neon-grass/5 border border-neon-grass/15 px-2 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-display font-700 text-base mb-2 group-hover:text-neon-grass transition-colors">{feature.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-neon-grass/5 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-grass pulse-neon" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">Готов стартовать?</span>
          </div>
          <h2 className="font-display font-900 text-4xl sm:text-5xl md:text-6xl mb-6">
            Твоё будущее{" "}
            <span className="gradient-text-hero">начинается здесь.</span>
          </h2>
          <p className="font-body text-white/50 text-base mb-8 max-w-xl mx-auto">
            Присоединяйся к тысячам студентов, которые уже строят карьеру с LearnFlex.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-8 py-4 bg-neon-grass text-black font-display font-700 text-base rounded-xl glow-neon hover:bg-radioactive transition-all duration-200 press-effect hover-lift"
            >
              Открыть платформу
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-4 border border-white/20 text-white font-display font-600 text-base rounded-xl hover:border-neon-grass/40 hover:bg-white/5 transition-all duration-200 press-effect"
            >
              Задать вопрос
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 border-t border-white/8 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-neon-grass flex items-center justify-center">
              <span className="font-display font-800 text-black text-xs">LF</span>
            </div>
            <span className="font-display font-700 text-white">Learn<span className="text-neon-grass">Flex</span></span>
          </div>
          <span className="font-body text-xs text-white/30">
            Build your future. Bridge the skills. © 2025 LearnFlex
          </span>
          <div className="flex items-center gap-4">
            {["Политика", "Поддержка", "Доступность"].map((link) => (
              <span key={link} className="font-body text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}