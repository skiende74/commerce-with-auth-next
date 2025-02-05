import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

async function decrypt(cookie: string | undefined) {
  return "";
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log("cookie", cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async ()=>{
    const session = await verifySession()
})

// AuthGuard 로 했었음. (클라이언트에서.)
// API도 막혀있어야되는게아닌가? 그래서 middleware해야되는거아닌가? middleware
// 

// 클 + 서버액션 -> 클 + dal