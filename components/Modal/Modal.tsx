'use client';

import css from './Modal.module.css';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function Modal({ children }: Props) {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}