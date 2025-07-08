import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteDetails({
  params,
}: {
  params: { id: string };
}) {
  const parsedId = Number(params.id);

  if (isNaN(parsedId)) {
    console.error("Invalid note ID:", params.id);
    return <div>Invalid note ID</div>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={parsedId} />
    </HydrationBoundary>
  );
}