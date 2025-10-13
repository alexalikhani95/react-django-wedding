import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { Table } from "../types"
import type { Guest } from "@/routes/Guests"

const API_URL = import.meta.env.VITE_API_URL

type TableInput = {
    name: string
}

export const useAddTable = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: TableInput) => {
            const response = await fetch(`${API_URL}/api/tables/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("Failed to add table")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            toast.success("table created!")
        },
        onError: () => {
            toast.error("Error adding table. Please try again.")
        },
    })
}

export const useDeleteTable = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            const res = await fetch(`${API_URL}/api/tables/${id}/delete/`, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("Failed to delete table")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            toast.success("Deleted table!")
        },
        onError: () => {
            toast.error("Error deleting table!")
        },
    })
}

export const useRemoveFromSeat = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (guestId: number) => {
            const res = await fetch(`${API_URL}/api/guests/${guestId}/remove-from-seat/`, {
                method: "PATCH",
            })
            if (!res.ok) throw new Error("Failed to remove guest from seat")
        },
        onMutate: async (guestId) => {
            await queryClient.cancelQueries({ queryKey: ["tables"] })
            await queryClient.cancelQueries({ queryKey: ["guests"] })

            const previousTables = queryClient.getQueryData<Table[]>(["tables"])

            if (previousTables) {
                const newtables = previousTables.map((table) => ({
                    ...table,
                    seats: table.seats.map((seat) => {
                        if (seat.guest_id === guestId) {
                            return { ...seat, guest_id: null }
                        }
                        return seat
                    })
                }))
                queryClient.setQueryData(["tables"], newtables)
            }

            const previousGuests = queryClient.getQueryData<Guest[]>(["guests"])
            if (previousGuests) {
                const newGuests = previousGuests.map((guest) => {
                    if (guest.id === guestId) {
                        return { ...guest, table: null }
                    }
                    return guest
                })
                queryClient.setQueryData(["guests"], newGuests)
            }

            return { previousTables, previousGuests }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            queryClient.invalidateQueries({ queryKey: ["guests"] })
            toast.success("Removed guest from seat!")
        },
        onError: (err, guestId, context) => {
            if (context?.previousTables) {
                queryClient.setQueryData(["tables"], context.previousTables)
            }
            if (context?.previousGuests) {
                queryClient.setQueryData(["guests"], context.previousGuests)
            }
            toast.error("Error removing guest from seat!")
        },
    })
}

export const useAssignSeat = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ guestId, seatId }: { guestId: number; seatId: number }) => {
            const res = await fetch(`${API_URL}/api/seats/${seatId}/assign/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guest_id: guestId }),
            })
            if (!res.ok) throw new Error("Failed to assign guest")
            return res.json()
        },
        onMutate: async ({ guestId, seatId }) => {
            await queryClient.cancelQueries({ queryKey: ["tables"] })
            await queryClient.cancelQueries({ queryKey: ["guests"] })

            const previousTables = queryClient.getQueryData<Table[]>(["tables"])

            if (previousTables) {
                const newTables = previousTables.map((table) => ({
                    ...table,
                    seats: table.seats.map((seat) => {
                        if (seat.guest_id === guestId) {
                            return { ...seat, guest_id: null }
                        }
                        if (seat.id === seatId) {
                            return { ...seat, guest_id: guestId }
                        }
                        return seat
                    }),
                }))
                queryClient.setQueryData(["tables"], newTables)
            }

            const previousGuests = queryClient.getQueryData<Guest[]>(["guests"])

            if (previousGuests) {
                const newGuests = previousGuests.map((guest) => {
                    if (guest.id === guestId) {
                        const targetTable = previousTables?.find(table =>
                            table.seats.some(seat => seat.id === seatId)
                        )
                        return { ...guest, table: targetTable ? targetTable.id : null }
                    }
                    return guest
                })
                queryClient.setQueryData(["guests"], newGuests)
            }

            return { previousTables, previousGuests }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            queryClient.invalidateQueries({ queryKey: ["guests"] })
            toast.success("Guest assigned successfully!")
        },
        onError: (err, variables, context) => {
            if (context?.previousTables) {
                queryClient.setQueryData(["tables"], context.previousTables)
            }
            if (context?.previousGuests) {
                queryClient.setQueryData(["guests"], context.previousGuests)
            }
            toast.error(`Failed to assign guest: ${err.message}`)
        }
    })
}