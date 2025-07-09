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
 
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
 
  const { slug } = await params;

  
  const rawTag = slug[0];
 
  const tag = rawTag === 'All' ? undefined : rawTag;

 
  const pageNum = 1;

 
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', pageNum],
    queryFn: () => fetchNotes('', pageNum, tag),
  });

  
  const initialData = queryClient.getQueryData<{
    notes: Note[];
    totalPages: number;
  }>(['notes', tag, '', pageNum]);

  if (!initialData) {
    return notFound();
  }

  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        initialQuery=""
        initialPage={pageNum}
        initialData={initialData}
      />
    </HydrationBoundary>
  );
}