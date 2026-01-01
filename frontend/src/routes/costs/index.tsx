import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

const API_URL = import.meta.env.VITE_API_URL

type Cost = {
  id: number
  name: string
  total_amount: number
  paid_amount: number
  remaining_amount: number
  is_fully_paid: boolean
}

type Inputs = {
  name: string
  total_amount: number
  paid_amount: number
}

export const Costs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({ defaultValues: { name: "" } })

  const {
    data: costs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["costs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/costs/list/`)
      if (!res.ok) throw new Error("Failed to fetch costs")
      return res.json()
    },
  })

  const addMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await fetch(`${API_URL}/api/costs/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to add cost")
    },
  })

  if (isError)
    return (
      <p className="text-center p-6 text-red-600 text-sm">
        Error loading costs.
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

  const onSubmit = () => {}

  return (
    <div>
      <h1>Costs</h1>

      <form
        onSubmit={onSubmit}
        className="mb-8 w-full max-w-md rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-base font-semibold">Add Cost Item</h2>
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
            <p className="mt-1 text-sm text-destructive">
              Please enter a name.
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl p-4 text-base font-medium"
          disabled={isLoading || addMutation.isPending || !isValid}
        >
          {addMutation.isPending ? "Adding guest..." : "Add guest"}
        </Button>
      </form>
      <div>
        {costs.map((cost: Cost) => (
          <div key={cost.id}>
            <h2>{cost.name}</h2>
            <p>Remaining: {cost.remaining_amount}</p>
            <p>Paid: {cost.paid_amount}</p>
            <p>Total: {cost.total_amount}</p>
            <p>Is Fully Paid: {cost.is_fully_paid ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Costs
