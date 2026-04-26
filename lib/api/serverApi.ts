import { nextServer, FetchNotesResponse, CheckSessionResponse } from "./api";
import type { User } from "@/types/user";
import { Note } from "@/types/note";
import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (
  page: number,
  search: string = "",
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
  };
  if (search.trim() !== "") {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: await getAuthHeaders(),
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: await getAuthHeaders(),
  });
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session", {
    headers: await getAuthHeaders(),
  });
  return res;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me", {
    headers: await getAuthHeaders(),
  });
  return data;
};

export const refreshSession = async (
  refreshToken: string,
): Promise<{ accessToken: string } | null> => {
  const res = await nextServer.post<{ accessToken: string }>("/auth/refresh", {
    refreshToken,
  });

  return res.data;
};
