import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Guest } from "../Guests"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2Icon } from "lucide-react"
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"

const API_URL = import.meta.env.VITE_API_URL

type Seat = {
    id: number
    seat_number: number
    guest_id: number | null
}

export type Table = {
    id: number
    name: string
    capacity: number
    seats: Seat[]
}

type Inputs = {
    name: string
}

// Draggable guest component
const GuestItem = ({ guest }: { guest: Guest }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `guest-${guest.id}`,
    })
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="bg-white border border-gray-200 p-3 mx-1 rounded-lg shadow-md lg:w-[120px] md:w-[100px] cursor-pointer hover:scale-105 hover:bg-gray-50"
        >
            {guest.name}
        </div>
    )
}

// Droppable seat component
const SeatBox = ({
    seat,
    guests,
}: {
    seat: any
    guests: Guest[]
}) => {
    const { isOver, setNodeRef } = useDroppable({ id: `seat-${seat.id}` })
    const guest = guests.find((g) => g.id === seat.guest_id)

    if (guest) {
        return (
            <div
                ref={setNodeRef}
                className={`bg-white border border-gray-200 cursor-pointer p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[120px] flex items-center justify-center ${isOver ? "border-green-500" : ""}`}
            >
                {guest ? guest.name : "guest name"}
            </div>
        )
    } else {
        return (
            <div
                ref={setNodeRef}
                className={`bg-gray-400 border border-dashed p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[120px] flex items-center justify-center ${isOver ? "border-dashed" : ""}`}
            >
                Empty
            </div>
        )
    }
}

export const Seating = () => {
    const { register, handleSubmit, reset } = useForm<Inputs>()
    const queryClient = useQueryClient()
    const [activeGuest, setActiveGuest] = useState<Guest | null>(null)

    const { data: guests, isLoading: isLoadingGuests, isError: isErrorGuests } =
        useQuery({
            queryKey: ["guests"],
            queryFn: async (): Promise<Guest[]> => {
                const res = await fetch(`${API_URL}/api/guests/list/`)
                if (!res.ok) throw new Error("Failed to fetch guests")
                return res.json()
            },
        })

    const { data: tables, isLoading: tablesLoading, isError: isErrorTables } =
        useQuery({
            queryKey: ["tables"],
            queryFn: async (): Promise<Table[]> => {
                const res = await fetch(`${API_URL}/api/tables/list/`)
                if (!res.ok) throw new Error("Failed to fetch tables")
                return res.json()
            },
        })

    const addMutation = useMutation({
        mutationFn: async (data: Inputs) => {
            const response = await fetch(`${API_URL}/api/tables/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("Failed to add table")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            reset()
            toast.success("table created!")
        },
        onError: () => {
            toast.error("Error adding table. Please try again.")
        },
    })

    const deleteMutation = useMutation<void, Error, number>({
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

    const assignSeatMutation = useMutation({
        mutationFn: async ({
            guestId,
            seatId,
        }: {
            guestId: number
            seatId: number
        }) => {
            const res = await fetch(`${API_URL}/api/seats/${seatId}/assign/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guest_id: guestId }),
            })
            if (!res.ok) throw new Error("Failed to assign guest")
            return res.json()
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
        onError: () => toast.error("Failed to assign guest"),
    })

    const onSubmit = handleSubmit((data) => addMutation.mutate(data))

    if (isLoadingGuests || tablesLoading) return <p>Loading...</p>
    if (isErrorGuests || isErrorTables) return <p>Error</p>

    const handleDragStart = (event: DragStartEvent) => {
        const id = String(event.active.id)
        if (id.startsWith("guest-")) {
            const guestId = parseInt(id.replace("guest-", ""))
            const guest = guests?.find((g) => g.id === guestId) || null
            setActiveGuest(guest)
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveGuest(null)
        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (!activeId.startsWith("guest-") || !overId.startsWith("seat-")) return

        const guestId = parseInt(activeId.replace("guest-", ""))
        const seatId = parseInt(overId.replace("seat-", ""))
        assignSeatMutation.mutate({ guestId, seatId })
    }

    console.log('guests', guests)
    console.log('tables', tables)


    return (
        <div className="flex flex-col">
            <h1 className="text-3xl mb-5">Seating</h1>
            <form className="mb-10" onSubmit={onSubmit}>
                <div className="flex items-center gap-4">
                    <label className="block text-sm font-medium text-foreground">
                        Table name:
                    </label>
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Enter name here"
                        inputMode="text"
                        autoComplete="name"
                        className="max-w-[300px]"
                    />
                    <Button
                        type="submit"
                        className="rounded-xl p-4 text-base font-medium"
                        disabled={addMutation.isPending}
                    >
                        {addMutation.isPending ? "Adding table..." : "Add table"}
                    </Button>
                </div>
            </form>

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex gap-8">
                    {/* Guest list */}
                    <div className="flex flex-col gap-2 pr-10">
                        {guests?.length ? (
                            guests.filter(guest => !guest.table).map((guest) => <GuestItem key={guest.id} guest={guest} />)
                        ) : (
                            <p>No guests</p>
                        )}
                    </div>

                    {/* Tables */}
                    <div className="flex flex-col gap-10">
                        {tables?.map((table: Table) => {
                            const seats = table.seats
                            return (
                                <div className="flex items-center" key={table.id}>
                                    <SeatBox seat={seats[0]} guests={guests || []} />
                                    <div className="flex flex-col">
                                        <div className="flex pb-1">
                                            {seats.slice(1, 5).map((seat: any) => (
                                                <SeatBox key={seat.id} seat={seat} guests={guests || []} />
                                            ))}
                                        </div>
                                        <div className="p-5 rounded bg-yellow-700 w-full h-[130px] text-center text-white gap-5 flex justify-center items-center">
                                            {table.name}
                                            <Button
                                                variant="destructive"
                                                onClick={() => deleteMutation.mutate(table.id)}
                                            >
                                                <Trash2Icon />
                                            </Button>
                                        </div>
                                        <div className="flex pt-1">
                                            {seats.slice(5, 9).map((seat: any) => (
                                                <SeatBox key={seat.id} seat={seat} guests={guests || []} />
                                            ))}
                                        </div>
                                    </div>
                                    <SeatBox seat={seats[9]} guests={guests || []} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <DragOverlay>
                    {activeGuest ? (
                        <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md w-[120px] text-center">
                            {activeGuest.name}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}