import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import type { Rsvp } from "./types"

const API_URL = import.meta.env.VITE_API_URL

export const RsvpCard = ({ rsvp }: { rsvp: Rsvp }) => {
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
