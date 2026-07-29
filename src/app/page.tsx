import Link from "next/link";
import { BookOpen, Sticker, BookMarked, FileBadge } from "lucide-react";

const SECTIONS = [
  {
    title: "Bom de Bíblia",
    description: "Trilhas de leitura bíblica 2026: Daniel e Apocalipse.",
    icon: BookOpen,
    href: "/bom-de-biblia/2026-daniel",
  },
  {
    title: "Classes em figurinhas",
    description: "Cartelas ilustradas das classes regulares, começando pela Classe Amigo.",
    icon: Sticker,
    href: "/classes-em-figurinhas/amigo",
  },
  {
    title: "Clube de leitura",
    description: "Materiais de apoio para o livro Pela Graça de Deus.",
    icon: BookMarked,
    href: "/clube-de-leitura/pela-graca-de-deus",
  },
  {
    title: "Manuais oficiais",
    description: "Uniformes e Manual Administrativo do clube.",
    icon: FileBadge,
    href: "/manuais-oficiais/uniformes",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Materiais para download</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Escolha uma seção abaixo para acessar PDFs, imagens e vídeos gratuitos de apoio ao
          discipulado no Clube de Desbravadores.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <s.icon size={26} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-slate-900 group-hover:text-blue-800">
                {s.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
