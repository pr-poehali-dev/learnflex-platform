import { useState } from "react";
import Icon from "@/components/ui/icon";

const topics = [
  { id: "student", label: "Вопрос педагогу", icon: "GraduationCap", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/30" },
  { id: "tech", label: "Техпроблема", icon: "AlertCircle", color: "text-radioactive", bg: "bg-radioactive/10 border-radioactive/30" },
  { id: "parent", label: "Обращение родителя", icon: "Heart", color: "text-bright-fern", bg: "bg-bright-fern/10 border-bright-fern/30" },
  { id: "idea", label: "Идея для платформы", icon: "Lightbulb", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/30" },
];

const priorities = [
  { id: "low", label: "Низкий", color: "text-white/50 border-white/20 bg-white/5" },
  { id: "medium", label: "Средний", color: "text-bright-fern border-bright-fern/30 bg-bright-fern/5" },
  { id: "high", label: "Высокий", color: "text-radioactive border-radioactive/30 bg-radioactive/5" },
];

const contacts = [
  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Учебная, 42" },
  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
  { icon: "Mail", label: "Email", value: "hello@learnflex.ru" },
  { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("student");
  const [priority, setPriority] = useState("medium");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-28 pb-12 px-4 relative overflow-hidden bg-grid-dark">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-neon-grass/4 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Icon name="MessageSquare" size={14} className="text-neon-grass" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">Обратная связь</span>
          </div>
          <h1 className="font-display font-900 text-4xl sm:text-5xl md:text-6xl mb-4 animate-fade-in delay-100">
            Связаться{" "}
            <span className="gradient-text-hero">с нами</span>
          </h1>
          <p className="font-body text-white/50 text-base max-w-xl animate-fade-in delay-200">
            Система тикетов: выбери тему, задай приоритет, прикрепи скриншот. Ответим в течение дня.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="animate-fade-in">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-neon-grass/5 border border-neon-grass/30 text-center">
                <div className="w-16 h-16 rounded-2xl bg-neon-grass/15 border border-neon-grass/30 flex items-center justify-center mx-auto mb-4 glow-neon-sm">
                  <Icon name="CheckCircle" size={32} className="text-neon-grass" />
                </div>
                <h3 className="font-display font-700 text-xl mb-2 text-neon-grass">Тикет создан!</h3>
                <p className="font-body text-sm text-white/50 mb-1">Статус: <span className="text-bright-fern">Принято</span></p>
                <p className="font-body text-sm text-white/50 mb-6">Ответим в течение рабочего дня. Следи за статусом в разделе «Обратная связь».</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 border border-neon-grass/30 text-neon-grass font-display font-600 text-sm rounded-xl hover:bg-neon-grass/10 transition-all press-effect"
                >
                  Новый тикет
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Topic */}
                <div>
                  <label className="font-display font-600 text-sm text-white/80 block mb-3">
                    Тема обращения
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 text-left press-effect ${
                          topic === t.id
                            ? t.bg + " glow-neon-sm"
                            : "bg-white/3 border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name={t.icon} size={15} className={topic === t.id ? t.color : "text-white/40"} />
                          <span className={`font-body text-xs font-500 ${topic === t.id ? t.color : "text-white/60"}`}>
                            {t.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="font-display font-600 text-sm text-white/80 block mb-3">Приоритет</label>
                  <div className="flex gap-2">
                    {priorities.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        className={`flex-1 py-2 rounded-xl border font-body text-xs font-500 transition-all duration-200 press-effect ${
                          priority === p.id ? p.color + " glow-neon-sm" : "bg-white/3 border-white/10 text-white/40 hover:border-white/25"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="font-display font-600 text-sm text-white/80 block mb-2">Имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/50 focus:bg-neon-grass/3 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-display font-600 text-sm text-white/80 block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ivan@college.ru"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/50 focus:bg-neon-grass/3 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-display font-600 text-sm text-white/80 block mb-2">Сообщение</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Опиши свой вопрос или проблему подробно..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/50 focus:bg-neon-grass/3 transition-all resize-none"
                  />
                </div>

                {/* Attach */}
                <div>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/15 hover:border-neon-grass/30 cursor-pointer transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-neon-grass/10 border border-white/10 group-hover:border-neon-grass/25 flex items-center justify-center transition-all">
                      <Icon name="Paperclip" size={15} className="text-white/40 group-hover:text-neon-grass transition-colors" />
                    </div>
                    <div>
                      <div className="font-body text-sm text-white/50 group-hover:text-white/70 transition-colors">Прикрепить скриншот</div>
                      <div className="font-body text-xs text-white/25">PNG, JPG до 5 МБ</div>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-neon-grass text-black font-display font-700 text-sm rounded-xl glow-neon-sm hover:glow-neon hover:bg-radioactive transition-all duration-200 press-effect"
                >
                  Отправить тикет
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-5 animate-fade-in delay-200">
            {/* Contact info */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
              <h3 className="font-display font-700 text-base mb-4">Контактная информация</h3>
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neon-grass/10 border border-neon-grass/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={15} className="text-neon-grass" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-white/35">{c.label}</div>
                      <div className="font-body text-sm text-white/80">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket statuses */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
              <h3 className="font-display font-700 text-base mb-4">Статусы тикетов</h3>
              <div className="space-y-2">
                {[
                  { status: "Принято", color: "text-white/60 bg-white/8 border-white/15", desc: "Тикет получен, в очереди" },
                  { status: "В работе", color: "text-bright-fern bg-bright-fern/10 border-bright-fern/25", desc: "Специалист разбирается" },
                  { status: "Решено", color: "text-neon-grass bg-neon-grass/10 border-neon-grass/25", desc: "Вопрос закрыт" },
                ].map((s) => (
                  <div key={s.status} className="flex items-center gap-3">
                    <span className={`font-code text-[11px] px-2.5 py-1 rounded-full border ${s.color} flex-shrink-0`}>
                      {s.status}
                    </span>
                    <span className="font-body text-xs text-white/40">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="p-6 rounded-2xl bg-neon-grass/5 border border-neon-grass/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" size={16} className="text-neon-grass" />
                <h3 className="font-display font-700 text-base text-neon-grass">Быстрые ответы</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Расписание — в разделе «Моё обучение»",
                  "Оценки — на дашборде и у педагога",
                  "Пароль — сброс через email",
                  "Портфолио — в профиле студента",
                ].map((faq) => (
                  <div key={faq} className="flex items-start gap-2">
                    <Icon name="Check" size={13} className="text-neon-grass mt-0.5 flex-shrink-0" />
                    <span className="font-body text-xs text-white/60">{faq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
