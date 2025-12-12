export interface NavItem {
  name: string;
  href: string;
}

export const navItems: NavItem[] = [
  { name: "Trang Chủ", href: "/" },
  { name: "Dịch Vụ", href: "/service" },
  { name: "Sản Phẩm", href: "/nailart" },
  { name: "Giới Thiệu", href: "/about" },
  { name: "Liên Hệ", href: "/contact" },
];