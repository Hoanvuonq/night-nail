import { CalendarCheck, Home, ImageIcon, Sparkles, User } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Trang chủ",
    href: "/",
    icon: Home,
  },
  {
    label: "Dịch vụ",
    href: "/services",
    icon: Sparkles,
  },
  {
    label: "", 
    href: "/booking", 
    icon: CalendarCheck,
    isFloating: true, 
  },
  {
    label: "Mẫu Nail",
    href: "/gallery",
    icon: ImageIcon,
  },
  {
    label: "Tài khoản",
    href: "/account",
    icon: User,
  },
];
