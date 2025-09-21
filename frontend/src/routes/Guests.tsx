import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Trash2Icon } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

export type Guest = {
  id: number
  name: string
  party: "bride" | "groom"
}

type Inputs = {
  name: string
  party: "bride" | "groom"
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
      toast.error("Error deleting guest. Please try again.")
    },
  })

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/guests/${id}/delete/`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete guest")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] })
      toast.success('Deleted guest!')
    },
    onError: () => {
      toast.error('Error deleting guest!')
    }
  })

  const onSubmit = handleSubmit((data) => addMutation.mutate(data))

  if (isLoading) return <p>Loading Guests...</p>
  if (isError) return <p>Error loading Guests</p>


  const brideGuests = guests && guests.filter((guest) => guest.party === "bride")
  const groomGuests = guests && guests.filter((guest) => guest.party === "groom")

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
          disabled={addMutation.isPending}
        >
          {addMutation.isPending ? (
            "Adding guest..."
          ) : (
            "Add guest"
          )}
        </Button>
      </form>

      {/* Guest lists */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 items-start">
        {/* Bride panel */}
        <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
          <header className="flex items-center justify-between border-b border-border p-3 bg-rose-50/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">👰</span>
              <h3 className="text-sm font-semibold text-rose-900">Bride Guests</h3>
            </div>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
              {brideGuests?.length}
            </span>
          </header>

          {brideGuests && brideGuests.length > 0 ? (
            brideGuests.map((guest, index) => (
              <div className="flex justify-between border-b border-border/60 px-3 py-2 last:border-b-0" key={index}>
                <p
                >
                  {guest.name}
                </p>
                <Button variant="destructive" onClick={() => deleteMutation.mutate(guest.id)}>
                  <Trash2Icon />
                </Button>
              </div>
            ))
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">No guests yet.</p>
          )}
        </div>

        {/* Groom panel */}
        <div className="rounded-xl border border-border bg-white/70 shadow-sm overflow-hidden">
          <header className="flex items-center justify-between border-b border-border p-3 bg-emerald-50/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤵</span>
              <h3 className="text-sm font-semibold text-emerald-900">Groom Guests</h3>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              {groomGuests?.length}
            </span>
          </header>
          {groomGuests && groomGuests.length > 0 ? (
            groomGuests.map((guest, index) => (
              <div className="flex justify-between border-b border-border/60 px-3 py-2 last:border-b-0" key={index}>
                <p
                >
                  {guest.name}
                </p>
                <Button variant="destructive" onClick={() => deleteMutation.mutate(guest.id)}>
                  <Trash2Icon />
                </Button>
              </div>
            ))
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">No guests yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
