import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Trash2, ArrowLeft, Users, Server, TrendingUp, Inbox } from 'lucide-react';

type Lead = {
  name: string;
  whatsapp: string;
  company: string;
  ipCount: string;
  date: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = () => {
    const data = JSON.parse(localStorage.getItem('pingzap_leads') || '[]');
    setLeads(data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('55') ? digits : `55${digits}`;
  };

  const handleContact = (whatsapp: string) => {
    window.open(`https://wa.me/${formatPhone(whatsapp)}`, '_blank');
  };

  const handleDelete = (index: number) => {
    const updated = leads.filter((_, i) => i !== index);
    localStorage.setItem('pingzap_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalIPs = leads.reduce((sum, l) => sum + (parseInt(l.ipCount) || 0), 0);

  const stats = [
    {
      label: 'Total de Leads',
      value: leads.length,
      icon: Users,
      color: 'text-[#25D366]',
      bg: 'bg-[#25D366]/10',
    },
    {
      label: 'IPs Monitorados',
      value: totalIPs,
      icon: Server,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Empresas Únicas',
      value: new Set(leads.map((l) => l.company)).size,
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#111827]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Zap className="h-7 w-7 text-[#25D366]" />
            <div>
              <span className="text-xl font-bold tracking-tight">
                Ping<span className="text-[#25D366]">Zap</span>
              </span>
              <span className="ml-2 rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                Admin
              </span>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar ao site</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leads table */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="border-b border-white/5 px-6 py-5">
            <h2 className="text-lg font-bold">Leads Recebidos</h2>
            <p className="mt-1 text-sm text-gray-400">
              Gerencie os contatos que chegaram pelo formulário do site.
            </p>
          </div>

          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <Inbox className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300">Nenhum lead ainda</h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                Quando alguém preencher o formulário no site, os dados aparecerão aqui
                automaticamente.
              </p>
              <Link
                to="/"
                className="mt-6 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-[#1fb855]"
              >
                Ir para o site
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400">
                    <th className="px-6 py-4 font-medium">Nome</th>
                    <th className="px-6 py-4 font-medium">WhatsApp</th>
                    <th className="px-6 py-4 font-medium">Empresa</th>
                    <th className="px-6 py-4 font-medium">IPs</th>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {[...leads].reverse().map((lead, idx) => {
                    const realIndex = leads.length - 1 - idx;
                    return (
                      <tr
                        key={realIndex}
                        className="border-b border-white/[0.03] transition hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                        <td className="px-6 py-4 text-gray-300">{lead.whatsapp}</td>
                        <td className="px-6 py-4 text-gray-300">{lead.company}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-2.5 py-1 text-xs font-semibold text-[#25D366]">
                            <Server className="h-3.5 w-3.5" />
                            {lead.ipCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{formatDate(lead.date)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleContact(lead.whatsapp)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-[#111827] transition hover:bg-[#1fb855] active:scale-95"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              Contatar
                            </button>
                            <button
                              onClick={() => handleDelete(realIndex)}
                              className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                              aria-label="Excluir lead"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
