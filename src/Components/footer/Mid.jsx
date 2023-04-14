import React from "react";
import MiddleList from "./MiddleList";
import { middleList } from "../../constant";
import { logo, flag } from "../../assets/index";

const Mid = () => {
  return (
    <div className="w-full bg-amazon_light text-white">
      <div className="w-full border-b-[1px] border-gray-500 py-10">
        <div className="max-w-5xl mx-auto text-gray-300 px-2 md:px-6">
          <div className="w-full grid grid-cols-2  lg:grid-cols-4 gap-3  lg:place-items-center lg:items-start">
            {middleList.map((item, index) => (
              <MiddleList
                key={index}
                title={item.title}
                listItem={item.listItem}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-6 items-center justify-center py-6 ">
        <div className="flex items-center gap-3">
          <img className="w-20 pt-3 cursor-pointer" src={logo} alt="logo" />
          <div className="flex items-center font-semibold">
            <button className="border-[1px] border-gray-400 hover:border-white py-1 px-2 mr-2 text-sm">
              English
            </button>
            <button className="text-sm border-[1px] border-gray-400 hover:border-white  py-1 px-2 flex items-center gap-1">
              <img className="w-6 " src={flag} alt="" />
              Pakistan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mid;
