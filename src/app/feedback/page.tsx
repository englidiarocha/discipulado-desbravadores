"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2 } from "lucide-react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "", tipo: "feedback" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.mensagem.trim()) {
      setError("Escreva sua mensagem antes de enviar.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("feedback_responses").insert({
      nome: form.nome || null,
      email: form.email || null,
      mensagem: form.mensagem,
      tipo: form.tipo,
    });
    setSubmitting(false);

    if (dbError) {
      console.error(dbError);
      setError("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
        <h1 className="text-xl font-bold text-slate-900">Obrigado pelo seu feedback!</h1>
        <p className="text-slate-500 mt-2">
          Sua mensagem foi recebida e será usada para melhorar os materiais.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Feedback e atualizações</h1>
      <p className="text-slate-500 mb-6">
        Encontrou algo para melhorar, ou quer sugerir um novo material? Conte pra gente.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="feedback">Feedback geral</option>
            <option value="sugestao">Sugestão de material</option>
            <option value="erro">Reportar um erro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome (opcional)</label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail (opcional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem *</label>
          <textarea
            required
            rows={5}
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-700 text-white font-medium py-2.5 hover:bg-blue-800 transition disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
