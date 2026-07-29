"use client";

import { useState } from "react";
import { useAccess } from "@/context/AccessContext";
import { supabase } from "@/lib/supabase";

const FUNCOES = [
  "Diretor(a) de Clube",
  "Instrutor(a) / Conselheiro(a)",
  "Pai / Mãe / Responsável",
  "Desbravador(a)",
  "Outro",
];

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const { hasAccess, loading, grantAccess } = useAccess();
  const [form, setForm] = useState({
    nome: "",
    clube_igreja: "",
    funcao: "",
    email: "",
    comentario: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return null;
  if (hasAccess) return <>{children}</>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.nome || !form.clube_igreja || !form.funcao || !form.email) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("access_responses").insert({
      nome: form.nome,
      clube_igreja: form.clube_igreja,
      funcao: form.funcao,
      email: form.email,
      comentario: form.comentario || null,
    });
    setSubmitting(false);

    if (dbError) {
      console.error(dbError);
      setError("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }

    grantAccess();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Discipulado Desbravadores</h1>
          <p className="text-sm text-slate-500 mt-2">
            Preencha os dados abaixo para acessar os materiais gratuitos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Clube / Igreja *
            </label>
            <input
              type="text"
              required
              value={form.clube_igreja}
              onChange={(e) => setForm({ ...form, clube_igreja: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Função *
            </label>
            <select
              required
              value={form.funcao}
              onChange={(e) => setForm({ ...form, funcao: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Selecione...</option>
              {FUNCOES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Comentário (opcional)
            </label>
            <textarea
              value={form.comentario}
              onChange={(e) => setForm({ ...form, comentario: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-700 text-white font-medium py-2.5 hover:bg-blue-800 transition disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Acessar materiais"}
          </button>
        </form>
      </div>
    </div>
  );
}
