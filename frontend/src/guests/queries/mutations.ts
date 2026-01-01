import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { Guest } from "@/routes/guests"
import { guests } from "./queryKeys"

const API_URL = import.meta.env.VITE_API_URL

type AddGuestInput = {
  name: string
  party: "bride" | "groom"
}

export const useAddGuest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: AddGuestInput) => {
      const response = await fetch(`${API_URL}/api/guests/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to add guest")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: guests })
      toast.success("Guest added")
    },
    onError: () => toast.error("Error adding guest. Please try again."),
  })
}

export const useDeleteGuest = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/guests/${id}/delete/`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete guest")
    },
    onMutate: async (guestId) => {
      await queryClient.cancelQueries({ queryKey: guests })
      const previousGuests = queryClient.getQueryData<Guest[]>(guests)
      if (previousGuests) {
        queryClient.setQueryData(
          ["guests"],
          previousGuests.filter((g) => g.id !== guestId),
        )
      }
      return previousGuests
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: guests })
      toast.success("Deleted guest!")
    },
    onError: () => toast.error("Error deleting guest!"),
  })
}
