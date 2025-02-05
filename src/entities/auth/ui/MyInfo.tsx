"use client";
import dynamic from "next/dynamic";

const AuthGuard = dynamic(() => import("./AuthGuard"), { ssr: false });

function MyInfo() {
  return (
    <AuthGuard>
      <div>MyInfo</div>
    </AuthGuard>
  );
}

export default MyInfo;
