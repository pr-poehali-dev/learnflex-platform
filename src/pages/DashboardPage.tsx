import { useState } from "react";
import Icon from "@/components/ui/icon";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const schedule = [
  { time: "09:00", subject: "Python: Функции и ООП", room: "Ауд. 301", teacher: "Орлов А.В.", type: "Лекция", deadline: null },
  { time: "10:45", subject: "Английский язык", room: "Ауд. 105", teacher: "Смирнова В.П.", type: "Практика", deadline: null },
  { time: "12:30", subject: "Web-разработка", room: "Лаб. 201", teacher: "Захаров П.И.", type: "Лаб. работа", deadline: "Сдать до 18:00" },
  { time: "14:15", subject: "Командная работа", room: "Ауд. 404", teacher: "Климова Е.Р.", type: "Семинар", deadline: null },
];

const notifications = [
  { icon: "CheckCircle", text: "Оценка за Python: 5/5 ⚡", time: "5 мин назад", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/20" },
  { icon: "AlertCircle", text: "Дедлайн: Web-разработка через 3 ч", time: "1 час назад", color: "text-radioactive", bg: "bg-radioactive/10 border-radioactive/20" },
  { icon: "Calendar", text: "Хакатон «ИИ за выходные» — 1 июня", time: "2 часа назад", color: "text-bright-fern", bg: "bg-bright-fern/10 border-bright-fern/20" },
  { icon: "Trophy", text: "Ты вошёл в топ-5 по Python!", time: "Вчера", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/20" },
];

const hardSkills = [
  { name: "Python", level: 4, max: 5, verified: true },
  { name: "JavaScript", level: 3, max: 5, verified: false },
  { name: "HTML/CSS", level: 5, max: 5, verified: true },
  { name: "SQL", level: 2, max: 5, verified: false },
];

const softSkills = [
  { name: "Teamwork", level: 4, max: 5, verified: true },
  { name: "Communication", level: 3, max: 5, verified: false },
  { name: "Leadership", level: 2, max: 5, verified: false },
  { name: "Time Mgmt", level: 4, max: 5, verified: true },
];

const events = [
  { date: "1 июня", title: "Хакатон «ИИ за выходные»", type: "Хакатон", color: "border-neon-grass/40 text-neon-grass" },
  { date: "5 июня", title: "Гость-лекция: CTO Яндекс", type: "Лекция", color: "border-bright-fern/40 text-bright-fern" },
  { date: "10 июня", title: "Аттестация по Python", type: "Дедлайн", color: "border-radioactive/40 text-radioactive" },
  { date: "15 июня", title: "Родительское собрание", type: "Собрание", color: "border-white/30 text-white/60" },
];

const tabs = ["Дашборд", "Расписание", "Рейтинг", "События", "Поддержка"];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button onClick={() => onNavigate("home")} className="flex items-center gap-2 press-effect">
              <div className="w-7 h-7 rounded-lg bg-neon-grass flex items-center justify-center glow-neon-sm">
                <span className="font-display font-800 text-black text-xs">LF</span>
              </div>
              <span className="font-display font-700 text-sm hidden sm:block">Learn<span className="text-neon-grass">Flex</span></span>
            </button>

            <div className="flex items-center gap-1 overflow-x-auto">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-body text-xs font-500 transition-all duration-200 press-effect ${
                    activeTab === i
                      ? "text-neon-grass bg-neon-grass/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-grass pulse-neon" />
              <div className="w-8 h-8 rounded-full bg-neon-grass/15 border border-neon-grass/30 flex items-center justify-center">
                <Icon name="User" size={15} className="text-neon-grass" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-14 max-w-7xl mx-auto px-4 py-6">
        {/* TAB 0: Dashboard */}
        {activeTab === 0 && (
          <div className="animate-fade-in">
            {/* Welcome */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-neon-grass/10 to-transparent border border-neon-grass/20">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-code text-neon-grass text-xs tracking-widest mb-1">// student.dashboard</div>
                  <h1 className="font-display font-800 text-xl sm:text-2xl">Привет, Иван! 👋</h1>
                  <p className="font-body text-sm text-white/50 mt-1">Сегодня 4 занятия · 1 дедлайн · Ты на 3-м месте в рейтинге</p>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="font-code text-neon-grass text-2xl font-500">847</div>
                  <div className="font-body text-xs text-white/40">очков опыта</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-xs text-white/50">Прогресс семестра</span>
                  <span className="font-code text-xs text-neon-grass">68%</span>
                </div>
                <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-grass to-bright-fern rounded-full glow-neon-sm" style={{ width: "68%" }} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Today schedule */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-700 text-sm">Сегодня, 28 мая</span>
                  <button onClick={() => setActiveTab(1)} className="font-body text-xs text-neon-grass hover:text-radioactive transition-colors">Всё расписание →</button>
                </div>
                {schedule.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/8 hover:border-neon-grass/25 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="text-center flex-shrink-0">
                        <div className="font-code text-neon-grass text-sm font-500">{item.time}</div>
                        <div className="w-px h-6 bg-white/10 mx-auto mt-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-700 text-sm truncate">{item.subject}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-body text-xs text-white/40 flex items-center gap-1">
                            <Icon name="MapPin" size={11} /> {item.room}
                          </span>
                          <span className="font-body text-xs text-white/40">{item.teacher}</span>
                        </div>
                        {item.deadline && (
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <Icon name="AlertCircle" size={11} className="text-radioactive" />
                            <span className="font-body text-xs text-radioactive">{item.deadline}</span>
                          </div>
                        )}
                      </div>
                      <span className="font-code text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-md flex-shrink-0">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-700 text-sm">Уведомления</span>
                  <div className="w-5 h-5 rounded-full bg-radioactive/20 border border-radioactive/30 flex items-center justify-center">
                    <span className="font-code text-[10px] text-radioactive">4</span>
                  </div>
                </div>
                {notifications.map((n, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${n.bg} transition-all`}>
                    <div className="flex items-start gap-2">
                      <Icon name={n.icon} size={14} className={n.color + " mt-0.5 flex-shrink-0"} />
                      <div>
                        <div className="font-body text-xs text-white/80 leading-snug">{n.text}</div>
                        <div className="font-body text-[10px] text-white/30 mt-1">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick actions */}
                <div className="mt-4 space-y-2">
                  <div className="font-display font-700 text-sm mb-2">Быстрые действия</div>
                  {[
                    { icon: "Upload", label: "Загрузить работу", color: "border-neon-grass/30 text-neon-grass hover:bg-neon-grass/10" },
                    { icon: "MessageCircle", label: "Написать педагогу", color: "border-bright-fern/30 text-bright-fern hover:bg-bright-fern/10" },
                    { icon: "BookOpen", label: "Материалы урока", color: "border-white/15 text-white/60 hover:bg-white/5" },
                  ].map((action) => (
                    <button key={action.label} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${action.color} transition-all text-left press-effect`}>
                      <Icon name={action.icon} size={14} />
                      <span className="font-body text-xs font-500">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Schedule */}
        {activeTab === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-code text-neon-grass text-xs tracking-widest">// schedule.week</span>
                <h2 className="font-display font-800 text-2xl mt-1">Расписание</h2>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-neon-grass/10 border border-neon-grass/30 text-neon-grass font-body text-xs rounded-lg press-effect">Неделя</button>
                <button className="px-3 py-1.5 border border-white/15 text-white/50 font-body text-xs rounded-lg hover:border-white/30 press-effect">Месяц</button>
              </div>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {["Пн 28", "Вт 29", "Ср 30", "Чт 31", "Пт 1"].map((day, i) => (
                <div key={day} className={`p-3 rounded-xl text-center border transition-all ${i === 0 ? "bg-neon-grass/10 border-neon-grass/30" : "bg-white/3 border-white/8 hover:border-white/20"}`}>
                  <div className={`font-code text-xs font-500 ${i === 0 ? "text-neon-grass" : "text-white/40"}`}>{day}</div>
                  <div className={`font-body text-[10px] mt-0.5 ${i === 0 ? "text-neon-grass/60" : "text-white/20"}`}>{i === 0 ? "Сегодня" : `${4 - i} пары`}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {schedule.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/8 hover:border-neon-grass/25 hover:bg-neon-grass/3 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-center flex-shrink-0">
                      <div className="font-code text-neon-grass text-base font-500">{item.time}</div>
                      <div className="font-body text-[10px] text-white/30">90 мин</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-700 text-sm">{item.subject}</div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-body text-xs text-white/40 flex items-center gap-1"><Icon name="MapPin" size={11} />{item.room}</span>
                        <span className="font-body text-xs text-white/40">{item.teacher}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-code text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-lg block mb-1">{item.type}</span>
                      {item.deadline && (
                        <span className="font-body text-[10px] text-radioactive flex items-center gap-1 justify-end">
                          <Icon name="Clock" size={10} />{item.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-neon-grass/5 border border-neon-grass/15 flex items-center gap-2">
              <Icon name="Bell" size={15} className="text-neon-grass" />
              <span className="font-body text-xs text-white/60">PWA-уведомления об изменениях в расписании включены</span>
              <div className="w-2 h-2 rounded-full bg-neon-grass pulse-neon ml-auto" />
            </div>
          </div>
        )}

        {/* TAB 2: Rating */}
        {activeTab === 2 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="font-code text-neon-grass text-xs tracking-widest">// skills.rating</span>
              <h2 className="font-display font-800 text-2xl mt-1">Рейтинг достижений</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Hard Skills */}
              <div className="p-5 rounded-2xl bg-neon-grass/5 border border-neon-grass/20">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Code" size={18} className="text-neon-grass" />
                  <span className="font-display font-700 text-base">Hard Skills</span>
                  <span className="ml-auto font-code text-xs text-neon-grass bg-neon-grass/10 px-2 py-0.5 rounded-full border border-neon-grass/20">Топ-3</span>
                </div>
                <div className="space-y-3">
                  {hardSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm text-white/80">{skill.name}</span>
                          {skill.verified && (
                            <div className="flex items-center gap-1">
                              <Icon name="BadgeCheck" size={13} className="text-neon-grass" />
                              <span className="font-code text-[9px] text-neon-grass">верифицирован</span>
                            </div>
                          )}
                        </div>
                        <span className="font-code text-xs text-neon-grass">{skill.level}/{skill.max}</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neon-grass to-bright-fern rounded-full transition-all duration-700 glow-neon-sm"
                          style={{ width: `${(skill.level / skill.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="p-5 rounded-2xl bg-bright-fern/5 border border-bright-fern/20">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Heart" size={18} className="text-bright-fern" />
                  <span className="font-display font-700 text-base">Soft Skills</span>
                  <span className="ml-auto font-code text-xs text-bright-fern bg-bright-fern/10 px-2 py-0.5 rounded-full border border-bright-fern/20">Топ-7</span>
                </div>
                <div className="space-y-3">
                  {softSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm text-white/80">{skill.name}</span>
                          {skill.verified && (
                            <div className="flex items-center gap-1">
                              <Icon name="BadgeCheck" size={13} className="text-bright-fern" />
                              <span className="font-code text-[9px] text-bright-fern">верифицирован</span>
                            </div>
                          )}
                        </div>
                        <span className="font-code text-xs text-bright-fern">{skill.level}/{skill.max}</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-bright-fern to-olive-leaf rounded-full transition-all duration-700"
                          style={{ width: `${(skill.level / skill.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="p-5 rounded-2xl bg-white/3 border border-white/10 mb-4">
              <div className="font-display font-700 text-sm mb-3">Бейджи и достижения</div>
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: "🏆", label: "Топ-5 Python", active: true },
                  { emoji: "⚡", label: "Speedcoder", active: true },
                  { emoji: "🎯", label: "100% посещаемость", active: true },
                  { emoji: "🤝", label: "Командный игрок", active: false },
                  { emoji: "🚀", label: "Первый проект", active: false },
                  { emoji: "💡", label: "Инноватор", active: false },
                ].map((badge) => (
                  <div key={badge.label} className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${badge.active ? "bg-neon-grass/10 border-neon-grass/25 glow-neon-sm" : "bg-white/3 border-white/8 opacity-40"}`}>
                    <span className="text-base">{badge.emoji}</span>
                    <span className={`font-body text-xs ${badge.active ? "text-neon-grass" : "text-white/40"}`}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top students */}
            <div className="p-5 rounded-2xl bg-white/3 border border-white/10">
              <div className="font-display font-700 text-sm mb-3">Топ группы — IT-разработка</div>
              <div className="space-y-2">
                {[
                  { rank: 1, name: "Алина Козлова", score: 1240, badge: "🥇" },
                  { rank: 2, name: "Дмитрий Лебедев", score: 1105, badge: "🥈" },
                  { rank: 3, name: "Иван Иванов", score: 847, badge: "🥉", isMe: true },
                  { rank: 4, name: "Ольга Сидорова", score: 790, badge: "" },
                  { rank: 5, name: "Артём Новиков", score: 715, badge: "" },
                ].map((s) => (
                  <div key={s.rank} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${s.isMe ? "bg-neon-grass/10 border border-neon-grass/25" : "hover:bg-white/3"}`}>
                    <span className="font-code text-sm w-6 text-center">{s.badge || s.rank}</span>
                    <span className={`font-body text-sm flex-1 ${s.isMe ? "text-neon-grass font-600" : "text-white/70"}`}>{s.name}</span>
                    <span className={`font-code text-xs ${s.isMe ? "text-neon-grass" : "text-white/40"}`}>{s.score} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Events */}
        {activeTab === 3 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="font-code text-neon-grass text-xs tracking-widest">// events.calendar</span>
              <h2 className="font-display font-800 text-2xl mt-1">Календарь событий</h2>
            </div>
            <div className="space-y-3">
              {events.map((event, i) => (
                <div key={i} className={`p-5 rounded-2xl bg-white/3 border ${event.color.split(' ')[0]} hover:glow-neon-sm transition-all hover-lift group`}>
                  <div className="flex items-start gap-4">
                    <div className={`text-center flex-shrink-0 w-16 p-2 rounded-xl bg-black/30 border ${event.color.split(' ')[0]}`}>
                      <div className={`font-display font-800 text-base ${event.color.split(' ')[1]}`}>{event.date.split(' ')[0]}</div>
                      <div className={`font-body text-[10px] ${event.color.split(' ')[1]} opacity-60`}>{event.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <span className={`font-code text-[10px] ${event.color.split(' ')[1]} bg-black/20 px-2 py-0.5 rounded-md`}>{event.type}</span>
                      <h3 className="font-display font-700 text-base mt-1">{event.title}</h3>
                    </div>
                    <div className="flex flex-col gap-2 ml-auto">
                      <button className={`text-[10px] font-body px-2.5 py-1 rounded-lg border ${event.color.split(' ')[0]} ${event.color.split(' ')[1]} hover:bg-white/5 transition-all press-effect flex items-center gap-1`}>
                        <Icon name="Plus" size={11} />Записаться
                      </button>
                      <button className="text-[10px] font-body px-2.5 py-1 rounded-lg border border-white/10 text-white/40 hover:border-white/25 transition-all press-effect flex items-center gap-1">
                        <Icon name="Calendar" size={11} />Добавить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-neon-grass" />
                <span className="font-body text-sm text-white/60">Синхронизировать с:</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-white/15 rounded-lg font-body text-xs text-white/50 hover:border-neon-grass/30 hover:text-neon-grass transition-all press-effect">Google Calendar</button>
                <button className="px-3 py-1.5 border border-white/15 rounded-lg font-body text-xs text-white/50 hover:border-neon-grass/30 hover:text-neon-grass transition-all press-effect">Яндекс</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Support */}
        {activeTab === 4 && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="font-code text-neon-grass text-xs tracking-widest">// feedback.tickets</span>
              <h2 className="font-display font-800 text-2xl mt-1">Обратная связь</h2>
            </div>

            {/* Active tickets */}
            <div className="space-y-3 mb-6">
              {[
                { id: "TK-001", topic: "Вопрос педагогу", subject: "Уточнение по заданию Python", status: "В работе", time: "2 часа назад", priority: "Средний" },
                { id: "TK-002", topic: "Техпроблема", subject: "Не загружается видеолекция", status: "Решено", time: "Вчера", priority: "Высокий" },
              ].map((ticket) => (
                <div key={ticket.id} className="p-4 rounded-xl bg-white/3 border border-white/10 hover:border-neon-grass/25 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-code text-xs text-white/30">{ticket.id}</span>
                        <span className="font-body text-xs text-white/40">{ticket.topic}</span>
                        <span className={`font-code text-[10px] px-2 py-0.5 rounded-full border ${
                          ticket.priority === "Высокий" ? "text-radioactive border-radioactive/30 bg-radioactive/10" :
                          "text-bright-fern border-bright-fern/30 bg-bright-fern/10"
                        }`}>{ticket.priority}</span>
                      </div>
                      <div className="font-display font-600 text-sm">{ticket.subject}</div>
                      <div className="font-body text-xs text-white/30 mt-1">{ticket.time}</div>
                    </div>
                    <span className={`flex-shrink-0 font-code text-[11px] px-2.5 py-1 rounded-full border ${
                      ticket.status === "В работе" ? "text-bright-fern border-bright-fern/30 bg-bright-fern/10" :
                      ticket.status === "Решено" ? "text-neon-grass border-neon-grass/30 bg-neon-grass/10" :
                      "text-white/50 border-white/15 bg-white/5"
                    }`}>{ticket.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate("contact")}
              className="w-full py-3.5 border-2 border-dashed border-neon-grass/30 text-neon-grass font-display font-700 text-sm rounded-xl hover:bg-neon-grass/5 hover:border-neon-grass/50 transition-all press-effect flex items-center justify-center gap-2"
            >
              <Icon name="Plus" size={16} />
              Создать новый тикет
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
