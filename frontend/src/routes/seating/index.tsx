import { useQuery } from "@tanstack/react-query"
import type { Guest } from "../Guests"

const API_URL = import.meta.env.VITE_API_URL


export const Seating = () => {
    const { data: guests, isLoading, isError } = useQuery({
        queryKey: ["guests"],
        queryFn: async (): Promise<Guest[]> => {
            const res = await fetch(`${API_URL}/api/guests/list/`)
            if (!res.ok) throw new Error("Failed to fetch guests")
            return res.json()
        },
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl mb-5">Seating</h1>

            <div className="flex">

                <div className="flex flex-col gap-2">
                    {guests?.length ? (
                        guests.map((guest) => <div className="p-2 bg-white rounded cursor-pointer" key={guest.name}>{guest.name}</div>)
                    ) : (
                        <p>No guests</p>
                    )}
                </div>

            </div>
        </div>
    )
}