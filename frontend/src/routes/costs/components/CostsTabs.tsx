import { useSearchParams } from "react-router"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CostsTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const costsView = searchParams.get("view") || "unpaid"

  const handleTabChange = (value: string) => {
    if (value === "paid" || value === "unpaid") {
      setSearchParams({ view: value })
    }
  }

  return (
    <div className="flex justify-center pt-5">
      <Tabs value={costsView} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="unpaid">Not Fully Paid</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default CostsTabs
