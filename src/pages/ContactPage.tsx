import { useState } from "react";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";

interface Ticket {
  id: string;
  topic: string;
  topicLabel: string;
  subject: string;
  status: "Принято" | "В работе" | "Решено";
  priority: "Низкий" | "Средний" | "Высокий";
  time: string;
  messages: { from: string; text: string; time: string }[];
}

const initialTickets: Ticket[] = [
  {
    id: "TK-001", topic: "student", topicLabel: "Вопрос педагогу",
    subject: "Уточнение по заданию Python: наследование",
    status: "В работе", priority: "Средний", time: "2 часа назад",
    messages: [
      { from: "me", text: "Здравствуйте! Не могу разобраться с множественным наследованием в задании 3.2. Можете объяснить порядок MRO?", time: "10:15" },
      { from: "support", text: "Привет! MRO в Python использует алгоритм C3 линеаризации. Начни с вызова super() в каждом классе.", time: "11:03" },
    ]
  },
  {
    id: "TK-002", topic: "tech", topicLabel: "Техпроблема",
    subject: "Не загружается видеолекция — Python, Модуль 2",
    status: "Решено", priority: "Высокий", time: "Вчера",
    messages: [
      { from: "me", text: "Видео не воспроизводится в браузере Chrome. Ошибка 403.", time: "14:20" },
      { from: "support", text: "Проблема устранена. Пересоздали ссылку на CDN. Попробуй обновить страницу.", time: "14:55" },
    ]
  },
];

