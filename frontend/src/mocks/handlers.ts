import { http, HttpResponse } from 'msw'
const API_URL = import.meta.env.VITE_API_URL;

const mockGuests = [
  { id: 1, name: 'Alice', party: 'bride', seat_number: 1, table: { id: 1, name: 'A' } },
  { id: 2, name: 'Bob', party: 'groom', seat_number: 2, table: { id: 2, name: 'B' } },
]
 
export const handlers = [
  http.get(`${API_URL}/api/guests/list/`, () => {
    return HttpResponse.json(mockGuests)
  }),
]