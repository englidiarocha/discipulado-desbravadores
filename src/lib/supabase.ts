import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FileType = "pdf" | "imagem" | "video";

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  sort_order: number;
}

export interface FileItem {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  file_type: FileType;
  storage_path: string;
  file_url: string | null;
  sort_order: number;
}
