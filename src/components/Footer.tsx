import { Plane } from 'lucide-react';
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Plane className="w-6 h-6 text-sky-400" />
              <span className="text-xl font-bold">Qoomlee</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Your trusted partner in the skies. Fly smart, fly safe, fly Qoomlee.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Book a Flight</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Flight Status</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Manage Booking</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Check-in</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Help Center</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Contact Us</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">FAQs</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Baggage Info</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-sky-400 active:text-sky-300 transition-colors inline-block py-1 touch-manipulation">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400">
          <p>© 2024 Qoomlee Airline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer