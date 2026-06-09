import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Residence Manager",
  description: "Manage your residence efficiently",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-slate-50">
        {session && <Sidebar userName={session.name} userRole={session.role} />}
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
