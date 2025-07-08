import type { ReactElement } from "react";
import css from "./layout.module.css";

interface LayoutProps {
  default: ReactElement;
  sidebar: ReactElement;
}

export default function Layout({
  default: defaultSlot,
  sidebar,
}: LayoutProps): ReactElement {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{defaultSlot}</main>
    </div>
  );
}