'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Booking, Passenger, PassengerExtraDetails } from '../types/checkin';

export type CheckinState = {
  booking: Booking | null;
  selectedPassengers: Passenger[];
  details: Record<string, PassengerExtraDetails>;
};

type Ctx = CheckinState & {
  setBooking: (b: Booking | null) => void;
  setSelectedPassengers: (p: Passenger[]) => void;
  setDetails: React.Dispatch<React.SetStateAction<Record<string, PassengerExtraDetails>>>;
  reset: () => void;
};

const CheckinContext = createContext<Ctx | undefined>(undefined);

export function CheckinProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
  const [details, setDetails] = useState<Record<string, PassengerExtraDetails>>({});

  const value = useMemo(
    () => ({
      booking,
      selectedPassengers,
      details,
      setBooking,
      setSelectedPassengers,
      setDetails,
      reset: () => {
        setBooking(null);
        setSelectedPassengers([]);
        setDetails({});
      },
    }),
    [booking, selectedPassengers, details]
  );

  return <CheckinContext.Provider value={value}>{children}</CheckinContext.Provider>;
}

export function useCheckin() {
  const ctx = useContext(CheckinContext);
  if (!ctx) throw new Error('useCheckin must be used within CheckinProvider');
  return ctx;
}
