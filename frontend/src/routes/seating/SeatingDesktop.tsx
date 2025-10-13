import { useState } from "react"
import { useForm } from "react-hook-form"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Trash2Icon } from "lucide-react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { useGuests } from "@/guests/queries"
import { useTables } from "./queries"
import { useAddTable, useDeleteTable, useRemoveFromSeat, useAssignSeat } from "./mutations"
import type { Guest } from "../Guests"
import type { Inputs, Seat } from "./types"
import type { Table } from "./types"

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


const SeatBox = ({
    seat,
    guests,
    onRemoveGuest
}: {
    seat: Seat
    guests: Guest[]
    onRemoveGuest?: (guestId: number) => void
}) => {
    const { isOver, setNodeRef } = useDroppable({ id: `seat-${seat.id}` })
    const guest = guests.find((g) => g.id === seat.guest_id)

    if (guest) {
        return (
            <div
                ref={setNodeRef}
                className={`bg-white border border-gray-200 cursor-pointer p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[80px] flex items-center justify-center ${isOver ? "border-green-500" : ""}`}
            >
                <p>{guest.name}</p>
                {onRemoveGuest && (
                    <button
                        onClick={() => onRemoveGuest(guest.id)}
                        className="absolute top-[-10px] right-1 p-1 bg-red-50 rounded-full hover:bg-red-100 cursor-pointer"
                        title="Remove guest"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                )}
            </div>
        )
    } else {
        return (
            <div
                ref={setNodeRef}
                className={`bg-gray-400 border border-dashed p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[80px] flex items-center justify-center ${isOver ? "border-dashed" : ""}`}
            >
                Empty
            </div>
        )
    }
}

export const SeatingDesktop = () => {
    const { register, handleSubmit, reset } = useForm<Inputs>()
    const [activeGuest, setActiveGuest] = useState<Guest | null>(null)

    const { data: guests, isLoading: isLoadingGuests, isError: isErrorGuests } = useGuests()
    const { data: tables, isLoading: tablesLoading, isError: isErrorTables } = useTables()

    // Mutations
    const addMutation = useAddTable()
    const deleteMutation = useDeleteTable()
    const removeFromSeatMutation = useRemoveFromSeat()
    const assignSeatMutation = useAssignSeat()

    const onSubmit = handleSubmit((data) => {
        addMutation.mutate(data, {
            onSuccess: () => reset(),
        })
    })

    if (isLoadingGuests || tablesLoading) return <p>Loading...</p>
    if (isErrorGuests || isErrorTables) return <p>Error loading data</p>

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
        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (!activeId.startsWith("guest-") || !overId.startsWith("seat-")) return

        const guestId = parseInt(activeId.replace("guest-", ""))
        const seatId = parseInt(overId.replace("seat-", ""))
        assignSeatMutation.mutate({ guestId, seatId })
    }

    const handleRemoveGuest = (guestId: number) => {
        removeFromSeatMutation.mutate(guestId)
    }

    return (
        <div className="flex flex-col text-center">
            <h1 className="text-3xl mb-5">Seating</h1>

            {/* Add Table Form */}
            <div className="w-full flex justify-center">
            <form onSubmit={onSubmit} className="mb-6 bg-white rounded-lg border p-4 shadow-sm w-[500px]">
                <h2 className="text-sm font-semibold mb-3">Add Table</h2>
                <div className="flex gap-2">
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Table name"
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={addMutation.isPending}
                        className="shrink-0"
                    >
                        {addMutation.isPending ? "..." : "Add"}
                    </Button>
                </div>
            </form>
            </div>

            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex gap-8">
                    {/* Guests List */}
                    <div className="flex flex-col gap-2 pr-10">
                        {guests?.length ? (
                            guests.filter(
                                    (guest) => !guest.table && guest.id !== activeGuest?.id
                                )
                                .map((guest) => <GuestItem key={guest.id} guest={guest} />)
                        ) : (
                            <p>No guests</p>
                        )}
                    </div>

                    {/* Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 auto-rows-min items-start">
                        {tables?.map((table: Table) => {
                            const seats = table.seats
                            return (
                                <div className="flex items-center" key={table.id}>
                                    <SeatBox
                                        seat={seats[0]}
                                        guests={guests || []}
                                        onRemoveGuest={handleRemoveGuest}
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex pb-1">
                                            {seats.slice(1, 5).map((seat) => (
                                                <SeatBox
                                                    key={seat.id}
                                                    seat={seat}
                                                    guests={guests || []}
                                                    onRemoveGuest={handleRemoveGuest}
                                                />
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
                                            {seats.slice(5, 9).map((seat) => (
                                                <SeatBox
                                                    key={seat.id}
                                                    seat={seat}
                                                    guests={guests || []}
                                                    onRemoveGuest={handleRemoveGuest}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <SeatBox
                                        seat={seats[9]}
                                        guests={guests || []}
                                        onRemoveGuest={handleRemoveGuest}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Drag overlay for active guest */}
                <DragOverlay>
                    {activeGuest ? (
                        <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md w-[80px] text-center">
                            {activeGuest.name}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
