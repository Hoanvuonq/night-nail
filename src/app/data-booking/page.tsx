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
  RefreshCw
} from "lucide-react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXtyoDLvbi2GJuEXdkS8REY7W6c2naMu6DvBD0bFWn3oJcIelnwiXdk97arXqCsT6hZQ/exec";

export default function DataBooking() {
  const [groupedBookings, setGroupedBookings] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SCRIPT_URL}?type=all&v=${Date.now()}`, {
        method: "GET",
        redirect: "follow", 
      });

      if (!res.ok) throw new Error("Phản hồi mạng không ổn định");

      const rawData = await res.json();

      const normalizedData = rawData.map((item: any) => 
        _.mapKeys(item, (value, key) => key.toLowerCase().trim())
      );

      // 2. Gom nhóm theo Ngày dựa trên chuỗi "YYYY-MM-DD lúc HH:mm"
      const grouped = _.groupBy(normalizedData, (item) => {
        const dateTimeStr = item["date/time"] || item["datetime"] || "";
        return dateTimeStr.split(" lúc ")[0] || "Ngày khác";
      });

      setGroupedBookings(grouped);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#FBFAF8]">
        <div className="relative">
          <Loader2 className="animate-spin text-amber-500" size={48} />
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw size={16} className="text-amber-300 animate-pulse" />
          </div>
        </div>
        <p className="text-zinc-500 font-medium font-sans animate-pulse">Đang đồng bộ lịch hẹn...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FBFAF8] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-zinc-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <RefreshCw size={14} className="animate-spin-slow" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Hệ thống Night Nail</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif italic text-zinc-900 flex items-center gap-3">
              <Calendar className="text-amber-500" size={32} />
              Quản lý lịch hẹn
            </h1>
            <p className="text-zinc-500 text-sm mt-2 font-light italic">
              Dữ liệu được sắp xếp theo thời gian đặt lịch thực tế
            </p>
          </div>
          <button 
            onClick={fetchBookings}
            className="group flex items-center gap-2 text-xs bg-white border border-zinc-200 px-5 py-2.5 rounded-2xl hover:bg-amber-50 hover:border-amber-200 transition-all text-zinc-600 font-bold shadow-sm active:scale-95"
          >
            <RefreshCw size={14} className="group-active:rotate-180 transition-transform duration-500" />
            LÀM MỚI DỮ LIỆU
          </button>
        </header>

        {_.isEmpty(groupedBookings) ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100 shadow-inner">
            <Calendar className="mx-auto text-zinc-200 mb-4" size={64} />
            <p className="text-zinc-400 font-medium">Hiện tại chưa có lịch hẹn nào được ghi nhận.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.keys(groupedBookings).map((dateLabel) => (
              <div key={dateLabel} className="space-y-6">
                {/* Header Ngày gom nhóm */}
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 text-white px-6 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-amber-200/50">
                    {dateLabel}
                  </div>
                  <div className="h-px bg-zinc-200 flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 rounded-xl">
                    <Clock size={12} className="text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                      {groupedBookings[dateLabel].length} đơn đặt
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {groupedBookings[dateLabel].map((item: any, index: number) => {
                    const serviceTitle = item.service || "";
                    const serviceInfo = _.find(SERVICES_DATA, (s) => s.title === serviceTitle);
                    const imageSrc = serviceInfo?.image || "/booking/booking_service_01.jpg";

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500 group relative overflow-hidden"
                      >
                        {/* Trang trí góc */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Ảnh dịch vụ */}
                        <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-[2rem] shadow-inner bg-zinc-50 border-4 border-[#FBFAF8]">
                          <Image
                            src={imageSrc}
                            alt="Service"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            unoptimized
                          />
                        </div>

                        {/* Thông tin chi tiết */}
                        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center md:text-left">
                          {/* Khách hàng */}
                          <div className="flex flex-col justify-center space-y-2">
                            <h4 className="flex items-center justify-center md:justify-start gap-2 text-zinc-900 font-bold uppercase text-sm tracking-tight">
                              <User size={16} className="text-amber-500" />
                              {item.fullname || "Khách ẩn danh"}
                            </h4>
                            <a 
                              href={`tel:${item.phone}`} 
                              className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 text-xs hover:text-amber-600 transition-colors font-medium"
                            >
                              <Phone size={14} className="text-zinc-400" /> 
                              {item.phone || "N/A"}
                            </a>
                          </div>

                          {/* Thời gian & Dịch vụ */}
                          <div className="flex flex-col justify-center space-y-2 border-y md:border-y-0 md:border-x border-zinc-50 py-4 md:py-0 md:px-8">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-800 font-black text-base">
                              <Clock size={16} className="text-amber-500" />
                              {item["date/time"]?.split(" lúc ")[1] || "Giờ hẹn"}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                              <Tag size={12} className="text-zinc-300" /> 
                              <span className="truncate max-w-[150px]">{item.service || "Dịch vụ"}</span>
                            </div>
                          </div>

                          {/* Ghi chú & Giá */}
                          <div className="flex flex-col justify-center space-y-2">
                            <div className="flex items-start justify-center md:justify-start gap-2 text-zinc-400 text-xs italic leading-relaxed">
                              <FileText size={14} className="mt-0.5 shrink-0 text-zinc-300" />
                              <p className="line-clamp-2">
                                {item.description || "Nàng không để lại ghi chú nào."}
                              </p>
                            </div>
                            <div className="text-amber-600 font-black text-2xl tracking-tighter">
                              {item.price || "0đ"}
                            </div>
                          </div>
                        </div>

                        {/* Status Label */}
                        <div className="relative z-10 shrink-0">
                           <div className="flex flex-col items-center gap-2">
                             <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-4 py-2 rounded-2xl border border-emerald-100 uppercase tracking-widest shadow-sm">
                               Đã nhận lịch
                             </span>
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 pb-10 text-center">
          <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.4em]">
            Night Nail Admin Dashboard v2.0
          </p>
        </footer>
      </div>
    </div>
  );
}