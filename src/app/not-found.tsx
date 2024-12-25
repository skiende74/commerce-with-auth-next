import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div>
      <h2 className="text-center">길을 잃었다~ 어딜 가야 할까~</h2>
      <p>
        <Link href="/">홈으로 이동</Link>
      </p>
    </div>
  );
}

export default NotFound;
