import { api } from "@/lib/api";

import type { Campo } from "@/types/models";

export async function findAll(): Promise<Campo[]> {
  const { data } = await api.get<Campo[]>("/campos");
  return data;
}

export async function create(novo: Partial<Campo>) {
  const { data } = await api.post<Campo>("/campos", novo);
  return data;
}
