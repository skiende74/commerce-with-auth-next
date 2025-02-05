"use server";
import { cookies } from "next/headers";
import { User } from "./model/user";
import { supabase } from "@/workspace/supabase";
import jwt from "jsonwebtoken";

const users: User[] = [{ email: "email1@naver.com", password: "password", name: "홍길동" }];

export async function postLogin(state: string | null, formData: FormData) {
  const [email, password] = [formData.get("email"), formData.get("password")];

  const user = supabase.from("user_table").insert({email,password});

  if (user == null) return null;

  const { refreshToken, accessToken } = makeToken(email as string);
  const cookieStore = await cookies();
  cookieStore.set({ name: "refreshToken", value: refreshToken, httpOnly: true, secure: true });

  return accessToken;
}

function makeToken(email: string) {
  const accessToken = jwt.sign({ email }, process.env.PRIVATE_KEY, { expiresIn: "24h" });
  const refreshToken = jwt.sign({ email }, process.env.PRIVATE_KEY, { expiresIn: 3600 * 24 * 7 });
  return { accessToken, refreshToken };
}

// TODO : user[0]으로해뒀는데일단. accessToken 데이터를쓰도록고치기
export async function getUser({ accessToken }: { accessToken: string }) {
  supabase.from("user_table").select("*").like("email",email)
  //  return user;
}

export async function reissueAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (refreshToken == null) return null;

  const { refreshToken: newRefreshToken, accessToken: newAccessToken } = makeToken();
  cookieStore.set("refreshToken", newRefreshToken);
  return newAccessToken;
}

export async function postSignup(state: User | undefined, formData: FormData) {
  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  } as User;

  users.push(user);

  return user;
}
