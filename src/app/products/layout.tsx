import { ReactNode } from "react";

function Layout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

export default Layout;
