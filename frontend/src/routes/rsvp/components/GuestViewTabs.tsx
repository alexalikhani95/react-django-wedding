import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type GuestView = "nightBefore" | "weddingDay"

type Props = {
  guestView: GuestView
  setGuestView: React.Dispatch<React.SetStateAction<GuestView>>
}

const GuestViewTabs = ({ guestView, setGuestView }: Props) => {
  const handleTabChange = (value: string) => {
    if (value === "nightBefore" || value === "weddingDay") {
      setGuestView(value)
    }
  }

  return (
    <div className="flex justify-center pt-5">
      <Tabs value={guestView} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="nightBefore">Night before guest view</TabsTrigger>
          <TabsTrigger value="weddingDay">Wedding day guest view</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default GuestViewTabs
