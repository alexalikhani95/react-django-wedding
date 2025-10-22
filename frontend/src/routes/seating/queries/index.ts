import { useQuery } from "@tanstack/react-query";
import type { Table } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const useTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async (): Promise<Table[]> => {
      const res = await fetch(`${API_URL}/api/tables/list/`);
      if (!res.ok) throw new Error("Failed to fetch tables");
      return res.json();
    },
  });
};
