import { HttpResponse, http } from "msw"

const API_URL = import.meta.env.VITE_API_URL

import { mockGuests } from "@/routes/guests/mocks"

const mockRsvps = [
  {
    id: 18,
    first_name: "Ebereche Eze",
    last_name: "Test",
    wedding_day: "accept",
    night_before: "accept",
    starter: "tomato",
    main: "croute",
    dessert: "tart",
    allergies: "none",
    allergy_notes: null,
    created_at: "2025-09-11T20:23:21.101297Z",
  },
  {
    id: 20,
    first_name: "Bukayo Saka",
    last_name: "Test",
    wedding_day: "decline",
    night_before: "decline",
    starter: null,
    main: null,
    dessert: null,
    allergies: "none",
    allergy_notes: null,
    created_at: "2025-09-12T18:34:32.116616Z",
  },
]

const mockTables = [
  {
    id: 1,
    name: "Table 1",
    seats: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      guest_id: null,
    })),
  },
  {
    id: 2,
    name: "Table 2",
    seats: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 11,
      guest_id: null,
    })),
  },
]

const mockCosts = [
  {
    id: 1,
    name: "Venue",
    total_amount: 5000,
    paid_amount: 5000,
    remaining_amount: 0,
    is_fully_paid: true,
  },
  {
    id: 2,
    name: "Catering",
    total_amount: 3000,
    paid_amount: 1000,
    remaining_amount: 2000,
    is_fully_paid: false,
  },
]

export const handlers = [
  http.get(`${API_URL}/api/guests/list/`, () => {
    return HttpResponse.json(mockGuests)
  }),
  http.get(`${API_URL}/api/rsvp/list/`, () => {
    return HttpResponse.json(mockRsvps)
  }),
  http.get(`${API_URL}/api/tables/list/`, () => {
    return HttpResponse.json(mockTables)
  }),
  http.get(`${API_URL}/api/costs/list/`, () => {
    return HttpResponse.json(mockCosts)
  }),
]
