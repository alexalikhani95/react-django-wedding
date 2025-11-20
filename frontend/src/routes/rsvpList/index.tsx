import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { RsvpCard } from "./RsvpCard"
import type { Rsvp } from "./types"

const API_URL = import.meta.env.VITE_API_URL

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

  if (isError)
    return (
      <p className="text-center p-6 text-red-600 text-sm">
        Error loading RSVPs.
      </p>
    )

  if (isLoading)
    return (
      <div className="p-10 grid sm:grid-cols-2 gap-10">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    )

  const attending = rsvps.filter((r: Rsvp) => r.wedding_day === "accept")
  const notAttending = rsvps.filter((r: Rsvp) => r.wedding_day === "decline")

  return (
    <div className="min-h-screen p-10 bg-[#F6F2E9] font-metropolis">
      <div className="grid gap-10 md:grid-cols-2">
        {/* ➤ ATTENDING COLUMN */}
        <div>
          <header className="bg-forest-green text-beige rounded-xl px-6 py-5 flex items-center justify-between shadow-sm">
            <h2 className="text-xl font-['ADega Serif'] tracking-wide">
              Wedding Day — Attending
            </h2>
            <span className="rounded-full bg-beige/20 text-beige px-3 py-1 text-xs font-semibold">
              {attending.length}
            </span>
          </header>

          <div className="mt-6 space-y-6">
            {attending.length === 0 && (
              <p className="text-sm text-forest-green/70">No attendees yet.</p>
            )}

            {attending.map((r: Rsvp) => (
              <RsvpCard key={r.id} rsvp={r} />
            ))}
          </div>
        </div>

        {/* ➤ NOT ATTENDING COLUMN */}
        <div>
          <header className="bg-[#6D4A57] text-beige rounded-xl px-6 py-5 flex items-center justify-between shadow-sm">
            <h2 className="text-xl font-['ADega Serif'] tracking-wide">
              Wedding Day — Not Attending
            </h2>
            <span className="rounded-full bg-beige/20 text-beige px-3 py-1 text-xs font-semibold">
              {notAttending.length}
            </span>
          </header>

          <div className="mt-6 space-y-6">
            {notAttending.length === 0 && (
              <p className="text-sm text-forest-green/70">No declines yet.</p>
            )}

            {notAttending.map((r: Rsvp) => (
              <RsvpCard key={r.id} rsvp={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
