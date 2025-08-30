import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { toast } from "react-toastify"

type Inputs = {
    attending: string
    name: string
    starter: string
    main: string
    dessert: string
    allergies: string
}

const ATTENDANCE = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
]

const STARTERS = [
    { value: "soup", label: "Soup" },
    { value: "salad", label: "Salad" },
]
const MAINS = [
    { value: "lentils", label: "Lentils" },
    { value: "pasta", label: "Pasta" },
    { value: "salad", label: "Salad" },
]
const DESSERTS = [
    { value: "cake", label: "Cake" },
    { value: "icecream", label: "Ice Cream" },
]

const RadioCardGroup = ({
    name,
    control,
    options,
    label,
}: {
    name: keyof Inputs
    control: any
    options: { value: string; label: string }[]
    label: string
}) => {
    return (
        <div>
            <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {options.map((opt) => {
                            const selected = field.value === opt.value
                            return (
                                <label
                                    key={opt.value}
                                    className={`cursor-pointer rounded-xl border p-3 text-sm transition
                    ${selected ? "border-ring ring-2" : ""}
                    bg-card`}
                                >
                                    <Input
                                        type="radio"
                                        value={opt.value}
                                        checked={selected}
                                        onChange={() => field.onChange(opt.value)}
                                        className="hidden"
                                    />
                                    {opt.label}
                                </label>
                            )
                        })}
                    </div>
                )}
            />
        </div>
    )
}

export const Rsvp = () => {
    const { register, handleSubmit, control, watch, reset } = useForm<Inputs>()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: Inputs) => {
            const response = await fetch("http://localhost:8000/api/rsvp/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to add Rsvp");
            }
        },
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ["rsvps"] });
            toast.success("Rsvp sent!")
        },
        onError: (error) => {
            console.error("Rsvp creation error:", error);
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data)
    }

    const attending = watch("attending")

    // Show meals if attending is not explicitly "no"
    const showMeals = attending !== "no"

    return (
        <div className="mx-auto max-w-xl p-6">
            <h1 className="mb-6 text-3xl font-bold text-foreground">RSVP</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Guest name
                    </label>
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Enter name here"
                        className="w-full rounded-xl border border-border bg-card p-3"
                        inputMode="text"
                        autoComplete="name"
                    />
                </div>

                <RadioCardGroup
                    name="attending"
                    control={control}
                    options={ATTENDANCE}
                    label="Are you attending?"
                />

                {showMeals && (
                    <>
                        <RadioCardGroup
                            name="starter"
                            control={control}
                            options={STARTERS}
                            label="Starter"
                        />

                        <RadioCardGroup
                            name="main"
                            control={control}
                            options={MAINS}
                            label="Main"
                        />

                        <RadioCardGroup
                            name="dessert"
                            control={control}
                            options={DESSERTS}
                            label="Dessert"
                        />

                        <div className="flex flex-col gap-`">
                            <label className="mb-2 text-sm font-medium text-foreground">
                                Allergies / dietary restrictions
                            </label>
                            <Input
                                {...register("allergies")}
                                placeholder="Allergies etc"
                                className="w-full rounded-xl border border-border bg-card p-3"
                                inputMode="text"
                            />
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    className="w-full rounded-xl bg-primary p-4 text-base font-medium transition-colors hover:bg-primary/90"
                >
                    {mutation.isPending ? "Submitting..." : "Submit RSVP"}
                </Button>
            </form>
        </div>
    )
}
