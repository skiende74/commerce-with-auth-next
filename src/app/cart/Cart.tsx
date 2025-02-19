"use client";

import { AuthContext } from "@/entities/auth/ui/AuthGuard";
import { use } from "react";

function Cart({ userPromise }: { userPromise: () => Promise<void> }) {
  const { accessToken } = use(AuthContext);
  if (accessToken == null) return null;
  accessToken

  return <div>Cart</div>;
}

export default Cart;
