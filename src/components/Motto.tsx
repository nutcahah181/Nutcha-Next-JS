import React from 'react'

const Motto = () => {
  return (
    <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fadeIn">Online Check-in</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-sky-100 mb-1 sm:mb-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>Fly Smart. Fly Qoomlee.</p>
        <p className="text-sm sm:text-base text-sky-100 animate-fadeIn" style={{ animationDelay: '0.2s' }}>Check in online and save time at the airport</p>
      </div>
    </div>
  );
}


export default Motto