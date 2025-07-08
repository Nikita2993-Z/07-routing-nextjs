"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import styles from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams();
  const parsedId = Number(id);

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
    enabled: !isNaN(parsedId),
  });

  const handleClose = () => {
    router.back(); 
  };

  if (isLoading) return null;
  if (isError || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={styles.preview}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p className={styles.meta}>
          {note.updatedAt ? `Updated: ${note.updatedAt}` : `Created: ${note.createdAt}`}
        </p>
      </div>
    </Modal>
  );
}