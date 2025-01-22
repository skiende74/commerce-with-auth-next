"use server";

import { User } from "../model/user";

export async function getLogin(email: string, password: string) {
  const res = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.text();
  return data;
}

export async function getUser(userId: number | string) {
  const data = await fetch(`https://fakestoreapi.com/users/${userId}`);
  return (await data.json()) as User;
}
