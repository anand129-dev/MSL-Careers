// // When we have layout file, then next run layout first, and we need to import the children
// // to render the page inside the layout
// import type { ReactNode } from "react";
// import "../globals.css";

// interface AdminLayoutProps {
//   children: ReactNode;
// }

// const AdminLayout = ({ children }: AdminLayoutProps) => {
//   return (
//     <div>
//       <header>Admin Header</header>
//       <main>{children}</main>
//       <footer>Admin Footer</footer>
//     </div>
//   );
// };
// export default AdminLayout;

"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "../admin/components/sidebar";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Briefcase, label: "Jobs", href: "/admin/jobs" },
    { icon: Users, label: "Candidates", href: "/admin/candidates" },
    { icon: FileText, label: "Applications", href: "/admin/applications" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:ml-72 min-w-0">
        <header className="sticky top-0 z-40 h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-lg hidden sm:flex items-center gap-3 bg-slate-100/50 border border-slate-200 rounded-2xl px-4 py-2 text-xs font-medium text-slate-800">
              <Globe className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">admin</span>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                {pathname.split("/").pop() || "dashboard"}
              </span>
              <ExternalLink className="w-3 h-3 ml-auto text-slate-300" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
