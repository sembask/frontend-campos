import { api } from "@/lib/api";
import type { Preenchimento, PreenchimentoCampo } from "@/types/models";

export async function findAll(): Promise<PreenchimentoCampo[]> {
  const { data } = await api.get<PreenchimentoCampo[]>("/preenchimentos");
  return data;
}

export async function create(novo: Partial<Preenchimento>) {
  const { data } = await api.post<Preenchimento>("/preenchimentos", novo);
  return data;
}
