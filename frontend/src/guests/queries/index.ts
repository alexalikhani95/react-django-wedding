import { useQuery } from "@tanstack/react-query"
import type { Guest } from "@/routes/guests"

const API_URL = import.meta.env.VITE_API_URL

export const useGuests = () => {
  return useQuery({
    queryKey: ["guests"],
    queryFn: async (): Promise<Guest[]> => {
      const res = await fetch(`${API_URL}/api/guests/list/`)
      if (!res.ok) throw new Error("Failed to fetch guests")
      return res.json()
    },
  })
}
