'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState } from 'react';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  const tagsList = [
    'All notes',
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagsList.map((tag, i) => (
            <li key={i} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}