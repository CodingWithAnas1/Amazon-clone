import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const SideNav = ({ title, one, two, three }) => {
  return (
    <div className="py-3 border-b-[1px] border-gray-300">
      <h3 className="text-lg font-semibold mb-1 font-mono text-center">
        {title}
      </h3>
      <ul>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6  py-2 cursor-pointer text-sm">
          {one}
          <span>
            <AiOutlineArrowRight />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6  py-2 cursor-pointer text-sm">
          {two}
          <span>
            <AiOutlineArrowRight />
          </span>
        </li>
        <li className="flex items-center justify-between hover:bg-zinc-200 px-6  py-2 cursor-pointer text-sm">
          {three}
          <span>
            <AiOutlineArrowRight />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
