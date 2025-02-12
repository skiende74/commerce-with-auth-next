"use client";
import { useActionState } from "react";
import { postSignup } from "../authActions";
import { redirect } from "next/navigation";

export function SignupForm() {
  const [state, action, pending] = useActionState(postSignup, undefined);
  if (state) {
    redirect("/");
  }
  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
