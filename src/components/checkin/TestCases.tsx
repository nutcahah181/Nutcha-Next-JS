import { useState } from 'react';

type TestCase = {
  name: string;
  lastName: string;
  bookingRef: string;
};

type TestCasesProps = {
  setLastName: (value: string) => void;
  setBookingRef: (value: string) => void;
};

export const TestCases = ({ setLastName, setBookingRef }: TestCasesProps) => {
  const testCases: TestCase[] = [
    { name: 'Case 1: Standard Check-in', lastName: 'Huum', bookingRef: 'ABC123' },
    { name: 'Case 2: Different Passenger', lastName: 'Smith', bookingRef: 'XYZ789' },
    { name: 'Case 3: Long Booking Ref', lastName: 'Johnson', bookingRef: 'LONG123456' },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // No auto-selection of test cases by default

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const testCase = testCases[index];
    setLastName(testCase.lastName);
    setBookingRef(testCase.bookingRef);
  };

  return (
    <div className="flex space-x-2">
      {testCases.map((testCase, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
            selectedIndex === index
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          title={testCase.name}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

// This component is only for development and will be tree-shaken in production
export default process.env.NODE_ENV === 'development' ? TestCases : () => null;
