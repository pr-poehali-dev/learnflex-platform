import Icon from "@/components/ui/icon";

interface TeamPageProps {
  onNavigate: (page: string) => void;
}

const team = [
  {
    name: "Андрей Орлов",
    role: "Педагог IT-дисциплин",
    subject: "Python, Backend",
    exp: "8 лет опыта",
    skills: ["Python", "Django", "PostgreSQL"],
    bio: "Практикующий разработчик, ведёт курсы по программированию. Верифицировал 200+ студентов.",
    emoji: "👨‍💻",
    color: "from-neon-grass/15 to-transparent",
    border: "border-neon-grass/25",
    accent: "text-neon-grass",
    students: 342,
    courses: 4,
  },
  {
    name: "Марина Петрова",
    role: "Педагог дизайна",
    subject: "UI/UX, Figma",
    exp: "6 лет опыта",
    skills: ["Figma", "Photoshop", "UX Research"],
    bio: "Дизайнер с опытом в крупных компаниях. Автор методики «Дизайн за 21 день».",
    emoji: "👩‍🎨",
    color: "from-bright-fern/15 to-transparent",
    border: "border-bright-fern/25",
    accent: "text-bright-fern",
    students: 189,
    courses: 3,
  },
  {
    name: "Екатерина Климова",
    role: "Коуч и психолог",
    subject: "Soft Skills, Коммуникации",
    exp: "10 лет опыта",
    skills: ["Leadership", "Teamwork", "Coaching"],
    bio: "Эксперт по развитию личных навыков. Проводит тренинги для студентов и корпораций.",
    emoji: "🧠",
    color: "from-radioactive/12 to-transparent",
    border: "border-radioactive/25",
    accent: "text-radioactive",
    students: 521,
    courses: 2,
  },
  {
    name: "Павел Захаров",
    role: "Педагог веб-технологий",
    subject: "HTML, CSS, JS",
    exp: "7 лет опыта",
    skills: ["JavaScript", "React", "HTML/CSS"],
    bio: "Fullstack разработчик и ментор. Создал 50+ проектов в продакшне.",
    emoji: "🚀",
    color: "from-neon-grass/15 to-transparent",
    border: "border-neon-grass/25",
    accent: "text-neon-grass",
    students: 274,
    courses: 5,
  },
  {
    name: "Наталья Соколова",
    role: "Педагог бизнес-дисциплин",
    subject: "Аналитика, Бизнес",
    exp: "9 лет опыта",
    skills: ["Analytics", "Excel", "Business"],
    bio: "Бизнес-аналитик с опытом в ритейл и финтех. Практические кейсы из реальных компаний.",
    emoji: "📊",
    color: "from-bright-fern/15 to-transparent",
    border: "border-bright-fern/25",
    accent: "text-bright-fern",
    students: 156,
    courses: 2,
  },
  {
    name: "Кирилл Морозов",
    role: "Педагог инженерии",
    subject: "Сети, Инфраструктура",
    exp: "12 лет опыта",
    skills: ["Network", "Cisco", "Linux"],
    bio: "Сертифицированный инженер Cisco. Настраивал сети для крупных предприятий.",
    emoji: "🔧",
    color: "from-radioactive/12 to-transparent",
    border: "border-radioactive/25",
    accent: "text-radioactive",
    students: 98,
    courses: 3,
  },
];

const values = [
  { icon: "Zap", title: "Практика прежде всего", desc: "Каждый курс — реальные задачи из индустрии, а не просто теория." },
  { icon: "Users", title: "Наставничество", desc: "Педагоги — практики с опытом в реальных компаниях и проектах." },
  { icon: "Trophy", title: "Верификация навыков", desc: "Педагог лично подтверждает компетенции студента. Не просто оценка." },
  { icon: "Heart", title: "Среда поддержки", desc: "Открытый диалог, обратная связь, чат с педагогом в любое время." },
];

export default function TeamPage({ onNavigate }: TeamPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-28 pb-12 px-4 relative overflow-hidden bg-grid-dark">
        <div className="absolute top-20 right-10 w-[400px] h-[300px] rounded-full bg-bright-fern/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Icon name="Users" size={14} className="text-neon-grass" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">Команда экспертов</span>
          </div>
          <h1 className="font-display font-900 text-4xl sm:text-5xl md:text-6xl mb-4 animate-fade-in delay-100">
            Педагоги-{" "}
            <span className="gradient-text-hero">практики</span>
          </h1>
          <p className="font-body text-white/50 text-base max-w-xl animate-fade-in delay-200">
            48 экспертов с реальным опытом в индустрии. Не просто преподаватели — ваши менторы и коллеги.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 px-4 border-b border-white/8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-neon-grass/25 hover:bg-neon-grass/3 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-neon-grass/10 border border-neon-grass/20 flex items-center justify-center mb-3 group-hover:bg-neon-grass/20 transition-all">
                <Icon name={v.icon} size={16} className="text-neon-grass" />
              </div>
              <div className="font-display font-700 text-sm mb-1">{v.title}</div>
              <div className="font-body text-xs text-white/40 leading-relaxed">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team grid */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-code text-neon-grass text-xs tracking-widest uppercase">// Педагоги</span>
              <h2 className="font-display font-800 text-2xl sm:text-3xl mt-1">Знакомьтесь с командой</h2>
            </div>
            <span className="font-body text-xs text-white/30 hidden sm:block">48 педагогов · 6 направлений</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`p-5 rounded-2xl bg-gradient-to-br ${member.color} border ${member.border} hover:glow-neon-sm transition-all duration-300 hover-lift group animate-fade-in`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-black/30 border ${member.border} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {member.emoji}
                  </div>
                  <div>
                    <div className="font-display font-700 text-base leading-tight">{member.name}</div>
                    <div className={`font-body text-xs ${member.accent} mt-0.5`}>{member.role}</div>
                    <div className="font-body text-xs text-white/35 mt-0.5">{member.exp}</div>
                  </div>
                </div>

                <p className="font-body text-xs text-white/50 leading-relaxed mb-4">{member.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.skills.map(s => (
                    <span key={s} className={`font-code text-[10px] ${member.accent} bg-black/20 px-2 py-0.5 rounded-md`}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className={`pt-3 border-t border-white/10 flex gap-4`}>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Users" size={13} className="text-white/30" />
                    <span className="font-body text-xs text-white/40">{member.students} студентов</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="BookOpen" size={13} className="text-white/30" />
                    <span className="font-body text-xs text-white/40">{member.courses} курса</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-800 text-2xl sm:text-3xl mb-3">
            Хочешь преподавать на LearnFlex?
          </h2>
          <p className="font-body text-white/50 text-sm mb-6">
            Мы всегда ищем практиков и экспертов. Расскажи о своём опыте — разберёмся вместе.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="px-7 py-3.5 bg-neon-grass text-black font-display font-700 text-sm rounded-xl glow-neon-sm hover:glow-neon hover:bg-radioactive transition-all duration-200 press-effect"
          >
            Стать педагогом
          </button>
        </div>
      </section>
    </div>
  );
}
