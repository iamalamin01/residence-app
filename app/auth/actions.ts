"use server";

import { redirect } from "next/navigation";
import { verifyUser } from "@/lib/users";
import { createSession, deleteSession } from "@/lib/session";

type LoginState = { error?: string } | undefined;

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = verifyUser(email, password);
  if (!user) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id, user.role, user.name);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
