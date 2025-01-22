"use client";
import { useActionState, useState } from "react";
import { redirect } from "next/navigation";
import { postLogin } from "../serverActions";

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
  // const { mutate } = useLoginMutation({ id: email, password });

  const [token, dispatch, isPending] = useActionState(postLogin, undefined);

  if (token) {
    redirect("/login/myinfo");
  }
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
        </div>
      </form>
    </article>
  );
}

export default Login;
