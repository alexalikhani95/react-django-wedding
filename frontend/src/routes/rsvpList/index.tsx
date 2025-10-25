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

  if (isLoading)
    return (
      <p className="text-center p-6 text-muted-foreground text-sm">
        Loading RSVPs...
      </p>
    )

  if (isError)
    return (
      <p className="text-center p-6 text-destructive text-sm">
        Error loading RSVPs
      </p>
    )

  const yesRsvps = rsvps.filter((r: Rsvp) => r.attending === "yes")
  const noRsvps = rsvps.filter((r: Rsvp) => r.attending === "no")

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Attending */}
      <div className="flex-1 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <header className="flex items-center justify-between border-b border-border p-4 bg-accent text-accent-foreground">
          <h2 className="text-lg font-semibold">Attending</h2>
          <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs font-medium">
            {yesRsvps.length}
          </span>
        </header>

        <div className="flex flex-col gap-4 p-4">
          {yesRsvps.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No one has RSVP’d yes yet.
            </p>
          )}
          {yesRsvps.map((rsvp: Rsvp) => (
            <RsvpCard key={rsvp.id} rsvp={rsvp} />
          ))}
        </div>
      </div>

      {/* Not Attending */}
      <div className="flex-1 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <header className="flex items-center justify-between border-b border-border p-4 bg-primary text-primary-foreground">
          <h2 className="text-lg font-semibold">Not Attending</h2>
          <span className="rounded-full bg-primary/60 px-2 py-0.5 text-xs font-medium">
            {noRsvps.length}
          </span>
        </header>

        <div className="flex flex-col gap-4 p-4">
          {noRsvps.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No one has RSVP’d no yet.
            </p>
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
    <div className="rounded-lg border border-border bg-muted/50 text-card-foreground shadow-sm p-4 flex flex-col gap-2">
      <p className="font-semibold text-base">{rsvp.name}</p>

      {rsvp.attending === "yes" && (
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Starter:</span>{" "}
            {rsvp.starter}
          </p>
          <p>
            <span className="font-medium text-foreground">Main:</span>{" "}
            {rsvp.main}
          </p>
          <p>
            <span className="font-medium text-foreground">Dessert:</span>{" "}
            {rsvp.dessert}
          </p>
          <p>
            <span className="font-medium text-foreground">Allergies:</span>{" "}
            {rsvp.allergies || "None"}
          </p>
        </div>
      )}

      <Button
        variant="destructive"
        className="mt-3 w-[130px] self-start"
        onClick={() => mutation.mutate(rsvp.id)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete RSVP"}
      </Button>
    </div>
  )
}
