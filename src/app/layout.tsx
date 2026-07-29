import type { Metadata } from "next";
import "./globals.css";
import { AccessProvider } from "@/context/AccessContext";
import AccessGate from "@/components/AccessGate";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Discipulado Desbravadores",
  description: "Materiais gratuitos para clubes de Desbravadores: PDFs, imagens e vídeos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50 text-slate-900">
        <AccessProvider>
          <AccessGate>
            <NavBar />
            <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
            <footer className="text-center text-xs text-slate-400 py-8">
              Discipulado Desbravadores · Materiais gratuitos para clubes
            </footer>
          </AccessGate>
        </AccessProvider>
      </body>
    </html>
  );
}
