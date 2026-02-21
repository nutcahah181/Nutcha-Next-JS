import { ApiError } from './checkin';
import { PaxType } from '@/types/checkin';


/**
 * Represents a passenger in the check-in system
 */
export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  paxType: PaxType;
  seat?: string;
  boardingZone?: string;
  boardingSequence?: string;
  checkedIn: boolean;
  phoneNumber?: string;
  nationality?: string;
  documentNumber?: string;
}

/**
 * Represents a flight segment in a journey
 */
export interface FlightSegment {
  departure: {
    airport: string;
    time: string;
    terminal: string;
  };
  arrival: {
    airport: string;
    time: string;
    terminal: string;
  };
  flightNumber: string;
  segmentStatus: string;
  marketingCarrier: string;
  operatingCarrier: string;
  terminal: string;
  gate: string;
}

/**
 * Represents the complete booking details for check-in
 */
export interface BookingDetails {
  checkinKey: string;
  bookingRef: string;
  isEligible: boolean;
  journeys: FlightSegment[];
  passengers: Passenger[];
  dgAcknowledged?: boolean;
  checkinCompleted?: boolean;
  boardingPassUrl?: string;
}

/**
 * Represents the payload for updating passenger details
 */
export interface PassengerUpdatePayload {
  passengerId: string;
  phoneNumber: string;
  nationality: string;
  documentNumber?: string;
}

/**
 * Error codes that can be returned by the check-in API
 */
export enum CheckinApiErrorCode {
  BOOKING_NOT_FOUND = 'BOOKING_NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  CHECKIN_NOT_COMPLETED = 'CHECKIN_NOT_COMPLETED',
  DANGEROUS_GOODS_NOT_ACKNOWLEDGED = 'DANGEROUS_GOODS_NOT_ACKNOWLEDGED',
}

/**
 * Configuration for the check-in API
 */
const CONFIG = {
  // In a real implementation, these would be environment variables
  API_BASE_URL: '/api/checkin',
  MOCK_DELAY: 300, // ms
};

/**
 * Simulates a network delay for mock API calls
 */
const simulateNetworkDelay = () =>
  new Promise(resolve => setTimeout(resolve, CONFIG.MOCK_DELAY));

/**
 * Mock database for development and testing
 * In a real application, this would be replaced with actual API calls
 */
const mockDb: Record<string, BookingDetails> = {
  'ABC123': {
    checkinKey: 'CHK-ABC123-001',
    isEligible: true,
    bookingRef: 'ABC123',
    journeys: [
      {
        departure: {
          airport: 'BKK',
          time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          terminal: '1'
        },
        arrival: {
          airport: 'SIN',
          time: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(), // 3 hours later
          terminal: '1'
        },
        flightNumber: 'QL123',
        segmentStatus: 'CHECKIN_OPEN',
        marketingCarrier: 'QL',
        operatingCarrier: 'QL',
        terminal: '1',
        gate: '40'
      },
    ],
    passengers: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'ALEX',
        lastName: 'HUUM',
        paxType: PaxType.ADT,
        seat: '12A',
        boardingZone: '1',
        boardingSequence: '023',
        checkedIn: true,
        phoneNumber: '+66811234567',
        nationality: 'TH',
        documentNumber: 'A12345678'
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        firstName: 'Somsee',
        lastName: 'Kuum',
        paxType: PaxType.ADT,
        seat: '12B',
        boardingZone: '1',
        boardingSequence: '022',
        checkedIn: false,
        phoneNumber: '+66819876543',
        nationality: 'TH',
        documentNumber: 'B87654321'
      }
    ]
  },
  'XYZ789': {
    checkinKey: 'CHK-XYZ789-322',
    isEligible: true,
    bookingRef: 'XYZ789',
    journeys: [
      {
        departure: {
          airport: 'BKK',
          time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          terminal: '1'
        },
        arrival: {
          airport: 'SIN',
          time: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(), // 3 hours later
          terminal: '1'
        },
        flightNumber: 'QL123',
        segmentStatus: 'CHECKIN_OPEN',
        marketingCarrier: 'QL',
        operatingCarrier: 'QL',
        terminal: '1',
        gate: '40'
      },
    ],
    passengers: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'John',
        lastName: 'Smith',
        paxType: PaxType.ADT,
        seat: '11B',
        boardingZone: '1',
        boardingSequence: '023',
        checkedIn: true,
        phoneNumber: '+66811234567',
        nationality: 'US',
        documentNumber: 'AX3456789'
      }
    ]
  },
  'LONG123456': {
    checkinKey: 'CHK-LONG123456-001',
    isEligible: true,
    bookingRef: 'LONG123456',
    journeys: [
      {
        departure: {
          airport: 'BKK',
          time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          terminal: '1'
        },
        arrival: {
          airport: 'SIN',
          time: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(), // 3 hours later
          terminal: '1'
        },
        flightNumber: 'QL123',
        segmentStatus: 'CHECKIN_OPEN',
        marketingCarrier: 'QL',
        operatingCarrier: 'QL',
        terminal: '1',
        gate: '40'
      },
    ],
    passengers: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'Jane',
        lastName: 'Johnson',
        paxType: PaxType.ADT,
        seat: '12B',
        boardingZone: '2',
        boardingSequence: '022',
        checkedIn: true,
        phoneNumber: '+66811234568',
        nationality: 'US',
        documentNumber: 'AX3456788'
      }
    ]
  }
};

/**
 * Check-in API service for handling all check-in related operations
 * This is a mock implementation that simulates API calls
 */
