"use client";

import { useEffect, useState } from "react";
import { SERVICES_DATA } from "@/contants/booking"; // Đảm bảo đúng đường dẫn file constants
import Image from "next/image";
import _ from "lodash";
import { Calendar, Phone, Clock, User, FileText, Tag, Loader2 } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyJvM9FG7mMbHrVLzYhGruKaFCzoq4RhSD2oQvmxgwkx8xErn9kXCakFCVg4BsUCNjUeA/exec";

export default function DataBooking() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(SCRIPT_URL);
        const data = await res.json();
        // Dữ liệu từ Apps Script trả về mảng object với key là tiêu đề cột
        setBookings(data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-zinc-500 font-medium">Đang tải lịch hẹn...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FBFAF8] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-zinc-200 pb-6">
          <h1 className="text-3xl font-serif italic text-zinc-900 flex items-center gap-3">
            <Calendar className="text-amber-500" size={28} /> 
            Danh sách lịch đặt
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-light">Cập nhật thời gian thực từ hệ thống</p>
        </header>

        <div className="flex flex-col gap-5">
          {bookings.length > 0 ? (
            bookings.map((item: any, index: number) => {
              const serviceInfo = _.find(
                SERVICES_DATA,
                (s) => s.title === item.Service
              );
              
              const imageSrc = serviceInfo?.image || "/booking/booking_service_01.jpg";

              return (
                <div
                  key={index}
                  className="bg-white rounded-[32px] p-5 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-[24px] shadow-inner bg-zinc-50">
                    <Image
                      src={imageSrc}
                      alt="Service"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold uppercase text-sm tracking-tight">
                        <User size={16} className="text-amber-500" />
                        {item.Fullname}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 font-medium text-xs">
                        <Phone size={14} className="text-zinc-400" /> 
                        <a href={`tel:${item.Phone}`} className="hover:text-amber-600 transition-colors">
                          {item.Phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-2 border-y md:border-y-0 md:border-x border-zinc-100 py-3 md:py-0 md:px-6">
                      <div className="flex items-center gap-2 text-zinc-700 font-semibold text-sm">
                        <Clock size={16} className="text-amber-500" />
                        {item["Date/Time"]}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Tag size={14} /> 
                        <span className="truncate max-w-[200px]">{item.Service}</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-start gap-2 text-zinc-400 text-[11px] italic leading-relaxed">
                        <FileText size={14} className="mt-0.5 shrink-0 text-zinc-300" />
                        <span className="line-clamp-2">
                          {item.Description || "Không có ghi chú"}
                        </span>
                      </div>
                      <div className="text-amber-600 font-black text-xl tracking-tighter">
                        {item.Price}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full border border-amber-100 uppercase tracking-widest shadow-sm">
                      Mới
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
              <p className="text-zinc-400">Chưa có lịch hẹn nào được ghi nhận.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}