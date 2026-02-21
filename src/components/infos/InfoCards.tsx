'use client';
import React from "react";
import InfoCard from "./InfoCard";
import { Clock } from "lucide-react";

const InfoCards = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
      <InfoCard
        title="Flight Status"
        description="Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.."
        icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />}
        action="Check Status →"
      />
      <InfoCard
        title="Baggage Allowance"
        description="Find out how much baggage you can bring on board and avoid extra fees."
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-4 0h4" /></svg>}
        action="Check Baggage Allowance"
      />
    </div>
  );
};

export default InfoCards;
