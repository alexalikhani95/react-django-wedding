import { useQuery } from "@tanstack/react-query"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const API_URL = import.meta.env.VITE_API_URL

type GuestName = {
  first_name: string
  last_name: string
}

type MealCount = {
  starter: string
  main: string
  dessert: string
  count: number
  names: GuestName[]
}

const getMealName = (type: string, value: string): string => {
  const names: Record<string, Record<string, string>> = {
    starter: {
      tomato: "Isle of Wight heritage tomatoes",
      antipasti: "Vegetable antipasti board",
    },
    main: {
      croute: "Butternut squash en croûte",
      risotto: "Spelt leek & pea risotto",
    },
    dessert: {
      tart: "Chocolate tart",
      jelly: "Elderflower jelly",
    },
  }
  return names[type]?.[value] || value
}

export const MealCounts = () => {
  const [expandedCombos, setExpandedCombos] = useState<Set<number>>(new Set())

  const {
    data: mealCounts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meal-counts"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/rsvp/meal-counts/`)
      if (!res.ok) throw new Error("Failed to fetch meal counts")
      return res.json() as Promise<MealCount[]>
    },
    refetchInterval: 5000, // Refetch every 5 seconds to auto-update
  })

  const toggleExpanded = (index: number) => {
    setExpandedCombos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  if (isError)
    return (
      <div className="min-h-screen p-10 bg-[#F6F2E9] font-metropolis">
        <p className="text-center p-6 text-red-600 text-sm">
          Error loading meal counts.
        </p>
      </div>
    )

  if (isLoading)
    return (
      <div className="min-h-screen p-10 bg-[#F6F2E9] font-metropolis">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    )

  const totalCount =
    mealCounts?.reduce((sum, combo) => sum + combo.count, 0) || 0

  return (
    <div className="min-h-screen p-10 bg-[#F6F2E9] font-metropolis">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-['ADega Serif'] text-forest-green mb-2">
            Meal Combination Counts
          </h1>
          <p className="text-forest-green/70">
            Total attending: <span className="font-semibold">{totalCount}</span>
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mealCounts?.map((combo, index) => {
            const isExpanded = expandedCombos.has(index)
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-forest-green/20"
              >
                <div className="mb-4">
                  <div className="text-5xl font-bold text-forest-green mb-2">
                    {combo.count}
                  </div>
                  <div className="text-xs text-forest-green/60 uppercase tracking-wide">
                    Combination {index + 1}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-forest-green mb-4">
                  <div>
                    <span className="font-semibold">Starter:</span>{" "}
                    {getMealName("starter", combo.starter)}
                  </div>
                  <div>
                    <span className="font-semibold">Main:</span>{" "}
                    {getMealName("main", combo.main)}
                  </div>
                  <div>
                    <span className="font-semibold">Dessert:</span>{" "}
                    {getMealName("dessert", combo.dessert)}
                  </div>
                </div>

                {combo.count > 0 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => toggleExpanded(index)}
                      className="w-full text-forest-green border-forest-green hover:bg-forest-green hover:text-beige"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Hide Names
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show Names ({combo.count})
                        </>
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-forest-green/20">
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {combo.names.map((name, nameIndex) => (
                            <div
                              key={nameIndex}
                              className="text-sm text-forest-green py-1"
                            >
                              {name.first_name} {name.last_name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
