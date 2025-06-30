'use client';

import { useParams } from 'next/navigation';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { format, parseISO } from 'date-fns';
import Modal from '@/components/Modal/Modal';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        router.push('/notes/filter/Todo');
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  });

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  let label = '';
  let formattedDate = 'Date not available';

  if (note?.updatedAt || note?.createdAt) {
    const backendData = note?.updatedAt || note?.createdAt;
    label = note?.updatedAt ? 'Updated at: ' : 'Created at: ';
    const date = parseISO(backendData);
    formattedDate = format(date, "HH:mm, do 'of' MMMM yyyy");
  }

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
            <button onClick={() => router.back()} className={css.editBtn}>
              Edit note
            </button>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>
            {label}
            {formattedDate}
          </p>
        </div>
      </div>
    </Modal>
  );
}