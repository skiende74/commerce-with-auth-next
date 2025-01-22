"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { reissueAccessToken } from "../serverActions";
import { redirect } from "next/navigation";

export const AuthContext = createContext<{ accessToken: string | null }>({
  accessToken: null,
});

export function useAuthQuery() {
  return useQuery({
    queryKey: ["auth", "token"],
    queryFn: reissueAccessToken,
    // queryFn: async () => {
    //   const data = await fetch("https://fakestoreapi.com/users");
    //   const result = await data.json();
    //   return result as User[];
    // },
  });
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { data: accessToken, isPending, isError } = useAuthQuery();

  if (isPending) return "사용자 정보를 불러오는중...";
  if (isError || accessToken === undefined) redirect("/login");

  return <AuthContext.Provider value={{ accessToken: accessToken ?? null }}>{children}</AuthContext.Provider>;
}

export default AuthGuard;
