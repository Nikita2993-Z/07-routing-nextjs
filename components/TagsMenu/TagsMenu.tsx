"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={
                tag === "All"
                  ? "/notes/filter"
                  : `/notes/filter/${encodeURIComponent(tag)}`
              }
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}