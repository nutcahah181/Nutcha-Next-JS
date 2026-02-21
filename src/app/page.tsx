'use client';
import CheckinForm, { CheckinPayload } from "@/components/checkin/CheckinForm";
import Footer from "@/components/Footer";
import InfoCards from "@/components/infos/InfoCards";
import { useModal } from "@/components/ModalProvider";
import Motto from "@/components/Motto";
import Header from "@/components/nav/Header";
import MobileBottomNav from "@/components/nav/MobileBottomNav";
import TravelTipsSidebar from "@/components/TravelTipsSidebar";
import { useCheckin } from "@/context/CheckinContext";
import { checkinApi } from "@/services/checkinApi";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useContext } from "react";
import CheckinFlow from "./checkin/layout";
import CheckinStartPage from "./checkin/start/page";

//Lending Page
export default function Home() {
  const router = useRouter();
  const { openModal } = useModal();
  const { setBooking } = useCheckin();

  const handleCheckinSubmit = useCallback(
    async (payload: CheckinPayload) => {
      try {
        const booking = await checkinApi.startCheckin(
          payload.bookingRef,
          payload.lastName,
        );
        setBooking(booking as any);
        router.push("/checkin/select");
      } catch (error: any) {
        openModal({
          title: "Check-in Error",
          message: error.userMessage || error.message,
        });
      }
    },
    [setBooking, router, openModal],
  );

  return (
    //Wrapper div with background gradient and padding
    <div
      id="home"
      className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 pb-20 md:pb-0"
    >
      <Header />
      <Motto />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div id="manage" />
            <div id="checkin">
              <CheckinForm onSubmit={handleCheckinSubmit} />
            </div>
            <div id="flights">
              <InfoCards />
            </div>
          </div>

          <div className="lg:col-span-1">
            <TravelTipsSidebar />
          </div>
        </div>
      </div>

      <div id="contact">
        <Footer />
      </div>
      <MobileBottomNav />
    </div>
  );
}
