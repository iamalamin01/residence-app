"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/app/auth/actions";

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-60 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all"
          />
        </div>
        <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
          <Bell className="w-4.5 h-4.5 text-slate-500" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-teal-400/30">
          <AvatarFallback className="bg-teal-500 text-white text-xs font-bold">A</AvatarFallback>
        </Avatar>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </form>
      </div>
    </header>
  );
}
