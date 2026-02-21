"use client";
import PassengerCard from "@/app/Passenger/PassengerCard";
import { useCheckin } from "@/context/CheckinContext";
import { Passenger } from "@/types/checkin";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

const CheckinSelectPage = () => {
  const router = useRouter();
  const { booking, setSelectedPassengers } = useCheckin();
  const passengers = useMemo(() => booking?.passengers ?? [], [booking]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const anySelected = Object.values(selected).some(Boolean);
  const allSelected =
    passengers.length > 0 && passengers.every((_, i) => selected[i]);

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected({});
    } else {
      setSelected(Object.fromEntries(passengers.map((_, i) => [i, true])));
    }
  }, [allSelected, passengers.length]);

  const togglePassenger = useCallback((index: number) => {
    setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const handleNext = useCallback(() => {
    const selectedList = passengers.filter((_, i) => selected[i]);
    setSelectedPassengers(selectedList);

    router.push("/checkin/details");
  }, [passengers, selected, setSelectedPassengers, router]);

  useEffect(() => {
    if (!booking) {
      router.replace('/checkin/start');
    }
  }, [booking, router]);


  const handleBack = () => {
    router.push("/checkin/start");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Select Passengers
          </h3>
          <p className="text-sm text-slate-600 mt-1.5">
            Choose passengers for check-in
          </p>
        </div>

        <div className="p-4 space-y-3">
          {passengers.map((passenger, index) => (
            <PassengerCard
              key={`${passenger.firstName}-${passenger.lastName}-${index}`}
              passenger={passenger}
              isSelected={!!selected[index]}
              onToggle={() => togglePassenger(index)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Floating Select All button - subtle secondary action */}
      <div className="fixed bottom-20 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-3xl mx-auto px-4 flex justify-end">
          <button
            type="button"
            onClick={toggleAll}
            className="pointer-events-auto px-4 py-2.5 mb-2 bg-white/95 backdrop-blur-sm text-slate-600 rounded-xl shadow-md border border-slate-200 font-medium text-sm hover:bg-white hover:text-slate-700 hover:border-slate-300 active:scale-95 transition-all touch-manipulation flex items-center gap-2"
          >
            {allSelected ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Clear All</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Select All</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] touch-manipulation"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!anySelected}
            onClick={handleNext}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(CheckinSelectPage);
