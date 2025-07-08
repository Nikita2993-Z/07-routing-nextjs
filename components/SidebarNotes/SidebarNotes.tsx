'use client';

import Link from 'next/link';
import styles from './SidebarNotes.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <ul className={styles.menuList}>
      {TAGS.map(tag => (
        <li key={tag} className={styles.menuItem}>
          <Link
            href={`/notes/filter${tag === 'All' ? '' : `/${tag}`}`}
            className={styles.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}