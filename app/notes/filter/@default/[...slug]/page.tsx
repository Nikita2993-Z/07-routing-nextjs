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
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0];
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  if (isNaN(page) || page < 1) {
    return notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", tag, query, page],
      queryFn: () => fetchNotes(query, page, tag),
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return notFound();
  }

  const initialData = queryClient.getQueryData<{
    notes: Note[];
    totalPages: number;
  }>(["notes", tag, query, page]);

  if (!initialData) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        query={query}
        page={page}
        initialData={initialData}
      />
    </HydrationBoundary>
  );
}