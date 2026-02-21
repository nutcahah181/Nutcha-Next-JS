"use client";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useModal } from "@/components/ModalProvider";
import { useCheckin } from "@/context/CheckinContext";
import { CheckinPayload } from "@/components/checkin/CheckinForm";
import { checkinApi } from "@/services/checkinApi";
import { JourneySegment, Passenger } from "@/types/checkin";
import { ApiError } from "@/services/checkin";
import MobileBottomNav from "@/components/nav/MobileBottomNav";

const STEPS = [
  { path: "/checkin/start", title: "Find Booking", step: 1 },
  { path: "/checkin/select", title: "Select Passengers", step: 2 },
];

const TOTAL_STEPS = STEPS.length;

export default function CheckinFlow({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const {
    booking,
    setBooking,
    selectedPassengers,
    setSelectedPassengers,
    setDetails,
    reset,
  } = useCheckin();

  const pathname = usePathname();
  const currentStepInfo = useMemo(() => {
    return STEPS.find((s) => s.path === pathname) ?? STEPS[0];
  }, [pathname]);

  const progress = useMemo(() => {
    return (currentStepInfo.step / TOTAL_STEPS) * 100;
  }, [currentStepInfo.step]);

  const showErrorModal = useCallback(
    (title: string, message: string) => {
      openModal({
        title,
        message,
        intent: "error",
        closeLabel: "OK",
        icon: <X className="w-6 h-6 text-red-500" />,
      } as any); // Workaround for icon property if not in types, but ModalProvider has content/message
    },
    [openModal],
  );

  const handleStartCheckin = useCallback(
    async (payload: CheckinPayload) => {
      try {
        const result = await checkinApi.startCheckin(
          payload.bookingRef,
          payload.lastName,
        );
        setBooking({
          ...result,
          journeys: result.journeys.map((journey) => ({
            ...journey,
            segmentStatus:
              journey.segmentStatus as JourneySegment["segmentStatus"],
          })),
        });
        router.push("/checkin/select");
      } catch (error) {
        console.error("Check-in start failed:", error);
        const apiError = error as ApiError;
        showErrorModal(
          "Check-in Error",
          apiError.userMessage ||
            apiError.message ||
            "An unexpected error occurred. Please try again.",
        );
      }
    },
    [router, setBooking, showErrorModal],
  );

  const handlePassengerSelect = useCallback(
    (passengers: Passenger[]) => {
      setSelectedPassengers(passengers);
      // If no passengers need details, skip to DG page
      if (passengers.every((p) => p.paxType === "INF")) {
        router.push("/checkin/dg");
      } else {
        router.push("/checkin/details");
      }
    },
    [router, setSelectedPassengers],
  );

  const passengerSelectHandlers = useMemo(
    () => ({
      onNext: handlePassengerSelect,
      onBack: () => router.push("/checkin"),
    }),
    [handlePassengerSelect, router],
  );

  const handleCancel = useCallback(() => {
    openModal({
      title: 'Cancel Check-in?',
      message: 'Your progress will be lost. Are you sure you want to cancel?',
      intent: 'warning',
      closeLabel: 'Continue to Check-in',
      footer: (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              closeModal();
              reset();
              window.location.href = "/";
              router.refresh();
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      ),
    });
  }, [openModal, closeModal, reset, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header content */}
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 -ml-2 text-slate-600 hover:text-slate-800 active:bg-slate-100 rounded-lg touch-manipulation transition-colors"
                aria-label="Cancel check-in"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base font-semibold text-slate-800">
                  Check-in
                </h1>
                <p className="text-xs text-slate-500">
                  {currentStepInfo.title}
                </p>
              </div>
            </div>

            <span className="text-xs font-medium text-slate-500">
              Step {currentStepInfo.step} of {TOTAL_STEPS}
            </span>
          </div>

          {/* Modern progress bar */}
          {/* Modern progress bar with slot dividers */}
          <div className="relative h-1.5 bg-gradient-to-r from-slate-100 to-slate-50 overflow-hidden">
            {/* Progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-sky-600 shadow-sm transition-all duration-500 ease-out animate-pulse-glow"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            {/* Slot dividers */}
            {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-gray-300/70"
                style={{ left: `${((i + 1) / TOTAL_STEPS) * 100}%` }}
              />
            ))}

            {/* Waiting indicator - glowing gradient edge */}
            {progress < 100 && (
              <div
                className="absolute inset-y-0 w-12 transition-all duration-500 ease-out pointer-events-none"
                style={{ left: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/60 via-sky-500/40 to-transparent animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-transparent blur-sm" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 flex justify-center pt-16">
        <div className="w-full max-w-2xl px-6">{children}</div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
