import FileList from "@/components/FileList";

export default function Page() {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-1">Bom de Bíblia</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">2026 - Apocalipse</h1>
      <FileList categorySlug="bom-de-biblia-2026-apocalipse" />
    </div>
  );
}
