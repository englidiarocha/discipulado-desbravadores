"use client";

import { useEffect, useState } from "react";
import { supabase, FileItem } from "@/lib/supabase";
import { FileText, Image as ImageIcon, Video, Download, Loader2 } from "lucide-react";

const ICONS = {
  pdf: FileText,
  imagem: ImageIcon,
  video: Video,
};

export default function FileList({ categorySlug }: { categorySlug: string }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();

      if (!category) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("files")
        .select("*")
        .eq("category_id", category.id)
        .order("sort_order", { ascending: true });

      setFiles(data || []);
      setLoading(false);
    }
    load();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Carregando materiais...
      </div>
    );
  }

  if (notFound) {
    return <p className="text-center py-16 text-slate-500">Categoria não encontrada.</p>;
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p>Ainda não há materiais publicados nesta seção.</p>
        <p className="text-sm mt-1">Volte em breve — novos conteúdos são adicionados regularmente.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => {
        const Icon = ICONS[file.file_type];
        return (
          <a
            key={file.id}
            href={file.file_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 leading-snug">{file.title}</h3>
                {file.description && (
                  <p className="text-sm text-slate-500 mt-1">{file.description}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-700 group-hover:text-blue-900">
              <Download size={16} />
              Baixar {file.file_type}
            </div>
          </a>
        );
      })}
    </div>
  );
}
