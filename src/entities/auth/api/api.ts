"use server";


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
