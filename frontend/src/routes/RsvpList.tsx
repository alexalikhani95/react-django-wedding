import { useQuery } from "@tanstack/react-query"

type Rsvp = {
  id: string;
  name: string;
  attending: string;
  starter: string;
  main: string;
  desert: string;
  allergies: string;
  createdAt: string;
}


export const RsvpList = () => {

  const { data: rsvps, isLoading, isError } = useQuery({
    queryKey: ["rsvps"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/rsvp/list/")
      if (!res.ok) throw new Error("Failed to fetch RSVPs")
      return res.json()
    },
  })

  if (isLoading) return <p>Loading Rsvps...</p>
  if (isError) return <p>Error Loading Rsvps</p>

  return (
    <div className="flex justify-center items-center gap-4">
      {rsvps.map((rsvp: Rsvp) => (
        <div className="border-4 border-grey-500 p-4">
          {rsvp.name}
        </div>
      ))}
    </div>
  )
}