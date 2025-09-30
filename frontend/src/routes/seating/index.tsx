import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Guest } from "../Guests"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2Icon } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

type Table = {
    id: number
    name: string
    capacity: number
    seats: any
}

type Inputs = {
    name: string;
}


export const Seating = () => {
    const { register, handleSubmit, control, watch, reset } = useForm<Inputs>()
    const queryClient = useQueryClient()

    const { data: guests, isLoading: isLoadingGuests, isError: isErrorGuests } = useQuery({
        queryKey: ["guests"],
        queryFn: async (): Promise<Guest[]> => {
            const res = await fetch(`${API_URL}/api/guests/list/`)
            if (!res.ok) throw new Error("Failed to fetch guests")
            return res.json()
        },
    })

    const { data: tables, isLoading: tablesLoading, isError: isErrorTables } = useQuery({
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
            toast.success('Deleted table!')
        },
        onError: () => {
            toast.error('Error deleting table!')
        }
    })

    const onSubmit = handleSubmit((data) => addMutation.mutate(data))


    if (isLoadingGuests || tablesLoading) return <p>Loading...</p>
    if (isErrorGuests || isErrorTables) return <p>Error</p>

    console.log('guests!!', guests)
    console.log('tables', tables)

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl mb-5">Seating</h1>
            <form
                className="mb-10"
                onSubmit={onSubmit}
            >

                <div className="flex items-center gap-4">
                    <label
                        className="block text-sm font-medium text-foreground"
                    >
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
                        {addMutation.isPending ? (
                            "Adding table..."
                        ) : (
                            "Add table"
                        )}
                    </Button>
                </div>
            </form>

            <div className="flex">

                {/* guests list */}
                <div className="flex flex-col gap-2 pr-10">
                    {guests?.length ? (
                        guests.map((guest) => <div className="p-2 bg-white rounded cursor-pointer" key={guest.id}>{guest.name}</div>)
                    ) : (
                        <p>No guests</p>
                    )}
                </div>

                {/* tables section */}
                <div className="flex flex-col gap-10">
                    {tables?.map((table: Table) => {
                        const seats = table.seats
                        return (
                            <div className="flex items-center" key={table.id}>
                                {/* //seat 1 */}
                                <div className="bg-white border border-gray-200 p-3 mx-1 rounded-lg shadow-md h-[50px] relative">{seats[0].guest_id || 'guest name'}</div>

                                <div className="flex flex-col">
                                    <div className="flex">
                                        {seats.slice(1, 5).map((seat: any) => (
                                            <div className="bg-white border border-gray-200 p-3 mx-1 rounded-lg shadow-md h-[50px] relative">{seat.guest_id || 'guest name'}</div>
                                        ))}
                                    </div>

                                    <div key={table.id} className="p-5 rounded bg-yellow-700 w-full h-[130px] text-center text-white gap-5 flex justify-center items-center">
                                        {table.name}
                                        <Button variant="destructive" onClick={() => deleteMutation.mutate(table.id)}>
                                            <Trash2Icon />
                                        </Button>
                                    </div>

                                    <div className="flex">
                                        {seats.slice(6, 10).map((seat: any) => (
                                            <div className="bg-white border border-gray-200 p-3 mx-1 rounded-lg shadow-md h-[50px] relative">{seat.guest_id || 'guest name'}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* //end seat */}
                                <div className="bg-white border border-gray-200 p-3 mx-1 rounded-lg shadow-md h-[50px] relative">{seats[9].guest_id || 'guest name'}</div>

                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}