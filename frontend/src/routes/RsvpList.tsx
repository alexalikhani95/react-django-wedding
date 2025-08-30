import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

type Rsvp = {
  id: number
  name: string;
  attending: string;
  starter: string;
  main: string;
  dessert: string;
  allergies: string;
  created_at: string;
}


export const RsvpList = () => {
  const queryClient = useQueryClient();


  const { data: rsvps, isLoading, isError } = useQuery({
    queryKey: ["rsvps"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/rsvp/list/")
      if (!res.ok) throw new Error("Failed to fetch RSVPs")
      return res.json()
    },
  })


  const mutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://127.0.0.1:8000/api/rsvp/${id}/delete/`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete RSVP")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] })
      toast.success('Deleted Rsvp!')
    },
    onError: () => {
      toast.error('Error deleting Rsvp!')
    }
  })

  if (isLoading) return <p>Loading Rsvps...</p>
  if (isError) return <p>Error Loading Rsvps</p>

  return (
    <div className="flex justify-center items-center gap-4">
      {rsvps.map((rsvp: Rsvp) => (
        <div key={rsvp.id} className="border-4 border-grey-500 p-4">
          <p> Name: {rsvp.name}</p>
          <p>Attending: {rsvp.attending}</p>
          {rsvp.attending === 'yes' &&
            <><p>Starter: {rsvp.starter}</p>
              <p>Main: {rsvp.main}</p>
              <p>Desert: {rsvp.dessert}</p>
              <p>Allergies: {rsvp.allergies}</p>
            </>
          }
          <Button variant={"destructive"} onClick={() => mutation.mutate(rsvp.id)}>Delete RSVP</Button>
        </div>
      ))}
    </div>
  )
}