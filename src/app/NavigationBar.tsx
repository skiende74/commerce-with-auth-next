"use client";
import { useAuthQuery } from "@/entities/auth/ui/AuthGuard";
import Link from "next/link";

const NavigationBar = () => {
  const { data: accessToken, isSuccess } = useAuthQuery();

  return (
    <div className="w-full navbar bg-base-300">
      <div className="flex-1 px-2 mx-2">쇼핑</div>
      <ul className="menu menu-horizontal">
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/products">상품 목록</Link>
        </li>
        <li>
          <Link href="/cart">장바구니</Link>
        </li>
        <li>
          {isSuccess && accessToken ? <Link href="/login/myinfo">내 정보</Link> : <Link href="/login">로그인</Link>}
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
