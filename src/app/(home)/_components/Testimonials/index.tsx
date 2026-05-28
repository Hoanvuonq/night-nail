import { SectionPage, TitleSection } from "@/components";
import { cn } from "@/utils/cn";

export const Testimonials = () => (
  <section className="relative overflow-hidden bg-[#fff5f4] w-full">
    <SectionPage>
      <TitleSection
        tagText="Đánh Giá"
        titleNormal="Cảm Nhận Từ"
        titleHighlight="Nàng"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={cn(
              "p-8 rounded-[2.5rem] bg-white border-2 border-[#fce9eb] shadow-[0_20px_60px_-15px_rgba(233,178,184,0.15)] relative transition-all duration-300",
              i === 1
                ? "md:-translate-y-8 hover:-translate-y-10 shadow-[0_30px_70px_-15px_rgba(255,123,169,0.25)] border-[#f4c7cc]"
                : "hover:-translate-y-2"
            )}
          >
            <div className="flex gap-1 text-[#ff7ba9] mb-4 text-xs">{"★".repeat(5)}</div>
            <p className="text-zinc-500 italic mb-8 leading-relaxed text-sm md:text-base">
              "Lần đầu làm móng ở Gò Vấp mà ưng ý đến vậy. Nhân viên siêu dễ thương, bộ móng bền hơn 3 tuần vẫn đẹp!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#ff7ba9] to-[#f4c7cc] shrink-0" />
              <div>
                <p className="text-zinc-800 font-bold text-sm tracking-wide uppercase">Khách Hàng Xinh Đẹp</p>
                <p className="text-[#ff7ba9] text-[10px] font-bold uppercase tracking-widest mt-1">Verified Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  </section>
);