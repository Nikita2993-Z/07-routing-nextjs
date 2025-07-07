'use client';

import Link from 'next/link';
import css from './SideBar.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter${tag === 'All' ? '' : `/${tag}`}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}