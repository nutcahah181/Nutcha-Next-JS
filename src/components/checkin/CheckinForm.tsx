'use client';
import React, {useState } from "react";
import TestCases from "./TestCases";

const MIN_LAST_NAME_LENGTH = 2;
const MIN_BOOKING_REF_LENGTH = 6;

export type CheckinPayload = {
  lastName: string;
  bookingRef: string;
};

type CheckinFormProps = {
  onSubmit: (payload: CheckinPayload) => Promise<void> | void;
};

const CheckinFrom = ({ onSubmit }: CheckinFormProps) => {
  const [lastName, setLastName] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const [error, setError] = useState<string | null>(null);
  const canSubmit =
    lastName.trim().length >= MIN_LAST_NAME_LENGTH &&
    bookingRef.trim().length >= MIN_BOOKING_REF_LENGTH;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError("Enter your last name and booking reference.");
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit({
        lastName: lastName.trim().toUpperCase(),
        bookingRef: bookingRef.trim().toUpperCase(),
      });
    } catch (err) {
      setError(
        "We couldn’t find your booking. Check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="checkin"
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          Retrieve Your Booking
        </h3>
        {/* Test cases for development - auto-fill form with sample data */}
        <TestCases setLastName={setLastName} setBookingRef={setBookingRef} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all touch-manipulation"
            placeholder="Your last name"
            autoComplete="family-name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bookingRef"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Booking reference (PNR)
          </label>
          <input
            type="text"
            id="bookingRef"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
            className="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all uppercase touch-manipulation"
            placeholder="ABC123 or 1234567890123"
            autoComplete="off"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold py-4 sm:py-4 text-base sm:text-lg rounded-lg hover:from-sky-700 hover:to-cyan-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Retrieving…" : "Retrieve Booking"}
        </button>
      </form>

      {error && (
        <div
          aria-live="polite"
          className="mt-5 sm:mt-6 p-3.5 sm:p-4 bg-red-50 text-red-700 rounded-lg border border-red-200"
        >
          <p className="text-xs sm:text-sm leading-relaxed">{error}</p>
        </div>
      )}

      <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-sky-700">Tip:</span> Online
          check-in opens 24 hours before departure and closes 2 hours before
          departure.
        </p>
      </div>
    </div>
  );
};

export default CheckinFrom;
