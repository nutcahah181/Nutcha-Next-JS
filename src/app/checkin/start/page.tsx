"use client";

import CheckinForm from "@/components/checkin/CheckinForm";
import { useRouter } from "next/navigation";
import { useCheckin } from "@/context/CheckinContext";
import { checkinApi } from "@/services/checkinApi";
import { CheckinPayload } from "@/components/checkin/CheckinForm";
import { JourneySegment } from "@/types/checkin";

export default function CheckinStartPage() {
  const router = useRouter();
  const { setBooking } = useCheckin();

  const handleSubmit: (payload: CheckinPayload) => Promise<void> = async (
    payload,
  ) => {
    const booking = await checkinApi.startCheckin(
      payload.bookingRef,
      payload.lastName,
    );

    const result = await checkinApi.startCheckin(
      payload.bookingRef,
      payload.lastName,
    );

    setBooking({
      ...result,
      journeys: result.journeys.map((journey) => ({
        ...journey,
        segmentStatus: journey.segmentStatus as JourneySegment["segmentStatus"],
      })),
    });
    router.push("/checkin/select");
  };

  return <CheckinForm onSubmit={handleSubmit} />;
}
