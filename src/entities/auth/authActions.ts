"use server";
import { cookies } from "next/headers";
import { User } from "./model/user";
import { supabase } from "@/workspace/supabase";
import jwt from "jsonwebtoken";


export async function postLogin(state: {data:string}|{ errorMessage:string} | null, formData: FormData) {
  const [email, password] = [formData.get("email") as string, formData.get("password") as string];

  const user = await supabase.from('user_table').select('*').eq('email',email).eq('password',password)

  if (user.error) return { errorMessage:'알 수 없는 서버 에러입니다.'};
  if (user.data.length === 0) return { errorMessage:'email 혹은 password가 틀렸습니다.'}
  const { refreshToken, accessToken } = makeToken(email);
  const cookieStore = await cookies();
  cookieStore.set({ name: "refreshToken", value: refreshToken, httpOnly: true, secure: true });

  return {data:accessToken};
}


export async function postSignup(state: User | undefined, formData: FormData) {
  const user = {
    name: formData.get("name") ,
    email: formData.get("email"),
    password: formData.get("password"),
  } as User;

  await supabase.from("user_table").insert({email:user.email,password:user.password, registered_at:new Date().toISOString()});
  
  return user;
}

export async function postLogout(){
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return true;
}

export async function getUser({ accessToken }: { accessToken: string }) {
  const {email} = readToken<{email:string}>(accessToken);
  const user = supabase.from("user_table").select("*").like("email", email)
  return user;
}

function makeToken(email: string) {
  const accessToken = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" });
  const refreshToken = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: 3600 * 24 * 7 });
  return { accessToken, refreshToken };
}

function readToken<T>(token: string){
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY) as T
}

export async function reissueAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (refreshToken == null) return null;

  const {email} = readToken<{email:string}>(refreshToken);
  const { refreshToken: newRefreshToken, accessToken: newAccessToken } = makeToken(email);
  cookieStore.set("refreshToken", newRefreshToken);

  return newAccessToken;
}
