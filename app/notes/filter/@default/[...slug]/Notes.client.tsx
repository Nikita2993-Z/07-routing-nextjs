'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { Note } from '@/types/note';
import Loading from '@/app/loading';

interface NotesClientProps {
  tag?: string;
  query: string;
  page: number;
  initialData: {
    notes: Note[];
    totalPages: number;
  };
}

export default function NotesClient({
  tag,
  query,
  page,
  initialData,
}: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, query, page],
    queryFn: () => fetchNotes(query, page, tag),
    initialData,
  });

  
  return <NoteList notes={data?.notes ?? []} />;
}