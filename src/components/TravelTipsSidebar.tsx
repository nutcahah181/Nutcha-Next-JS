import { CheckCircle, MapPin } from 'lucide-react';
import React from 'react'

const TravelTipsSidebar = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100 lg:sticky lg:top-24">
      <div className="flex items-center space-x-3 mb-5 sm:mb-6">
        <div className="p-2 bg-sky-600 rounded-lg">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">Travel Tips</h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {[
          { title: 'Arrive Early', body: 'Arrive 2-3 hours before international flights, 1-2 hours for domestic.' },
          { title: 'Valid Documents', body: 'Ensure your passport is valid for 6 months beyond your travel dates.' },
          { title: 'Mobile Boarding', body: 'Download your boarding pass to your phone for quick access.' },
          { title: 'Pack Smart', body: 'Keep liquids in containers ≤100ml and place in a clear bag.' },
          { title: 'Stay Informed', body: 'Check visa requirements and travel advisories for your destination.' },
        ].map((tip) => (
          <div key={tip.title} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">{tip.title}</h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 bg-white rounded-lg border border-sky-200">
        <p className="text-xs text-slate-500 text-center">Need help? Contact our 24/7 support team</p>
        <p className="text-sky-600 font-bold text-center mt-1 text-sm sm:text-base">+1-800-QOOMLEE</p>
      </div>
    </div>
  );
}

export default TravelTipsSidebar