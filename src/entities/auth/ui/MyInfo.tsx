"use client";
import dynamic from "next/dynamic";
import { postLogout } from "../authActions";
import { useActionState } from "react";
import { redirect } from "next/navigation";

const AuthGuard = dynamic(() => import("./AuthGuard"), { ssr: false }); // Hydration 에러때문에 ssr끔

function MyInfo() {
  const [isLoggedOut, logoutAction, isPending] = useActionState(postLogout, undefined);
  if (isLoggedOut) redirect("/");

  return (
    <AuthGuard>
      <div>MyInfo</div>
      <form action={logoutAction}>
        <button className="btn btn-sm">Logtout</button>
      </form>
      {isPending && "제출중"}
    </AuthGuard>
  );
}

export default MyInfo;
