import type { ReactNode } from "react";
import css from "./layout.module.css";

interface LayoutProps {
  default: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}

export default function Layout({
  default: defaultSlot,
  sidebar,
  modal,
}: LayoutProps) {
  return (
    <>
      {modal}
      <div className={css.layout}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <main className={css.main}>{defaultSlot}</main>
      </div>
    </>
  );
}