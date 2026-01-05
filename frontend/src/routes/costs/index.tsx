import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
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

type UpdateInputs = {
  name: string
  total_amount: number
  paid_amount: number
}

const CostCard = ({ cost }: { cost: Cost }) => {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<UpdateInputs>({
    mode: "onChange",
    defaultValues: {
      name: cost.name,
      total_amount: Number(cost.total_amount),
      paid_amount: Number(cost.paid_amount),
    },
  })

  const totalAmount = watch("total_amount")

  const handleEditClick = () => {
    reset({
      name: cost.name,
      total_amount: Number(cost.total_amount),
      paid_amount: Number(cost.paid_amount),
    })
    setIsEditing(true)
  }

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateInputs) => {
      const response = await fetch(`${API_URL}/api/costs/${cost.id}/update/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update cost")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] })
      setIsEditing(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/costs/${cost.id}/delete/`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete cost")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] })
    },
  })

  const onSubmit: SubmitHandler<UpdateInputs> = (data) => {
    updateMutation.mutate(data)
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <header className="bg-primary text-primary-foreground p-3 border-b border-border rounded-t-xl">
          <h3 className="text-sm font-semibold">Edit Cost</h3>
        </header>
        <div className="p-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Name
            </label>
            <Input
              {...register("name", { required: true })}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Total Amount
            </label>
            <Input
              type="number"
              step="0.01"
              {...register("total_amount", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Paid Amount
            </label>
            <Input
              type="number"
              step="0.01"
              {...register("paid_amount", {
                required: true,
                valueAsNumber: true,
                validate: (value) => {
                  if (totalAmount && value > totalAmount) {
                    return "Paid amount cannot exceed total amount"
                  }
                  return true
                },
              })}
              className="w-full"
              aria-invalid={errors.paid_amount ? "true" : "false"}
            />
            {errors.paid_amount && (
              <p className="mt-1 text-sm text-destructive">
                {errors.paid_amount.message || "Please enter a valid amount."}
              </p>
            )}
          </div>
        </div>
        <div className="p-4 flex gap-2 border-t border-border">
          <Button
            type="submit"
            disabled={updateMutation.isPending || !isValid}
            className="flex-1"
          >
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <header className="bg-primary text-primary-foreground p-3 border-b border-border rounded-t-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{cost.name}</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditClick}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </header>
      <div className="p-4 space-y-0">
        <div className="flex items-center justify-between border-b border-border/60 px-0 py-2 last:border-b-0">
          <span className="text-muted-foreground text-sm">Total:</span>
          <span className="font-medium text-card-foreground">
            £{Number(cost.total_amount).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-border/60 px-0 py-2 last:border-b-0">
          <span className="text-muted-foreground text-sm">Paid:</span>
          <span className="font-medium text-card-foreground">
            £{Number(cost.paid_amount).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between px-0 py-2">
          <span className="text-muted-foreground text-sm">Remaining:</span>
          <span className="font-medium text-card-foreground">
            £{Number(cost.remaining_amount).toFixed(2)}
          </span>
        </div>
        <div className="pt-2 mt-2 border-t border-border/60">
          <span
            className={`text-sm font-medium ${cost.is_fully_paid ? "text-green-600" : "text-orange-600"
              }`}
          >
            {cost.is_fully_paid ? "✓ Fully Paid" : "Pending Payment"}
          </span>
        </div>
      </div>
    </div>
  )
}

export const Costs = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({ defaultValues: { name: "", total_amount: 0 } })

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
        body: JSON.stringify({
          name: data.name,
          total_amount: data.total_amount,
          paid_amount: 0,
        }),
      })
      if (!response.ok) throw new Error("Failed to add cost")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["costs"] })
      reset()
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
      <div className="flex flex-col items-center">
        <Skeleton className="mb-4 h-9 w-32" />
        <Skeleton className="mb-8 h-48 w-full max-w-md" />
        <div className="mb-6 w-full max-w-6xl">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="bg-primary/20 p-4 border-b border-border rounded-t-xl">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="p-4 space-y-0">
              <div className="flex items-center justify-between border-b border-border/60 px-0 py-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between px-0 py-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="bg-primary/20 p-3 border-b border-border rounded-t-xl">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-7 w-12 rounded" />
                    <Skeleton className="h-7 w-16 rounded" />
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-0">
                <div className="flex items-center justify-between border-b border-border/60 px-0 py-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center justify-between border-b border-border/60 px-0 py-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center justify-between px-0 py-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="pt-2 mt-2 border-t border-border/60">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addMutation.mutate(data)
  }

  return (
    <div className="flex flex-col items-center text-foreground">
      <h1 className="mb-4 text-3xl font-semibold">Costs</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 w-full max-w-md rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm"
      >
        <div className="mb-4">
          <h2 className="text-base font-semibold">Add Cost Item</h2>
          <p className="text-sm text-muted-foreground">
            Enter the name and total amount for the cost.
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="cost-name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Cost name
          </label>
          <Input
            id="cost-name"
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

        <div className="mb-4">
          <label
            htmlFor="cost-total"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Total amount
          </label>
          <Input
            id="cost-total"
            type="number"
            step="0.01"
            {...register("total_amount", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="Enter amount here"
            inputMode="decimal"
            aria-invalid={errors.total_amount ? "true" : "false"}
          />
          {errors.total_amount && (
            <p className="mt-1 text-sm text-destructive">
              Please enter a valid amount.
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl p-4 text-base font-medium"
          disabled={isLoading || addMutation.isPending || !isValid}
        >
          {addMutation.isPending ? "Adding cost..." : "Add cost"}
        </Button>
      </form>

      {costs && costs.length > 0 ? (
        <>
          <div className="mb-6 w-full max-w-6xl">
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <header className="bg-primary text-primary-foreground p-4 border-b border-border rounded-t-xl">
                <h2 className="text-base font-semibold">Summary</h2>
              </header>
              <div className="p-4 space-y-0">
                <div className="flex items-center justify-between border-b border-border/60 px-0 py-2">
                  <span className="text-muted-foreground text-sm">
                    Total Amount:
                  </span>
                  <span className="font-medium text-card-foreground">
                    £
                    {costs
                      .reduce(
                        (sum: number, cost: Cost) =>
                          sum + Number(cost.total_amount),
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-0 py-2">
                  <span className="text-muted-foreground text-sm">
                    Total Remaining:
                  </span>
                  <span className="font-medium text-card-foreground">
                    £
                    {costs
                      .reduce(
                        (sum: number, cost: Cost) =>
                          sum + Number(cost.remaining_amount),
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
            {costs.map((cost: Cost) => (
              <CostCard key={cost.id} cost={cost} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">No costs yet.</p>
      )}
    </div>
  )
}

export default Costs
