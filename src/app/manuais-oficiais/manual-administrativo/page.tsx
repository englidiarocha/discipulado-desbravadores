import FileList from "@/components/FileList";

export default function Page() {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-1">Manuais oficiais</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manual Administrativo</h1>
      <FileList categorySlug="manuais-oficiais-manual-administrativo" />
    </div>
  );
}
