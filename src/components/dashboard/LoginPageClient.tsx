"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getAdminToken } from "@/lib/admin-session";
import LoginForm from "@/components/dashboard/LoginForm";

export default function LoginPageClient() {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (getAdminToken()) {
      router.replace("/dashboard");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return <LoginForm />;
}
