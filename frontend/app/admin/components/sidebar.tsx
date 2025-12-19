"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  menuItems: MenuItem[];
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  menuItems,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-100 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Logo Section */}
      <div className="px-4 py-2 bg-white h-20 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Image
              src="/msllogo1.png"
              alt="MSL Logo"
              height={60}
              width={60}
              priority
            />
          </div>
          <p className="text-[#24439C] font-[Tinos] text-md cursor-pointer whitespace-nowrap">
            MaritimeSolutionsLtd
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 text-slate-500 hover:text-slate-900"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        <p className="px-2 text-[10px] text-slate-600 uppercase tracking-widest mb-2">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-md transition-all
                ${
                  isActive
                    ? "bg-secondary text-white font-medium shadow-lg shadow-blue-600/20"
                    : "text-slate-600 bg-white hover:bg-blue-100 hover:text-slate-900 hover:font-medium"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile (Bottom) */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
            <Image
              src="/avatar.png"
              alt="Admin User"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-medium text-slate-800 truncate">
              Admin User
            </span>
            <span className="text-xs text-slate-500 truncate">
              admin@maritimesolutionsltd.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
