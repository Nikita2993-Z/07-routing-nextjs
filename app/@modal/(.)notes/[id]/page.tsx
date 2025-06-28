import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type NotePreviewModalProps = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: NotePreviewModalProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  const parsedId = Number(id);

  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />;
    </HydrationBoundary>
  );
};
export default NotePreview;