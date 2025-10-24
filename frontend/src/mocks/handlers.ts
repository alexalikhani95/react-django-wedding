import { http, HttpResponse } from 'msw'
const API_URL = import.meta.env.VITE_API_URL;

const mockGuests = [
  { id: 1, name: 'Alice', party: 'bride', seat_number: 1, table: { id: 1, name: 'A' } },
  { id: 2, name: 'Bob', party: 'groom', seat_number: 2, table: { id: 2, name: 'B' } },
  { id: 3, name: 'Saka', party: 'groom', seat_number: null, table: null },
  { id: 3, name: 'William Saliba', party: 'groom', seat_number: null, table: null },

]

const mockRsvps = [
    {
      id: 18,
      name: "Eze",
      attending: "yes",
      starter: "soup",
      main: "salad",
      dessert: "cake",
      allergies: "",
      created_at: "2025-09-11T20:23:21.101297Z",
    },
    {
      id: 20,
      name: "Saka",
      attending: "no",
      starter: "soup",
      main: "lentils",
      dessert: "cake",
      allergies: "",
      created_at: "2025-09-12T18:34:32.116616Z",
    },
];

const mockTables = [
  {
    id: 1,
    name: 'Table 1',
    seats: Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, guest_id: null })),
  },
  {
    id: 2,
    name: 'Table 2',
    seats: Array.from({ length: 10 }).map((_, i) => ({ id: i + 11, guest_id: null })),
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
]