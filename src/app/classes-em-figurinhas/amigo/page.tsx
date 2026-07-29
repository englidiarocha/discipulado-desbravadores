import FileList from "@/components/FileList";

export default function Page() {
  return (
    <div>
      <p className="text-sm text-slate-400 mb-1">Classes em figurinhas</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Classe Amigo</h1>
      <FileList categorySlug="classes-amigo" />
    </div>
  );
}
