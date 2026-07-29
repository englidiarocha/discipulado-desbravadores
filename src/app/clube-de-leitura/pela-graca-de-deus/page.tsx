import FileList from "@/components/FileList";

export default function Page() {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-1">Clube de leitura</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Pela Graça de Deus</h1>
      <FileList categorySlug="clube-de-leitura-pela-graca-de-deus" />
    </div>
  );
}
