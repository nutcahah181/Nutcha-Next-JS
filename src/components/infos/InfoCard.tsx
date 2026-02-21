'use client';
import React from 'react'

type InfoCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
}

const InfoCard = ({ title, description, icon, action}: InfoCardProps) => {
  return (
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-slate-100 hover:shadow-lg transition-shadow touch-manipulation active:scale-[0.99]">
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="p-2 bg-sky-100 rounded-lg">
            {icon}
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-800"> {title}</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">
          {description}
        </p>
        <button className="text-sky-600 font-semibold hover:text-sky-700 active:text-sky-800 transition-colors text-sm touch-manipulation">
          {action}
        </button>
      </div>
  )
}

export default InfoCard