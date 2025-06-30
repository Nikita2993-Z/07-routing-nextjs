import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const slugURL = slug?.join('/');
  const response = await fetchNotes(1, '', slugURL);

  return <NotesClient initialData={response} category={slugURL} />;
}