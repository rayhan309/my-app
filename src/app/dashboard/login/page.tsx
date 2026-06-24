import type { Metadata } from "next";
import LoginPageClient from "@/components/dashboard/LoginPageClient";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function DashboardLoginPage() {
  return <LoginPageClient />;
}
