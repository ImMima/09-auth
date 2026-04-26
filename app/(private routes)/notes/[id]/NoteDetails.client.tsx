"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, error, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.tag}>{data.tag}</p>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
