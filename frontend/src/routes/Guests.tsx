import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Trash2Icon } from "lucide-react"
import type { Table } from "./seating/types"

const API_URL = import.meta.env.VITE_API_URL

export type Guest = {
  id: number
  name: string
  party: "bride" | "groom"
  seat_number: number
  table: Table
}

type Inputs = {
  name: string
  party: "bride" | "groom"
}

const GuestsLoadingSkeleton = () => {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 items-start">
      {/* Bride panel skeleton */}
      <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
        <header className="flex items-center justify-between border-b border-border p-3 bg-rose-50/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </header>
        <div className="space-y-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border/60 px-3 py-2 last:border-b-0"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-9 w-9 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Groom panel skeleton */}
      <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
        <header className="flex items-center justify-between border-b border-border p-3 bg-emerald-50/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-8 rounded-full" />
        </header>
        <div className="space-y-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border/60 px-3 py-2 last:border-b-0"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-9 w-9 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export const Guests = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues: { name: "", party: "bride" } })
  const queryClient = useQueryClient()

  const { data: guests, isLoading, isError } = useQuery({
    queryKey: ["guests"],
    queryFn: async (): Promise<Guest[]> => {
      const res = await fetch(`${API_URL}/api/guests/list/`)
      if (!res.ok) throw new Error("Failed to fetch guests")
      return res.json()
    },
  })

  const addMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await fetch(`${API_URL}/api/guests/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to add guest")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] })
      reset()
      toast.success("Guest added")
    },
    onError: () => {
      toast.error("Error adding guest. Please try again.")
    },
  })

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/guests/${id}/delete/`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete guest")
    },
    onMutate: async (guestId) => {
      await queryClient.cancelQueries({ queryKey: ["guests"] })
      const previousGuests = queryClient.getQueryData<Guest[]>(["guests"])
      if (previousGuests) {
        queryClient.setQueryData(
          ["guests"],
          previousGuests.filter((g) => g.id !== guestId)
        )
      }
      return previousGuests
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] })
      toast.success("Deleted guest!")
    },
    onError: () => {
      toast.error("Error deleting guest!")
    },
  })

  const onSubmit = handleSubmit((data) => addMutation.mutate(data))

  if (isError) return <p>Error loading Guests</p>

  const brideGuests = guests?.filter((guest) => guest.party === "bride") ?? []
  const groomGuests = guests?.filter((guest) => guest.party === "groom") ?? []

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl">Guests</h1>

      <form
        onSubmit={onSubmit}
        className="mb-8 w-full max-w-md rounded-xl border border-border bg-white/70 p-4 shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-base font-semibold">Add guest</h2>
          <p className="text-sm text-muted-foreground">
            Enter a name and choose the party.
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="guest-name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Guest name
          </label>
          <Input
            id="guest-name"
            {...register("name", { required: true })}
            placeholder="Enter name here"
            inputMode="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">Please enter a name.</p>
          )}
        </div>

        <fieldset className="mb-5">
          <legend className="mb-2 block text-sm font-medium text-foreground">
            Party
          </legend>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 text-sm">
              <Input
                type="radio"
                value="bride"
                {...register("party", { required: true })}
                className="h-4 w-4 accent-primary"
              />
              Bride
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <Input
                type="radio"
                value="groom"
                {...register("party", { required: true })}
                className="h-4 w-4 accent-primary"
              />
              Groom
            </label>
          </div>
        </fieldset>

        <Button
          type="submit"
          className="w-full rounded-xl p-4 text-base font-medium"
          disabled={isLoading || addMutation.isPending}
        >
          {addMutation.isPending ? "Adding guest..." : "Add guest"}
        </Button>
      </form>

      {isLoading ? (
        <GuestsLoadingSkeleton />
      ) : (
        <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 items-start">
          {/* Bride panel */}
          <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
            <header className="flex items-center justify-between border-b border-border p-3 bg-rose-50/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">👰</span>
                <h3 className="text-sm font-semibold text-rose-900">
                  Bride Guests
                </h3>
              </div>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                {brideGuests.length}
              </span>
            </header>

            {brideGuests.length > 0 ? (
              brideGuests.map((guest) => (
                <div
                  className="flex items-center justify-between border-b border-border/60 px-3 py-2 last:border-b-0"
                  key={guest.id}
                >
                  <p>{guest.name}</p>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(guest.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))
            ) : (
              <p className="px-3 py-3 text-sm text-muted-foreground">
                No guests yet.
              </p>
            )}
          </div>

          {/* Groom panel */}
          <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
            <header className="flex items-center justify-between border-b border-border p-3 bg-emerald-50/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤵</span>
                <h3 className="text-sm font-semibold text-emerald-900">
                  Groom Guests
                </h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {groomGuests.length}
              </span>
            </header>

            {groomGuests.length > 0 ? (
              groomGuests.map((guest) => (
                <div
                  className="flex justify-between items-center border-b border-border/60 px-3 py-2 last:border-b-0"
                  key={guest.id}
                >
                  <p>{guest.name}</p>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(guest.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))
            ) : (
              <p className="px-3 py-3 text-sm text-muted-foreground">
                No guests yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
