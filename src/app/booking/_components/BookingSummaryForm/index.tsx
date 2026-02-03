"use client";

import Image from "next/image";
import {
  CalendarIcon,
  Clock,
  User,
  Phone,
  Edit3,
  Sparkles,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const FormInput = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: any) => {
  const isTextarea = type === "textarea";
  return (
    <motion.div variants={itemVariants} className="group w-full">
      <div
        className={`relative flex rounded-3xl border border-zinc-100 bg-white p-1.5 transition-all duration-300 focus-within:border-amber-300 focus-within:shadow-[0_10px_30px_-10px_rgba(251,191,36,0.15)] ${isTextarea ? "items-start" : "items-center"}`}
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[20px] bg-amber-50 text-amber-500 transition-colors duration-300 group-focus-within:bg-amber-500 group-focus-within:text-white ${isTextarea ? "mt-1" : ""}`}
        >
          {icon}
        </div>
        {isTextarea ? (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            rows={3}
            className="w-full resize-none bg-transparent px-3 py-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className="w-full bg-transparent px-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </motion.div>
  );
};

const SocialIcons = {
  Facebook: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Zalo: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.107 10.334C22.25 9.07 21.605 7.822 20.457 7.07c-1.89-1.24-4.834-1.922-8.238-1.922-4.524 0-8.192 1.207-8.192 2.697 0 .19.06.375.176.55.05.08.106.155.168.227C4.16 8.784 4.043 8.973 4 9.172c-.06.27-.08.54-.08.828 0 4.133 4.542 7.485 10.145 7.485.59 0 1.168-.036 1.73-.105l3.824 2.37c.36.223.82.02.82-.416v-2.128c1.334-1.218 2.053-2.793 1.668-4.892z" />
    </svg>
  ),
  Tiktok: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
};

const SocialButton = ({ active, icon, label, onClick }: any) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={(e) => {
      e.preventDefault(); // Tránh submit form
      onClick();
    }}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-300 ${
      active
        ? "border-amber-500 bg-amber-50 text-amber-600 shadow-sm"
        : "border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200"
    }`}
  >
    <div className={`${active ? "text-amber-500" : "text-zinc-400"}`}>
      {icon}
    </div>
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </motion.button>
);

export const BookingSummaryForm = ({
  currentService,
  selectedDate,
  selectedTime,
  formData,
  handleChange,
}: any) => {
  if (!currentService) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-1 flex-col p-5 md:px-10 space-y-6 overflow-y-auto no-scrollbar bg-[#FBFAF8]"
    >
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-4xl bg-zinc-900 p-5 shadow-2xl"
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em]">
              Thông tin đặt lịch
            </p>
            <ShieldCheck size={14} className="text-amber-400/50" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={currentService.image || ""}
                alt="Service"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-lg italic text-white truncate">
                {currentService.title}
              </h4>
              <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles size={10} fill="currentColor" />{" "}
                {currentService.price}
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-amber-400">
                <CalendarIcon size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                  Ngày hẹn
                </p>
                <p className="text-xs font-bold text-zinc-200 truncate">
                  {selectedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-amber-400">
                <Clock size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                  Giờ hẹn
                </p>
                <p className="text-xs font-bold text-zinc-200 truncate">
                  {selectedTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 space-y-5">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center space-y-1"
        >
          <div className="flex items-center gap-2 text-amber-600">
            <div className="h-px w-8 bg-amber-200" />
            <span className="text-[14px] font-bold uppercase">
              Xác nhận nàng nhé
            </span>
            <div className="h-px w-8 bg-amber-200" />
          </div>
          <h3 className="text-2xl text-zinc-900 italic">
            Để lại lời nhắn cho em
          </h3>
        </motion.div>

        <div className="space-y-3">
          <FormInput
            name="name"
            placeholder="Nàng tên gì nè?"
            value={formData.name}
            onChange={handleChange}
            icon={<User size={18} strokeWidth={2.5} />}
          />
          <FormInput
            name="phone"
            placeholder="Số điện thoại liên lạc"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            icon={<Phone size={18} strokeWidth={2.5} />}
          />
          <FormInput
            name="note"
            placeholder="Ghi chú thêm (Mẫu móng nàng thích...)"
            type="textarea"
            value={formData.note}
            onChange={handleChange}
            icon={<Edit3 size={18} strokeWidth={2.5} />}
          />
        </div>
      </div>
      {/* Social Selection Group */}
      <motion.div variants={itemVariants} className="space-y-3">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center">
          Nàng hay dùng mxh nào nhất?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <SocialButton
            label="Facebook"
            active={formData.social === "Facebook"}
            onClick={() =>
              handleChange({ target: { name: "social", value: "Facebook" } })
            }
            icon={<SocialIcons.Facebook className="w-4 h-4" />}
          />
          <SocialButton
            label="Zalo"
            active={formData.social === "Zalo"}
            onClick={() =>
              handleChange({ target: { name: "social", value: "Zalo" } })
            }
            icon={<SocialIcons.Zalo className="w-4 h-4" />}
          />
          <SocialButton
            label="Tiktok"
            active={formData.social === "Tiktok"}
            onClick={() =>
              handleChange({ target: { name: "social", value: "Tiktok" } })
            }
            icon={<SocialIcons.Tiktok className="w-4 h-4" />}
          />
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="pb-2 text-center space-y-4"
      >
        <p className="text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-medium italic">
          <ShieldCheck size={12} className="text-emerald-500" />
          Thông tin của nàng sẽ được bảo mật tuyệt đối
        </p>
        <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <Heart size={10} fill="currentColor" className="text-pink-300" /> Hẹn
          gặp nàng sớm nha
        </p>
      </motion.div>
    </motion.div>
  );
};
