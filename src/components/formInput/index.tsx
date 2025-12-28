import React from 'react';

interface FormInputProps {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "tel" | "textarea";
}

export const FormInput = ({ icon, name, placeholder, value, onChange, type = "text" }: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className={`bg-[#1C1C1C] rounded-2xl p-1 border border-white/5 flex ${isTextarea ? 'items-start' : 'items-center'}`}>
      <div className={`w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center ml-1 text-[#D4AF37] shrink-0 ${isTextarea ? 'mt-1' : ''}`}>
        {icon}
      </div>
      {isTextarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={2}
          className="bg-transparent w-full p-3 text-white placeholder-white/30 focus:outline-none text-sm resize-none"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="bg-transparent w-full p-3 text-white placeholder-white/30 focus:outline-none text-sm"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};