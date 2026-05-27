"use client";

import { useEffect, useState, useCallback } from "react";
import { SERVICES_DATA } from "@/contants/booking";
import Image from "next/image";
import _ from "lodash";
import {
  Calendar,
  Phone,
  Clock,
  User,
  FileText,
  Tag,
  Loader2,
  RefreshCw,
  Facebook,
  MessageCircle,
  Music2,
} from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxjWpvNgrz_DMs6p--pX1hDNipdeR47XXH-taIg6oq_HURb2-ZzwykBEyRASx9lbYkxjQ/exec";

// --- Social Badge Component ---
const SocialBadge = ({ platform }: { platform: string }) => {
  if (!platform) return null;
  const configs: Record<string, { color: string; icon: any }> = {
    facebook: {
      color: "bg-blue-50 text-blue-600 border-blue-100",
      icon: <Facebook size={10} />,
    },
    zalo: {
      color: "bg-sky-50 text-sky-600 border-sky-100",
      icon: <MessageCircle size={10} />,
    },
    tiktok: {
      color: "bg-zinc-900 text-white border-zinc-800",
      icon: <Music2 size={10} />,
    },
  };
  const config = configs[platform.toLowerCase()] || {
    color: "bg-zinc-50 text-zinc-500",
    icon: <Tag size={10} />,
  };
  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter ${config.color}`}
    >
      {config.icon} {platform}
    </div>
  );
};

export default function DataBooking() {
  const [groupedBookings, setGroupedBookings] = useState<Record<string, any[]>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SCRIPT_URL}?type=all&v=${Date.now()}`);
      const rawData = await res.json();
      const normalizedData = rawData.map((item: any) =>
        _.mapKeys(item, (v, k) => k.toLowerCase().trim()),
      );

      const grouped = _.groupBy(
        normalizedData,
        (item) => (item["date/time"] || "").split(" lúc ")[0] || "Ngày khác",
      );

      const sortedGrouped: Record<string, any[]> = {};
      // Sắp xếp các ngày theo thứ tự thời gian
      const sortedDates = Object.keys(grouped).sort();

      sortedDates.forEach((date) => {
        sortedGrouped[date] = _.orderBy(
          grouped[date],
          [(item) => (item["date/time"] || "").split(" lúc ")[1] || "00:00"],
          ["asc"],
        );
      });

      setGroupedBookings(sortedGrouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Hàm xử lý cuộn mượt mà
  const scrollToDate = (dateId: string) => {
    const element = document.getElementById(dateId);
    if (element) {
      const offset = 140; // Trừ hao khoảng cách của header cố định
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#FBFAF8]">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
          Đang tải dữ liệu...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FBFAF8] pb-20 font-sans">
      {/* HEADER CỐ ĐỊNH (Sticky) */}
      <header className="sticky top-0 z-50 bg-[#FBFAF8]/80 backdrop-blur-xl border-b border-zinc-200/50 px-6 py-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif italic text-zinc-900 flex items-center gap-3">
              <Calendar className="text-amber-500" size={24} />
              Quản lý lịch hẹn
            </h1>
            <button
              onClick={fetchBookings}
              className="p-2 bg-white rounded-full border border-zinc-200 shadow-sm active:rotate-180 transition-transform duration-500"
            >
              <RefreshCw size={16} className="text-zinc-600" />
            </button>
          </div>

          {/* THANH CHỌN NGÀY HÀNG NGANG */}
          {!_.isEmpty(groupedBookings) && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
              {Object.keys(groupedBookings).map((date) => (
                <button
                  key={date}
                  onClick={() => scrollToDate(date)}
                  className="shrink-0 px-5 py-2 rounded-2xl bg-white border border-zinc-200 text-[11px] font-black text-zinc-500 uppercase tracking-tighter hover:border-amber-400 hover:text-amber-600 transition-all shadow-sm active:scale-95"
                >
                  {date.split("-")[2]}/{date.split("-")[1]}{" "}
                  {/* Hiển thị dạng DD/MM */}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* DANH SÁCH LỊCH HẸN */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-10">
        {_.isEmpty(groupedBookings) ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
            <p className="text-zinc-400 italic">Nàng chưa có lịch hẹn nào...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.keys(groupedBookings).map((dateLabel) => (
              <div key={dateLabel} id={dateLabel} className="space-y-6">
                {/* Header Ngày */}
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 text-white px-6 py-2 rounded-2xl text-[12px] font-black uppercase shadow-lg shadow-amber-200">
                    {dateLabel}
                  </div>
                  <div className="h-px bg-zinc-200 flex-1"></div>
                </div>

                {/* Danh sách các ca trong ngày */}
                <div className="grid grid-cols-1 gap-5">
                  {groupedBookings[dateLabel].map(
                    (item: any, index: number) => {
                      const serviceInfo = _.find(
                        SERVICES_DATA,
                        (s) => s.title === item.service,
                      );
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-[2.5rem] p-6 border border-zinc-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-all duration-500 group relative"
                        >
                          <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-4xl border-4 border-[#FBFAF8]">
                            <Image
                              src={
                                serviceInfo?.image ||
                                "/booking/booking_service_01.jpg"
                              }
                              alt="nail"
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              unoptimized
                            />
                          </div>

                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="flex flex-col justify-center space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-zinc-900 font-bold uppercase text-sm">
                                  {item.fullname || item.name}
                                </h4>
                                <SocialBadge platform={item.social} />
                              </div>
                              <a
                                href={`tel:${item.phone}`}
                                className="flex items-center gap-1 text-zinc-400 text-xs font-bold hover:text-amber-600"
                              >
                                <Phone size={12} /> {item.phone}
                              </a>
                            </div>

                            <div className="flex flex-col justify-center space-y-1 border-y md:border-y-0 md:border-x border-zinc-50 py-4 md:px-8">
                              <div className="flex items-center gap-2 text-zinc-900 font-black text-2xl tracking-tighter">
                                <Clock size={18} className="text-amber-500" />
                                {(item["date/time"] || "").split(" lúc ")[1]}
                              </div>
                              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                                {item.service}
                              </span>
                            </div>

                            <div className="flex flex-col justify-center space-y-2">
                              <div className="flex items-start gap-2 text-zinc-400 text-xs italic">
                                <FileText size={14} className="shrink-0" />
                                <p className="line-clamp-2">
                                  {item.description || item.note || "..."}
                                </p>
                              </div>
                              <div className="text-amber-600 font-black text-xl">
                                {item.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
