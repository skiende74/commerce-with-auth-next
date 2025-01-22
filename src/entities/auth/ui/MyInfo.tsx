"use client";
import React from "react";
import AuthGuard from "./AuthGuard";

function MyInfo() {
  return (
    <AuthGuard>
      <div>MyInfo</div>
    </AuthGuard>
  );
}

export default MyInfo;
