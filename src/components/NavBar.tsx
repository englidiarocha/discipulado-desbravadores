"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Bom de Bíblia",
    children: [
      { label: "2026 - Daniel", href: "/bom-de-biblia/2026-daniel" },
      { label: "2026 - Apocalipse", href: "/bom-de-biblia/2026-apocalipse" },
    ],
  },
  {
    label: "Classes em figurinhas",
    children: [{ label: "Amigo", href: "/classes-em-figurinhas/amigo" }],
  },
  {
    label: "Clube de leitura",
    children: [{ label: "Pela Graça de Deus", href: "/clube-de-leitura/pela-graca-de-deus" }],
  },
  {
    label: "Manuais oficiais",
    children: [
      { label: "Uniformes", href: "/manuais-oficiais/uniformes" },
      { label: "Manual Administrativo", href: "/manuais-oficiais/manual-administrativo" },
    ],
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Discipulado Desbravadores
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-800 transition">
                  {item.label}
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full bg-white text-slate-800 rounded-lg shadow-xl py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm hover:bg-blue-50 ${
                          pathname === child.href ? "font-semibold text-blue-700" : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/feedback"
              className="ml-2 px-3 py-2 text-sm font-medium rounded-md bg-yellow-500 text-blue-950 hover:bg-yellow-400 transition"
            >
              Feedback
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 py-3 space-y-3">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-wide text-blue-300 mb-1">{item.label}</p>
              <div className="flex flex-col gap-1 pl-2">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm py-1 ${
                      pathname === child.href ? "font-semibold text-yellow-400" : "text-white"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/feedback"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-3 py-2 text-sm font-medium rounded-md bg-yellow-500 text-blue-950 text-center"
          >
            Feedback
          </Link>
        </div>
      )}
    </header>
  );
}
