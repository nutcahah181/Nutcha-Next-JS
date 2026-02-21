'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from './nav';

const MobileBottomNav = () => {

  const pathname = usePathname();
   const isCheckin = pathname.startsWith('/checkin');

  if (isCheckin) {
    return null;
  }

  {
   return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ key, label, href, mobile: { Icon } }) => {
          const isActive = pathname === href;

          return (
            <a
              key={key}
              href={href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors
              ${isActive 
                ? 'text-sky-600' 
                : 'text-slate-600 hover:text-sky-600 active:bg-sky-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  );
  }
}

export default MobileBottomNav