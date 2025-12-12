"use client";
import {IconLocation} from "public/iconLocation";

const STUDIO_ADDRESS = "302/32 Phan Huy Ích, Phường 12 Quận Gò Vấp, TP.HCM";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.503611149953!2d-93.2647754844372!3d45.00062317909801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32943e1d52a23%3A0xc3f7a62707f15474!2s624%2017th%20Ave%20NE%2C%20Minneapolis%2C%20MN%2055413!5e0!3m2!1svi!2sus!4v1709772000000!5m2!1svi!2sus"; // Giữ nguyên để component hoạt động

const LocationSection = () => {
  return (
    <div className="py-20 px-4 md:px-16 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex justify-around items-end mb-10 gap-10">
          <div className="text-center">
            <h2 className="text-7xl pacifico-regular-font text-main-color">
              Địa Chỉ Studio
            </h2>
            <p className="text-sm text-white mt-2">
              Tọa lạc tại vị trí dễ tìm ở <br /> Quận Gò Vấp, TP.HCM.
            </p>
          </div>
         <IconLocation/>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-16">
          <div className="w-full max-w-md lg:w-1/2 shadow-xl">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí Studio" 
            ></iframe>
          </div>

          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
            <div className="text-main-color text-4xl font-semibold mb-4 whitespace-pre-line pacifico-regular-font leading-normal">
              {STUDIO_ADDRESS}
            </div>
            
            <p className="text-white mt-6 max-w-sm">
              **Tiện lợi đỗ xe!** Bạn không cần phải lo lắng, studio nằm trong khu vực có nhiều chỗ đậu xe máy/ô tô miễn phí và an toàn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;