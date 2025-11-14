import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { RsvpCard } from "./RsvpCard"
import type { Rsvp } from "./types"

const API_URL = import.meta.env.VITE_API_URL

const LoadingSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="flex-1 rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border p-4 bg-muted/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32 rounded" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </header>

        {/* Body */}
        <div className="flex flex-col gap-4 p-4">
          {[1, 2, 3].map((j) => (
            <div
              key={j}
              className="rounded-lg border border-border bg-muted/40 p-4 flex flex-col gap-3 shadow-sm"
            >
              <Skeleton className="h-5 w-40 rounded" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

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

  if (isLoading) return <LoadingSkeleton />

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
