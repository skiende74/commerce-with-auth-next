"use client";
import { use, useActionState, useEffect, useState } from "react";
import { postLogin } from "../authActions";
import Link from "next/link";
import { AuthContext } from "./AuthGuard";
import { redirect } from "next/navigation";

// function useLoginMutation({ id, password, onSuccess }: { id: string; password: string; onSuccess?: () => void }) {
//   const router = useRouter();
//   const { setToken } = use(AuthContext);

//   return useMutation({
//     mutationKey: ["login"],
//     mutationFn: () => postLogin(id, password),
//     onSuccess:
//       onSuccess ??
//       ((data) => {
//         console.log(data);
//         console.log("성공");
//         setToken(data);
//         router.push("/login/myinfo");
//       }),
//   });
// }

// accessToken : 상태관리(메모리), refresh : 쿠키

function Login() {
  const [email, setId] = useState("");
  const [password, setPassword] = useState("");

  const [token, dispatch, isPending] = useActionState(postLogin, null);

  const { accessToken: contextAccessToken, setAccessToken } = use(AuthContext)!;
  useEffect(() => {
    if (contextAccessToken == null && token && token.data) {
      setAccessToken(token.data);
      redirect("/myinfo");
    }
  }, [contextAccessToken, setAccessToken, token]);

  return (
    <article className="inline-block p-8 border-solid border-2 border-gray-200 ">
      <h2 className="font-bold">Login</h2>
      <form action={dispatch}>
        <div>
          <div className="flex justify-between items-center w-64">
            <label htmlFor="email">email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setId(e.target.value)}
              className="input-xs rounded border-2 input-bordered"
            />
          </div>
          <div className="flex justify-between items-center w-64 ">
            <label htmlFor="password">password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-xs input-bordered rounded border-2"
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm mx-auto block mt-4"
          >
            로그인
          </button>
          {isPending && "로그인 중.."}
          {!isPending && token && token.errorMessage && (
            <div className="text-red-400 text-xs">{token.errorMessage}</div>
          )}
          <Link
            className="btn btn-sm "
            href="/sign-up"
          >
            회원가입
          </Link>
        </div>
      </form>
    </article>
  );
}

export default Login;
