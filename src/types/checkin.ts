export type JourneySegment = {
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    time: string;
    terminal?: string;
  };
  segmentStatus: 'SCHEDULED' | 'CHECKIN_OPEN' | 'CLOSED';
  marketingCarrier: string;
  operatingCarrier: string;
  terminal?: string;
  gate?: string;
};

export enum PaxType {
  ADT = 'ADT',
  CHD = 'CHD',
  INF = 'INF',
}

export type Passenger = {
  id: string;
  firstName: string;
  lastName: string;
  paxType: PaxType;
  seat?: string | null;
  boardingZone?: string | null;
  boardingSequence?: string | null;
  checkedIn: boolean;
};

export type Booking = {
  checkinKey: string;
  isEligible: boolean;
  bookingRef: string;
  journeys: JourneySegment[];
  passengers: Passenger[];
};

export type PassengerExtraDetails = {
  nationality: string;
  phone: string;
  countryCode: string;
};
