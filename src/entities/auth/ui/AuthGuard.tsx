"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, use, useState } from "react";
import { reissueAccessToken } from "../authActions";
import { redirect } from "next/navigation";

export const AuthContext = createContext<{
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  resetAccessToken: () => void;
}>({
  accessToken: null,
  setAccessToken: () => {},
  resetAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const resetAccessToken = () => setAccessToken(null);
  return <AuthContext value={{ accessToken, setAccessToken, resetAccessToken }}>{children}</AuthContext>;
};

export function useAuthQuery() {
  return useQuery({
    queryKey: ["auth", "token"],
    queryFn: reissueAccessToken,
  });
}

// AuthGuard를 애초에 서버단에서 구현하는게 맞지 않나.
function AuthGuard({ children }: { children: ReactNode }) {
  // const { data: accessToken, isPending, isError } = useAuthQuery(); // 액세스토큰이 만료시에 요청보내기

  const { accessToken } = use(AuthContext);
  if (accessToken) return children;
  return redirect("/login");
  // if (isPending) return "데이터를 불러오고있습니다.";
  // if (isError || accessToken == null) redirect("/login");

  return children;
}

export default AuthGuard;
