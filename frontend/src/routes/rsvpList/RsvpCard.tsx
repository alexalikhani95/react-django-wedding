import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import type { DessertCode, MainCode, Rsvp, StarterCode } from "./types"

const API_URL = import.meta.env.VITE_API_URL

const MENU_MAP: {
  starter: Record<StarterCode, string>
  main: Record<MainCode, string>
  dessert: Record<DessertCode, string>
} = {
  starter: {
    tomato:
      "Isle of Wight heritage tomatoes, vegan mozzarella, leaf, basil oil, ciabatta bread",
    antipasti:
      "Vegetable antipasti board, chargrilled pepper, courgette, olives, balsamic onions, sourdough, vegan pesto",
  },
  main: {
    croute:
      "Butternut squash, spinach & mushroom en croûte, roast tomato sauce, tenderstem broccoli, fondant potato",
    risotto: "Spelt leek & pea risotto, oyster mushroom, vegan parmesan",
  },
  dessert: {
    tart: "Chocolate tart, passion fruit sorbet, chocolate sauce, passion fruit crumb",
    jelly: "Elderflower jelly, summer fruits, crème fraîche",
  },
}

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

  const starterText = rsvp.starter ? MENU_MAP.starter[rsvp.starter] : "-"
  const mainText = rsvp.main ? MENU_MAP.main[rsvp.main] : "-"
  const dessertText = rsvp.dessert ? MENU_MAP.dessert[rsvp.dessert] : "-"

  return (
    <div
      className="
        rounded-2xl border border-forest-green/20 
        bg-white shadow-sm
        p-8 flex flex-col gap-6
        font-metropolis
      "
    >
      {/* NAME */}
      <p className="text-forest-green text-2xl font-['ADega Serif'] leading-tight">
        {rsvp.name}
      </p>

      {/* ATTENDANCE */}
      <div className="flex flex-col gap-1 text-sm text-forest-green">
        <p>
          <span className="font-semibold">Wedding Day:</span>{" "}
          {rsvp.wedding_day === "accept" ? "Attending" : "Not attending"}
        </p>
        <p>
          <span className="font-semibold">Night Before:</span>{" "}
          {rsvp.night_before === "accept" ? "Attending" : "Not attending"}
        </p>
      </div>

      {/* MENU (only if attending) */}
      {rsvp.wedding_day === "accept" && (
        <div
          className="
            border border-forest-green/20 
            rounded-xl bg-beige/40 p-6 
            flex flex-col gap-4
          "
        >
          <p
            className="
              uppercase tracking-[0.14em] 
              text-forest-green/70 text-sm 
              font-semibold
            "
          >
            Menu Choices
          </p>

          <div className="flex flex-col gap-4 text-sm text-forest-green leading-relaxed">
            {/* Starter */}
            <div>
              <p className="font-semibold">Starter:</p>
              <p className="opacity-80 mt-0.5">{starterText}</p>
            </div>

            {/* Main */}
            <div>
              <p className="font-semibold">Main:</p>
              <p className="opacity-80 mt-0.5">{mainText}</p>
            </div>

            {/* Dessert */}
            <div>
              <p className="font-semibold">Dessert:</p>
              <p className="opacity-80 mt-0.5">{dessertText}</p>
            </div>

            {/* Allergies */}
            <div>
              <p className="font-semibold">Allergies:</p>
              <p className="opacity-80 mt-0.5">
                {rsvp.allergies === "yes"
                  ? rsvp.allergy_notes || "(not specified)"
                  : "None"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE BUTTON */}
      <Button
        variant="destructive"
        className="
          mt-2 w-[160px]
          rounded-lg font-metropolis tracking-wide text-sm
        "
        onClick={() => mutation.mutate(rsvp.id)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete RSVP"}
      </Button>
    </div>
  )
}
