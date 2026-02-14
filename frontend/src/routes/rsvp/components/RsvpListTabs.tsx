import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router"

const RsvpListTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const rsvpView = (searchParams.get("view") || "weddingDay")

  const handleTabChange = (value: string) => {
    if (value === "nightBefore" || value === "weddingDay") {
      setSearchParams({ view: value })
    }
  }

  return (
    <div className="flex justify-center pt-5">
      <Tabs value={rsvpView} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="weddingDay">Wedding Day</TabsTrigger>
          <TabsTrigger value="nightBefore">Night before</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default RsvpListTabs
