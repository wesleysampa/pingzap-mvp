import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Server,
  Bell,
  UserPlus,
  Zap,
  Menu,
  X,
} from 'lucide-react';

type Lead = {
  name: string;
  whatsapp: string;
  company: string;
  ipCount: string;
  date: string;
};

const HOW_IT_WORKS = [
  {
    icon: Server,
    title: 'Cadastre seus IPs',
    description:
      'Informe os endereços de sites, links e servidores que você quer monitorar. Leva menos de um minuto.',
  },
  {
    icon: Activity,
    title: 'Ativamos o monitoramento',
    description:
      'Nosso sistema verifica continuamente a disponibilidade dos seus serviços, 24 horas por dia.',
  },
  {
    icon: Bell,
    title: 'Receba alertas no WhatsApp',
    description:
      'Assim que detectarmos uma queda, enviamos um alerta imediato direto para o seu WhatsApp.',
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    company: '',
    ipCount: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lead: Lead = {
      ...form,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('pingzap_leads') || '[]');
    existing.push(lead);
    localStorage.setItem('pingzap_leads', JSON.stringify(existing));

    setSubmitted(true);

    const message = `Olá, quero assinar o PingZap para ${form.ipCount} IPs. Meu nome é ${form.name} da empresa ${form.company}.`;
    const phone = '5599999999999';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToPlans = () => {
    document.getElementById('plan-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#111827]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-7 w-7 text-[#25D366]" />
            <span className="text-xl font-bold tracking-tight">
              Ping<span className="text-[#25D366]">Zap</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm text-gray-400 transition hover:text-white">
              Como Funciona
            </a>
            <button
              onClick={scrollToPlans}
              className="rounded-lg bg-[#25D366] px-5 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#1fb855] active:scale-95"
            >
              Ver Planos
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/5 px-4 py-4 md:hidden">
            <a
              href="#how-it-works"
              className="block py-2 text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Como Funciona
            </a>
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollToPlans();
              }}
              className="mt-2 w-full rounded-lg bg-[#25D366] px-5 py-2 text-sm font-semibold text-[#111827]"
            >
              Ver Planos
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#25D366]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-4 py-1.5 text-sm text-[#25D366]">
              <Activity className="h-4 w-4" />
              Monitoramento 24/7 com alertas no WhatsApp
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Saiba quando seu servidor cair,
              <span className="block text-[#25D366]">antes do seu cliente reclamar.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              Monitoramento simples de sites, links e servidores com alertas diretos no seu
              WhatsApp.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={scrollToPlans}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-[#111827] shadow-lg shadow-[#25D366]/20 transition hover:bg-[#1fb855] active:scale-95"
              >
                Montar meu plano
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Como Funciona</h2>
          <p className="mt-4 text-gray-400">Três passos simples para nunca ser pego de surpresa.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition hover:border-[#25D366]/30 hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25D366]/10 transition group-hover:bg-[#25D366]/20">
                  <Icon className="h-7 w-7 text-[#25D366]" />
                </div>
                <div className="mb-2 text-sm font-semibold text-[#25D366]">
                  Passo {idx + 1}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form / Plans */}
      <section id="plan-form" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 sm:p-12">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-1.5 text-sm text-[#25D366]">
              <UserPlus className="h-4 w-4" />
              Monte seu plano
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comece agora gratuitamente
            </h2>
            <p className="mt-3 text-gray-400">
              Preencha os dados e fale com nossa equipe pelo WhatsApp.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-8 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-[#25D366]" />
              <h3 className="text-xl font-bold text-white">Tudo certo!</h3>
              <p className="mt-2 text-gray-300">
                Abrimos o WhatsApp para você finalizar seu plano. Se não abriu automaticamente,
                verifique seu navegador.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-[#25D366] underline hover:no-underline"
              >
                Enviar outro lead
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Nome</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Empresa</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Quantos IPs quer monitorar?
                </label>
                <input
                  type="number"
                  name="ipCount"
                  required
                  min="1"
                  value={form.ipCount}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#25D366] px-6 py-4 text-base font-semibold text-[#111827] shadow-lg shadow-[#25D366]/20 transition hover:bg-[#1fb855] active:scale-[0.98]"
              >
                Montar meu plano
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#25D366]" />
            <span className="font-bold">
              Ping<span className="text-[#25D366]">Zap</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Monitoramento simples com alertas no WhatsApp.
          </p>
        </div>
      </footer>
    </div>
  );
}
