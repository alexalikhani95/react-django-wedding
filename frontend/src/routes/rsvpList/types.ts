// types.ts
export type StarterCode = "tomato" | "antipasti"
export type MainCode = "croute" | "risotto"
export type DessertCode = "tart" | "jelly"

export type Rsvp = {
  id: number
  first_name: string
  last_name: string
  night_before: "accept" | "decline" | null
  wedding_day: "accept" | "decline" | null

  starter: StarterCode | null
  main: MainCode | null
  dessert: DessertCode | null

  allergies: "none" | "yes" | null
  allergy_notes: string | null
  created_at: string
}
