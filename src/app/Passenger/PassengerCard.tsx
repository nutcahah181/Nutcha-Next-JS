import { Passenger } from "../../types/checkin";

const cardBaseClasses = 'relative w-full text-left px-4 py-4 rounded-xl border-2 transition-all touch-manipulation overflow-hidden';
const selectedCardClasses = 'border-sky-500 bg-sky-50/50 shadow-sm';
const unselectedCardClasses = 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm active:scale-[0.99]';


export interface PassengerCardProps {
  passenger: Passenger;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}



export default function PassengerCard({ passenger, isSelected, onToggle, index }: PassengerCardProps) {
  return (
    <button
      data-testid={`passenger-${index}`}
      type="button"
      onClick={onToggle}
      className={`${cardBaseClasses} ${isSelected ? selectedCardClasses : unselectedCardClasses}`}
      aria-pressed={isSelected}
    >
      <div className={`absolute top-0 right-0 transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="relative w-11 h-11">
          <svg className="w-11 h-11 text-sky-600" viewBox="0 0 44 44" fill="currentColor">
            <path d="M44 0 L44 44 L0 0 Z" />
          </svg>
          <svg
            className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 pr-6">
          <div className={`font-semibold text-base leading-tight transition-colors ${isSelected ? 'text-sky-900' : 'text-slate-900'}`}>
            {passenger.firstName} {passenger.lastName}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span data-testid={`paxType-${index}`} className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${isSelected ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>
              {passenger.paxType}
            </span>
            <span data-testid={`seat-${index}`} className={`text-xs ${isSelected ? 'text-sky-700' : 'text-slate-500'}`}>
              {passenger.seat ? `Seat ${passenger.seat}` : 'No seat assigned'}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
