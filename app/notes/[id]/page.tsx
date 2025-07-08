import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NoteDetails({ params }: PageProps) {
  const { id } = await params;
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    console.error('Invalid note ID:', id);
    return notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', parsedId],
      queryFn: () => fetchNoteById(parsedId),
    });
  } catch (error) {
    console.error('Failed to fetch note:', error);
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={parsedId} />
    </HydrationBoundary>
  );
}