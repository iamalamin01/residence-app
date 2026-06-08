"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DoorOpen,
  Users,
  Wrench,
  CreditCard,
  Building2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/tenants", label: "Tenants", icon: Users },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/payments", label: "Payments", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ backgroundColor: "#0d1b2a" }}>
      {/* Logo */}
      <div className="px-6 py-7 flex items-center gap-3">
        <div className="bg-teal-500 p-2.5 rounded-xl shadow-lg shadow-teal-500/30">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-base text-white leading-tight tracking-wide">Residence</p>
          <p className="text-[11px] text-slate-400 tracking-widest uppercase">Manager</p>
        </div>
      </div>

      <div className="mx-4 h-px bg-white/5" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-teal-500/15 text-teal-300 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {active && (
                <span className="absolute left-3 w-1 h-6 bg-teal-400 rounded-full" />
              )}
              <Icon className={cn("w-[18px] h-[18px] shrink-0", active ? "text-teal-400" : "")} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 h-px bg-white/5" />

      {/* User / Logout */}
      <div className="p-4 space-y-1">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Admin</p>
            <p className="text-[11px] text-slate-500 truncate">Owner</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
