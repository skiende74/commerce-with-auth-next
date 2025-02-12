"use client";
import { ReactNode, use } from "react";
import { AuthContext } from "./AuthGuard";
import { usePathname } from "next/navigation";

function AuthLogger({ children }: { children: ReactNode }) {
  const { accessToken } = use(AuthContext);
  const pathname = usePathname();
  console.log("pathname:", pathname, "accessToken", accessToken);
  return children;
}

export default AuthLogger;
