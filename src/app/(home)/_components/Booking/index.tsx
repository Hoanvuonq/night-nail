// BookingModal.tsx
"use client";
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AVAILABLE_SERVICES = [
  "Mắt Mèo",
  "Tráng Gương",
  "Đắp bột/Gel",
  "Sơn Gel cơ bản",
  "Vẽ/Đính đá 3D",
];

interface IBookingModalProps {
  serviceTitle: string;
  onClose: () => void;
}

const BookingModal = ({ serviceTitle, onClose }: IBookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    nailArt: "",
    service: "",
    dateTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu đặt lịch:", formData);
    alert(`Đã đặt lịch dịch vụ "${serviceTitle}" thành công!`);
    onClose();
  };

  const inputClasses = 
    "w-full p-3 border border-amber-500 bg-gray-900 text-white rounded-md " + 
    "focus:ring-amber-400 focus:border-amber-400 placeholder-gray-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      
      <div className="bg-black p-8 rounded-lg shadow-2xl w-full max-w-lg relative border border-amber-500">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-amber-500 hover:text-white hover:bg-amber-700/40 px-2 py-1 cursor-pointer text-4xl font-light leading-none"
        >
          &times;
        </button>

        <Link href="/" className="w-full flex justify-center">
          <div className="relative w-[140px] h-[90px]">
            <Image
              src="/images/logo/logo.png"
              alt="Flora Nail Studio logo"
              fill
              sizes="(max-width: 800px) 100px, 120px"
              className="object-contain"
            />
          </div>
        </Link>
        


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* 1. Tên Khách Hàng */}
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Tên Khách Hàng
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* 2. SĐT */}
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Số Điện Thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* 3. Mẫu Nail muốn làm (Tùy chọn) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Mô tả Mẫu Nail muốn làm (Tùy chọn)
            </label>
            <input
              type="text"
              name="nailArt"
              value={formData.nailArt}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Vẽ hoạ tiết, đính đá..."
            />
          </div>

          {/* 4. Dịch vụ (Dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Chọn Dịch Vụ Chi Tiết
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              // Custom class cho select box
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-gray-900 text-gray-500">-- Chọn dịch vụ --</option>
              {AVAILABLE_SERVICES.map((service, index) => (
                <option 
                  key={index} 
                  value={service}
                  className="bg-gray-900 text-white" // Đảm bảo option background cũng tối
                >
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Thời gian (Date - Time) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-amber-300">
              Thời Gian Đặt Lịch
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* Nút Đặt Lịch */}
          <div className="w-full flex justify-center mt-4">
            {/* Tùy chỉnh nút submit đơn giản với màu Gold/Black */}
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 text-black rounded-lg font-bold uppercase transition hover:bg-amber-400 shadow-lg shadow-amber-500/50"
            >
              ĐẶT LỊCH NGAY
            </button>
            {/* Nếu component Button của bạn có hỗ trợ style tương tự: 
              <Button label="ĐẶT LỊCH NGAY" customClass="bg-amber-500 text-black hover:bg-amber-400" /> 
            */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
