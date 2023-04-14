import React from "react";
import { footerBottomItem } from "../../constant";

const Bottom = () => {
  return (
    <div className="w-full bg-amazon_blue py-8 text-white px-6">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-4 lgl:grid-cols-7 gap-8 md:place-items-center place-content-center text-gray-400">
        {footerBottomItem.map((data, i) => (
          <div className="group cursor-pointer " key={i}>
            <h3 className="w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] leading-3">
              {data.title}
            </h3>
            <p className="mt-[2px] w-24 tracking-tight text-[12px] text-[#999] group-hover:underline leading-3">
              {data.des}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottom;
