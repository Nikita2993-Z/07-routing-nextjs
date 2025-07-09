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
  // params — Promise, его нужно await’ить
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  // 1) Await params:
  const { slug } = await params;

  // 2) Достаем rawTag; по условию catch-all slug всегда массив ≥1
  const rawTag = slug[0];
  // 3) All → отсутствие фильтра:
  const tag = rawTag === 'All' ? undefined : rawTag;

  // 4) Жестко первая страница
  const pageNum = 1;

  // 5) Prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', pageNum],
    queryFn: () => fetchNotes('', pageNum, tag),
  });

  // 6) Получаем initialData
  const initialData = queryClient.getQueryData<{
    notes: Note[];
    totalPages: number;
  }>(['notes', tag, '', pageNum]);

  if (!initialData) {
    return notFound();
  }

  // 7) Рендерим клиентский компонент
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