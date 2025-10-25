import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"

const API_URL = import.meta.env.VITE_API_URL

type Rsvp = {
  id: number
  name: string
  attending: string
  starter: string
  main: string
  dessert: string
  allergies: string
  created_at: string
}

export const RsvpList = () => {
  const {
    data: rsvps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rsvps"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/rsvp/list/`)
      if (!res.ok) throw new Error("Failed to fetch RSVPs")
      return res.json()
    },
  })

  if (isLoading) return <p className="text-center p-4">Loading RSVPs...</p>
  if (isError)
    return <p className="text-center p-4 text-red-600">Error loading RSVPs</p>

  console.log("rvsps", rsvps)

  const yesRsvps = rsvps.filter((r: Rsvp) => r.attending === "yes")
  const noRsvps = rsvps.filter((r: Rsvp) => r.attending === "no")

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Attending */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Attending ({yesRsvps.length})
        </h2>
        <div className="flex flex-col gap-4">
          {yesRsvps.length === 0 && (
            <p className="text-gray-500 text-sm">No one has RSVP'd yes yet.</p>
          )}
          {yesRsvps.map((rsvp: Rsvp) => (
            <RsvpCard key={rsvp.id} rsvp={rsvp} />
          ))}
        </div>
      </div>

      {/* Not Attending */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Not Attending ({noRsvps.length})
        </h2>
        <div className="flex flex-col gap-4">
          {noRsvps.length === 0 && (
            <p className="text-gray-500 text-sm">No one has RSVP'd no yet.</p>
          )}
          {noRsvps.map((rsvp: Rsvp) => (
            <RsvpCard key={rsvp.id} rsvp={rsvp} />
          ))}
        </div>
      </div>
    </div>
  )
}

const RsvpCard = ({ rsvp }: { rsvp: Rsvp }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/rsvp/${id}/delete/`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete RSVP")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] })
      toast.success("Deleted RSVP!")
    },
    onError: () => toast.error("Error deleting RSVP!"),
  })

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 border border-gray-200">
      <p className="font-semibold text-lg">{rsvp.name}</p>
      {rsvp.attending === "yes" && (
        <div className="flex flex-col gap-1 text-gray-700 text-md">
          <p>Starter: {rsvp.starter}</p>
          <p>Main: {rsvp.main}</p>
          <p>Dessert: {rsvp.dessert}</p>
          <p>Allergies: {rsvp.allergies || "None"}</p>
        </div>
      )}
      <Button
        variant="destructive"
        className="mt-2 w-[100px]"
        onClick={() => mutation.mutate(rsvp.id)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete RSVP"}
      </Button>
    </div>
  )
}
