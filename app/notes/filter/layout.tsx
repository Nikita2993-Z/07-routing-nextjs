import type { ReactNode } from 'react';
import css from './layout.module.css';

export default function FilterLayout({
  default: defaultSlot,
  sidebar,
  modal,
}: {
  default: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{defaultSlot}</main>
      {modal} {/* Модальне вікно поверх основного контенту */}
    </div>
  );
}