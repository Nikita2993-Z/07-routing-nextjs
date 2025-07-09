'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../../../../lib/api';
import NoteList from '../../../../../components/NoteList/NoteList';
import SearchBox from '../../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../../components/Pagination/Pagination';
import Link from 'next/link';
import type { Note } from '../../../../../types/note';
import css from './Notes.client.module.css';

interface NotesClientProps {
  tag?: string;
  initialQuery: string;
  initialPage: number;        // ← это поле
  initialData: { notes: Note[]; totalPages: number };
}

export default function NotesClient({
  tag,
  initialQuery,
  initialPage,
  initialData,
}: NotesClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isFetching } = useQuery({
    queryKey: ['notes', tag, query, currentPage],
    queryFn: () => fetchNotes(query, currentPage, tag),
    initialData: () => initialData,
    placeholderData: initialData,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className={css.controls}>
        <SearchBox inputValue={query} onChange={setQuery} />
        <Link href="/notes/new" className={css.createButton}>
          Create note +
        </Link>
      </div>

      {isFetching && <p>Loading...</p>}
      <NoteList notes={data?.notes ?? []} />

      <Pagination
        totalPages={data?.totalPages ?? 1}
        currentPage={currentPage}
        setPage={setCurrentPage}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    </div>
  );
}