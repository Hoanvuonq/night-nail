"use client";
import React from 'react';
import {FormInput} from '../formInput';
import { User, Phone, Edit3 } from 'lucide-react'; 

interface InfomationBookingProps {
  formData: {
    name: string;
    phone: string;
    note: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InfomationBooking = ({ formData, handleChange }: any) => {
  return (
    <div className="px-6 space-y-4">
      <h3 className="text-[#D4AF37] font-serif text-lg italic mb-2">
        Thông Tin Của Bạn
      </h3>

      <FormInput
        name="name"
        placeholder="Họ và Tên"
        value={formData.name}
        onChange={handleChange}
        icon={<User size={20} />} // Dùng Lucide Icon cho gọn
      />

      <FormInput
        type="tel"
        name="phone"
        placeholder="Số điện thoại"
        value={formData.phone}
        onChange={handleChange}
        icon={<Phone size={20} />}
      />

      <FormInput
        type="textarea"
        name="note"
        placeholder="Ghi chú thêm (Mẫu nail, dị ứng...)"
        value={formData.note}
        onChange={handleChange}
        icon={<Edit3 size={20} />}
      />
    </div>
  );
};