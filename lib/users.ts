import crypto from "crypto";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "manager" | "maintenance_staff" | "tenant";
};

function hash(password: string) {
  return crypto.createHash("sha256").update(password + "residence-salt").digest("hex");
}

export const users: AppUser[] = [
  {
    id: "u1",
    name: "Admin",
    email: "admin@residence.com",
    passwordHash: hash("admin123"),
    role: "admin",
  },
  {
    id: "u2",
    name: "Manager",
    email: "manager@residence.com",
    passwordHash: hash("manager123"),
    role: "manager",
  },
  {
    id: "u3",
    name: "Maintenance Staff",
    email: "staff@residence.com",
    passwordHash: hash("staff123"),
    role: "maintenance_staff",
  },
];

export function verifyUser(email: string, password: string): AppUser | null {
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  if (user.passwordHash !== hash(password)) return null;
  return user;
}
