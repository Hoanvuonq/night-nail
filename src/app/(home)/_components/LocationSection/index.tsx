"use client";
import { cn } from "@/utils/cn";
import { IconLocation } from "public/iconLocation";

const STUDIO_ADDRESS = "302/32 Phan Huy Ích, Phường 12 Quận Gò Vấp, TP.HCM";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.503611149953!2d-93.2647754844372!3d45.00062317909801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32943e1d52a23%3A0xc3f7a62707f15474!2s624%2017th%20Ave%20NE%2C%20Minneapolis%2C%20MN%2055413!5e0!3m2!1svi!2sus!4v1709772000000!5m2!1svi!2sus";

const LocationSection = () => {
  return (
    <div className={cn("w-full py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-black")}>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        
        {/* Tiêu đề & Icon */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-end mb-4 md:mb-10 gap-4 md:gap-10 w-full">
          <IconLocation className="w-16 h-16 md:w-20 md:h-20 text-main-color" />
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl pacifico-regular-font text-main-color">
              Địa Chỉ Studio
            </h2>
            <p className="text-base md:text-lg text-gray-300 mt-2">
              Tọa lạc tại vị trí dễ tìm ở <br className="lg:hidden" /> Quận Gò Vấp, TP.HCM.
            </p>
          </div>
        </div>

        {/* Bản đồ và Thông tin */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 w-full">
          
          {/* Bản đồ Google Maps */}
          <div className="w-full lg:w-1/2 shadow-2xl rounded-xl overflow-hidden">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="350" // Chiều cao cố định trên mobile, tăng nhẹ trên desktop
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí Studio Night Nail" 
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Thông tin chi tiết */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left p-4 lg:p-0">
            <div className="text-main-color text-3xl md:text-4xl font-semibold mb-4 whitespace-pre-line pacifico-regular-font leading-normal">
              {STUDIO_ADDRESS}
            </div>
            
            <p className="text-white text-base md:text-lg mt-6 max-w-lg">
              **Tiện lợi đỗ xe!** Bạn không cần phải lo lắng, studio nằm trong khu vực có nhiều chỗ đậu xe máy/ô tô miễn phí và an toàn.
            </p>
            
            <a 
                href={`https://maps.app.goo.gl/?q=${encodeURIComponent(STUDIO_ADDRESS)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-block px-6 py-3 bg-main-color text-black font-bold rounded-full hover:bg-main-color/80 transition shadow-lg uppercase tracking-wider"
            >
                Chỉ đường Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;