const topics = [
  { id: "student", label: "Вопрос педагогу", icon: "GraduationCap", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/30" },
  { id: "tech", label: "Техпроблема", icon: "AlertCircle", color: "text-radioactive", bg: "bg-radioactive/10 border-radioactive/30" },
  { id: "parent", label: "Обращение родителя", icon: "Heart", color: "text-bright-fern", bg: "bg-bright-fern/10 border-bright-fern/30" },
  { id: "idea", label: "Идея для платформы", icon: "Lightbulb", color: "text-neon-grass", bg: "bg-neon-grass/10 border-neon-grass/30" },
];

const priorities = [
  { id: "Низкий", color: "text-white/50 border-white/20 hover:border-white/40", activeColor: "bg-white/10 border-white/30 text-white" },
  { id: "Средний", color: "text-bright-fern border-bright-fern/30 hover:border-bright-fern/50", activeColor: "bg-bright-fern/15 border-bright-fern text-bright-fern" },
  { id: "Высокий", color: "text-radioactive border-radioactive/30 hover:border-radioactive/50", activeColor: "bg-radioactive/15 border-radioactive text-radioactive" },
];

const statusStyle: Record<string, string> = {
  "Принято": "text-white/50 border-white/20 bg-white/5",
  "В работе": "text-bright-fern border-bright-fern/30 bg-bright-fern/8",
  "Решено": "text-neon-grass border-neon-grass/30 bg-neon-grass/8",
};

export default function ContactPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [openTicket, setOpenTicket] = useState<Ticket | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("student");
  const [priority, setPriority] = useState<"Низкий" | "Средний" | "Высокий">("Средний");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [ticketMsg, setTicketMsg] = useState("");
  const [fileAttached, setFileAttached] = useState(false);

  const sendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const topicLabel = topics.find(t => t.id === topic)?.label || topic;
    const newTicket: Ticket = {
      id: `TK-00${tickets.length + 1}`,
      topic, topicLabel,
      subject: form.subject || form.message.slice(0, 50) + "...",
      status: "Принято", priority,
      time: "Только что",
      messages: [{ from: "me", text: form.message, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }],
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowForm(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setOpenTicket(newTicket);
  };

  const sendTicketMessage = () => {
    if (!ticketMsg.trim() || !openTicket) return;
    const msg = { from: "me", text: ticketMsg, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) };
    const updated = { ...openTicket, messages: [...openTicket.messages, msg] };
    setOpenTicket(updated);
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setTicketMsg("");
    setTimeout(() => {
      const reply = { from: "support", text: "Спасибо! Разбираемся с вашим вопросом. Ответим в течение часа.", time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) };
      const withReply = { ...updated, status: "В работе" as const, messages: [...updated.messages, reply] };
      setOpenTicket(withReply);
      setTickets(prev => prev.map(t => t.id === withReply.id ? withReply : t));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-28 pb-10 px-4 relative overflow-hidden bg-grid-dark">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-neon-grass/4 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-neon-grass/10 border border-neon-grass/30 rounded-full px-4 py-1.5 mb-5">
            <Icon name="MessageSquare" size={14} className="text-neon-grass" />
            <span className="font-body text-xs text-neon-grass font-500 tracking-widest uppercase">Обратная связь</span>
          </div>
          <h1 className="font-display font-900 text-4xl sm:text-5xl mb-3">
            Связаться <span className="gradient-text-hero">с нами</span>
          </h1>
          <p className="font-body text-white/50 text-base max-w-xl">
            Тикетная система: выбери тему, приоритет и прикрепи скриншот. Ответим в течение рабочего дня.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Ticket list */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display font-700 text-base">Мои обращения</h2>
              <button
                onClick={() => setShowForm(true)}
                className="h-9 px-4 bg-neon-grass text-black font-display font-700 text-xs rounded-xl hover:bg-radioactive transition-all active:scale-[0.96] flex items-center gap-1.5"
              >
                <Icon name="Plus" size={14} />Создать
              </button>
            </div>

            {tickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setOpenTicket(ticket)}
                className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${openTicket?.id === ticket.id ? "bg-neon-grass/8 border-neon-grass/30" : "bg-white/3 border-white/8 hover:border-white/20"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-code text-xs text-white/30">{ticket.id}</span>
                    <span className={`font-code text-[10px] px-2 py-0.5 rounded-full border ${statusStyle[ticket.status]}`}>{ticket.status}</span>
                  </div>
                  <span className={`font-code text-[9px] px-1.5 py-0.5 rounded-full border flex-shrink-0 ${ticket.priority === "Высокий" ? "text-radioactive border-radioactive/30" : ticket.priority === "Средний" ? "text-bright-fern border-bright-fern/30" : "text-white/40 border-white/15"}`}>{ticket.priority}</span>
                </div>
                <div className="font-display font-600 text-sm line-clamp-1 mb-1">{ticket.subject}</div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-white/35">{ticket.topicLabel}</span>
                  <span className="font-body text-xs text-white/25">{ticket.time}</span>
                </div>
              </button>
            ))}

            {tickets.length === 0 && (
              <div className="text-center py-10 text-white/25">
                <Icon name="Inbox" size={32} className="mx-auto mb-2" />
                <p className="font-body text-sm">Обращений пока нет</p>
              </div>
            )}

            {/* Contact info */}
            <div className="mt-4 p-4 rounded-2xl bg-white/3 border border-white/8 space-y-3">
              <h3 className="font-display font-700 text-sm">Контакты</h3>
              {[
                { icon: "Mail", val: "hello@learnflex.ru" },
                { icon: "Phone", val: "+7 (495) 123-45-67" },
                { icon: "Clock", val: "Пн–Пт, 9:00–18:00" },
              ].map(c => (
                <div key={c.val} className="flex items-center gap-2">
                  <Icon name={c.icon} size={14} className="text-neon-grass flex-shrink-0" />
                  <span className="font-body text-xs text-white/55">{c.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket detail / chat */}
          <div className="lg:col-span-3">
            {openTicket ? (
              <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col h-full min-h-[480px]">
                {/* Header */}
                <div className="p-4 border-b border-white/8 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-code text-xs text-white/30">{openTicket.id}</span>
                      <span className={`font-code text-[10px] px-2 py-0.5 rounded-full border ${statusStyle[openTicket.status]}`}>{openTicket.status}</span>
                      <span className={`font-code text-[9px] px-1.5 py-0.5 rounded-full border ${openTicket.priority === "Высокий" ? "text-radioactive border-radioactive/30" : openTicket.priority === "Средний" ? "text-bright-fern border-bright-fern/30" : "text-white/40 border-white/15"}`}>{openTicket.priority}</span>
                    </div>
                    <h3 className="font-display font-700 text-base line-clamp-2">{openTicket.subject}</h3>
                    <span className="font-body text-xs text-white/35">{openTicket.topicLabel}</span>
                  </div>
                  <button onClick={() => setOpenTicket(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all flex-shrink-0">
                    <Icon name="X" size={16} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {openTicket.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      {msg.from === "support" && (
                        <div className="w-7 h-7 rounded-full bg-neon-grass/20 border border-neon-grass/30 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <Icon name="Headphones" size={12} className="text-neon-grass" />
                        </div>
                      )}
                      <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${msg.from === "me" ? "bg-neon-grass text-black rounded-br-sm" : "bg-white/8 text-white/80 rounded-bl-sm"}`}>
                        {msg.text}
                        <div className={`text-[10px] mt-1.5 ${msg.from === "me" ? "text-black/50 text-right" : "text-white/30"}`}>{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                {openTicket.status !== "Решено" ? (
                  <div className="p-3 border-t border-white/8 flex gap-2">
                    <input
                      value={ticketMsg}
                      onChange={e => setTicketMsg(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendTicketMessage()}
                      placeholder="Написать сообщение..."
                      className="flex-1 h-11 px-4 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all"
                    />
                    <button onClick={sendTicketMessage} className="w-11 h-11 bg-neon-grass rounded-xl flex items-center justify-center text-black hover:bg-radioactive transition-all active:scale-[0.95] flex-shrink-0">
                      <Icon name="Send" size={17} />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 border-t border-white/8 flex items-center justify-center gap-2 text-neon-grass">
                    <Icon name="CheckCircle" size={15} />
                    <span className="font-body text-sm">Тикет закрыт — вопрос решён</span>
                  </div>
                )}
              </div>
            ) : showForm ? (
              <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-700 text-base">Новое обращение</h2>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    <Icon name="X" size={16} />
                  </button>
                </div>
                <form onSubmit={sendTicket} className="space-y-4">
                  {/* Topic */}
                  <div>
                    <label className="font-display font-600 text-xs text-white/60 block mb-2 uppercase tracking-wide">Тема обращения</label>
                    <div className="grid grid-cols-2 gap-2">
                      {topics.map(t => (
                        <button type="button" key={t.id} onClick={() => setTopic(t.id)} className={`p-3 rounded-xl border transition-all text-left active:scale-[0.97] ${topic === t.id ? t.bg : "bg-white/3 border-white/10 hover:border-white/20"}`}>
                          <div className="flex items-center gap-2">
                            <Icon name={t.icon} size={14} className={topic === t.id ? t.color : "text-white/30"} />
                            <span className={`font-body text-xs font-500 ${topic === t.id ? t.color : "text-white/50"}`}>{t.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="font-display font-600 text-xs text-white/60 block mb-2 uppercase tracking-wide">Приоритет</label>
                    <div className="flex gap-2">
                      {priorities.map(p => (
                        <button type="button" key={p.id} onClick={() => setPriority(p.id as typeof priority)} className={`flex-1 h-10 rounded-xl border font-body text-sm transition-all active:scale-[0.97] ${priority === p.id ? p.activeColor : p.color}`}>{p.id}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-display font-600 text-xs text-white/60 block mb-2 uppercase tracking-wide">Имя</label>
                    <input required placeholder="Иван Иванов" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full h-11 px-4 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all" />
                  </div>
                  <div>
                    <label className="font-display font-600 text-xs text-white/60 block mb-2 uppercase tracking-wide">Тема</label>
                    <input required placeholder="Кратко опишите проблему" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full h-11 px-4 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all" />
                  </div>
                  <div>
                    <label className="font-display font-600 text-xs text-white/60 block mb-2 uppercase tracking-wide">Сообщение</label>
                    <textarea required rows={3} placeholder="Подробно опиши вопрос или проблему..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-xl font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-neon-grass/40 transition-all resize-none" />
                  </div>

                  {/* Attach screenshot */}
                  <label className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all ${fileAttached ? "border-neon-grass/40 bg-neon-grass/5" : "border-white/12 hover:border-neon-grass/25"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${fileAttached ? "bg-neon-grass/15 border border-neon-grass/30" : "bg-white/5 border border-white/10"}`}>
                      <Icon name={fileAttached ? "Check" : "Paperclip"} size={15} className={fileAttached ? "text-neon-grass" : "text-white/35"} />
                    </div>
                    <div>
                      <div className="font-body text-sm text-white/50">{fileAttached ? "Скриншот прикреплён ✓" : "Прикрепить скриншот"}</div>
                      <div className="font-body text-xs text-white/25">PNG, JPG до 5 МБ</div>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={() => setFileAttached(true)} />
                  </label>

                  <button type="submit" className="w-full h-12 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97]">
                    Отправить тикет
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#0d0d0d] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center min-h-[480px] gap-4 text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  <Icon name="MessageSquare" size={24} className="text-white/20" />
                </div>
                <h3 className="font-display font-700 text-base text-white/60">Выбери обращение</h3>
                <p className="font-body text-sm text-white/30">Нажми на тикет слева или создай новое обращение</p>
                <button onClick={() => setShowForm(true)} className="h-11 px-6 bg-neon-grass text-black font-display font-700 text-sm rounded-xl hover:bg-radioactive transition-all active:scale-[0.97] flex items-center gap-2">
                  <Icon name="Plus" size={16} />Создать обращение
                </button>

                {/* FAQ */}
                <div className="mt-4 w-full max-w-sm space-y-2">
                  <p className="font-code text-xs text-neon-grass/60 tracking-wider mb-3">// Быстрые ответы</p>
                  {["Расписание — раздел «Расписание»", "Оценки — в профиле педагога", "Пароль — сброс через email", "Материалы — раздел «Материалы»"].map(faq => (
                    <div key={faq} className="flex items-center gap-2 text-left">
                      <Icon name="Check" size={12} className="text-neon-grass flex-shrink-0" />
                      <span className="font-body text-xs text-white/40">{faq}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
