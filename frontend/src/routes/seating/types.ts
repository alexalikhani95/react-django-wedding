export type Seat = {
  id: number
  seat_number: number
  guest_id: number | null
}

export type Table = {
  id: number
  name: string
  capacity: number
  seats: Seat[]
}

export type Inputs = {
  name: string
}
