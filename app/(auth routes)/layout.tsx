"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, startTransition } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);
  return <>{loading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;