export const checkinApi = {
  /**
   * Start the check-in process by verifying the booking reference and last name
   * @param bookingRef - The booking reference number (PNR)
   * @param lastName - The last name of the primary passenger
   * @returns Promise resolving to the booking details
   * @throws {ApiError} If the booking is not found or not eligible for check-in
   */
  async startCheckin(bookingRef: string, lastName: string): Promise<BookingDetails> {
    await simulateNetworkDelay();

    const booking = mockDb[bookingRef];
    const hasMatchingPassenger = booking?.passengers.some(p =>
      p.lastName.toUpperCase() === lastName.toUpperCase()
    );

    if (!booking || !hasMatchingPassenger) {
      throw new ApiError({
        code: CheckinApiErrorCode.BOOKING_NOT_FOUND,
        status: 404,
        message: 'Unable to retrieve booking',
        userMessage: 'We couldn\'t find your booking. Check your details and try again.',
      });
    }

    if (!booking.isEligible) {
      throw new ApiError({
        code: CheckinApiErrorCode.INVALID_INPUT,
        status: 400,
        message: 'Booking is not eligible for check-in',
        userMessage: 'This booking is not eligible for online check-in. Please see airport staff for assistance.',
      });
    }

    // Return a copy of the booking data to prevent direct mutation
    return {
      ...booking,
      passengers: booking.passengers.map(p => ({
        id: p.id,
        firstName: p.firstName,
        lastName: p.lastName,
        paxType: p.paxType,
        seat: p.seat,
        boardingZone: p.boardingZone,
        boardingSequence: p.boardingSequence,
        checkedIn: p.checkedIn
      }))
    };
  },

  /**
   * Update contact and document details for one or more passengers
   * @param bookingRef - The booking reference number
   * @param updates - Array of passenger updates
   * @returns Promise resolving to the updated passengers
   * @throws {ApiError} If the booking is not found or update data is invalid
   */
  async updatePassengerDetails(
    bookingRef: string,
    updates: PassengerUpdatePayload[]
  ): Promise<Passenger[]> {
    await simulateNetworkDelay();

    const booking = mockDb[bookingRef];
    if (!booking) {
      throw new ApiError({
        code: CheckinApiErrorCode.BOOKING_NOT_FOUND,
        status: 404,
        message: 'Booking not found',
        userMessage: 'We couldn\'t find your booking.',
      });
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      throw new ApiError({
        code: CheckinApiErrorCode.INVALID_INPUT,
        status: 400,
        message: 'No update data provided',
        userMessage: 'Please provide passenger details to update.',
      });
    }

    const updatedPassengers: Passenger[] = [];
    const passengerMap = new Map(booking.passengers.map(p => [p.id, p]));

    for (const update of updates) {
      const passenger = passengerMap.get(update.passengerId);
      if (passenger) {
        // Only update the specified fields
        passenger.phoneNumber = update.phoneNumber;
        passenger.nationality = update.nationality;
        if (update.documentNumber !== undefined) {
          passenger.documentNumber = update.documentNumber;
        }
        updatedPassengers.push({ ...passenger }); // Return a copy
      }
    }

    if (updatedPassengers.length === 0) {
      throw new ApiError({
        code: CheckinApiErrorCode.INVALID_INPUT,
        status: 400,
        message: 'No matching passengers found',
        userMessage: 'No passengers found with the provided IDs.',
      });
    }

    return updatedPassengers;
  },

  /**
   * Acknowledge the dangerous goods agreement
   * @param bookingRef - The booking reference number
   * @returns Promise that resolves when the acknowledgment is saved
   */
  async acknowledgeDangerousGoods(bookingRef: string): Promise<void> {
    await simulateNetworkDelay();

    const booking = mockDb[bookingRef];
    if (booking) {
      booking.dgAcknowledged = true;
    }
  },

  /**
   * Complete the check-in process and generate boarding passes
   * @param bookingRef - The booking reference number
   * @param passengerIds - Array of passenger IDs to check in
   * @returns Promise resolving to the updated booking with boarding pass information
   * @throws {ApiError} If the booking is not found or check-in cannot be completed
   */
  async completeCheckin(bookingRef: string, passengerIds: string[]): Promise<BookingDetails> {
    await simulateNetworkDelay();

    const booking = mockDb[bookingRef];
    if (!booking) {
      throw new ApiError({
        code: CheckinApiErrorCode.BOOKING_NOT_FOUND,
        status: 404,
        message: 'Booking not found',
        userMessage: 'We couldn\'t find your booking.',
      });
    }

    if (!booking.dgAcknowledged) {
      throw new ApiError({
        code: CheckinApiErrorCode.DANGEROUS_GOODS_NOT_ACKNOWLEDGED,
        status: 400,
        message: 'Dangerous goods not acknowledged',
        userMessage: 'Please acknowledge the dangerous goods agreement before completing check-in.',
      });
    }

    // Update check-in status for selected passengers
    booking.passengers.forEach(passenger => {
      if (passengerIds.includes(passenger.id)) {
        passenger.checkedIn = true;

        // Assign seat and boarding details if not already assigned
        if (!passenger.seat) {
          const row = Math.floor(Math.random() * 30) + 1;
          const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // A-F
          passenger.seat = `${row}${seatLetter}`;
          passenger.boardingZone = Math.floor(Math.random() * 5 + 1).toString();
          passenger.boardingSequence = Math.floor(Math.random() * 100 + 1).toString().padStart(3, '0');
        }
      }
    });

    // Mark check-in as completed
    booking.checkinCompleted = true;
    booking.boardingPassUrl = `https://example.com/boarding-passes/${bookingRef}`;

    // Return a copy of the updated booking
    return { ...booking };
  }
};

// Export types for use in components
export type { BookingDetails as CheckinResponse };
