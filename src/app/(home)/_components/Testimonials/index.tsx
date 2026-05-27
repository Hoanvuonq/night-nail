export const Testimonials = () => (
  <section className="py-24 relative overflow-hidden bg-[#fff5f4]">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-zinc-800 font-bold text-5xl md:text-6xl text-center mb-16 tracking-tighter">
        Cảm Nhận Từ <br className="md:hidden" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e9b2b8] via-[#ff7ba9] to-[#ff4d79] sriracha-regular pr-4 italic">Nàng</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white border-2 border-[#fce9eb] shadow-[0_20px_60px_-15px_rgba(233,178,184,0.15)] relative hover:-translate-y-2 transition-transform duration-300">
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
    </div>
  </section>
);