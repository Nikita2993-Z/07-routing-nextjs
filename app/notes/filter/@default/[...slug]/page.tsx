import { fetchNotes } from '@/lib/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Note } from '@/types/note';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { query = "", page = "1" } = searchParams ? await searchParams : {};
  const tag = slug?.[0];
  const pageNum = Number(page);

  if (isNaN(pageNum) || pageNum < 1) {
    return notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['notes', tag, query, pageNum],
      queryFn: () => fetchNotes(query, pageNum, tag),
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return notFound();
  }

  const initialData = queryClient.getQueryData<{ notes: Note[]; totalPages: number }>([
    'notes',
    tag,
    query,
    pageNum,
  ]);

  if (!initialData) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} query={query} page={pageNum} initialData={initialData} />
    </HydrationBoundary>
  );
}