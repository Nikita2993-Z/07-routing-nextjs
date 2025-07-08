import { fetchNotes } from '@/lib/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Note } from '@/types/note';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const tag = params.slug?.[0];

  const queryClient = new QueryClient();
  const query = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, query, page],
    queryFn: () => fetchNotes(query, page, tag),
  });

  const initialData = queryClient.getQueryData([
    "notes",
    tag,
    query,
    page,
  ]) as { notes: Note[]; totalPages: number };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} query={query} page={page} initialData={initialData} />
    </HydrationBoundary>
  );
}