"use client";

export const Pricing = ({ title, items }: any) => {
  return (
    <div className="flex flex-col gap-5 p-5 border border-gray-700 rounded-xl shadow-lg bg-gray-900/50">
      <h3 className="text-2xl md:text-3xl font-extrabold uppercase text-main-color border-b-2 border-main-color pb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item: any, index: string) => (
          <div
            key={index}
            className="flex justify-between items-end text-base md:text-xl text-gray-200"
          >
            <span className="capitalize tracking-wide font-medium">
              {item.service}
            </span>
            <span className="flex-grow border-b border-dashed border-gray-600 mx-3 mb-1"></span>
            <span className="text-xl md:text-2xl font-bold text-main-color">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};