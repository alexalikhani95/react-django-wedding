import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Trash2Icon,
  UserMinus,
  UserPlus,
  X,
} from "lucide-react"
import { useSearchParams } from "react-router"
import { SearchGuests } from "@/components/SearchGuests"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useGuests } from "@/guests/queries"
import type { Guest } from "../guests"
import {
  useAddTable,
  useAssignSeat,
  useDeleteTable,
  useRemoveFromSeat,
} from "./mutations"
import { useTables } from "./queries"
import type { Inputs, Table } from "./types"

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {/* Unassigned Guests Skeleton */}
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm space-y-3">
      <Skeleton className="h-5 w-40" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-lg" />
        ))}
      </div>
    </div>

    {/* Tables Skeleton */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <div className="p-3 border-t border-border bg-muted flex justify-center gap-2">
          {Array.from({ length: 6 }).map((_, j) => (
            <Skeleton key={j} className="h-6 w-10 rounded-md" />
          ))}
        </div>
      </div>
    ))}
  </div>
)

export const SeatingMobile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Inputs>()
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [expandedTable, setExpandedTable] = useState<number | null>(null)
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(
    null,
  )
  const [confirmingGuestToRemove, setConfirmingGuestToRemove] = useState<{
    guest: Guest
    tableId: number
  } | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get("search") || ""

  const handleSearchChange = (value: string) => {
    if (value) setSearchParams({ search: value })
    else setSearchParams({})
  }

  const { data: guests, isLoading: isLoadingGuests, isError: isErrorGuests } =
    useGuests()
  const { data: tables, isLoading: tablesLoading, isError: isErrorTables } =
    useTables()

  const addMutation = useAddTable()
  const deleteMutation = useDeleteTable()
  const removeFromSeatMutation = useRemoveFromSeat()
  const assignSeatMutation = useAssignSeat()

  const onSubmit = handleSubmit((data) => {
    addMutation.mutate(data)
    reset()
  })

  const handleDeleteClick = (tableId: number, tableName: string) => {
    setConfirmingGuestToRemove(null)
    if (confirmingDeleteId === tableId) {
      deleteMutation.mutate(tableId, {
        onSuccess: () => {
          toast.success(`${tableName} deleted`)
          setConfirmingDeleteId(null)
        },
      })
    } else {
      setConfirmingDeleteId(tableId)
    }
  }

  const handleGuestSelect = (guest: Guest) => {
    setConfirmingDeleteId(null)
    setConfirmingGuestToRemove(null)
    setSelectedGuest((prev) => (prev?.id === guest.id ? null : guest))
  }

  const handleSeatClick = (
    tableId: number,
    seatId: number,
    guestId: number | null,
  ) => {
    setConfirmingDeleteId(null)
    if (guestId) {
      const guest = guests?.find((g) => g.id === guestId)
      if (guest) {
        setConfirmingGuestToRemove({ guest, tableId })
        setSelectedGuest(null)
      }
      return
    }

    setConfirmingGuestToRemove(null)

    if (!selectedGuest) {
      toast.info("Select a guest first, then tap an empty seat to assign them")
      return
    }

    assignSeatMutation.mutate(
      { guestId: selectedGuest.id, seatId },
      { onSuccess: () => toast.success("Guest assigned to seat") },
    )
    setSelectedGuest(null)
  }

  const confirmRemoveGuest = (guestId: number) => {
    removeFromSeatMutation.mutate(guestId, {
      onSuccess: () => {
        toast.success("Guest removed from seat")
        setConfirmingGuestToRemove(null)
      },
    })
  }

  if (isErrorGuests || isErrorTables)
    return <p className="text-center text-destructive p-4">Error loading data</p>

  const unassignedGuests =
    guests?.filter(
      (guest) =>
        !guest.table && guest.name.toLowerCase().includes(search.toLowerCase()),
    ) || []

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto gap-5 text-foreground">
      <h1 className="text-2xl font-bold text-center">Seating</h1>

      {/* Add Table Form */}
      <form
        onSubmit={onSubmit}
        className="mb-6 bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm"
      >
        <h2 className="text-sm font-semibold mb-3">Add Table</h2>
        <div className="flex gap-2">
          <Input
            {...register("name", { required: true })}
            aria-label="Table name"
            placeholder="Table name"
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={
              isLoadingGuests ||
              tablesLoading ||
              addMutation.isPending ||
              !isValid
            }
            className="shrink-0"
          >
            {addMutation.isPending ? "..." : "Add"}
          </Button>
        </div>
      </form>

      {/* Loading or Main Content */}
      {isLoadingGuests || tablesLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Unassigned Guests */}
          {unassignedGuests.length > 0 && (
            <div className="flex flex-col bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm gap-3">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Unassigned Guests ({unassignedGuests.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Tap a guest, then tap an empty seat to assign
              </p>
              <SearchGuests value={search} onChange={handleSearchChange} />

              <div className="flex flex-wrap gap-2">
                {unassignedGuests
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((guest) => (
                    <button
                      key={guest.id}
                      onClick={() => handleGuestSelect(guest)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all ${selectedGuest?.id === guest.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card text-card-foreground border-border hover:border-primary"
                        }`}
                    >
                      {guest.name}
                    </button>
                  ))}
              </div>

              {selectedGuest && (
                <div className="mt-3 p-2 bg-accent/20 rounded text-sm flex items-center justify-between">
                  <div className="font-medium text-accent-foreground">
                    Selected: {selectedGuest.name}
                  </div>
                  <button
                    onClick={() => setSelectedGuest(null)}
                    className="text-accent-foreground hover:opacity-80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tables List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">
              Tables ({tables?.length || 0})
            </h2>
            {tables?.map((table: Table) => {
              const isExpanded = expandedTable === table.id
              const occupiedSeats = table.seats.filter(
                (seat) => seat.guest_id !== null,
              ).length
              const isConfirmingTableDelete = confirmingDeleteId === table.id
              const activeDeletion =
                confirmingGuestToRemove &&
                confirmingGuestToRemove.tableId === table.id

              const leftSeat = table.seats[0]
              const rightSeat = table.seats[9]
              const topSeats = table.seats.slice(1, 5)
              const bottomSeats = table.seats.slice(5, 9)

              const renderSeat = (seat: any) => {
                const guest = guests?.find((g) => g.id === seat.guest_id)
                const isGuestConfirming =
                  guest && confirmingGuestToRemove?.guest.id === guest.id
                return (
                  <button
                    key={seat.id}
                    onClick={() =>
                      handleSeatClick(table.id, seat.id, seat.guest_id)
                    }
                    className={`h-12 rounded-lg border-2 text-xs flex flex-col items-center justify-center p-1 transition-all ${!guest
                        ? selectedGuest
                          ? "border-dashed border-primary bg-muted hover:bg-muted/70"
                          : "border-dashed border-border bg-muted"
                        : isGuestConfirming
                          ? "border-solid border-destructive bg-destructive/10 text-destructive"
                          : "border-solid border-primary bg-primary/10 hover:bg-primary/20 text-primary-foreground"
                      }`}
                  >
                    <div className="font-medium text-center leading-tight text-[10px] truncate w-full px-1">
                      {guest
                        ? isGuestConfirming
                          ? "Remove?"
                          : guest.name
                        : "Empty"}
                    </div>
                  </button>
                )
              }

              return (
                <div
                  key={table.id}
                  className="bg-card text-card-foreground rounded-lg border border-border shadow-sm overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setExpandedTable(isExpanded ? null : table.id)
                        setConfirmingDeleteId(null)
                        if (confirmingGuestToRemove?.tableId !== table.id) {
                          setConfirmingGuestToRemove(null)
                        }
                      }}
                      className="flex-1 p-4 flex items-center justify-between hover:bg-muted text-left"
                    >
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold">{table.name}</p>
                        <div className="text-left">
                          <p className="text-xs text-muted-foreground">
                            {occupiedSeats}/{table.capacity} seats filled
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    <Button
                      variant={
                        isConfirmingTableDelete ? "default" : "destructive"
                      }
                      size="sm"
                      className={`m-2 transition-colors duration-200 ${isConfirmingTableDelete
                          ? "bg-accent hover:bg-accent/80"
                          : ""
                        }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(table.id, table.name)
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      {isConfirmingTableDelete ? (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Confirm?</span>
                        </div>
                      ) : (
                        <Trash2Icon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {isConfirmingTableDelete && (
                    <p className="text-xs text-center text-accent pb-2">
                      Tap "Confirm?" again to delete {table.name}.
                    </p>
                  )}

                  {isExpanded && (
                    <div className="p-4 border-t border-border bg-muted/50">
                      {activeDeletion && (
                        <div className="p-3 mb-4 bg-destructive/10 border border-destructive/50 rounded-lg shadow-inner">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <UserMinus className="w-4 h-4 text-destructive shrink-0" />
                              <p className="text-sm font-medium text-destructive">
                                Remove{" "}
                                <span className="font-bold">
                                  {confirmingGuestToRemove!.guest.name}
                                </span>
                                ?
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setConfirmingGuestToRemove(null)}
                                className="h-7 text-xs"
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  confirmRemoveGuest(
                                    confirmingGuestToRemove!.guest.id,
                                  )
                                }
                                disabled={removeFromSeatMutation.isPending}
                                className="h-7 text-xs"
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-stretch gap-2">
                        <div className="flex items-center">{renderSeat(leftSeat)}</div>
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="grid grid-cols-4 gap-1">
                            {topSeats.map(renderSeat)}
                          </div>

                          <div className="bg-primary rounded-lg py-4 px-3">
                            <p className="text-primary-foreground text-center font-semibold text-sm">
                              {table.name}
                            </p>
                          </div>

                          <div className="grid grid-cols-4 gap-1">
                            {bottomSeats.map(renderSeat)}
                          </div>
                        </div>
                        <div className="flex items-center">{renderSeat(rightSeat)}</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {(!tables || tables.length === 0) && (
              <p className="text-center text-muted-foreground text-sm py-8">
                No tables yet. Add one above to get started.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
