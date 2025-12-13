export type Inputs = {
  firstName: string
  lastName: string

  nightBefore: "accept" | "decline" | null
  weddingDay: "accept" | "decline" | null

  starter: "tomato" | "antipasti" | null
  main: "croute" | "risotto" | null
  dessert: "tart" | "jelly" | null

  allergies: "none" | "yes" | null
  allergyNotes: string
}
