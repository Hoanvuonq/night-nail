export const Testimonials = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-black font-serif text-5xl text-center mb-16">Cảm Nhận Từ <span className="text-[#D4AF37] italic">Nàng</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-md relative">
            <div className="flex gap-1 text-[#D4AF37] mb-4 text-xs">{"★".repeat(5)}</div>
            <p className="text-black/70 italic mb-6 leading-relaxed">
              "Lần đầu làm móng ở Gò Vấp mà ưng ý đến vậy. Nhân viên siêu dễ thương, bộ móng bền hơn 3 tuần vẫn đẹp!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#D4AF37] to-[#F4D8CD]" />
              <div>
                <p className="text-black font-bold text-sm tracking-wide uppercase">Khách Hàng Xinh Đẹp</p>
                <p className="text-[#D4AF37] text-[10px]">Verified Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);