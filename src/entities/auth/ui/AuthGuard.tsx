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

// AuthGuard를 애초에 서버단에서 구현하는게 맞지 않나.
function AuthGuard({ children }: { children: ReactNode }) {
  const { data: accessToken, isPending, isError } = useAuthQuery();

  if (isPending) return "데이터를 불러오고있습니다.";
  if (isError || accessToken == null) redirect("/login");

  return children;
}

export default AuthGuard;
