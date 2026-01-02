import React from "react";

interface FormInputProps {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "text" | "tel" | "textarea";
}

export const FormInput = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: FormInputProps) => {
  const isTextarea = type === "textarea";
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 rounded-[22px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

      <div
        className={`relative flex ${
          isTextarea ? "items-start" : "items-center"
        } bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-[20px] p-1.5 transition-all duration-300 group-focus-within:border-[#D4AF37]/40`}
      >
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-[#1C1C1C] to-black text-[#D4AF37] shadow-inner ${
            isTextarea ? "mt-1" : ""
          }`}
        >
          {icon}
        </div>
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={2}
            className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none resize-none"
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
