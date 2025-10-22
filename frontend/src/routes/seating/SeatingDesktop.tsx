import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { SearchGuests } from "@/components/SearchGuests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGuests } from "@/guests/queries";
import type { Guest } from "../Guests";
import {
  useAddTable,
  useAssignSeat,
  useDeleteTable,
  useRemoveFromSeat,
} from "./mutations";
import { useTables } from "./queries";
import type { Inputs, Seat, Table } from "./types";

const GuestItem = ({ guest }: { guest: Guest }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `guest-${guest.id}`,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white border border-gray-100 shadow-sm rounded-xl p-3
            text-green-900 text-sm text-center select-none
            cursor-grab active:cursor-grabbing
            hover:shadow-md hover:-translate-y-0.5 transition-all duration-150
            ${isDragging ? "opacity-60" : ""}`}
    >
      {guest.name}
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="flex gap-8 h-[calc(100vh-180px)] overflow-hidden px-4">
      {/* Guests Skeleton */}
      <div className="sticky top-4 self-start min-w-[230px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <Skeleton className="h-5 w-20 mx-auto mb-4" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Tables Skeleton */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 auto-rows-min items-start pt-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Left seat */}
              <Skeleton className="h-[50px] w-[80px] rounded-lg" />

              <div className="flex flex-col flex-1">
                {/* Top seats */}
                <div className="flex pb-1 gap-1">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton
                      key={j}
                      className="h-[50px] w-[80px] rounded-lg"
                    />
                  ))}
                </div>

                {/* Table name placeholder */}
                <Skeleton className="h-[130px] w-full rounded-lg" />

                {/* Bottom seats */}
                <div className="flex pt-1 gap-1">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton
                      key={j}
                      className="h-[50px] w-[80px] rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Right seat */}
              <Skeleton className="h-[50px] w-[80px] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SeatBox = ({
  seat,
  guests,
  onRemoveGuest,
}: {
  seat: Seat;
  guests: Guest[];
  onRemoveGuest?: (guestId: number) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: `seat-${seat.id}` });
  const guest = guests.find((g) => g.id === seat.guest_id);

  if (guest) {
    return (
      <div
        ref={setNodeRef}
        className={`bg-white border border-gray-200 cursor-pointer p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[80px] flex items-center justify-center ${isOver ? "border-green-500" : ""}`}
      >
        <p>{guest.name}</p>
        {onRemoveGuest && (
          <button
            onClick={() => onRemoveGuest(guest.id)}
            className="absolute top-[-10px] right-1 p-1 bg-red-50 rounded-full hover:bg-red-100 cursor-pointer"
            title="Remove guest"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div
        ref={setNodeRef}
        className={`bg-gray-400 border border-dashed p-3 mx-1 rounded-lg shadow-md h-[50px] relative w-[80px] flex items-center justify-center ${isOver ? "border-dashed" : ""}`}
      >
        Empty
      </div>
    );
  }
};

export const SeatingDesktop = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearchChange = (value: string) => {
    if (value) setSearchParams({ search: value });
    else setSearchParams({});
  };

  const {
    data: guests,
    isLoading: isLoadingGuests,
    isError: isErrorGuests,
  } = useGuests();
  const {
    data: tables,
    isLoading: tablesLoading,
    isError: isErrorTables,
  } = useTables();

  // Mutations
  const addMutation = useAddTable();
  const deleteMutation = useDeleteTable();
  const removeFromSeatMutation = useRemoveFromSeat();
  const assignSeatMutation = useAssignSeat();

  const onSubmit = handleSubmit((data) => {
    addMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  });

  if (isErrorGuests || isErrorTables) return <p>Error loading data</p>;

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    if (id.startsWith("guest-")) {
      const guestId = parseInt(id.replace("guest-", ""));
      const guest = guests?.find((g) => g.id === guestId) || null;
      setActiveGuest(guest);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (!activeId.startsWith("guest-") || !overId.startsWith("seat-")) return;

    const guestId = parseInt(activeId.replace("guest-", ""));
    const seatId = parseInt(overId.replace("seat-", ""));
    assignSeatMutation.mutate({ guestId, seatId });
  };

  const handleRemoveGuest = (guestId: number) => {
    removeFromSeatMutation.mutate(guestId, {
      onSuccess: () => {
        setActiveGuest(null);
      },
    });
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl mb-5">Seating</h1>

      {/* Add Table Form */}
      <div className="w-full flex justify-center">
        <form
          onSubmit={onSubmit}
          className="mb-6 bg-white rounded-lg border p-4 shadow-sm w-[500px]"
        >
          <h2 className="text-sm font-semibold mb-3">Add Table</h2>
          <div className="flex gap-2">
            <Input
              {...register("name", { required: true })}
              placeholder="Table name"
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={
                addMutation.isPending || isLoadingGuests || tablesLoading
              }
              className="shrink-0"
            >
              {addMutation.isPending ? "..." : "Add"}
            </Button>
          </div>
        </form>
      </div>

      {isLoadingGuests || tablesLoading ? (
        <LoadingSkeleton />
      ) : (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-8 h-[calc(100vh-180px)] overflow-hidden px-4">
            {/* Guests List */}
            <div className="sticky top-4 self-start min-w-[230px]">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <h2 className="text-lg text-gray-700 mb-4 text-center">
                  Guests
                </h2>

                <div className="mb-5">
                  <SearchGuests value={search} onChange={handleSearchChange} />
                </div>

                <div className="flex flex-col gap-3">
                  {guests?.filter((guest) =>
                    guest.name.toLowerCase().includes(search.toLowerCase()),
                  ).length ? (
                    guests
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .filter(
                        (guest) => !guest.table && guest.id !== activeGuest?.id,
                      )
                      .map((guest) => (
                        <GuestItem key={guest.id} guest={guest} />
                      ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center">
                      {search.length > 0
                        ? "No guests match your search."
                        : "No guests yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tables */}
            <div className="flex-1 overflow-y-auto pr-2">
              {/* auto-fit + minmax(500px, 1fr) ensures each table block is at least 500px wide and Automatically wraps down to a new row instead of squeezing and overlapping */}
              <div className="grid gap-10 auto-rows-min items-start pt-10 grid-cols-[repeat(auto-fit,minmax(500px,1fr))]">
                {tables?.map((table: Table) => {
                  const seats = table.seats;
                  return (
                    <div className="flex items-center" key={table.id}>
                      <SeatBox
                        seat={seats[0]}
                        guests={guests || []}
                        onRemoveGuest={handleRemoveGuest}
                      />
                      <div className="flex flex-col">
                        <div className="flex pb-1">
                          {seats.slice(1, 5).map((seat) => (
                            <SeatBox
                              key={seat.id}
                              seat={seat}
                              guests={guests || []}
                              onRemoveGuest={handleRemoveGuest}
                            />
                          ))}
                        </div>
                        <div className="p-5 rounded bg-yellow-700 w-full h-[130px] text-center text-white gap-5 flex justify-center items-center">
                          {table.name}
                          <Button
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(table.id)}
                          >
                            <Trash2Icon />
                          </Button>
                        </div>
                        <div className="flex pt-1">
                          {seats.slice(5, 9).map((seat) => (
                            <SeatBox
                              key={seat.id}
                              seat={seat}
                              guests={guests || []}
                              onRemoveGuest={handleRemoveGuest}
                            />
                          ))}
                        </div>
                      </div>
                      <SeatBox
                        seat={seats[9]}
                        guests={guests || []}
                        onRemoveGuest={handleRemoveGuest}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drag overlay */}
          <DragOverlay>
            {activeGuest ? (
              <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-md w-[80px] text-center">
                {activeGuest.name}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};
