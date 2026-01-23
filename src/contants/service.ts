export const DATA_SERVICE = [
  {
    img: "/images/service/service_nail__01.jpg",
    title: "Nail Art (Nghệ Thuật Móng)", 
    description: "Chúng tôi tin rằng Nail Art là phần thú vị nhất! Chính vì thế, chúng tôi đã tạo ra quy trình thực hiện đơn giản và hoàn hảo nhất. Khám phá ngay các thiết kế và phong cách nail nghệ thuật độc đáo của chúng tôi.",
    labelButton: "Đặt Lịch Ngay",
  },
  {
    img: "/images/service/service_nail__02.jpg",
    title: "Về Night Nail Studio", 
    description: "Chúng tôi khác biệt, và điều đó tạo nên sự đặc biệt. Tìm hiểu thêm về Night Nail Studio, cách thức đặt lịch hẹn và các tiêu chuẩn vệ sinh, an toàn hiện hành của chúng tôi.",
    labelButton: "Tìm Hiểu Thêm", 
    reverse: true,
  },
  {
    img: "/images/service/service_nail__03.jpg",
    title: "Menu Dịch Vụ Toàn Diện", 
    description: "Chúng tôi cung cấp đa dạng các dịch vụ chăm sóc móng tay (Manicure), móng chân (Pedicure) và đắp gel tăng cường. Tất cả các gói dịch vụ đều bao gồm cắt da, tẩy tế bào chết, khăn nóng thư giãn, và massage dưỡng ẩm chuyên sâu.",
    labelButton: "Xem Chi Tiết", 
  },
];

export const SERVICE_PRICING = {
  NAIL: [
    { service: "Cắt Da", price: "19K", image: "/images/service/pricing_menu01.jpg" },
    { service: "Sơn Gel", price: "69K", image: "/images/service/pricing_menu02.jpg" },
    { service: "Úp Móng", price: "49K", image: "/images/service/pricing_menu03.jpg" },
    { service: "Sơn Thạch", price: "59K", image: "/images/service/pricing_menu04.jpg" },
    { service: "Mắt Mèo", price: "129K", image: "/images/service/pricing_menu05.jpg" },
    { service: "Phá Gel", price: "29K", image: "/images/service/pricing_menu06.jpg" },
    { service: "Tháo Móng Úp Gel", price: "39K", image: "/images/service/pricing_menu07.jpg" },
  ],
  COMBO: [
    { service: "Cắt Da - Sơn Gel - Cứng Móng", price: "79K", image: "/images/service/pricing_menu08.jpg" },
    { service: "Cắt Da - Úp Móng - Sơn Gel", price: "109K", image: "/images/service/pricing_menu09.jpg" },
    { service: "Cắt Da - Úp Móng - Mắt Mèo", price: "159K", image: "/images/service/pricing_menu10.jpg" },
    { service: "Cắt Da - Úp Móng - French", price: "179K", image: "/images/service/pricing_menu11.jpg" },
  ],
  DESIGN: [
    { service: "Dặm Ombre", price: "5K/N", image: "/images/service/pricing_menu12.jpg" },
    { service: "Tráng Gương", price: "5K/N", image: "/images/service/pricing_menu13.jpg" },
    { service: "French", price: "7K/N", image: "/images/service/pricing_menu14.jpg" },
    { service: "Vẽ (Tùy Mẫu)", price: "5K - 25K/N", image: "/images/service/pricing_menu15.jpg" },
    { service: "Loang", price: "5K/N", image: "/images/service/pricing_menu16.jpg" },
    { service: "Nặn Gel Nổi", price: "15K - 25K/N", image: "/images/service/pricing_menu17.jpg" },
    { service: "Sticker", price: "3K - 5K/N", image: "/images/service/pricing_menu18.jpg" },
    { service: "Đá Charm", price: "5K - 25K/N", image: "/images/service/pricing_menu19.jpg" },
  ],
};
export interface IServiceProps {
  img?: string;
  title: string;
  description?: string;
  labelButton?: string;
  reverse?: boolean;
}