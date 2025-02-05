"use server";
import { cookies } from "next/headers";
import { User } from "./model/user";

const users: User[] = [{ email: "email1@naver.com", password: "password", name: "홍길동" }];

export async function postLogin(state: string | null, formData: FormData) {
  const user = users.find((user) => user.email === formData.get("email") && user.password === formData.get("password"));

  if (user == null) return null;

  const [refreshToken, accessToken] = [crypto.randomUUID(), crypto.randomUUID()];
  const cookieStore = await cookies();
  cookieStore.set({ name: "refreshToken", value: refreshToken, httpOnly: true, secure: true });

  return accessToken;
}

function makeToken() {
  const [refreshToken, accessToken] = [crypto.randomUUID(), crypto.randomUUID()];
  return { refreshToken, accessToken };
}

// TODO : user[0]으로해뒀는데일단. accessToken 데이터를쓰도록고치기
export async function getUser({ accessToken }: { accessToken: string }) {
  const user = users.find((user) => user.email === users[0].email);
  return user;
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
